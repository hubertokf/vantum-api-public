/**
 * Billing.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = {
  schema: {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
    },
    discount: {
      type: Number,
    },
    //To be implemented: feature model
    features: [],
  },

  //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
  //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
  //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

  //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
  //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  constructSchema: function(schemaDefinedAbove, sails) {
    var newSchema = new sails.mongoose.Schema(schemaDefinedAbove, {
      collection: 'billing',
      timestamps: true,
      autoIndex: false,
    });

    newSchema.virtual('id').get(function() {
      return this._id.toHexString();
    });

    newSchema.set('toJSON', {
      virtuals: true,
    });

    return newSchema;
  },
};
