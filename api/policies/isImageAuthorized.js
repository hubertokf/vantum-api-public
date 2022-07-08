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
          return next();
          // var image = await req.allParams()        // <<<=========-------------

          // if(image.owner == user._id){
          //   return next()
          // }
          // else{
          //   return res.forbidden()
          // }
        }
        if (req.method == 'GET') {
          // 5c5347560d90150017d4c882   -> _id dos exemplos
          if (req.query && req.query.owner) {
            if (
              req.query.owner == user._id ||
              req.query.owner == '5c5347560d90150017d4c882'
            ) {
              return next();
            }
            return res.forbidden();
          }
          const image = await Image.findOne({
            _id: req.param('id'),
          }).populate('owner');
          if (image.owner._id.toString() == user._id.toString()) {
            return next();
          }
          return res.forbidden();
        }
        if (req.method == 'PUT') {
          return next();
          // var image = await req.allParams()        // <<<=========-------------

          // if(image.owner == user._id){
          //   return next()
          // }
          // else{
          //   return res.forbidden()
          // }
        }
        if (req.method == 'DELETE') {
          return next();
          // if (req.query && req.query['owner']){
          // var image = await req.allParams()
          // console.log(image)
          // console.log(req)

          // if(image.owner == user._id){
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
