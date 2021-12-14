const express = require('express');
const validate = require('express-validation');
const controller = require('../../../controllers/admin/contactUs.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../../middlewares/auth');
const {
  listContactUs,
  createContactUs,
  updateContactUs,
} = require('../../../validations/admin/contactUs.validation');
const router = express.Router();
router
.route('/')
/**
   * @api {get} v1/message List Message
   * @apiDescription Get a list of Message
   * @apiVersion 1.0.0
  * @apiName MessageList
   * @apiGroup Message
   * @apiPermission admin/user/any
   */
  .get(validate(listContactUs), controller.list)
  /**
   * @api {post} v1/message Creat message
   * @apiDescription Create a new Message
   * @apiVersion 1.0.0
    * @apiName CreateMEssage
   * @apiGroup Message
   * @apiPermission admin
   */
  .post(authorize(ADMIN), validate(createContactUs), controller.create);
  router
  .route('/:messageId')
  
  /**
   * @api {post} v1/update-status Creat message
   * @apiDescription Create a new Message
   * @apiVersion 1.0.0
    * @apiName CreateMEssage
   * @apiGroup Message
   * @apiPermission admin
   */
   .patch(authorize(ADMIN), validate(updateContactUs), controller.update);

   router
  .route('/:messageId')
  /**
   * @api {patch} v1/message/:id Delete message
   * @apiDescription Delete a Ads
   * @apiVersion 1.0.0
   * @apiName DeleteAds
   * @apiGroup Ads
   * @apiPermission admin
   */
   .delete(authorize(ADMIN), controller.remove);

module.exports = router;
