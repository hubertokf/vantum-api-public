let mongoose = require('mongoose');

let {Schema} = mongoose;
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
    planDate: {
      type: 'date',
    },
    latlng: [
      {
        type: String,
      },
    ],
    bounds: [[Number]],
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
    album: {
      type: Schema.Types.ObjectId,
      ref: 'album',
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'project',
    },
    // geometrys: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'geometry'
    //   }
    // ],
    // annotations: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'annotation'
    //   }
    // ],
    // tasks: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'task'
    //   }
    // ],
    // orthomosaics: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'orthomosaic'
    //   }
    // ]
  },

  constructSchema (schemaDefinedAbove, sails) {
    var newSchema = new sails.mongoose.Schema(schemaDefinedAbove, {
      collection: 'plan',
      timestamps: true,
      autoIndex: false
    });

    newSchema.virtual('id').get(function () {
      return this._id.toHexString();
    });

    newSchema.virtual('tasks', {
      ref: 'task',
      localField: '_id',
      foreignField: 'plan'
    });

    newSchema.virtual('sharings', {
      ref: 'sharing',
      localField: '_id',
      foreignField: 'plan'
    });

    newSchema.virtual('orthomosaics', {
      ref: 'orthomosaic',
      localField: '_id',
      foreignField: 'plan'
    });

    newSchema.virtual('invoices', {
      ref: 'invoice',
      localField: '_id',
      foreignField: 'plan'
    });

    newSchema.virtual('annotations', {
      ref: 'annotation',
      localField: '_id',
      foreignField: 'plan'
    });

    newSchema.virtual('geometrys', {
      ref: 'geometry',
      localField: '_id',
      foreignField: 'plan'
    });

    const autoPopulateProject = function (next) {
      this.populate('album');
      this.populate('orthomosaics');
      this.populate('annotations');
      this.populate('invoices');
      this.populate('tasks');
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
