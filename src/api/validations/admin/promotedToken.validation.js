const Joi = require('joi');

module.exports = {

  // GET /v1/users
  listTokens: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      contractAddress: Joi.string(),
      image: Joi.string(),
      status: Joi.string(),
    },
  },

  // POST /v1/users
  createToken: {
    body: {
      image: Joi.string().required(),
      contractAddress: Joi.string().required(),
    },
  },
 
};
