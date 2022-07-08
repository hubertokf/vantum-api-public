module.exports = async function isAuthorized(req, res, next) {
  if (process.env.NODE_ENV === 'test') return next();

  const token = req.headers.authorization;
  if (!token) return res.forbidden();

  try {
    const decryptedSessionStorageToken = TokenService.verify(token);

    User.findOne({ _id: decryptedSessionStorageToken._id }).exec(
      async (error, user) => {
        if (error) return res.serverError(error);

        if (user.isSuperAdmin) return next();

        if (req.method == 'POST') {
          const share = await Sharing.findOne({ plan: req.body.plan });
          if (req.body.owner.toString() == user._id.toString()) {
            return next();
          }
          if (share.owner) {
            if (
              share.owner == user._id.toString() ||
              share.owner == '5c5347560d90150017d4c882'
            ) {
              return next();
            }
          }
          if (share.user) {
            if (
              share.user == user._id.toString() ||
              share.user == '5c5347560d90150017d4c882' ||
              share.user == '5c5347560d90150017d4c882'
            ) {
              if (share.level == 3) {
                return next();
              }
            }
          }
        }
        if (req.method == 'GET') {
          // 5c5347560d90150017d4c882   -> _id dos exemplos
          const annotation = await Annotation.findOne({
            _id: req.param('id'),
          }).populate('owner');
          if (annotation.owner._id.toString() == user._id.toString()) {
            return next();
          }
          if (annotation.plan) {
            const share = await Sharing.findOne({ plan: annotation.plan });
            if (
              share.owner == user._id.toString() ||
              share.owner == '5c5347560d90150017d4c882'
            ) {
              return next();
            }

            if (share.user) {
              if (
                share.user == user._id.toString() ||
                share.user == '5c5347560d90150017d4c882'
              ) {
                return next();
              }
            }
          }
          // else if(annotation.project){
          //   const project =

          // }

          return res.forbidden();
        }
        if (req.method == 'PUT') {
          return next();
          // var annotation = await req.allParams()        // <<<=========-------------

          // if(annotation.owner == user._id){
          //   return next()
          // }
          // else{
          //   return res.forbidden()
          // }
        }
        if (req.method == 'DELETE') {
          return next();
          // if (req.query && req.query['owner']){
          // var annotation = await req.allParams()
          // console.log(annotation)
          // console.log(req)

          // if(annotation.owner == user._id){
          //   return next()
          // }
          // else{
          //   return res.forbidden()
          // }
        }
      }
    );
  } catch (error) {
    return res.forbidden(error);
  }
};
