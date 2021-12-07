const Joi = require('joi');
const country = require('../../models/common/country.model');

module.exports = {

  // GET /v1/country
  listCountries: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      name: Joi.string(),
      sortname:Joi.string(),
    },
  },

  // POST /v1/country/:countryId
  viewCountry: {
    params: {
        countryId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
      },
  },
 
};
