/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports = {
  login (req, res) {
    passport.authenticate('local', (err, user, info) => {
      if ((err) || (!user)) {
        return res.serverError({
          err: err,
          message: info.message
        });
      }

      if (err) res.send(err);

      // generate a signed son web token with the contents of user object and return it in the response
      // sails.config.session.secret
      const token = jwt.sign(user.toJSON(), 'secretissecret');

      res.json({
        message: info.message,
        user,
        token
      });

      // return res.send({
      //   message: info.message,
      //   user
      // });

      // });
    })(req, res);

  },
  async checkAdminToken (req, res) {
    var params = req.allParams()

    const decryptSession = TokenService.verify(params.token)

    var user = await User.findOne({
      _id: decryptSession.user
    }).populate('professional').exec()
    var adminUser = await User.findOne({
      _id: decryptSession.adminUser._id
    }).populate('professional').exec()

    if (!adminUser || !user) return res.serverError(error)

    if (adminUser.isSuperAdmin) {
      sails.log.info('user ' + adminUser + ' logged as ' + user);

      res.json({
        message: "granted",
        user: user,
        adminUser: adminUser,
        token: params.token
      })
    }
  },
  async loginAsUser (req, res) {
    var params = req.allParams()

    const user = await User
      .findOne({
        _id: params.user._id
      }).populate('professional').exec()
      .then((user) => {

        if (!user) {
          return res.serverError({
            message: "User Not Found"
          });
        }

        // if (err) {res.send(err)};

        if (!user.isSuperAdmin) {
          return res.serverError({
            message: "Only administrator can submit this request. Keep out."
          });
        }

        // generate a signed son web token with the contents of user object and return it in the response
        // sails.config.session.secret

        if (user.isSuperAdmin) {

          let session = {
            user: params.userToLogin,
            adminUser: user
          }

          const token = jwt.sign(session, 'secretissecret');

          sails.log.info('user ' + user + ' asked to login as ' + params.userToLogin);

          res.json({
            message: "granted",
            user: params.userToLogin,
            token
          });

        }
      })

  },
  facebookLogin: async (req, res) => {
    let params = req.allParams();;

    // const token = jwt.sign(user, 'your_jwt_secret');

    // res.json({
    //   message: info.message,
    //   user,
    //   token
    // });

    const user = {
      email: req.param('email'),
      fullName: req.param('name'),
      firstName: req
        .param('name')
        .split(' ')
        .slice(0, 1)
        .join(' '),
      lastName: req.param('name').substr(req.param('name').indexOf(' ') + 1),
      emailStatus: 'confirmed',
    };;

    let newUserRecord = await User.findOrCreate(
      {
        email: user.email,
      },
      user
    ).exec((err, user, wasCreated) => {
      if (err) {
        console.log('err');
        return res.serverError(err);
      }

      if (wasCreated) {
        const token = jwt.sign(user, 'your_jwt_secret');

        res.json({
          message: 'User created',
          user,
          token,
        });
      } else {
        const token = jwt.sign(user, 'your_jwt_secret');

        res.json({
          message: 'User Login',
          user,
          token,
        });
      }
    });
  },

  logout (req, res) {
    req.logout();
    res.json({
      message: "logout ok",
    });
  },
};
