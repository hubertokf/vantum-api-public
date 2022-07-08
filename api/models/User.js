/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
// const bcrypt = require('bcryptjs')
const bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = {
  //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
  //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
  //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
  schema: {
    email: {
      type: 'string',
      unique: true,
      required: true,
    },
    fullName: {
      type: 'string',
    },
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
    subscriptionPlan: {
      type: 'string',
    },
    isSuperAdmin: {
      type: 'boolean',
    },
    passwordResetToken: {
      type: 'string',
    },
    passwordResetTokenExpiresAt: {
      type: 'number',
    },
    emailProofToken: {
      type: 'string',
    },
    emailProofTokenExpiresAt: {
      type: 'number',
    },
    emailStatus: {
      type: 'string',
      default: 'confirmed',
    },
    emailChangeCandidate: {
      type: 'string',
    },
    tosAcceptedByIp: {
      type: 'string',
    },
    lastSeenAt: {
      type: 'number',
    },
    stripeCustomerId: {
      type: 'string',
    },

    hasBillingCard: {
      type: 'boolean',
    },

    billingCardBrand: {
      type: 'string',
    },

    billingCardLast4: {
      type: 'string',
    },

    billingCardExpMonth: {
      type: 'string',
    },

    billingCardExpYear: {
      type: 'string',
    },

    phone: {
      phoneType: String,
      countryCode: String,
      number: String,
    },

    address: {
      address1: String,
      address2: String,
      houseNumber: String,
      zipCode: String,
      city: String,
      state: String,
      country: String,
    },

    referers: [String],

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'company',
    },

    professional: {
      type: Schema.Types.ObjectId,
      ref: 'professional'
    }
  },

  constructSchema: function(schemaDefinedAbove, sails) {
    var newSchema = new sails.mongoose.Schema(schemaDefinedAbove, {
      collection: 'user',
      timestamps: true,
      autoIndex: false,
    });

    newSchema.virtual('id').get(function() {
      return this._id.toHexString();
    });

    newSchema.set('toJSON', {
      virtuals: true,
      transform: (doc, ret, opt) => {
        delete ret.password;
        return ret;
      },
    });

    // newSchema.method('toJSON', function() {
    //   var obj = this.toObject();
    //   delete obj.password;
    //   return obj;
    // })

    newSchema.method('comparePassword', function(candidatePassword, cb) {
      bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
      });
    });

    // newSchema.static('comparePassword', (candidatePassword, cb) => {
    //   console.log(this)
    //   bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    //     if (err) return cb(err);
    //     cb(null, isMatch);
    //   });
    // })

    // comparePassword: function(candidatePassword, cb) {
    //   bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    //       if (err) return cb(err);
    //       cb(null, isMatch);
    //   });
    // };

    const autoPopulateProject = function (next) {
      this.populate('company');
      this.populate('professional');
      next();
    };

    newSchema.pre('find', autoPopulateProject);
    newSchema.pre('findOne', autoPopulateProject);

    newSchema.pre('save', next => {
      var user = this;
      if (user.password !== '') {
        bcrypt.genSalt(10, (_err, salt) => {
          bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) {
              return cb(err);
            }
            user.password = hash;
            return next();
          });
        });
      } else {
        return next();
      }
      next();
    });

    return newSchema;
  },

  //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
  //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
  //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

  // beforeCreate: function (user, cb) {
  //   if (user.password != '') {
  //     bcrypt.genSalt(10, function (err, salt) {
  //       bcrypt.hash(user.password, salt, null, function (err, hash) {
  //         if (err) return cb(err);
  //         user.password = hash;
  //         return cb();
  //       });
  //     });
  //   }else{
  //     return cb();
  //   }
  // },

  // beforeUpdate: function (user, cb) {
  //   if (user.newPassword != '') {
  //     bcrypt.genSalt(10, function (err, salt) {
  //       bcrypt.hash(user.password, salt, null, function (err, hash) {
  //         if (err) return cb(err);
  //         user.password = hash;
  //         return cb();
  //       });
  //     });
  //   }else{
  //     return cb();
  //   }
  // },
  // Antes de criar o usuário, faz a hash da senha
  // beforeCreate: (user, next) => {
  //   if (user.password != '') {
  //     bcrypt.genSalt(10, (error, salt) => {

  //       if (error) return next(error)

  //       bcrypt.hash(user.password, salt, (error, hash) => {

  //         if (error) return next(error)

  //         user.password = hash
  //         next()
  //       })
  //     })
  //   }
  //   next()
  // },

  // Verifica se a senha bate com a hash
  // isValidPassword: (password, user, callback) => {
  //   bcrypt.compare(password, user.password, (error, isMatch) => {
  //     if (error) return callback(error)

  //     if (isMatch) {
  //       callback(null, true)
  //     } else callback(new Error('Passwords doesn\'t match'), false)
  //   })
  // },

  //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
  //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
};
