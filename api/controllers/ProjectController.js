/**
 * ProjectController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  postProject: async (req, res) => {
    const params = req.allParams();

    const promise = Project.create({
      name: params.name,
      description: params.description,
      owner: params.owner,
      company: params.company,
      plans: params.plans,
      parent: params.parent,
      latlngs: params.latlngs,
    });

    promise
      .then(doc => {
        return res.json(doc);
      })
      .catch(res.serverError);
  },

  // Retorna um projeto especifico
  getProject: async (req, res) => {
    const id = req.param('id');

    const query = Project.findOne({
        _id: id,
      })
      .populate('owner')
      .populate('annotations')
      .populate('sharings')
      .populate({
        path: 'projects',
        populate: [{
          path: 'plans',
          populate: [{
            path: 'orthomosaics',
          }, ],
        }, ],
      })
      .populate({
        path: 'plans',
        populate: [{
            path: 'album',
          },
          {
            path: 'annotations',
          },
          {
            path: 'orthomosaics',
            populate: [{
                path: 'image',
              },
              {
                path: 'task',
                select: '-disks.free.values -disks.used.values -mems.total.available.values -mems.total.free.values  -mems.total.used.values -mems.total.active.values -mems.total.inactive.values -mems.total.available.values -mems.processing.free.values  -mems.processing.used.values -mems.processing.available.values -mems.processing.active.values -mems.processing.inactive.values ',
              },
            ],
          },
          {
            path: 'owner',
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

  // Retorna todos os projetos criados
  getProjects: async (req, res) => {
    const params = req.allParams();
    // console.log(params)

    const query = Project.find(params)
      .sort('-createdAt')
      .populate('owner')
      .populate('sharings')
      .populate('annotations')
      .populate({
        path: 'projects',
        populate: [{
            path: 'plans',
            populate: [{
                path: 'orthomosaics',
                populate: [{
                  path: 'image',
                }, ]
              },
              {
                path: 'annotations',
              },
            ],
          },
          {
            path: 'projects',
            populate: [{
              path: 'plans',
              populate: [{
                  path: 'orthomosaics',
                  populate: [{
                    path: 'image',
                  }, ]
                },
                {
                  path: 'annotations',
                },
              ],
            }, ],
          },
        ],
      })
      .populate({
        path: 'plans',
        populate: [{
            path: 'album',
          },
          {
            path: 'annotations',
          },
          {
            path: 'orthomosaics',
          },
          {
            path: 'owner',
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

  // Verificar a edição
  putProject: async (req, res) => {
    const params = req.allParams();

    const promise = Project.findOneAndUpdate({
      _id: params.id,
    }, {
      $set: params,
    }, {
      new: true,
    }).populate('plans');

    promise
      .then(doc => {
        return res.json(doc);
      })
      .catch(res.serverError);
  },

  // Deleta um determinado projeto
  deleteProject: async (req, res) => {
    const id = req.param('id');

    const projectToDelete = await Project.findOne({
      _id: id,
    });

    await sails.helpers.clearProjectRelatives(projectToDelete);

    const promise = Project.deleteOne({
      _id: id,
    });

    promise
      .then(doc => {
        return res.ok();
      })
      .catch(res.serverError);
  },

  addToProject: async (req, res) => {
    const {
      id
    } = req.params;
    let insertedMap = false;
    let insertedProject = false;
    const {
      plan,
      project
    } = req.body;
    if (plan) {
      const foundPlan = await Plan.findById(plan);
      if (!foundPlan) {
        return res.status(404).json({
          err: 'O mapa a ser inserido não existe',
        });
      }
    }
    if (project) {
      const foundProject = await Project.findById(project);
      if (!foundProject) {
        return res.status(404).json({
          err: 'O projeto a ser inserido não existe',
        });
      }
    }

    const projectToUpdate = await Project.findById(id);
    if (projectToUpdate) {
      projectToUpdate.plans.map(plan => {
        // plan é objectId e body.plan é String
        if (plan == req.body.plan && req.body.plan != null) {
          insertedMap = true;
        }
      });

      projectToUpdate.projects.map(project => {
        // project é objectId e body.project é String
        if (project == req.body.project && req.body.project != null) {
          insertedProject = true;
        }
      });

      if (insertedMap && insertedProject) {
        return res.status(400).json({
          err: 'O mapa e o projeto já foram inseridos',
        });
      }
      if (insertedProject) {
        return res.status(400).json({
          err: 'O projeto já foi inserido',
        });
      }
      if (insertedMap) {
        const plan = await Plan.findById(req.body.plan);
        if (plan.project) {
          return res.status(400).json({
            err: 'O mapa já foi inserido',
          });
        }
      }
    }

    if (plan) {
      await Project.updateOne({
        _id: id,
      }, {
        $push: {
          plans: plan,
        },
      });
      await Plan.updateOne({
        _id: plan,
      }, {
        $set: {
          project: id,
        },
      });
    }

    if (project) {
      await Project.updateOne({
        _id: id,
      }, {
        $push: {
          projects: project,
        },
      });
      // Updating child
      await Project.findOneAndUpdate({
        _id: project,
      }, {
        $set: {
          parent: id,
        },
      });
    }

    await Project.findById(id)
      .populate('projects')
      .populate('owner')
      .populate('plans')
      .populate('company')
      .then(project => {
        res.status(200).json(project);
      })
      .catch(err => res.status(400).json(err));
  },

  removeFromProject: async (req, res) => {
    const {
      id
    } = req.params;
    const {
      plan,
      project
    } = req.body;
    if (plan) {
      const foundPlan = await Plan.findById(plan);
      if (!foundPlan) {
        return res.status(404).json({
          err: 'O mapa a ser removido não existe',
        });
      }
      foundPlan.project = null;
      await foundPlan.save();

      const projectToUpdate = await Project.findById(id);
      const index = projectToUpdate.plans.findIndex(
        planInside => planInside == plan
      );
      projectToUpdate.plans.splice(index, 1);
      await Project.findOneAndUpdate({
        _id: id,
      }, {
        $set: {
          plans: projectToUpdate.plans,
        },
      });
    }
    if (project) {
      const foundProject = await Project.findById(project);
      if (!foundProject) {
        return res.status(404).json({
          err: 'O projeto a ser removido não existe',
        });
      }
      foundProject.parent = null;
      await foundProject.save();

      const projectToUpdate = await Project.findById(id);
      const index = projectToUpdate.projects.findIndex(
        projectInside => projectInside == project
      );
      projectToUpdate.projects.splice(index, 1);
      await Project.findOneAndUpdate({
        _id: id,
      }, {
        $set: {
          projects: projectToUpdate.projects,
        },
      });
    }

    await Project.findById(id)
      .populate('projects')
      .populate('owner')
      .populate('plans')
      .populate('company')
      .then(project => {
        res.status(200).json(project);
      })
      .catch(err => res.status(400).json(err));

    // await Project.findOneAndUpdate({ _id: id }, {$pull);
  },
};
