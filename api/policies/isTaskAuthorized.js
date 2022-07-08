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
          if (req.body.plan) {
            const plan = await Plan.findById(req.body.plan);
            if (plan.owner == user._id.toString()) {
              return next();
            }
          }
          return res.forbidden();
        }
        if (req.method == 'GET') {
          return next();
        }
        if (req.method == 'PUT') {
          return next();
        }
        if (req.method == 'DELETE') {
          return next();
        }
      }
    );
  } catch (error) {
    return res.forbidden(error);
  }
};
