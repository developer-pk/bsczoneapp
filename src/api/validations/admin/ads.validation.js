const Joi = require('joi');
const User = require('../../models/admin/ads.model');

module.exports = {

  // GET /v1/users
  listAds: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      title: Joi.string(),
      ads: Joi.string(),
      status: Joi.string(),
    },
  },

  // POST /v1/users
  createAds: {
    body: {
      title: Joi.string().required(),
      ads: Joi.string().required(),
      status: Joi.string().required(),
    },
  },
 
};
