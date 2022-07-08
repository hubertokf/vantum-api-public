module.exports = function isAuthorized(req, res, next) {
  if (process.env.NODE_ENV === 'test') return next();

  const token = req.headers.authorization;
  if (!token) return res.forbidden();

  try {
    const decryptedSessionStorageToken = TokenService.verify(token);

    // console.log('Path: ', req.path)
    // console.log('Method: ', req.method)
    // console.log('Filter', req.query)

    User.findOne({ _id: decryptedSessionStorageToken._id }).exec(
      (error, user) => {
        // if (error) return res.serverError(error)
        return res.forbidden();

        // if(user.isSuperAdmin) return next()
        // else{
        //   if(req.method == 'POST'){
        //     for(var index in req.query){
        //       if(req.query[index] == user._id){
        //         return next()
        //       }else{
        //         return res.forbidden()
        //       }
        //     }
        //   } else if(req.method == 'GET'){
        //     for(var index in req.query){                    // 5c5347560d90150017d4c882   -> _id dos exemplos
        //       if(req.query[index] == user._id || req.query[index] == '5c5347560d90150017d4c882'){
        //         return next()
        //       }else{
        //         return res.forbidden()
        //       }
        //     }
        //   } else if(req.method == 'PUT'){
        //     for(var index in req.query){
        //       if(req.query[index] == user._id){
        //         return next()
        //       }else{
        //         return res.forbidden()
        //       }
        //     }
        //   } else if(req.method == 'DELETE'){
        //     for(var index in req.query){
        //       if(req.query[index] == user._id){
        //         return next()
        //       }else{
        //         return res.forbidden()
        //       }
        //     }
        //   }
        // }
      }
    );
  } catch (error) {
    return res.forbidden(error);
  }
};
