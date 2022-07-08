/**
 * DataOrtophotoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  postOrthomosaic: async (req, res) => {
    var params = req.allParams()

    var promise = Orthomosaic.create({
      tilesUrl: params.tilesUrl,
      tilesCount: params.tilesCount,
      plan: params.plan,
      image: params.image,
      type: params.type,
      task: params.task,
      mbTileUrl: params.mbTileUrl,
      bounds: params.bounds,
    })

    promise.then((doc) => {
      return res.json(doc)
    })
    .catch(res.serverError)
  },

  getOrthomosaic: async (req, res) => {
    const id = req.param('id')

    var query = Orthomosaic.findOne({_id:id})
    .populate('task')
    .populate('image')
    .populate('plan')
    var promise = query.exec();

    promise.then((doc) => {
      return res.json(doc)
    })
    .catch(res.serverError)

  },

  getOrthomosaics: async (req, res) => {
    const params = req.param()

    var query = Orthomosaic.find(params)
    .sort('-createdAt')
    .populate('task')
    .populate('image')
    .populate('plan')
    var promise = query.exec();

    promise.then((doc) => {
      return res.json(doc);
    })
    .catch(res.serverError)

  },

  putOrthomosaic: async (req, res) => {
    var params = req.allParams()

    var promise = Orthomosaic.findOneAndUpdate({
      _id: params.id
    }, { $set: params})

    promise.then((doc) => {
      return res.json(doc);
    })
    .catch(res.serverError)

  },

  deleteOrthomosaic: async (req, res) => {
    const id = req.param('id')

    var promise = Orthomosaic.deleteOne({
      _id:id,
    })

    promise.then((doc) => {
      return res.ok();
    })
    .catch(res.serverError)
  }
}
