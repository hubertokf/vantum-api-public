/**
 * ProfessionalController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  postProfessional: async (req, res) => {
    var params = req.allParams();

    let inputProfessional = {
      actuation: params.actuation,
      pilot: params.pilot,
      hasVant: params.hasVant,
      experience: params.experience,
      experienceVants: params.experienceVants,
      ownVants: params.ownVants,
      actuationRadius: params.actuationRadius,
    };

    var promise = Professional.create(inputProfessional);

    promise.then((doc) => {

      var promise = User.findOneAndUpdate({
        _id: params.user
      },
      { $set: {professional: doc._id}},
      {new: true});

      promise.then((user) => {
        return res.json(doc);
      })
      .catch(res.serverError);

    })
    .catch(res.serverError);
  },

  getProfessional: async (req, res) => {
    const id = req.param('id');

    var professional = Professional.findOne({_id:id}).exec()
    .then((doc) => {
      return res.json(doc);
    })
    .catch(res.serverError);

  },

  getProfessionals: async (req, res) => {
    const params = req.allParams();

    var professionals = Professional.find(params).exec()
    .then((doc) => {
      return res.json(doc);
    })
    .catch(res.serverError);
  },

  editProfessional: async (req, res) => {
    var params = req.allParams();

    var promise = Professional.findOneAndUpdate({
      _id: params.id
    },
    { $set: params},
    {new: true});

    promise.then((doc) => {
      return res.json(doc);
    })
    .catch(res.serverError);

  },

  deleteProfessional: async (req, res) => {
    const id = req.param('id');

    var promise = Professional.deleteOne({
      _id:id,
    });

    promise.then((doc) => {
      return res.ok();
    })
    .catch(res.serverError);
  },
};

