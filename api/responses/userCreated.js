/**
 * 201 (CREATED) Response
 *
 * Usage:
 * return res.userCreated();
 * return res.userCreated(data);
 * return res.userCreated(data, 'auth/login');
 *
 * @param  {Object} data
 *          - pass string to render specified view
 */

module.exports = async function userCreated (data) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  sails.log.silly('res.created() :: Sending 201 ("CREATED") response');

  const vantum = await User
    .findOne({
      email: 'vantum@vantum.com.br'
    }).then( async (vantum) => {

      const projects = await Project
        .find({
          owner: vantum.id
        }).then( (projects) => {

          projects.forEach(async (project, index, arr) =>{

            const sharing = await Sharing.create({
                owner: vantum.id,
                project: project.id,
                user: data.user.id,
                level: 1
              })
          })

        })
        .catch(err => res.serverError(err))

    })
    .catch(err => res.serverError(err))

  // Set status code
  res.status(201);

  return res.json(data);

};
