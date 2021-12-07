const express = require('express');
const validate = require('express-validation');
const controller = require('../../../controllers/common/country.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../../middlewares/auth');
const {
  listCountries,
  // viewCountry,
} = require('../../../validations/common/country.validation');

const router = express.Router();
router
.route('/')
/**
   * @api {get} v1/countries List countries
   * @apiDescription Get a list of countries
   * @apiVersion 1.0.0
  * @apiName listCountries
   * @apiGroup Location
   * @apiPermission admin/user/any
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  countries per page
   * @apiParam  {String}             [name]       countries name
   *
   * @apiSuccess {Object[]} countries List of countries.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(validate(listCountries), controller.list);

  router
  .route('/:countryId')
  /**
   * @api {get} v1/country/:id single country
   * @apiDescription get single country
   * @apiVersion 1.0.0
   * @apiName getCountry
   * @apiGroup Location
   * @apiPermission admin/user/any
   *
   * @apiHeader {String} Authorization   Admin's access token
   *
   * @apiSuccess (No Content 204)  Successfully deleted
   *
   * @apiError (Unauthorized 401) Unauthorized  Only authenticated users can delete the data
   * @apiError (Forbidden 403)    Forbidden     Only user with same id or admins can delete the data
   * @apiError (Not Found 404)    NotFound      User does not exist
   */
   .get(controller.view);
   router
   .route('/:countryId/states')
  /**
   * @api {get} v1/country/:id/states country states
   * @apiDescription get country states
   * @apiVersion 1.0.0
  * @apiName getCountryStates
   * @apiGroup Location
   * @apiPermission admin/user/any
   *
   * @apiHeader {String} Authorization   Admin's access token
   *
   * @apiSuccess (No Content 204)  Successfully deleted
   *
   * @apiError (Unauthorized 401) Unauthorized  Only authenticated users can delete the data
   * @apiError (Forbidden 403)    Forbidden     Only user with same id or admins can delete the data
   * @apiError (Not Found 404)    NotFound      User does not exist
   */
   .get(controller.getStates);

   router
   .route('/:stateId/cities')
  /**
   * @api {get} v1/country/:id/cities states cities
   * @apiDescription get states cities
   * @apiVersion 1.0.0
  * @apiName getStatesCities
   * @apiGroup Location
   * @apiPermission admin/user/any
   *
   * @apiHeader {String} Authorization   Admin's access token
   *
   * @apiSuccess (No Content 204)  Successfully deleted
   *
   * @apiError (Unauthorized 401) Unauthorized  Only authenticated users can delete the data
   * @apiError (Forbidden 403)    Forbidden     Only user with same id or admins can delete the data
   * @apiError (Not Found 404)    NotFound      User does not exist
   */
   .get(controller.getCities);

   

module.exports = router;
