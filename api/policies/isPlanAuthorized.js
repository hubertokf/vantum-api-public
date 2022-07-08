module.exports = async function isAuthorized(req, res, next) {
  if (process.env.NODE_ENV === 'test') return next();

  const token = req.headers.authorization;

  if (!token) {
    const {
      id
    } = req.params;
    const sharing = await Sharing.findOne({
      $and: [{ plan: id }, { linkSharing: true }],
    });

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
        if (user) {
          return next();
        }
        return res.forbidden();
      }

      if (req.method == 'GET') {
        // 5c5347560d90150017d4c882   -> _id dos exemplos
        const planId = req.param('id');

        if (req.query && req.query.owner) {
          if (
            req.query.owner == user._id.toString() ||
            req.query.owner == '5c5347560d90150017d4c882'
          ) {
            return next();
          }
          return res.forbidden();
        }

        const plan = await Plan.findById(planId);
        if (plan) {
          if (plan.owner == '5c5347560d90150017d4c882') {
            return next();
          }
          if (plan.owner == user._id.toString()) {
            return next();
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

          const projectsWithPlanLenght = await Project.find({
            plans: {
              $in: [planId],
            },
          }).count();
          if (projectsWithPlanLenght > 0) {
            const projectsWithPlan = await Project.find({
              plans: {
                $in: [planId],
              },
            });
            for (let i = 0; i < projectsWithPlanLenght; i++) {
              let sharing = await Sharing.findOne({
                project: projectsWithPlan[i]._id,
              });
              if (sharing) {
                if (
                  sharing.owner == user._id.toString() ||
                  sharing.user == user._id.toString()
                ) {
                  return next();
                }
              }
              if (projectsWithPlan[i].parent) {
                sharing = await Sharing.findOne({
                  project: projectsWithPlan[i].parent,
                });
                if (sharing) {
                  if (
                    sharing.owner == user._id.toString() ||
                    sharing.user == user._id.toString()
                  ) {
                    return next();
                  }
                }
              }
            }
          }
        }

        return res.forbidden();
      }

      if (req.method == 'PUT') {
        const planId = req.param('id');

        if (req.query && req.query.owner) {
          if (
            req.query.owner == user._id.toString() ||
            req.query.owner == '5c5347560d90150017d4c882'
          ) {
            return next();
          }
          return res.forbidden();
        }

        const plan = await Plan.findById(planId);
        if (plan) {
          if (plan.owner == user._id.toString()) {
            return next();
          }

          const sharingsLenght = await Sharing.find({
            plan: planId,
          }).count();
          if (sharingsLenght > 0) {
            const sharings = await Sharing.find({
              plan: planId,
            });
            for (let i = 0; i < sharingsLenght; i++) {
              if (sharings[i].owner == user._id.toString()) {
                return next();
              }
              if (sharings[i].user == user._id.toString()) {
                if (sharings[i].level >= 2) {
                  return next();
                }
                return res.forbidden();
              }
            }
          }

          const projectsWithPlanLenght = await Project.find({
            plans: {
              $in: [planId],
            },
          }).count();
          if (projectsWithPlanLenght > 0) {
            const projectsWithPlan = await Project.find({
              plans: {
                $in: [planId],
              },
            });
            for (let i = 0; i < projectsWithPlanLenght; i++) {
              let sharing = await Sharing.findOne({
                project: projectsWithPlan[i]._id.toString(),
              });
              if (sharing) {
                if (
                  (sharing.level >= 2 && sharing.user == user._id.toString()) ||
                  sharing.owner == user._id.toString()
                ) {
                  return next();
                }
              }
              if (projectsWithPlan[i].parent) {
                sharing = await Sharing.findOne({
                  project: projectsWithPlan[i].parent,
                });
                if (sharing) {
                  if (
                    (sharing.level >= 2 &&
                      sharing.user == user._id.toString()) ||
                    sharing.owner == user._id.toString()
                  ) {
                    return next();
                  }
                }
              }
            }
          }

          return res.forbidden();
        }
      }

      if (req.method == 'DELETE') {
        const planId = req.param('id');

        if (req.query && req.query.owner) {
          if (
            req.query.owner == user._id.toString() ||
            req.query.owner == '5c5347560d90150017d4c882'
          ) {
            return next();
          }
          return res.forbidden();
        }

        const plan = await Plan.findById(planId);
        if (plan) {
          if (plan.owner == user._id.toString()) {
            return next();
          }

          const sharingsLenght = await Sharing.find({
            plan: planId,
          }).count();
          if (sharingsLenght > 0) {
            const sharings = await Sharing.find({
              plan: planId,
            });
            for (let i = 0; i < sharingsLenght; i++) {
              if (sharings[i].owner == user._id.toString()) {
                return next();
              }
              if (sharings[i].user == user._id.toString()) {
                if (sharings[i].level >= 2) {
                  return next();
                }
                return res.forbidden();
              }
            }
          }

          const projectsWithPlanLenght = await Project.find({
            plans: {
              $in: [planId],
            },
          }).count();
          if (projectsWithPlanLenght > 0) {
            const projectsWithPlan = await Project.find({
              plans: {
                $in: [planId],
              },
            });
            for (let i = 0; i < projectsWithPlanLenght; i++) {
              let sharing = await Sharing.findOne({
                project: projectsWithPlan[i]._id.toString(),
              });
              if (sharing) {
                if (
                  (sharing.level >= 2 && sharing.user == user._id.toString()) ||
                  sharing.owner == user._id.toString()
                ) {
                  return next();
                }
                return res.forbidden();
              }

              if (projectsWithPlan[i].parent) {
                sharing = await Sharing.findOne({
                  project: projectsWithPlan[i].parent,
                });
                if (sharing) {
                  if (
                    (sharing.level >= 2 &&
                      sharing.user == user._id.toString()) ||
                    sharing.owner == user._id.toString()
                  ) {
                    return next();
                  }
                }
              }
            }
          }

          return res.forbidden();
        }
      }
    });
  } catch (error) {
    return res.forbidden(error);
  }
};
