/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  /** *************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ************************************************************************** */
  '*': true,
  RegisterController: {
    '*': true,
  },
  LoginController: {
    '*': true,
  },
  AlbumController: {
    '*': 'isAlbumAuthorized',
  },
  AnnotationController: {
    getAnnotations: 'is-super-admin',
    '*': true,
  },
  DeliverController: {
    '*': true,
  },
  ImageController: {
    getImages: 'is-super-admin',
    '*': true,
  },
  OrthomosaicController: {
    getOrthomosaics: 'is-super-admin',
    '*': true,
  },
  PlanController: {
    '*': 'isPlanAuthorized',
  },
  ProjectController: {
    '*': 'isProjectAuthorized',
  },
  SharingController: {
    '*': 'isSharingAuthorized',
  },
  TaskController: {
    getTasks: 'is-super-admin',
    '*': 'isTaskAuthorized',
  },
  UserController: {
    postUser: true,
    userSubscribe: true,
    requestConfirmation: true,
    '*': 'isUserAuthorized',
  },
  // '*': 'isAuthorized',
  // // whitelist the auth controller
  // 'auth': {
  //   '*': true
  // },
  // '': {
  //   '*':
  // }
  //  'ProductController': {
  //    '*': 'isAuthorized'
  //  },
  // 'PlanController': {
  //      '*': 'authenticated'
  //    },
  // 'UserController':{
  //   'postUser': 'share-vantum-projects'
  // }
  // AppController: {
  //   "*": "isUserAuthorized"
  // }
};
