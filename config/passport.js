const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('bcrypt-nodejs');

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findOne({
    _id: id,
  }).exec((err, user) => {
    cb(err, user);
  });
});

passport.use(
  new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      // eslint-disable-next-line prefer-arrow-callback
    },
    async (email, password, cb) => {
      const user = await User.findOne({
          email,
        })
        .exec()
        .then(user => {
          if (!user) {
            return cb(null, false, {
              message: 'User not found',
            });
          }

          // if (user.emailStatus == "unconfirmed") return cb(null, false, {
          //   message: 'Email not confirmed'
          // });

          user.comparePassword(password, (_err, isMatch) => {
            if (!isMatch) {
              return cb(null, false, {
                message: 'Invalid Password',
              });
            }

            const userDetails = user;

            return cb(null, userDetails, {
              message: 'Login Succesful',
            });
          });
        })
        .catch(err => cb(err));
      // await User.findOne({
      //   email: email
      // }, function (err, user) {

      //   if (err) return cb(err);

      //   if (!user) return cb(null, false, {
      //     message: 'User not found'
      //   });

      //   if (user.emailStatus == "unconfirmed") return cb(null, false, {
      //     message: 'Email not confirmed'
      //   });

      //   bcrypt.compare(password, user.password, function (err, res) {
      //     if (!res) return cb(null, false, {
      //       message: 'Invalid Password'
      //     });

      //     let userDetails = user;

      //     return cb(null, userDetails, {
      //       message: 'Login Succesful'
      //     });
      //   });
    }
  )
);

passport.use(
  new FacebookStrategy({
      clientID: 374440683335045,
      clientSecret: '',
      callbackURL: 'http://localhost:8080/facebooklogin',
      profileFields: ['id', 'displayName', 'emails'],
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({
          email,
        })
        .exec()
        .then(user => {
          if (!user) {
            return cb(null, false, {
              message: 'User not found',
            });
          }

          // if (user.emailStatus == "unconfirmed") return cb(null, false, {
          //   message: 'Email not confirmed'
          // });

          bcrypt.compare(password, user.password, (_err, res) => {
            if (!res) {
              return cb(null, false, {
                message: 'Invalid Password',
              });
            }

            const userDetails = user;

            return cb(null, userDetails, {
              message: 'Login Succesful',
            });
          });
        })
        .catch(err => cb(err));
      // await User.findOne({
      //   email: profile.emails[0].value
      // }, function (err, user) {

      //   if (err) return cb(err);

      //   if (!user) return cb(null, false, {
      //     message: 'User not found'
      //   });

      //   if (user.emailStatus == "unconfirmed") return cb(null, false, {
      //     message: 'Email not confirmed'
      //   });
      //   return cb(null, userDetails, {
      //     message: 'Login Succesful'
      //   });
      // });
      // var me = new user({
      //   email: profile.emails[0].value,
      //   name: profile.displayName
      // });

      // /* save if new */
      // user.findOne({
      //   email: me.email
      // }, function (err, u) {
      //   if (!u) {
      //     me.save(function (err, me) {
      //       if (err) return done(err);
      //       done(null, me);
      //     });
      //   } else {
      //     console.log(u);
      //     done(null, u);
      //   }
      // });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  user.findById(id, (err, user) => {
    done(err, user);
  });
});
