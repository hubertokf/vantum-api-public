/**
 * CouponController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  postCoupon: async (req, res) => {
    var params = req.allParams();

    let inputCoupon = {
      code: params.code,
      factor: params.factor,
      limit: params.limit,
      expireAt: params.expireAt,
      description: params.description,
    };

    var promise = Coupon.create(inputCoupon);

    promise.then((doc) => {
      return res.json(doc);
    })
    .catch(res.serverError);
  },

  getCoupon: async (req, res) => {
    const id = req.param('id');

    var coupon = Coupon.findOne({_id:id}).exec()
    .then((doc) => {
      return res.json(doc);
    })
    .catch(res.serverError);

  },

  getCoupons: async (req, res) => {
    const params = req.allParams();

    var coupons = Coupon.find(params).exec()
    .then((doc) => {
      return res.json(doc);
    })
    .catch(res.serverError);
  },

  editCoupon: async (req, res) => {
    var params = req.allParams();

    var promise = Coupon.findOneAndUpdate({
      _id: params.id
    },
    { $set: params},
    {new: true});

    promise.then((doc) => {
      return res.json(doc);
    })
    .catch(res.serverError);

  },

  deleteCoupon: async (req, res) => {
    const id = req.param('id');

    var promise = Coupon.deleteOne({
      _id:id,
    });

    promise.then((doc) => {
      return res.ok();
    })
    .catch(res.serverError);
  },
};

