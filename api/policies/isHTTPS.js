module.exports = function(req, res, next) {
  const schema = req.headers['x-forwarded-proto'] || '';

  if (schema === 'https') {
    // Already https; don't do anything special.
    next();
  } else {
    // Redirect to https.
    if (process.env.NODE_ENV != 'staging') {
      res.redirect(`https://${req.headers.host}${req.url}`);
    }
  }
};
