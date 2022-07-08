module.exports = async function isAuthorized(req, res, next) {
  if (process.env.NODE_ENV === 'test') return next();

  const token = req.headers.authorization;
  if (!token) {
    const { id } = req.params;
    const sharing = await Sharing.findOne({
      $and: [{ album: id }, { linkSharing: true }],
    });

    if (sharing && sharing.linkSharing) {
      return next();
    }

    return res.forbidden();
  }

  try {
    const decryptedSessionStorageToken = TokenService.verify(token);

    let searchUser = null;
    if (decryptedSessionStorageToken.adminUser) {
      searchUser = decryptedSessionStorageToken.adminUser;
    } else {
      searchUser = decryptedSessionStorageToken;
    }

    User.findOne({
      _id: searchUser._id,
    }).exec(async (error, user) => {
      if (error) return res.serverError(error);

      if (user.isSuperAdmin) return next();

      if (req.method == 'POST') {
        return next();
      }
      if (req.method == 'GET') {
        // 5c5347560d90150017d4c882   -> _id dos exemplos
        const albumId = req.param('id');
        if (req.query && req.query.owner) {
          if (
            req.query.owner == user._id.toString() ||
            req.query.owner == '5c5347560d90150017d4c882'
          ) {
            return next();
          }
        }

        const album = await Album.findById(albumId);

        if (album.owner == '5c5347560d90150017d4c882') {
          return next();
        }
        if (album.owner == user._id.toString()) {
          return next();
        }

        const sharingsLenght = await Sharing.find({
          album: albumId,
        }).count();

        if (sharingsLenght > 0) {
          const sharings = await Sharing.find({
            album: albumId,
          });
          for (let i = 0; i < sharingsLenght; i++) {
            if (
              sharings[i].owner == user._id.toString() ||
              sharings[i].user == user._id.toString()
            ) {
              return next();
            }
          }
        }

        return res.forbidden();
      }

      if (req.method == 'PUT') {
        const albumId = req.param('id');
        if (req.query && req.query.owner) {
          if (
            req.query.owner == user._id.toString() ||
            req.query.owner == '5c5347560d90150017d4c882'
          ) {
            return next();
          }
        }

        const album = await Album.findById(albumId);
        if (album.owner == user._id.toString()) {
          return next();
        }

        const sharingsLenght = await Sharing.find({
          album: albumId,
        }).count();
        if (sharingsLenght > 0) {
          const sharings = await Sharing.find({
            album: albumId,
          });
          for (let i = 0; i < sharingsLenght; i++) {
            if (
              sharings[i].owner == user._id.toString() ||
              (sharings[i].user == user._id.toString() &&
                sharings[i].level >= 2)
            ) {
              return next();
            }
          }
        }
        return res.forbidden();
      }

      if (req.method == 'DELETE') {
        const albumId = req.param('id');
        if (req.query && req.query.owner) {
          if (
            req.query.owner == user._id.toString() ||
            req.query.owner == '5c5347560d90150017d4c882'
          ) {
            return next();
          }
        }

        const album = await Album.findById(albumId);
        if (album.owner == user._id.toString()) {
          return next();
        }

        const sharingsLenght = await Sharing.find({
          album: albumId,
        }).count();
        if (sharingsLenght > 0) {
          const sharings = await Sharing.find({
            album: albumId,
          });
          for (let i = 0; i < sharingsLenght; i++) {
            if (
              sharings[i].owner == user._id.toString() ||
              (sharings[i].user == user._id.toString() &&
                sharings[i].level >= 2)
            ) {
              return next();
            }
          }
        }

        return res.forbidden();
      }
    });
  } catch (error) {
    return res.forbidden(error);
  }
};
