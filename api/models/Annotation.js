const mongoose = require('mongoose');

const { Schema } = mongoose;

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
    area: {
      type: 'number',
    },
    length: {
      type: 'number',
    },
    volume: {
      type: 'number',
    },
    options: {
      color: {
        type: 'string',
      },
      radius: {
        type: 'number',
      },
    },
    attachments: [
      new Schema(
        {
          type: {
            type: String,
          },
          text: 'string',
          title: 'string',
          owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
          },
        },
        {
          timestamps: true,
        }
      ),
    ],
    type: {
      type: 'string',
    },
    latlng: [Number],
    latlngs: [[Number]],

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
    plan: {
      type: Schema.Types.ObjectId,
      ref: 'plan',
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'project',
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: 'annotationGroup',
    },
    // geometry: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'geometry'
    //   }
    // ],
  },

  constructSchema(schemaDefinedAbove, sails) {
    const newSchema = new sails.mongoose.Schema(schemaDefinedAbove, {
      collection: 'annotation',
      timestamps: true,
      autoIndex: false,
    });

    newSchema.virtual('geometrys', {
      ref: 'geometry',
      localField: '_id',
      foreignField: 'annotation',
    });

    newSchema.virtual('id').get(function() {
      return this._id.toHexString();
    });

    newSchema.virtual('options.idRef').get(function() {
      return this._id.toHexString();
    });

    newSchema.set('toJSON', {
      virtuals: true,
    });

    return newSchema;
  },
};
