module.exports = {


  friendlyName: 'Check coupon',


  description: '',


  inputs: {
    code: {
      type: 'string',
      required: true
    },
    invoiceId: {
      type: 'string'
    },
  },


  exits: {

    success: {
      outputFriendlyName: 'Coupon verified'
    },

    invalid: {
      outputFriendlyName: 'Coupon invalid'
    },

    expired: {
      outputFriendlyName: 'Coupon expired'
    },

    alreadyUsed: {
      outputFriendlyName: 'Already used'
    },

  },


  fn: async function (inputs, exits) {
    var coupon = await Coupon.findOne({code:inputs.code}).exec();

    if (!coupon){
      return exits.invalid({
        valid:false,
        message:'Coupon invalid'
      });
    }

    if (coupon.expireAt >= new Date()){
      return exits.expired({
        valid:false,
        message:'Coupon expired'
      });
    }

    if (coupon.limit = 0){
      return exits.expired({
        valid:false,
        message:'Coupon expired'
      });
    }

    if (inputs.invoiceId) {
      var invoice = await Invoice.findOne({_id:inputs.invoiceId})
      .populate({
        path : 'tasks',
        populate : {
          path : 'album'
        }
      }).exec();
      var isInArray = invoice.coupons.some((c) => {
        return c.equals(coupon._id.toString());
      });
      if(isInArray){
        return exits.alreadyUsed({
          valid:false,
          message:'Already used'
        });
      }

      //Specific rule of max 200 images coupon
      if (inputs.code == 'FREE200'){
        let higher = false;

        for (task of invoice.tasks) {
          if(task.album){
            if (task.album.count > 200){
              higher = true;
            }
          }else{
            return exits.invalid({
              valid:false,
              message:'Coupon invalid'
            });
          }
        }

        if (higher) {
          return exits.invalid({
            valid:false,
            message:'Coupon não se aplica'
          });
        }
      }


    }

    return exits.success({
      valid:true,
      message:'Coupon verified',
      coupon
    });

  }

};



