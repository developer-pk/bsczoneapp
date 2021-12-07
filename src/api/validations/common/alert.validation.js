const Joi = require('joi');
const Alert = require('../../models/common/currencyAlert.model');

module.exports = {

  // GET /v1/users
  listAlert: {
    query: { 
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      ip: Joi.string(),
      currencySymbol: Joi.string(),
      status: Joi.string(),
      highPrice: Joi.number(),
      lowPrice: Joi.number(),
    },
  },

  // POST /v1/users
  createAlert: {
    body: {
      ip: Joi.string().required(),
      currencySymbol: Joi.string().required(),
      highPrice: Joi.number().required(),
      lowPrice: Joi.number().required(),
      status: Joi.string().required(),
    },
  },
 
};
