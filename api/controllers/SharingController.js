/**
 * ProjectController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // Insere um novo dado do banco com os campos(name, owner and description)
  postShare: async (req, res) => {
    const params = req.allParams();
    let user = null;

    if (params.userEmail) {
      user = await User.findOne({
        email: params.userEmail,
      }).catch(() => {
        res.serverError({
          message: 'User Not Found',
        });
      });

      if (!user) {
        res.serverError({
          message: 'User Not Found',
          errorCode: 405,
        });
      }
    }

    let sharingToCreate = null;
    if (user) {
      sharingToCreate = {
        level: params.level,
        linkSharing: params.linkSharing,
        owner: params.owner,
        project: params.project,
        plan: params.plan,
        album: params.album,
        user: user._id,
      };
    } else {
      sharingToCreate = {
        level: params.level,
        linkSharing: params.linkSharing,
        owner: params.owner,
        project: params.project,
        plan: params.plan,
        album: params.album,
      };
    }

    const promise = Sharing.create(sharingToCreate);

    promise
      .then(async doc => {
        // send email to user
        let model;
        let modelName;
        let link;

        const share = await Sharing.findOne({
          _id: doc._id,
        })
          .populate('owner')
          .populate('user')
          .populate({
            path: 'plan',
            populate: {
              path: 'owner',
              select: 'name',
            },
          })
          .populate({
            path: 'album',
            populate: {
              path: 'owner',
              select: 'name',
            },
          })
          .populate({
            path: 'project',
            populate: {
              path: 'owner',
              select: 'name',
            },
          })
          .exec();

        if (share.user) {
          if (share.project) {
            model = 'Projeto';
            modelName = share.project.name;
            link = `https://app.vantum.com.br/project/${share.project.id}`;
          } else if (share.plan) {
            model = 'Mapa';
            modelName = share.plan.name;
            link = `https://app.vantum.com.br/plan/${share.plan.id}`;
          } else if (share.album) {
            model = 'Album';
            modelName = share.album.name;
            link = `https://app.vantum.com.br/album/${share.album.id}`;
          }

          // if (req.ip !== '::ffff:127.0.0.1') {
          await sails.helpers.sendTemplateEmail.with({
            to: share.user.email,
            subject: 'Novo compartilhamento',
            template: 'internal/email-share',
            layout: false,
            templateData: {
              contactName: share.owner.fullName,
              model,
              modelName,
              link,
            },
          });
          // }
        }

        return res.json(share);
      })
      .catch(res.serverError);
  },

  getShare: async (req, res) => {
    const id = req.param('id');

    const query = Sharing.findOne({
      _id: id,
    })
      .populate('owner')
      .populate('user')
      .populate({
        path: 'plan',
        populate: {
          path: 'owner',
          select: 'name',
        },
      })
      .populate({
        path: 'album',
        populate: {
          path: 'owner',
          select: 'name',
        },
      })
      .populate({
        path: 'project',
        populate: {
          path: 'owner',
          select: 'name',
        },
      });
    const promise = query.exec();

    promise
      .then(doc => {
        return res.json(doc);
      })
      .catch(res.serverError);
  },

  getShares: async (req, res) => {
    const params = req.allParams();

    const query = Sharing.find(params)
      .populate('owner')
      .populate('user')
      .populate({
        path: 'plan',
        populate: [
          {
            path: 'owner',
          },
          {
            path: 'orthomosaics',
            populate: [
              {
                path: 'image',
              },
            ],
          },
          {
            path: 'annotations',
          },
        ],
      })
      .populate({
        path: 'album',
        populate: {
          path: 'owner',
        },
      })
      .populate({
        path: 'project',
        populate: [
          {
            path: 'owner',
          },
          {
            path: 'plans',
            populate: [
              {
                path: 'orthomosaics',
                populate: [
                  {
                    path: 'image',
                  },
                ],
              },
              {
                path: 'annotations',
              },
            ],
          },
          {
            path: 'projects',
            populate: [
              {
                path: 'plans',
                populate: [
                  {
                    path: 'orthomosaics',
                    populate: [
                      {
                        path: 'image',
                      },
                    ],
                  },
                  {
                    path: 'annotations',
                  },
                ],
              },
            ],
          },
        ],
      });
    const promise = query.exec();

    promise
      .then(doc => {
        return res.json(doc);
      })
      .catch(res.serverError);
  },

  putShare: async (req, res) => {
    const params = req.allParams();

    const promise = Sharing.findOneAndUpdate(
      {
        _id: params.id,
      },
      {
        $set: params,
      }
    );

    promise
      .then(doc => {
        return res.json(doc);
      })
      .catch(res.serverError);
  },

  deleteShare: async (req, res) => {
    const id = req.param('id');

    const promise = Sharing.deleteOne({
      _id: id,
    });

    promise
      .then(_doc => {
        return res.ok();
      })
      .catch(res.serverError);
  },
};
