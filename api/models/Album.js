const mongoose = require('mongoose');

const { Schema } = mongoose;

module.exports = {
  //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
  //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
  //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
  schema: {
    name: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    location: {
      latitude: {
        type: 'string',
      },
      longitude: {
        type: 'string',
      },
    },
    altitude: {
      type: 'number',
    },
    camera: {
      type: 'string',
    },
    drone: {
      type: 'string',
    },
    width: {
      type: 'number',
    },
    height: {
      type: 'number',
    },
    type: {
      type: 'string',
    },
    count: {
      type: 'number',
    },
    upload: {
      type: 'number',
    },
    flightDate: {
      type: 'date',
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: 'company',
    },

    // images: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'image'
    //   }
    // ],
  },

  constructSchema(schemaDefinedAbove, sails) {
    // e.g. we might want to pass in a second argument to the schema constructor
    let newSchema = new sails.mongoose.Schema(schemaDefinedAbove, {
      collection: 'album',
      timestamps: true,
      autoIndex: false,
    });

    // Or we might want to define an instance method:
    newSchema.method('incrementCount', image => {
      Album.findOne({
        _id: image.album
      })
        .exec((err, doc) => {
        if (err) {
          return res.serverError();;
        }

        doc.upload = doc.upload + 1;;
        if (doc.width < image.width) {
          doc.width = image.width;;
        }
        if (doc.height < image.height) {
          doc.height = image.height;;
        }

        let updatedAlbum = Album.update({
          _id: image.album,
        })
          .set(doc)
          .fetch();
      });
    });

    newSchema.method('decrementCount', async albumId => {
      let album = await Album.findOne({
        _id: albumId,
      })
        .exec()
        .then(album => {
          album.upload = album.upload - 1;;

          var updatedAlbum = Album.findOneAndUpdate(
            {
              _id: albumId,
            },
            {
              $set: album,
            }
          ).exec();;
        });
    });

    newSchema.set('toJSON', {
      virtuals: true,
    });

    newSchema.virtual('sharings', {
      ref: 'sharing',
      localField: '_id',
      foreignField: 'album',
    });

    newSchema.virtual('images', {
      ref: 'image',
      localField: '_id',
      foreignField: 'album',
    });

    newSchema.virtual('id').get(function() {
      return this._id.toHexString();
    });

    // Regardless, you must return the instantiated Schema instance.
    return newSchema;
  },
} ;
