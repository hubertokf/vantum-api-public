module.exports = {
  postAlbum: async (req, res) => {
    const params = req.allParams();

    let promise = Album.create({
      name: params.name,
      description: params.description,
      altitude: params.altitude,
      camera: params.camera,
      width: params.width,
      height: params.height,
      type: params.type,
      count: params.count,
      company: params.company,
      owner: params.owner,
      upload: params.upload,
      drone: params.drone,
      flightDate: params.date,
    });

    promise
      .then(doc => {
        return res.json(doc);
      })
      .catch(res.serverError) ;
  },

  getAlbum: async (req, res) => {
    const id = req.param('id') ;

    const query = Album.findOne({
      _id: id
    })
      .populate('owner')
      .populate('sharings')
      .populate('images') ;
    const promise = query.exec();

    promise
      .then(doc => {
        return res.json(doc);
      })
      .catch(res.serverError) ;
  },

  getAlbums: async (req, res) => {
    const params = req.allParams();

    // console.log(sails.config.mongoose)
    let query = Album.find(params)
      .sort('-createdAt')
      .populate('sharings')
      .populate('owner');
    const promise = query.exec();

    promise
      .then(doc => {
        return res.json(doc);
      })
      .catch(res.serverError);
  },

  putAlbum: async (req, res) => {
    const params = req.allParams();

    let promise = Album.findOneAndUpdate(
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
      .populate('images') ;

    promise
      .then(doc => {
        return res.json(doc);
      })
      .catch(res.serverError);
  },

  deleteAlbum: async (req, res) => {
    const id = req.param('id');

    let promise = Album.deleteOne({
      _id: id,
    }) ;

    promise
      .then(doc => {
        return res.ok();
      })
      .catch(res.serverError);
  },
} ;
