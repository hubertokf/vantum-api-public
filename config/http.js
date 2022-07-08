/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For more information on configuration, check out:
 * https://sailsjs.com/config/http
 */

module.exports.http = {
  trustProxy: true,

  /** **************************************************************************
   *                                                                           *
   * Sails/Express middleware to run for every HTTP request.                   *
   * (Only applies to HTTP requests -- not virtual WebSocket requests.)        *
   *                                                                           *
   * https://sailsjs.com/documentation/concepts/middleware                     *
   *                                                                           *
   *************************************************************************** */

  middleware: {
    // requestLogger: function (req, res, next) {
    //   console.log('Requested :: ', req.method, req.url);
    //   return next();
    // },

    extendTimeout(req, res, next) {
      req.setTimeout(500 * 1000); // Increase the request timeout to 5 minutes

      return next();
    },

    /** *************************************************************************
     *                                                                          *
     * The order in which middleware should be run for HTTP requests.           *
     * (This Sails app's routes are handled by the "router" middleware below.)  *
     *                                                                          *
     ************************************************************************** */

    passportInit: require('passport').initialize(),
    passportSession: require('passport').session(),

    order: [
      'extendTimeout',
      'cookieParser',
      'session',
      // 'requestLogger',
      'passportInit',
      'passportSession',
      'bodyParser',
      'compress',
      'poweredBy',
      'router',
      'www',
      'favicon',
    ],

    /** *************************************************************************
     *                                                                          *
     * The body parser that will handle incoming multipart HTTP requests.       *
     *                                                                          *
     * https://sailsjs.com/config/http#?customizing-the-body-parser             *
     *                                                                          *
     ************************************************************************** */

    // bodyParser: (function _configureBodyParser(){
    //   var skipper = require('skipper');
    //   var middlewareFn = skipper({ strict: true });
    //   return middlewareFn;
    // })(),
  },
};
