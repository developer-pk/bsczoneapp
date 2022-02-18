const express = require('express');
const validate = require('express-validation');
const controller = require('../../../controllers/admin/promotedToken.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../../middlewares/auth');
const {
  listTokens,
  createToken,
} = require('../../../validations/admin/promotedToken.validation');
// var path = require('path')
// const multer  = require('multer');

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//       cb(null, 'uploads/tokens/');

//   },

//   filename: function(req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });

// var upload = multer({ storage: storage });

// const upload = multer({ dest: 'uploads/' });

const router = express.Router();
router
.route('/')
/**
   * @api {get} v1/ads List Ads
   * @apiDescription Get a list of Ads
   * @apiVersion 1.0.0
  * @apiName ListAds
   * @apiGroup Hobby
   * @apiPermission admin/user/any
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  Ads per page
   * @apiParam  {String}             [name]       Ads's name
   * @apiParam  {String=active,inactive}  [role]       Ads's status
   *
   * @apiSuccess {Object[]} Ads List of Ads.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(controller.list)
  /**
   * @api {post} v1/ads Creat Ads
   * @apiDescription Create a new Ads
   * @apiVersion 1.0.0
    * @apiName CreateAds
   * @apiGroup Ads
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   Ads access token
   *
   * @apiParam  {String}             Name     Ads's Name
   * @apiParam  {String=active,inactive}  [status]    Ads status
   *
   * @apiSuccess (Created 201) {String}  id         Ads id
   * @apiSuccess (Created 201) {String}  name       Ads Name
   * @apiSuccess (Created 201) {String}  status     Ads status
   * @apiSuccess (Created 201) {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(authorize(ADMIN), validate(createToken), controller.create);

  router
  .route('/:tokenId')
  /**
   * @api {patch} v1/ads/:id Delete Ads
   * @apiDescription Delete a Ads
   * @apiVersion 1.0.0
   * @apiName DeleteAds
   * @apiGroup Ads
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   Admin's access token
   *
   * @apiSuccess (No Content 204)  Successfully deleted
   *
   * @apiError (Unauthorized 401) Unauthorized  Only authenticated users can delete the data
   * @apiError (Forbidden 403)    Forbidden     Only user with same id or admins can delete the data
   * @apiError (Not Found 404)    NotFound      User does not exist
   */
   .delete(authorize(ADMIN), controller.remove);

module.exports = router;
