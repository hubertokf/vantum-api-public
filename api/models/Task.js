/**
 * Task.js
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

    status: {
      type: 'string'
    },
    job: {},
    start_time: {
      type: 'string'
    },
    end_time: {
      type: 'string'
    },
    disks: {},
    times: {},
    error: {},
    mems: {},
    parameters: {
      type: 'string'
    },
    instance: {
      cores: {
        type: 'number'
      },
      memory: {
        type: 'number'
      },
      disk: {
        type: 'number'
      },
      project: {
        type: 'string'
      },
      image: {
        type: 'string'
      },
      zone_name: {
        type: 'string'
      },
      zone_mirror: {
        type: 'string'
      },
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    album: {
      type: Schema.Types.ObjectId,
      ref: 'album'
    },
    // Utilizado somente para criação de tiles
    orthomosaic: {
      type: Schema.Types.ObjectId,
      ref: 'orthomosaic'
    },
    plan: {
      type: Schema.Types.ObjectId,
      ref: 'plan'
    },
    // orthomosaics: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'orthomosaic'
    //   }
    // ]
  },

  constructSchema: function (schemaDefinedAbove, sails) {
    var newSchema = new sails.mongoose.Schema(schemaDefinedAbove,
      {
        collection: 'task',
        timestamps: true,
        autoIndex: false
      }
    );

    newSchema.virtual('orthomosaics', {
      ref: 'orthomosaic',
      localField: '_id',
      foreignField: 'task'
    });

    newSchema.virtual('invoices', {
      ref: 'invoice',
      localField: '_id',
      foreignField: 'tasks'
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
