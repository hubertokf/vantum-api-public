/**
 * InvoiceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  postInvoice: async (req, res) => {
    var params = req.allParams();
    // let album = await Album.findOne({_id:params.task.album.id}).exec();
    // console.log(params)

    var newInvoice = await Invoice.create({
      total: 0,
      owner: params.owner,
      // coupons: params.coupons,
      plan: params.plan,
      tasks: [params.task],
    }).then(async (newInvoice)=>{

      let value = await sails.helpers.calculateInvoice(newInvoice.id, params.owner);

      var invoice = await Invoice.findOneAndUpdate(
        { _id: newInvoice._id },
        {
          $set: { total: value}
        },
        {new: true}
      )
      .populate('coupons')
      .populate('owner')
      .populate({
        path : 'tasks',
        populate : [
          {
            path : 'album'
          },
          {
            path : 'plan'
          }
        ]
      }).exec()
      .then(async (invoice) => {
        let task = invoice.tasks[0];

        // checar job talvez?
        if (task.job.orthomosaic){
          await sails.helpers.sendTemplateEmail.with({
            to: 'financeiro@vantum.com.br',
            subject: '[PROCESSAMENTO] Novo processamento solicitado',
            template: 'internal/email-billing-financial',
            layout: false,
            templateData: {
              contactName: invoice.owner.fullName,
              contactEmail: invoice.owner.email,
              planName: task.plan.name,
              planId: task.plan.id,
              albumId: task.album._id,
              albumCount: task.album.count,
              albumName: task.album.name,
              albumType: task.album.type,
              task: task.id,
              resolution: Math.ceil((task.album.width * task.album.height)/1000000),
              value: value.toFixed(2)
            }
          });


          await sails.helpers.sendTemplateEmail.with({
            to: invoice.owner.email,
            subject: 'Cobrança de processamento',
            template: 'internal/email-billing-user',
            layout: false,
            templateData: {
              contactName: invoice.owner.fullName,
              contactEmail: invoice.owner.email,
              plan: task.plan.name,
              count: task.album.count,
              resolution: Math.ceil((task.album.width * task.album.height)/1000000),
              value: value.toFixed(2)
            }
          });
        }

        return res.json(invoice);
      });
    });



  },

  getInvoice: async (req, res) => {
    const id = req.param('id');

    var query = Invoice.findOne({_id:id})
    .populate('tasks')
    .populate('owner')
    .populate('coupons').exec()
    .then((doc) => {
      return res.json(doc);
    })
    .catch(res.serverError);

  },

  getInvoices: async (req, res) => {
    const params = req.allParams();

    var query = Invoice.find(params)
    .sort('-createdAt')
    .populate('tasks')
    .populate('owner');
    var promise = query.exec()
    .then((doc) => {
      return res.json(doc);
    })
    .catch(res.serverError);
  },

  editInvoice: async (req, res) => {
    var params = req.allParams();

    var promise = Invoice.findOneAndUpdate({
      _id: params.id
    },
    { $set: params },
    {new: true});

    promise.then((doc) => {
      return res.json(doc);
    })
    .catch(res.serverError);

  },

  deleteInvoice: async (req, res) => {
    const id = req.param('id');

    var promise = Invoice.deleteOne({
      _id:id,
    });

    promise.then((doc) => {
      return res.ok();
    })
    .catch(res.serverError);
  },

  addCoupon: async (req, res) => {
    const couponCode = req.param('couponCode');
    const invoiceId = req.param('invoiceId');
    const ownerId = req.param('ownerId');

    var coupon = await Coupon.findOne({code:couponCode}).exec();
    let couponResponse = await sails.helpers.checkCoupon(couponCode,invoiceId).intercept('expired', (err)=>{
      return res.json(err);
    })
    .intercept('invalid', (err)=>{
      return res.json(err);
    })
    .intercept('alreadyUsed', (err)=>{
      return res.json(err);
    });



    await Invoice.findOneAndUpdate(
      { _id: invoiceId },
      {
        $push: { coupons: coupon._id },
      },
      {new: true}
    ).populate('coupons').exec();

    let value = await sails.helpers.calculateInvoice(invoiceId, ownerId);

    var invoice = await Invoice.findOneAndUpdate(
      { _id: invoiceId },
      {
        $set: { total: value}
      },
      {new: true}
    ).populate('coupons').exec()
    .then((invoice) => {
      return res.json({
        invoice:invoice,
        coupon:coupon
      });
      // return res.json(invoice);
    })
    .catch(res.serverError);

  },

  removeCoupon: async (req, res) => {
    const couponCode = req.param('couponCode');
    const invoiceId = req.param('invoiceId');
    const ownerId = req.param('ownerId');

    var coupon = await Coupon.findOne({code:couponCode}).exec();

    var invoice = await Invoice.findOneAndUpdate(
      { _id: invoiceId },
      { $pull: { coupons: coupon._id } },
      {new: true}
    ).populate('coupons').exec();

    let value = await sails.helpers.calculateInvoice(invoiceId, ownerId);

    var invoice = await Invoice.findOneAndUpdate(
      { _id: invoiceId },
      {
        $set: { total: value}
      },
      {new: true}
    ).populate('coupons').exec().then((invoice) => {
      return res.json(invoice);
    })
    .catch(res.serverError);
  }
};

