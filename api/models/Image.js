/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
// const bcrypt = require('bcryptjs')
var mongoose = require('mongoose')
Schema = mongoose.Schema
module.exports = {
  schema: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    filename: {
      type: 'string'
    },
    size: {
      type: 'string'
    },
    resolution: {
      type: 'string'
    },
    width: {
      type: 'string'
    },
    height: {
      type: 'string'
    },
    type: {
      type: 'string'
    },
    url: {
      type: 'string'
    },
    location: {},
    latlng: [Number],
    thumbnail_url: {
      type: 'string'
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
  },

  constructSchema: function (schemaDefinedAbove, sails) {
    var newSchema = new sails.mongoose.Schema(schemaDefinedAbove,
      {
        collection: 'image',
        timestamps: true,
        autoIndex: false
      }
    );

    newSchema.method('incrementAlbumCount', (image) => {
      Album.findOne({ _id: image.album })
      .exec((err, doc) => {
        if (err){
          return res.serverError()
        }

        doc.upload = doc.upload + 1
        if(doc.width < image.width){
          doc.width = image.width
        }
        if (doc.height < image.height) {
          doc.height = image.height
        }

        var updatedAlbum = Album.findOneAndUpdate({
          _id: image.album
        },
        { $set: doc }).exec()

      });
    });

    newSchema.method('decrementAlbumCount', (albumId) => {
      Album.findOne({ _id: albumId })
      .exec((err, doc) => {
        if (err){
          return res.serverError()
        }

        doc.upload = doc.upload - 1

        var updatedAlbum = Album.findOneAndUpdate({
          _id: albumId
        },
        { $set: doc }).exec()

      });
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
