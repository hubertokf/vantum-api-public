/**
 * is-super-admin
 *
 * A simple policy that blocks requests from non-super-admins.
 *
 * For more about how to use policies, see:
 *   https://sailsjs.com/config/policies
 *   https://sailsjs.com/docs/concepts/policies
 *   https://sailsjs.com/docs/concepts/policies/access-control-and-permissions
 */
module.exports = async function(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    const decryptedSessionStorageToken = TokenService.verify(token);
    const userId = decryptedSessionStorageToken._id;
    const user = await User.findById(userId);
    if (user.isSuperAdmin) {
      return next();
    }
    return res.forbidden();
  }
  return res.forbidden();
};
