const Joi = require('joi');
const User = require('../../models/user.model');

module.exports = {


  // POST /v1/users
  veryfyOtp: {
    body: {
      otp: Joi.string().length(6).required(),
    },
  },
 
};
