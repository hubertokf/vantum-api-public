const mongoose = require('mongoose');

const {
  Schema
} = mongoose;
module.exports = {
  schema: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    name: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    location: {},
    latlng: [Number],
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: 'company',
    },
    plans: [{
      type: Schema.Types.ObjectId,
      ref: 'plan',
    }, ],
    projects: [{
      type: Schema.Types.ObjectId,
      ref: 'project',
    }, ],
    latlngs: [
      [Number]
    ],
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'project',
    },
  },

  constructSchema(schemaDefinedAbove, sails) {
    const newSchema = new sails.mongoose.Schema(schemaDefinedAbove, {
      collection: 'project',
      timestamps: true,
      autoIndex: false,
    });

    // newSchema.virtual('plans', {
    //   ref: 'plan',
    //   localField: '_id',
    //   foreignField: 'project'
    // });

    newSchema.virtual('id').get(function () {
      return this._id.toHexString();
    });

    newSchema.virtual('sharings', {
      ref: 'sharing',
      localField: '_id',
      foreignField: 'project',
    });

    newSchema.virtual('annotations', {
      ref: 'annotation',
      localField: '_id',
      foreignField: 'project',
    });

    const autoPopulateProject = function (next) {
      this.populate('projects');
      this.populate('plans');
      // this.populate('sharings');
      this.populate('annotations');
      // this.populate('owner');
      next();
    };

    newSchema.pre('find', autoPopulateProject);
    newSchema.pre('findOne', autoPopulateProject);

    newSchema.set('toJSON', {
      virtuals: true,
    });

    return newSchema;
  },
};
