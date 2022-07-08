module.exports = {
  serve: (req, res) => {
    const fs = require('fs')

    const app = __dirname + '/../../assets/index.html'
    fs.createReadStream(app).pipe(res)
  },
  login: (req, res) => {
    const fs = require('fs')

    const app = __dirname + '/../../assets/login.html'
    fs.createReadStream(app).pipe(res)
  },
  signup: (req, res) => {
    const fs = require('fs')

    const app = __dirname + '/../../assets/signup.html'
    fs.createReadStream(app).pipe(res)
  },
  serveDash: (req, res) => {
    const fs = require('fs')

    const app = __dirname + '/../../assets/admin-dashboard/index.html'
    fs.createReadStream(app).pipe(res)
  }
}
