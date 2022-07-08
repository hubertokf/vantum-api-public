/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */
const passport = require('passport');

module.exports.routes = {
  /** *************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ************************************************************************** */

  // '/': { view: 'pages/homepage' },

  'POST /api/v2/loginasuser': 'AuthController.loginAsUser',
  'POST /api/v2/checktoken': 'AuthController.checkAdminToken',
  'POST /api/v2/login': 'AuthController.login',
  'POST /api/v2/logout': 'AuthController.logout',
  'GET /auth/facebook': passport.authenticate('facebook', { scope: 'email' }),
  'GET /auth/facebook/callback': passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),
  'POST /api/v2/facebooklogin': 'AuthController.facebookLogin',

  'get /api/v2/users': 'UserController.getUsers',
  'get /api/v2/user/:id': 'UserController.getUser',
  'get /api/v2/user/emails': 'UserController.getEmails',
  'post /api/v2/user': 'UserController.postUser',
  'post /api/v2/subscribe': 'UserController.userSubscribe',
  'post /api/v2/user/confirmation': 'UserController.requestConfirmation',
  'put /api/v2/user/:id': 'UserController.putUser',
  'delete /api/v2/user/:id': 'UserController.deleteUser',
  'get /api/v2/leads': 'UserController.leadslist',

  'post /api/v2/subscribeplan/:id': 'UserController.subscribePlan',
  'post /api/v2/changepassword/:id': 'UserController.changePassword',
  'post /api/v2/changeemail/:id': 'UserController.changeEmail',
  'get /api/v2/user/countusers/': 'UserController.countUsers',

  'get /api/v2/server/wake': 'ServerController.wake',

  'get /api/v2/email/confirm': {
    action: 'entrance/confirm-email',
  },

  'get  /api/v2/password/recovery': {
    action: 'entrance/send-password-recovery-email',
  },
  'post  /api/v2/password/recovery': {
    action: 'entrance/send-password-recovery-email',
  },
  'get  /api/v2/password/update': {
    action: 'entrance/update-password-and-login',
  },
  'post  /api/v2/password/update': {
    action: 'entrance/update-password-and-login',
  },

  'post /api/v2/deliver/contactFormVantum':
    'DeliverController.contactFormVantum',
  'post /api/v2/deliver/contactFormVantumTask':
    'DeliverController.contactFormVantumTask',
  'post /api/v2/deliver/contactcampaign': 'DeliverController.contactCampaign',

  'post /api/v2/deliver/contactFormPlanah':
    'DeliverController.contactFormPlanah',
  'post /api/v2/deliver/signupClassesPlanah':
    'DeliverController.signupClassesPlanah',

  'post  /api/v2/deliver-contact-form-message': {
    action: 'deliver-contact-form-message',
  },

  'post /api/v2/image': 'ImageController.postImage',
  'get /api/v2/image/:id': 'ImageController.getImage',
  'put /api/v2/image/:id': 'ImageController.putImage',
  'get /api/v2/images': 'ImageController.getImages',
  'post /api/v2/sign': 'ImageController.getSignedURL',
  'delete /api/v2/image/:id': 'ImageController.deleteImage',

  'post /api/v2/album': 'AlbumController.postAlbum',
  'get /api/v2/album/:id': 'AlbumController.getAlbum',
  'get /api/v2/albums': 'AlbumController.getAlbums',
  'put /api/v2/album/:id': 'AlbumController.putAlbum',
  'delete /api/v2/album/:id': 'AlbumController.deleteAlbum',

  'post /api/v2/project': 'ProjectController.postProject',
  'get /api/v2/project/:id': 'ProjectController.getProject',
  'get /api/v2/projects': 'ProjectController.getProjects',
  'put /api/v2/project/:id': 'ProjectController.putProject',
  'put /api/v2/project/addToProject/:id': 'ProjectController.addToProject',
  'put /api/v2/project/removeFromProject/:id':
    'ProjectController.removeFromProject',
  'delete /api/v2/project/:id': 'ProjectController.deleteProject',

  // 'post /api/v2/project/sharing': 'ProjectController.shareProject',
  // 'get /api/v2/project/sharing': 'ProjectController.getShares',
  // 'get /api/v2/project/sharing/:id': 'ProjectController.getShare',
  // 'put /api/v2/project/sharing/:id': 'ProjectController.putShare',
  // 'delete /api/v2/project/sharing/:id': 'ProjectController.deleteShareProject',

  'post /api/v2/plan': 'PlanController.postPlan',
  'get /api/v2/plans': 'PlanController.getPlans',
  'get /api/v2/plan/:id': 'PlanController.getPlan',
  'get /api/v2/plan/countplans': 'PlanController.countPlans',
  'put /api/v2/plan/:id': 'PlanController.putPlan',
  'put /api/v2/plan/:id/addProject': 'PlanController.setProjectIntoPlan',

  'delete /api/v2/plan/:id': 'PlanController.deletePlan',

  'post /api/v2/sharing': 'SharingController.postShare',
  'get /api/v2/sharing': 'SharingController.getShares',
  'get /api/v2/sharing/:id': 'SharingController.getShare',
  'put /api/v2/sharing/:id': 'SharingController.putShare',
  'delete /api/v2/sharing/:id': 'SharingController.deleteShare',

  'post /api/v2/task': 'TaskController.postTask',
  // 'get /api/v2/task/:id/run': 'TaskController.run',
  'post /api/v2/task/:id/run': 'TaskController.run',
  'get /api/v2/task/:id': 'TaskController.getTask',
  'get /api/v2/tasks': 'TaskController.getTasks',
  'delete /api/v2/task/:id': 'TaskController.deleteTask',
  'put /api/v2/task/:id': 'TaskController.putTask',
  'get /api/v2/task/counttasks': 'TaskController.countTasks',

  'post /api/v2/orthomosaic': 'OrthomosaicController.postOrthomosaic',
  'get /api/v2/orthomosaic/:id': 'OrthomosaicController.getOrthomosaic',
  'get /api/v2/orthomosaics': 'OrthomosaicController.getOrthomosaics',
  'delete /api/v2/orthomosaic/:id': 'OrthomosaicController.deleteOrthomosaic',
  'put /api/v2/orthomosaic/:id': 'OrthomosaicController.putOrthomosaic',
  // 'get /api/v2/orthomosaics': 'OrthomosaicController.getOrthomosaics',

  'post /api/v2/email': 'EmailController.post',
  'get /api/v2/email/:id': 'EmailController.get',
  'get /api/v2/emails': 'EmailController.getAll',
  'delete /api/v2/email/:id': 'EmailController.delete',
  'put /api/v2/email/:id': 'EmailController.edit',

  'post /api/v2/annotation': 'AnnotationController.postAnnotation',
  'get /api/v2/annotation/:id': 'AnnotationController.getAnnotation',
  'get /api/v2/annotations': 'AnnotationController.getAnnotations',
  'delete /api/v2/annotation/:id': 'AnnotationController.deleteAnnotation',
  'put /api/v2/annotation/:id': 'AnnotationController.editAnnotation',

  'post /api/v2/annotation/:annotationId/attachment':
    'AnnotationController.addAttachment',
  'put /api/v2/annotation/:annotationId/attachment':
    'AnnotationController.editAttachment',
  'delete /api/v2/annotation/:annotationId/attachment':
    'AnnotationController.removeAttachment',

  'post /api/v2/invoice': 'InvoiceController.postInvoice',
  'get /api/v2/invoice/:id': 'InvoiceController.getInvoice',
  'get /api/v2/invoices': 'InvoiceController.getInvoices',
  'delete /api/v2/invoice/:id': 'InvoiceController.deleteInvoice',
  'put /api/v2/invoice/:id': 'InvoiceController.editInvoice',
  'post /api/v2/invoice/addcoupon': 'InvoiceController.addCoupon',
  'post /api/v2/invoice/removecoupon': 'InvoiceController.removeCoupon',

  'post /api/v2/coupon': 'CouponController.postCoupon',
  'get /api/v2/coupon/:id': 'CouponController.getCoupon',
  'get /api/v2/coupons': 'CouponController.getCoupons',
  'delete /api/v2/coupon/:id': 'CouponController.deleteCoupon',
  'put /api/v2/coupon/:id': 'CouponController.editCoupon',

  'post /api/v2/company': 'CompanyController.postCompany',
  'get /api/v2/companies': 'CompanyController.getAll',
  'get /api/v2/company/:id': 'CompanyController.getCompany',
  'put /api/v2/company/:id': 'CompanyController.putCompany',
  'put /api/v2/company/customer/:id/:customerId':
    'CompanyController.addCustomer',
  'put /api/v2/company/project/:id/:projectId': 'CompanyController.addProject',
  'delete /api/v2/company/:id': 'CompanyController.deleteCompany',

  'post /api/v2/professional': 'ProfessionalController.postProfessional',
  'get /api/v2/professional/:id': 'ProfessionalController.getProfessional',
  'get /api/v2/professionals': 'ProfessionalController.getProfessionals',
  'put /api/v2/professional/:id': 'ProfessionalController.putProfessional',
  'delete /api/v2/professional/:id':
    'ProfessionalController.deleteProfessional',

  '/api/v2/account/logout': {
    action: 'account/logout',
  },
  'PUT   /api/v2/account/update-password': {
    action: 'account/update-password',
  },
  'PUT   /api/v2/account/update-profile': {
    action: 'account/update-profile',
  },
  'PUT   /api/v2/account/update-billing-card': {
    action: 'account/update-billing-card',
  },
  'PUT   /api/v2/entrance/login': {
    action: 'entrance/login',
  },
  // 'POST  /api/v2/entrance/signup':                       { action: 'entrance/signup' },

  '/admin-dashboard': {
    controller: 'App',
    action: 'serveDash',
    skipAssets: true,
    skipRegex: /^\/api\/.*$/,
  },

  '/signup': {
    controller: 'App',
    action: 'signup',
    skipAssets: true,
    skipRegex: /^\/api\/.*$/,
  },

  '/login': {
    controller: 'App',
    action: 'login',
    skipAssets: true,
    skipRegex: /^\/api\/.*$/,
  },

  '/*': {
    controller: 'App',
    action: 'serve',
    skipAssets: true,
    skipRegex: /^\/api\/.*$/,
  },

  '/terms': '/legal/terms',
  '/logout': '/api/v1/account/logout',

  /** *************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ************************************************************************** */
};
