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
    amount: {
      type: 'number'
    },

    attempt: {
      type: 'number'
    },

    method: {
      type: 'string'
    },

    ref: {
      type: 'string'
    },

    date: {
      type: 'date'
    },

    refund: {
      type: 'boolean'
    },


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    invoice: {
      type: Schema.Types.ObjectId,
      ref: 'invoice'
    },
  },

  constructSchema: function (schemaDefinedAbove, sails) {
    var newSchema = new sails.mongoose.Schema(schemaDefinedAbove,
      {
        collection: 'payment',
        timestamps: true,
        autoIndex: false
      }
    );

    newSchema.virtual('id').get(function(){
      return this._id.toHexString();
    });

    newSchema.set('toJSON', {
      virtuals: true
    });

    return newSchema;
  }
}
