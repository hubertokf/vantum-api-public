/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const jwt = require('jsonwebtoken');

module.exports = {
  subscribePlan: async (req, res) => {
    const id = req.param('id');
    const subscriptionPlan = req.param('subscriptionPlan');

    const user = await User.findOne({
      _id: id,
    })
      .exec()
      .then(async user => {
        await sails.helpers.sendTemplateEmail.with({
          to: 'financeiro@vantum.com.br',
          subject: '[ASSINATURA] Nova assinatura solicitada',
          template: 'internal/email-billing-plan',
          layout: false,
          templateData: {
            id: user._id,
            name: user.fullName,
            email: user.email,
            subscriptionPlan,
          },
        });

        return res.json(user);
      });
  },

  changePassword: async (req, res) => {
    const id = req.param('id');
    const password = req.param('password');
    // const oldPassword = req.param('oldPassword')

    const userRecord = await User.findOne({
      _id: id,
    }).exec();

    // Hash the new password.
    const hashed = await sails.helpers.passwords.hashPassword(password);
    // Store the user's new password and clear their reset token so it can't be used again.
    const promise = User.findOneAndUpdate(
      {
        _id: userRecord.id,
      },
      {
        $set: {
          password: hashed,
        },
      },
      {
        new: true,
      }
    );

    promise.then(doc => res.json(doc)).catch(res.serverError);
  },

  changeEmail: async (req, res) => {
    const id = req.param('id');
    const email = req.param('email');

    const userRecord = await User.findOne({
      _id: id,
    }).exec();

    const promise = await User.findOneAndUpdate(
      {
        _id: userRecord.id,
      },
      {
        $set: {
          email,
        },
      },
      {
        new: true,
      }
    );

    promise.then(doc => res.json(doc)).catch(res.serverError);
  },

  getUsers: async (req, res) => {
    const params = req.allParams();

    const user = await User.find(params)
      .exec()
      .then(async user => res.json(user))
      .catch(res.serverError);
  },

  countUsers: async (req, res) => {
    const users = await User.aggregate([
      {
      $match: {},
    },
    {
      $group: {
        _id: {
          month: {
            $month: {
              $toDate: '$createdAt',
            },
          },
          year: {
            $year: {
              $toDate: '$createdAt',
            },
          },
        },
        count: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        '_id.year': 1,
        '_id.month': 1,
      },
    },
    ]);

    let totalCount = 0;
    const totalUsers = users.forEach(user => {
      totalCount += user.count;
    });

    return res.send({
      users,
      totalUsers: totalCount,
    });
  },

  userSubscribe: async (req, res) => {
    const inputUser = {
      email: req.param('email'),
      fullName: req.param('name'),
      firstName: req
        .param('name')
        .split(' ')
        .slice(0, 1)
        .join(' '),
      lastName: req.param('name').substr(req.param('name').indexOf(' ') + 1),
      emailStatus: 'unconfirmed',
    };

    const user = await User.findOne({
      email: inputUser.email,
    })
      .then(async user => {
        if (!user) {
          const newUser = await User.create(inputUser)
            .fetch()
            .then(async newUser => {
              sails.log.info(`New subscription: ${inputUser.fullName}`);

              res.status(201).json({
                message: 'User registered',
                user,
              });
            });
        } else {
          sails.log.info(`Found existing user: ${user.fullName}`);
          return res.json({
            message: 'User already registered',
          });
        }
      })
      .catch(res.serverError);

    // var newUserRecord = await User.findOrCreate({
    //   email: user.email
    // }, user).exec((err, user, wasCreated) => {
    //   if (err) {
    //     console.log("err")
    //     return res.serverError(err);
    //   }

    //   if (wasCreated) {
    //     sails.log.info('New subscription: ' + user.fullName);

    //     res.status(201).json({
    //       message: 'User registered',
    //       user
    //     })

    //   } else {
    //     sails.log.info('Found existing user: ' + user.fullName)
    //     res.json({
    //       message: 'User already registered',
    //     });
    //   }
    // });
  },

  postUser: async (req, res) => {
    const inputUser = {
      email: req.param('email').toLowerCase(),
      fullName: req.param('name'),
      firstName: req
        .param('name')
        .split(' ')
        .slice(0, 1)
        .join(' '),
      lastName: req.param('name').substr(req.param('name').indexOf(' ') + 1),
      password: req.param('password'),
      subscriptionPlan: req.param('subscriptionPlan'),
      tosAcceptedByIp: req.ip,
      emailProofToken: await sails.helpers.strings.random('url-friendly'),
      emailProofTokenExpiresAt:
        Date.now() + sails.config.custom.emailProofTokenTTL,
      emailStatus: 'unconfirmed',
      phone: req.param('phone'),
      address: req.param('address'),
      referers: req.param('referers'),
    };

    const user = await User.findOne({
      email: inputUser.email,
    })
      .exec()
      .then(async user => {
        req.options.user = user;
        if (!user) {
          // USUÁRIO NÃO ENCONTRADO

          const hashed = await sails.helpers.passwords.hashPassword(
            inputUser.password
          );
          inputUser.password = hashed;

          const newUser = await User.create(inputUser).then(async newUser => {
            // phones.forEach(async phone => {
            //   phone.owner = newUser.id
            //   const newPhone = await Phone.create(phone).exec()
            // });

            // addresses.forEach(async address => {
            //   address.owner = newUser.id
            //   const newPhone = await Address.create(address).exec()
            // });

            // If billing feaures are enabled, save a new customer entry in the Stripe API.
            // Then persist the Stripe customer id in the database.
            if (sails.config.custom.enableBillingFeatures) {
              const stripeCustomerId = await sails.helpers.stripe.saveBillingInfo.with(
                {
                  emailAddress: user.email,
                }
              );

              await User.findOneAndUpdate(
                {
                  _id: user.id,
                },
                {
                  $set: {
                    stripeCustomerId,
                  },
                }
              ).exec();
            }

            // Store the user's new id in their session.
            req.session.userId = newUser.id;

            if (sails.config.custom.verifyEmailAddresses) {
              // Send "confirm account" email
              // await sails.helpers.mailgun.sendHtmlEmail.with({
              //   htmlMessage: "asdf",
              //   to: user.email,
              //   subject: "asdf",
              //   testMode: false
              // });
              await sails.helpers.sendTemplateEmail.with({
                to: newUser.email,
                subject: 'Confirme a sua conta',
                template: 'email-verify-account',
                templateData: {
                  fullName: newUser.fullName,
                  token: newUser.emailProofToken,
                },
              });
            } else {
              sails.log.info(
                'Skipping new account email verification... (since `verifyEmailAddresses` is disabled)'
              );
            }

            sails.log.info(`Created a new user: ${newUser.fullName}`);

            if (
              newUser.subscriptionPlan != '' &&
              newUser.subscriptionPlan != 'free'
            ) {
              await sails.helpers.sendTemplateEmail.with({
                to: 'financeiro@vantum.com.br',
                subject: '[ASSINATURA] Nova assinatura solicitada',
                template: 'internal/email-billing-plan',
                layout: false,
                templateData: {
                  id: newUser.id,
                  name: newUser.fullName,
                  email: newUser.email,
                  subscriptionPlan: newUser.subscriptionPlan,
                },
              });
            }

            const token = jwt.sign(newUser.toJSON(), 'secretissecret');

            return res.status(201).userCreated({
              message: 'User registered',
              user: newUser,
              token,
            });
          });
        } else {
          sails.log.info(`Found existing user: ${user.fullName}`);
          if (user.password == '') {
            const hashed = await sails.helpers.passwords.hashPassword(
              inputUser.password
            );

            inputUser.password = hashed;

            await User.findOneAndUpdate(
              {
              email: user.email,
            },
              {
              $set: inputUser,
            }
            )
              .exec()
              .then(async user => {
                // If billing feaures are enabled, save a new customer entry in the Stripe API.
                // Then persist the Stripe customer id in the database.
                if (sails.config.custom.enableBillingFeatures) {
                  const stripeCustomerId = await sails.helpers.stripe.saveBillingInfo.with(
                    {
                      emailAddress: user.email,
                    }
                  );

                  await User.findOneAndUpdate(
                    {
                      _id: user.id,
                    },
                    {
                      $set: {
                        stripeCustomerId,
                      },
                    }
                  ).exec();
                }

                // Store the user's new id in their session.
                req.session.userId = user.id;

                if (sails.config.custom.verifyEmailAddresses) {
                  // Send "confirm account" email
                  // await sails.helpers.mailgun.sendHtmlEmail.with({
                  //   htmlMessage: "asdf",
                  //   to: user.email,
                  //   subject: "asdf",
                  //   testMode: false
                  // });
                  await sails.helpers.sendTemplateEmail.with({
                    to: user.email,
                    subject: 'Confirme a sua conta',
                    template: 'email-verify-account',
                    templateData: {
                      fullName: user.fullName,
                      token: user.emailProofToken,
                    },
                  });
                } else {
                  sails.log.info(
                    'Skipping new account email verification... (since `verifyEmailAddresses` is disabled)'
                  );
                }

                sails.log.info(`Updated user: ${user.fullName}`);

                const token = jwt.sign(user.toJSON(), 'secretissecret');

                return res.status(201).userCreated({
                  message: 'User registered',
                  user,
                  token,
                });
              });
          } else {
            return res.json({
              message: 'User already registered',
            });
          }
        }
      })
      .catch(res.serverError);
  },

  getUser: async (req, res) => {
    // const userIdentifier = CryptographyService.decrypt(req.cookies.user)
    const id = req.param('id');

    const user = await User.findOne({
      _id: id,
    })
      .populate('professional')
      .exec()
      .then(doc => res.json(doc))
      .catch(res.serverError);
  },

  getEmails: async (req, res) => {
    const params = req.allParams();

    // expressão regular para pegar os emails que iniciam com os caracters recebido por params.email
    const regexp = new RegExp(`^${params.email}`);
    const emails = await User.find({
      email: regexp,
    })
      .then(emails => res.json(emails))
      .catch(res.serverError);
  },

  putUser: async (req, res) => {
    // const userIdentifier = CryptographyService.decrypt(req.cookies.user)
    const inputUser = req.allParams();

    if (inputUser.password) {
      const hashed = await sails.helpers.passwords.hashPassword(
        inputUser.password
      );

      inputUser.password = hashed;
    }
    // if (password == "" || password == null || password == undefined){
    //   delete inputUser.password
    // }

    const user = await User.findOneAndUpdate(
      {
      _id: inputUser.id,
    },
      {
      $set: inputUser,
    },
      {
      new: true,
    }
    )
      .exec()
      .then(user => {
        sails.log.info('User patched', inputUser.id);
        return res.json(user);
      })
      .catch(res.serverError);
  },

  deleteUser: async (req, res) => {
    // const userIdentifier = CryptographyService.decrypt(req.cookies.user)
    const id = req.param('id');

    await User.deleteOne({
      _id: id,
    })
      .exec()
      .then(doc => {
        sails.log.info('User removed');
        return res.ok();
      })
      .catch(res.serverError);
  },

  requestConfirmation: async (req, res) => {
    const email = req.param('email');

    const user = await User.findOne({
      email
    })
      .exec()
      .catch(res.serverError);

    if (!user) {
      return res.serverError({
        message: 'userNotFound',
      });
    }

    const updatedUser = await User.findOneAndUpdate(
      {
      _id: user._id,
    },
      {
      $set: {
        emailStatus: 'unconfirmed',
        emailProofToken: await sails.helpers.strings.random('url-friendly'),
        emailProofTokenExpiresAt:
            Date.now() + sails.config.custom.emailProofTokenTTL,
        emailChangeCandidate: '',
      },
    }
    )
      .exec()
      .catch(res.serverError);

    if (sails.config.custom.verifyEmailAddresses) {
      // Send "confirm account" email
      // await sails.helpers.mailgun.sendHtmlEmail.with({
      //   htmlMessage: "asdf",
      //   to: updatedUser[0].email,
      //   subject: "asdf",
      //   testMode: false
      // });
      await sails.helpers.sendTemplateEmail.with({
        to: updatedUser.email,
        subject: 'Confirme a sua conta',
        template: 'email-verify-account',
        templateData: {
          fullName: updatedUser.fullName,
          token: updatedUser.emailProofToken,
        },
      });
    } else {
      sails.log.info(
        'Skipping new account email verification... (since `verifyEmailAddresses` is disabled)'
      );
    }

    return res.json({
      message: 'emailsent',
    });
  },

  // leadslist: async (req, res) => {
  //   const users = await User.find()

  //   await Promise.all(users.map(async (user) => {
  //     const projects = await Project.find({owner: user.id})
  //     const albums = await Album.find({owner: user.id})
  //     const maps = await Plan.find({owner: user.id})

  //     await Promise.all(maps.map(async (map) => {
  //       const tasks = await Task.find({id: map.id})

  //       map.tasks = tasks
  //       map.tasks_count = tasks.length
  //     }))

  //     // user.projects = projects
  //     user.projects_count = projects.length
  //     // user.albums = albums
  //     user.albums_count = albums.length
  //     // user.maps = maps
  //     user.maps_count = maps.length

  //   }))

  //   return res.json(users)
  // }
};
