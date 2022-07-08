module.exports = {
  postAnnotation: async (req, res) => {
    const params = req.allParams();

    const promise = Annotation.create({
      name: params.name,
      description: params.description,
      options: params.options,
      owner: params.owner,
      area: params.area,
      length: params.length,
      volume: params.volume,
      type: params.type,
      plan: params.plan,
      project: params.project,
      latlngs: params.latlngs,
      latlng: params.latlng,
    });

    promise
      .then(doc => {
        return res.json(doc);
      })
      .catch(res.serverError);
  },

  getAnnotation: async (req, res) => {
    const id = req.param('id');

    const query = Annotation.findOne({
        _id: id,
      })
      .populate('owner')
      .populate('plan')
      .populate('attachments.owner', 'fullName')
      .populate('project');
    const promise = query.exec();
    promise
      .then(doc => {
        return res.json(doc);
      })
      .catch(res.serverError);
  },

  getAnnotations: async (req, res) => {
    const params = req.allParams();

    const query = Annotation.find(params)
      .sort('-createdAt')
      .populate('owner')
      .populate('plan')
      .populate('project');
    const promise = query.exec();

    promise
      .then(doc => {
        return res.json(doc);
      })
      .catch(res.serverError);
  },

  editAnnotation: async (req, res) => {
    const params = req.allParams();

    const promise = Annotation.findOneAndUpdate({
      _id: params.id,
    }, {
      $set: params,
    }, {
      new: true,
    });

    promise
      .then(doc => {
        return res.json(doc);
      })
      .catch(res.serverError);
  },

  deleteAnnotation: async (req, res) => {
    const id = req.param('id');

    const promise = Annotation.deleteOne({
      _id: id,
    });

    promise
      .then(doc => {
        return res.ok();
      })
      .catch(res.serverError);
  },

  addAttachment: async (req, res) => {
    const id = req.param('annotationId');
    const attachment = req.allParams();

    const annotation = await Annotation.findOne({
      _id: id,
    });

    annotation.attachments.unshift(attachment);

    annotation.markModified('attachments');

    await annotation.save();
    return res.json(annotation);
  },

  editAttachment: async (req, res) => {
    const id = req.param('annotationId');
    const attachment = req.allParams();

    const annotation = await Annotation.findOne({
      _id: attachment.annotationId,
    });
    const updatedAttachment = await annotation.attachments.id(attachment._id);
    updatedAttachment.set(attachment);

    await annotation.save();

    return res.json(annotation);
  },

  removeAttachment: async (req, res) => {
    const id = req.param('annotationId');
    const attachmentId = req.param('_id');
    const annotation = await Annotation.findOne({
      _id: id,
    });

    annotation.attachments.id(attachmentId).remove();

    await annotation.save();

    return res.json(annotation);
  },
};
