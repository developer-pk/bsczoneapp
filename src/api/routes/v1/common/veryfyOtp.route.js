const express = require('express');
const validate = require('express-validation');
const controller = require('../../../controllers/common/verifyOtp.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../../middlewares/auth');
const {
    veryfyOtp,
} = require('../../../validations/common/veryfyOtp.validation');

const router = express.Router();
router
.route('/verify')
   /**
   * @api {post} v1/verify Creat Alert
   * @apiDescription Create a new Alert
   * @apiVersion 1.0.0
    * @apiName verifyotp
   * @apiGroup OTP
   * @apiPermission User
   *
   * @apiHeader {String} Authorization   Alert access token
   * */
    .post(authorize(LOGGED_USER),validate(veryfyOtp), controller.verifyOtp);

    router
.route('/resendOtp')
   /**
   * @api {post} v1/veryfyotp Creat Alert
   * @apiDescription Create a new Alert
   * @apiVersion 1.0.0
    * @apiName verifyotp
   * @apiGroup OTP
   * @apiPermission User
   *
   * @apiHeader {String} Authorization   Alert access token
   * */
    .get(authorize(LOGGED_USER), controller.resendotp);
    module.exports = router;