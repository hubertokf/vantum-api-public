/**
 * Sharing.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
// const bcrypt = require('bcryptjs')
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = {
  schema: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    level: {
      type: 'number'
    },
    linkSharing: {
      type: 'boolean'
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
    project: {
      type: Schema.Types.ObjectId,
      ref: 'project'
    },
    plan: {
      type: Schema.Types.ObjectId,
      ref: 'plan'
    },
    album: {
      type: Schema.Types.ObjectId,
      ref: 'album'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  },

  constructSchema: function (schemaDefinedAbove, sails) {
    var newSchema = new sails.mongoose.Schema(schemaDefinedAbove,
      {
        collection: 'sharing',
        timestamps: true,
        autoIndex: false
      }
    );

    newSchema.virtual('id').get(function(){
      return this._id.toHexString();
    });

    const autoPopulateProject = function (next) {
      this.populate('album');
      this.populate('plan');
      this.populate('project');
      next();
    };

    newSchema.pre('find', autoPopulateProject);
    newSchema.pre('findOne', autoPopulateProject);

    newSchema.set('toJSON', {
      virtuals: true
    });

    return newSchema;
  }
}
