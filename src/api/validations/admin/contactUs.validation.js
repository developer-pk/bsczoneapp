const Joi = require('joi');
const User = require('../../models/admin/ads.model');

module.exports = {

  // GET /v1/users
  listContactUs: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      status: Joi.string(),
    },
  },

  // POST /v1/users
  createContactUs: {
    body: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      phoneNumber: Joi.number().required(),
      subject: Joi.string().required(),
      message: Joi.string().required(),
      status: Joi.string().required(),
    },
  },
   // PATCH /v1/message/:userId
  updateContactUs: {
    body: {
      status: Joi.string().required(),
    },
    params: {
      messageId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },
 
};
