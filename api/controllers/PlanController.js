module.exports = {
  postPlan: async (req, res) => {
    const params = req.allParams();

    // console.log(params)
    const promise = Plan.create({
      name: params.name,
      description: params.description,
      location: params.location,
      planDate: params.planDate,
      owner: params.owner,
      project: params.project,
      company: params.company,
      album: params.album,
      bounds: params.bounds,
    });

    promise.then(doc => res.json(doc)).catch(res.serverError);

    // Old code to insert geometrys and annotations
    // if (params.geometrys && params.geometrys.length) {
    //   params.geometrys.forEach(async geometry => {
    //     const g = await Geometry.create({
    //       latitude: geometry.latitude,
    //       longitude: geometry.longitude,
    //       plan: plan.id
    //     })
    //   })
    // }
    // if (params.annotations && params.annotations.length) {
    //   params.annotations.forEach(async annotation => {
    //     const a = await Annotation.create({
    //       description: annotation.description,
    //       options: annotation.options,
    //       owner: plan.owner,
    //       plan: plan.id
    //     }).fetch().then((a) => {
    //       params.geometrys.forEach(async geometry => {
    //         const g = await Geometry.create({
    //           latitude: geometry.latitude,
    //           longitude: geometry.longitude,
    //           annotation: a.id
    //         })
    //       })
    //     })
    //   })
    // }
  },

  getPlan: async (req, res) => {
    const id = req.param('id');

    const query = Plan.findOne({
      _id: id
    })
      .populate('owner')
      .populate('geometrys')
      .populate('project')
      .populate('annotations')
      .populate('invoices')
      .populate('sharings')
      .populate({
        path: 'orthomosaics',
        populate: [
          {
          path: 'image',
        },
        {
          path: 'task',
          select:
              '-disks.free.values -disks.used.values -mems.total.available.values -mems.total.free.values  -mems.total.used.values -mems.total.active.values -mems.total.inactive.values -mems.total.available.values -mems.processing.free.values  -mems.processing.used.values -mems.processing.available.values -mems.processing.active.values -mems.processing.inactive.values ',
        },
        ],
      })
      .populate({
        path: 'tasks',
        select:
          '-disks.free.values -disks.used.values -mems.total.available.values -mems.total.free.values  -mems.total.used.values -mems.total.active.values -mems.total.inactive.values -mems.total.available.values -mems.processing.free.values  -mems.processing.used.values -mems.processing.available.values -mems.processing.active.values -mems.processing.inactive.values ',
        populate: [
          {
            path: 'invoice',
          },
        ],
      })
      .populate({
        path: 'album',
        populate: {
          path: 'images',
        },
      });
    const promise = query.exec();

    promise.then(doc => res.json(doc)).catch(res.serverError);
  },

  getPlans: async (req, res) => {
    const params = req.allParams();

    const query = Plan.find(params)
      .sort('-createdAt')
      .populate('owner')
      .populate('geometrys')
      .populate('project')
      .populate('sharings')
      .populate('annotations')
      .populate({
        path: 'orthomosaics',
        populate: [
          {
          path: 'image',
        },
        {
          path: 'task',
          select:
              '-disks.free.values -disks.used.values -mems.total.available.values -mems.total.free.values  -mems.total.used.values -mems.total.active.values -mems.total.inactive.values -mems.total.available.values -mems.processing.free.values  -mems.processing.used.values -mems.processing.available.values -mems.processing.active.values -mems.processing.inactive.values ',
        },
        ],
      })
      .populate({
        path: 'tasks',
        select:
          '-disks.free.values -disks.used.values -mems.total.available.values -mems.total.free.values  -mems.total.used.values -mems.total.active.values -mems.total.inactive.values -mems.total.available.values -mems.processing.free.values  -mems.processing.used.values -mems.processing.available.values -mems.processing.active.values -mems.processing.inactive.values ',
      })
      .populate({
        path: 'album',
        populate: {
          path: 'images',
        },
      });
    const promise = query.exec();

    promise.then(doc => res.json(doc)).catch(res.serverError);

    // if(params.hasOwnProperty('project')){
    //   if(params.project == 'null'){
    //     params.project=null
    //   }
    // }
  },

  countPlans: async (req, res) => {
    const plans = await Plan.aggregate([
      {
      $match: {},
    },
    {
      $group: {
        _id: {
          month: {
            $month: {
              $toDate: '$createdAt',
            },
          },
          year: {
            $year: {
              $toDate: '$createdAt',
            },
          },
        },
        count: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        '_id.year': 1,
        '_id.month': 1,
      },
    },
    ]);

    let totalCount = 0;
    plans.forEach(plan => {
      totalCount += plan.count;
    });

    return res.send({
      plans,
      totalPlans: totalCount,
    });
  },

  putPlan: async (req, res) => {
    const params = req.allParams();

    // if(typeof(params.geometrys) == 'string'){
    //   params.geometrys = JSON.parse(params.geometrys)
    // }

    const promise = Plan.findOneAndUpdate(
      {
      _id: params.id,
    },
      {
      $set: params,
    },
      {
      new: true,
    }
    )
      .populate('owner')
      .populate('geometrys')
      .populate('project')
      .populate('annotations')
      .populate({
        path: 'orthomosaics',
        populate: [
          {
          path: 'image',
        },
        {
          path: 'task',
          select:
              '-disks.free.values -disks.used.values -mems.total.available.values -mems.total.free.values  -mems.total.used.values -mems.total.active.values -mems.total.inactive.values -mems.total.available.values -mems.processing.free.values  -mems.processing.used.values -mems.processing.available.values -mems.processing.active.values -mems.processing.inactive.values ',
        },
        ],
      })
      .populate({
        path: 'tasks',
        select:
          '-disks.free.values -disks.used.values -mems.total.available.values -mems.total.free.values  -mems.total.used.values -mems.total.active.values -mems.total.inactive.values -mems.total.available.values -mems.processing.free.values  -mems.processing.used.values -mems.processing.available.values -mems.processing.active.values -mems.processing.inactive.values ',
      })
      .populate({
        path: 'album',
        populate: {
          path: 'images',
        },
      });

    promise.then(doc => res.json(doc)).catch(res.serverError);

    // old code to add geometrys
    // if (params.geometrys && params.geometrys.length) {
    //   // Add
    //   await Geometry.destroy({
    //     plan: plan.id,
    //   })
    //   .then( (a) => {
    //       params.geometrys.forEach(async(geometry) => {
    //         const g = await Geometry.create({
    //           latitude: geometry.latitude,
    //           longitude: geometry.longitude,
    //           plan: plan.id
    //         })
    //       })
    //     }
    //   )
    // }
    // if (params.annotations && params.annotations.length) {
    //   params.annotations.forEach(async annotation => {
    //     const a = await Annotation.findOneAndUpdate({
    //         id: annotation.id
    //       }).set({
    //       description: annotation.description,
    //       options: annotation.options,
    //       owner: plan.owner,
    //       plan: plan.id
    //     }).then(async (a) => {
    //       await Geometry.destroy({
    //         annotation: annotation.id,
    //       })
    //       params.geometrys.forEach( async (geometry) => {
    //         const g = await Geometry.create({
    //           latitude: geometry.latitude,
    //           longitude: geometry.longitude,
    //           annotation: a.id
    //         })
    //       })
    //     })
    //   })
    // }
  },

  deletePlan: async (req, res) => {
    const id = req.param('id');

    const promise = Plan.deleteOne({
      _id: id,
    });

    promise.then(doc => res.ok()).catch(res.serverError);
  },

  setProjectIntoPlan: async (req, res) => {
    const id = req.param('id');
    const promise = Plan.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          project: req.body.project,
        },
      }
    );
    promise.then(doc => res.json(doc)).catch(res.serverError);
  },
};
