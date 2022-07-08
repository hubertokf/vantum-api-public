/**
 * FileUploadController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const { Storage } = require('@google-cloud/storage');
// var value = 0
// var AlbumController = require('./AlbumController')

module.exports = {
  // var im = require('imagemagick');
  // cloudinary://661474611842226:fBXLrLGY-tAfl_w1gFz3LDqM-6c@he68x4n2n

  postImage(req, res) {
    const params = req.allParams();

    const promise = Image.create({
      filename: params.filename,
      size: params.size,
      resolution: params.resolution,
      location: params.location,
      width: params.width,
      height: params.height,
      type: params.type,
      url: params.url,
      album: params.album,
      thumbnail_url: params.thumbnail_url,
    });

    promise
      .then(doc => {
        if (params.album) {
          doc.incrementAlbumCount({
            width: doc.width,
            height: doc.height,
            album: doc.album,
          });
        }
        return res.json(doc);
      })
      .catch(res.serverError);
  },

  getImages: async (req, res) => {
    const params = req.allParams();

    const query = Image.find(params).populate('album');
    const promise = query.exec();

    promise
      .then(doc => {
        return res.json(doc);
      })
      .catch(res.serverError);
  },

  // Retorna todos os dados das imagens
  getImage: async (req, res) => {
    const id = req.param('id');

    const query = Image.findOne({
      _id: id,
    }).populate('album');
    const promise = query.exec();

    promise
      .then(doc => {
        return res.json(doc);
      })
      .catch(res.serverError);
  },

  putImage: async (req, res) => {
    const params = req.allParams();

    const promise = Image.findOneAndUpdate(
      {
        _id: params.id,
      },
      {
        $set: params,
      }
    );

    promise
      .then(doc => {
        return res.json(doc);
      })
      .catch(res.serverError);
  },

  // No primeiro momendo pega o ID da URL, após acessa o DB pegando
  // o nome da imagem para deletar do disco e por último deleta os dados
  // da imagem do DB.

  deleteImage: async (req, res) => {
    const id = req.param('id');

    const image = await Image.findOne({
      _id: id,
    }).exec();

    const promise = Image.deleteOne({
      _id: id,
    });

    promise
      .then(async doc => {
        const album = await Album.findOne({
          _id: image.album,
        })
          .exec()
          .then(album => {
            album.decrementCount(image.album);
          });

        return res.ok();
      })
      .catch(res.serverError);

    // Acessa o banco pegando nome da imagem para deletar do disco
    // const image = await Image.findOne({
    //   id
    // }, function (err, image) {
    //   if (err) {
    //     return res.serverError(err);
    //   }

    //   // const fs = require('fs')
    //   // const dirname = './assets/uploads/'+image.name

    //   // Deleta a imagem do disco
    //   // fs.unlink(dirname, function (err) {
    //   //   if (err) return console.log(err); // handle error as you wish

    //     // Apaga os dados da imagem do DB
    //     Image.destroy({
    //         id,
    //       },
    //       function (err) {
    //         if (err) {
    //           return res.serverError(err);
    //         }
    //         return res.ok()
    //       })

    //   // });

    // })
  },
  getSignedURL: async (req, res) => {
    const data = req.allParams();

    const BUCKET_NAME = 'storage-vantum';
    // Google Developer Console project ID
    const PROJECT_ID = 'vantum';
    /* Google Developer Console -> API Manager -> Credentials ->
           Add credentials -> Service account -> JSON -> Create */
    const KEY_FILENAME = './config/credentials/prod.json'; // relative path
    const SECONDS = 1000; // seconds in milliseconds
    const URL_VALID_DURATION = 30 * SECONDS;

    // var gcs = gcloud.storage({
    //   projectId: PROJECT_ID,
    //   keyFilename: KEY_FILENAME
    // });
    const gcs = new Storage({
      projectId: PROJECT_ID,
      keyFilename: KEY_FILENAME,
    });

    // var storage = require('@google-cloud/storage')();
    const myBucket = gcs.bucket(BUCKET_NAME);

    const file = myBucket.file(data.filepath + data.filename);

    //-
    // Generate a URL that allows temporary access to download your file.
    //-
    const request = require('request');

    const config = {
      action: 'write',
      expires: '03-17-2025',
      contentType: data.filetype,
    };

    file.getSignedUrl(config, (err, url) => {
      if (err) {
        console.error(err);
        return;
      }

      res.json({
        signedURL: url,
      });

      // The file is now available to read from this URL.
      // request(url, function(err, resp) {
      //   // resp.statusCode = 200
      // });
    });

    // var data = req.allParams()

    // // var uuid = require('uuid');

    // Google Cloud Storage Bucket Name
    // const BUCKET_NAME = 'storage.vantum.com.br';
    // // Google Developer Console project ID
    // const PROJECT_ID = 'fine-entry-221919';
    // /* Google Developer Console -> API Manager -> Credentials ->
    //        Add credentials -> Service account -> JSON -> Create */
    // const KEY_FILENAME = './Vantum-ad116abaa871.json' // relative path
    // const SECONDS = 1000; // seconds in milliseconds
    // const URL_VALID_DURATION = 30 * SECONDS;

    // // var gcs = gcloud.storage({
    // //   projectId: PROJECT_ID,
    // //   keyFilename: KEY_FILENAME
    // // });
    // const gcs = new Storage({
    //   projectId: PROJECT_ID,
    //     keyFilename: KEY_FILENAME
    // });

    // var filename = data.filePath // v4 is a random uuid
    // var file = gcs.bucket(BUCKET_NAME).file(filename);
    // file.getSignedUrl({
    //   // More documention on options at
    //   // https://googlecloudplatform.github.io/gcloud-node/#/docs/v0.24.1/storage/file?method=getSignedUrl
    //   action: 'write',
    //   HTTP_Verb: 'PUT',
    //   equals: data.contentType,
    //   // expires: Date.now() * URL_VALID_DURATION
    //   expires: '03-01-2500'
    // }, function (err, url) {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }
    //   res.json({"signedURL": url})
    // });
  },
};
