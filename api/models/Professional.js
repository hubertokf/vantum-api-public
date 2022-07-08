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
    actuation: {
      type: 'string'
    },

    pilot: {
      type: 'boolean'
    },

    hasVant: {
      type: 'boolean'
    },

    experience: {
      type: 'number'
    },

    experienceVants: [String],
    ownVants: [String],

    actuationRadius: {
      type: 'number'
    }

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
        collection: 'professional',
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
