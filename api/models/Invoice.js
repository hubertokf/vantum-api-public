/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = {

  schema: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═
    total: {
      type: 'number'
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },

    coupons: [
      {
        type: Schema.Types.ObjectId,
        ref: 'coupon'
      }
    ],

    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'task'
      }
    ],

    plan: {
      type: Schema.Types.ObjectId,
      ref: 'plan'
    },

    payments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'payment'
      }
    ],
  },

  constructSchema: function (schemaDefinedAbove, sails) {
    var newSchema = new sails.mongoose.Schema(schemaDefinedAbove,
      {
        collection: 'invoice',
        timestamps: true,
        autoIndex: false
      }
    );

    newSchema.virtual('id').get(function(){
      return this._id.toHexString();
    });

    const autoPopulateProject = function (next) {
      this.populate('payments');
      next();
    };

    newSchema.pre('find', autoPopulateProject);
    newSchema.pre('findOne', autoPopulateProject);

    newSchema.set('toJSON', {
      virtuals: true
    });

    return newSchema;
  }
};
