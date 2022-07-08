/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
// const bcrypt = require('bcryptjs')
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = {
  //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
  //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
  //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
  schema: {
    status: {
      type: 'string'
    },
    subject: {
      type: 'string'
    },
    message: {
      type: 'string'
    },
    from: {
      type: 'string'
    },
    to: {
      type: 'string'
    }
  },

  constructSchema: function (schemaDefinedAbove, sails) {
    var newSchema = new sails.mongoose.Schema(schemaDefinedAbove,
      {
        collection: 'email',
        timestamps: true,
        autoIndex: false
      }
    );

    return newSchema;
  }
}
