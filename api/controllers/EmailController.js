/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  sendEmail: function (req, res) {
    var email = req.allParams()

    var promise = Email.create(email)

    promise.then((doc) => {
      return res.json(doc)
    })
    .catch(res.serverError)

  },
  post: function (req, res) {
    var email = req.allParams()

    var promise = Email.create(email)

    promise.then((doc) => {
      return res.json(doc)
    })
    .catch(res.serverError)

  },
  getAll: async function (req, res) {
    const params = req.allParams()

    var query = Email.find(params)
    var promise = await query.exec();

    promise.then((doc) => {
      return res.json(doc);
    })
    .catch(res.serverError)

  },
  get: async function (req, res) {
    const id = req.param('id')

    var query = Email.findOne({_id:id})
    var promise = await query.exec();

    promise.then((doc) => {
      return res.json(doc)
    })
    .catch(res.serverError)

  },
  edit: async function (req, res) {
    var params = req.allParams()

    var promise = Email.findOneAndUpdate({
      _id: params.id
    }, { $set: params})

    promise.then((doc) => {
      return res.json(doc);
    })
    .catch(res.serverError)

  },
  delete: function (req, res) {
    const id = req.param('id')

    var promise = Email.deleteOne({
      _id:id,
    })

    promise.then((doc) => {
      return res.ok();
    })
    .catch(res.serverError)
  }
}
