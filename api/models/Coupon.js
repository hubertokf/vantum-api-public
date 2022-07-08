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
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    code: {
      type: 'string'
    },

    factor: {
      type: 'number'
    },

    limit: {
      type: 'number'
    },

    expireAt: {
      type: 'date'
    },

    description: {
      type: 'string'
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

  constructSchema: function (schemaDefinedAbove, sails) {
    var newSchema = new sails.mongoose.Schema(schemaDefinedAbove,
      {
        collection: 'coupon',
        timestamps: true,
        autoIndex: false
      }
    );

    newSchema.virtual('invoices', {
      ref: 'invoice',
      localField: '_id',
      foreignField: 'coupons'
    });

    newSchema.virtual('id').get(function(){
      return this._id.toHexString();
    });

    newSchema.set('toJSON', {
      virtuals: true
    });

    return newSchema;
  }
}
