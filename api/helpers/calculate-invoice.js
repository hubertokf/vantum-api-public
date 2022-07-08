module.exports = {


  friendlyName: 'Check coupon',


  description: '',


  inputs: {
    invoiceId: {
      type: 'string'
    },
    userId: {
      type: 'string'
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'Calculated value'
    },

  },


  fn: async function (inputs, exits) {
    var cost = 0.03709677419;

    if (inputs.userId ){
      const user = await User.findOne({_id:inputs.userId}).exec();

      if (user.subscriptionPlan != 'free' && user.subscriptionPlan != '' && user.subscriptionPlan != null) {
        cost = 0.02661290323;
      }
    }

    var invoice = await Invoice.findOne({_id:inputs.invoiceId})
    .populate('coupons')
    .populate({
      path : 'tasks',
      populate : {
        path : 'album'
      }
    })
    .exec();

    let value = 0;
    let stepValue = 0;
    let stepDiscount = 0;

    for (task of invoice.tasks) {
      stepvalue = 0;
      if (task.album != undefined && task.album != null ){
        stepValue = ((task.album.count * cost * ((task.album.width * task.album.height)/1000000)));
      }

      value = value + stepValue;
    }

    for (coupon of invoice.coupons) {
      stepDiscount = value * coupon.factor;

      value = value - stepDiscount;
    }

    return exits.success(value);

  }

};



