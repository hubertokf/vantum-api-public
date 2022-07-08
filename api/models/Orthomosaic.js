/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
let mongoose = require('mongoose');

let {Schema} = mongoose;
module.exports = {
  schema: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    tilesUrl: {
      type: 'string',
    },
    mbTileUrl: {
      type: 'string',
    },
    tilesCount: Number,
    type: {
      type: 'string',
    },
    bounds: [[Number]],

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    image: {
      type: Schema.Types.ObjectId,
      ref: 'image',
    },
    plan: {
      type: Schema.Types.ObjectId,
      ref: 'plan',
    },
    task: {
      type: Schema.Types.ObjectId,
      ref: 'task',
    },
  },

  constructSchema (schemaDefinedAbove, sails) {
    var newSchema = new sails.mongoose.Schema(schemaDefinedAbove, {
      collection: 'orthomosaic',
      timestamps: true,
      autoIndex: false
    });

    newSchema.virtual('id').get(function () {
      return this._id.toHexString();
    });

    const autoPopulateProject = function (next) {
      this.populate('image');
      next();
    };

    newSchema.pre('find', autoPopulateProject);
    newSchema.pre('findOne', autoPopulateProject);

    newSchema.set('toJSON', {
      virtuals: true
    });

    return newSchema;
  },
};
