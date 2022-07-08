/**
 * Company.js
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
    slug: {
      type: String,
    },
    logo: {
      type: String,
    },
    colors: {},
    customers: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: 'project',
      },
    ],
    storageLimit: {
      type: Number,
    },
    cnpj: {
      type: String,
    },
    storageUsage: {
      type: Number,
      required: true,
      default: 0,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    billing: {
      type: Schema.Types.ObjectId,
      ref: 'billing',
    },
  },

  //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
  //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
  //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

  //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
  //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  constructSchema: function(schemaDefinedAbove, sails) {
    var newSchema = new sails.mongoose.Schema(schemaDefinedAbove, {
      collection: 'company',
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
