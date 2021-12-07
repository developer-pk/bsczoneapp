const express = require('express');
const validate = require('express-validation');
const controller = require('../../../controllers/common/alert.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../../middlewares/auth');
const {
  listAlert,
  
} = require('../../../validations/common/country.validation');

const router = express.Router();
router
.route('/')
/**
   * @api {get} v1/alert List Alerts
   * @apiDescription Get a list of Alerts
   * @apiVersion 1.0.0
  * @apiName listAlerts
   * @apiGroup Alerts
   * @apiPermission admin/user/any
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  Alerts per page
   * @apiParam  {String}             [ip]       Alerts name
   *
   * @apiSuccess {Object[]} Alerts List of Alerts.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(validate(listCountries), controller.list)
   /**
   * @api {post} v1/alert Creat Alert
   * @apiDescription Create a new Alert
   * @apiVersion 1.0.0
    * @apiName Creat Alert
   * @apiGroup Alert
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   Alert access token
   *
   * @apiParam {String}  ip       Alert IP
   * @apiParam {String}  currencySymbol       Alert Cruncy Symbol
   * @apiParam {Number}  highPrice       Alert high Price
   * @apiParam {Number}  lowPrice       Alert low Price
   * @apiParam  {String=active,inactive}  [status]    Alert status
   *
   * @apiSuccess (Created 201) {String}  id         Alert id
   * @apiSuccess (Created 201) {String}  ip       Alert IP
   * @apiSuccess (Created 201) {String}  currencySymbol       Alert Cruncy Symbol
   * @apiSuccess (Created 201) {Number}  highPrice       Alert high Price
   * @apiSuccess (Created 201) {Number}  lowPrice       Alert low Price
   * @apiSuccess (Created 201) {String}  status     Alert status
   * @apiSuccess (Created 201) {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
    .post(authorize(ADMIN), validate(createAds), controller.create);

  router
  .route('/:alertId')
  /**
   * @api {get} v1/alert/:id single Alerts
   * @apiDescription get single Alerts
   * @apiVersion 1.0.0
   * @apiName getAlert
   * @apiGroup Alerts
   * @apiPermission admin/user/any
   *
   * @apiHeader {String} Authorization   Admin's access token
   *
   * @apiSuccess (No Content 204)  Successfully Get
   *
   * @apiError (Unauthorized 401) Unauthorized  Only authenticated users can delete the data
   * @apiError (Forbidden 403)    Forbidden     Only user with same id or admins can delete the data
   * @apiError (Not Found 404)    NotFound      User does not exist
   */
   .get(controller.view);
  

   

module.exports = router;