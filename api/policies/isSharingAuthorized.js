module.exports = async function isAuthorized(req, res, next) {
  if (process.env.NODE_ENV === 'test') return next();

  const token = req.headers.authorization;

  if (!token) {
    const { id } = req.params;
    const sharing = await Sharing.findById(id);
    if (sharing && sharing.linkSharing) {
      return next();
    }
    return res.forbidden();
  }
  try {
    const decryptedSessionStorageToken = TokenService.verify(token);

    let searchUser = null;
    if (decryptedSessionStorageToken.adminUser) {
      searchUser = decryptedSessionStorageToken.adminUser;
    } else {
      searchUser = decryptedSessionStorageToken;
    }

    User.findOne({
      _id: searchUser._id,
    }).exec(async (error, user) => {
      if (error) return res.serverError(error);

      if (user.isSuperAdmin) return next();

      if (req.method == 'POST') {
        if (req.body && req.body.plan) {
          const planId = req.body.plan;
          const plan = await Plan.findById(planId);
          if (plan.owner) {
            if (
              plan.owner == user._id.toString() ||
              plan.owner == '5c5347560d90150017d4c882'
            ) {
              return next();
            }
          }

          const sharingsLenght = await Sharing.find({
            plan: planId,
          }).count();
          if (sharingsLenght > 0) {
            const sharings = await Sharing.find({
              plan: planId,
            });
            for (let i = 0; i < sharingsLenght; i++) {
              if (
                sharings[i].owner == user._id.toString() ||
                (sharings[i].user == user._id.toString() &&
                  sharings[i].level >= 2)
              ) {
                return next();
              }
            }
          }
        }

        if (req.body && req.body.project) {
          const projectId = req.body.project;
          const project = await Project.findById(projectId);
          if (project.owner) {
            if (
              project.owner == user._id.toString() ||
              project.owner == '5c5347560d90150017d4c882'
            ) {
              return next();
            }
          }

          const sharingsLenght = await Sharing.find({
            project: projectId,
          }).count();
          if (sharingsLenght > 0) {
            const sharings = await Sharing.find({
              project: projectId,
            });
            for (let i = 0; i < sharingsLenght; i++) {
              if (
                sharings[i].owner == user._id.toString() ||
                (sharings[i].user == user._id.toString() &&
                  sharings[i].level >= 2)
              ) {
                return next();
              }
            }
          }
        }

        if (req.body && req.body.album) {
          const albumId = req.body.album;
          const album = await Album.findById(albumId);
          if (album.owner) {
            if (
              album.owner == user._id.toString() ||
              album.owner == '5c5347560d90150017d4c882'
            ) {
              return next();
            }
          }
          const sharingsLenght = await Sharing.find({
            album: albumId,
          }).count();
          if (sharingsLenght > 0) {
            const sharings = await Sharing.find({
              album: albumId,
            });
            for (let i = 0; i < sharingsLenght; i++) {
              if (
                sharings[i].owner == user._id.toString() ||
                (sharings[i].user == user._id.toString() &&
                  sharings[i].level >= 2)
              ) {
                return next();
              }
            }
          }
        }

        return res.forbidden();
      }

      if (req.method == 'GET') {
        // 5c5347560d90150017d4c882   -> _id dos exemplos

        if (req.query && req.query.user) {
          if (
            req.query.user == user._id.toString() ||
            req.query.user == '5c5347560d90150017d4c882'
          ) {
            return next();
          }
        }

        if (req.query && req.query.plan) {
          const planId = req.query.plan;
          const plan = await Plan.findById(planId);
          if (plan.owner) {
            if (
              plan.owner == user._id.toString() ||
              plan.owner == '5c5347560d90150017d4c882'
            ) {
              return next();
            }
          }

          const sharingsLenght = await Sharing.find({
            plan: planId,
          }).count();
          if (sharingsLenght > 0) {
            const sharings = await Sharing.find({
              plan: planId,
            });
            for (let i = 0; i < sharingsLenght; i++) {
              if (
                sharings[i].owner == user._id.toString() ||
                sharings[i].user == user._id.toString()
              ) {
                return next();
              }
            }
          }
        }

        if (req.query && req.query.project) {
          const projectId = req.query.project;
          const project = await Project.findById(projectId);
          if (project.owner) {
            if (
              project.owner == user._id.toString() ||
              project.owner == '5c5347560d90150017d4c882'
            ) {
              return next();
            }
          }

          const sharingsLenght = await Sharing.find({
            project: projectId,
          }).count();
          if (sharingsLenght > 0) {
            const sharings = await Sharing.find({
              project: projectId,
            });
            for (let i = 0; i < sharingsLenght; i++) {
              if (
                sharings[i].owner == user._id.toString() ||
                sharings[i].user == user._id.toString()
              ) {
                return next();
              }
            }
          }
        }

        if (req.query && req.query.album) {
          const albumId = req.query.album;
          const album = await Album.findById(albumId);
          if (album.owner) {
            if (
              album.owner == user._id.toString() ||
              album.owner == '5c5347560d90150017d4c882'
            ) {
              return next();
            }
          }
          const sharingsLenght = await Sharing.find({
            album: albumId,
          }).count();
          if (sharingsLenght > 0) {
            const sharings = await Sharing.find({
              album: albumId,
            });
            for (let i = 0; i < sharingsLenght; i++) {
              if (
                sharings[i].owner == user._id.toString() ||
                sharings[i].user == user._id.toString()
              ) {
                return next();
              }
            }
          }
        }

        return res.forbidden();
      }

      if (req.method == 'PUT') {
        const id = req.param('id');
        const sharing = await Sharing.findById(id);
        if (
          sharing.owner.toString() == user._id.toString() ||
          (sharing.level >= 2 && sharing.user == user._id.toString())
        ) {
          return next();
        }

        return res.forbidden();
      }

      if (req.method == 'DELETE') {
        const id = req.param('id');
        const sharing = await Sharing.findById(id);
        if (
          sharing.owner.toString() == user._id.toString() ||
          sharing.user == user._id.toString()
        ) {
          return next();
        }

        return res.forbidden();
      }
    });
  } catch (error) {
    return res.forbidden(error);
  }
};
