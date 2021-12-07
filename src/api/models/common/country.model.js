const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const moment = require('moment-timezone');
const APIError = require('../../errors/api-error');

const countrySchema = new mongoose.Schema({
   _id: {
    type: Number
  },  
  sortname: {
      type: String
    },
    name: {
      type: String
    },
    states: [
      {
        type: Number,
        ref: 'State'
      }
    ]
  });

/**
 * Methods
 */

 countrySchema.method({
    transform() {
      const transformed = {};
      const fields = ['id','sortname', 'name', 'states'];
  
      fields.forEach((field) => {
        transformed[field] = this[field];
      });
  
      return transformed;
    },
  });
  
/**
 * Statics
 */
 countrySchema.statics = {
    /**
    * List users in descending order of 'name' timestamp.
    *
    * @param {number} skip - Number of users to be skipped.
    * @param {number} limit - Limit number of users to be returned.
    * @returns {Promise<User[]>}
    */
    list({
     page = 1, perPage = 30, sortname, name, states,
   }) {
    var options;
     if(name){
      options = omitBy({sortname, name: {$regex: ".*" + name + ".*"}, states }, isNil);
     }else{
      options = omitBy({sortname, name, states }, isNil);
     }
     
 console.log(options);
     return this.find(options)
       .sort({ name: -1 })
       .skip(perPage * (page - 1))
       .limit(perPage)
       .exec();
   },
  };

  const country = mongoose.model('Country', countrySchema);
  
  module.exports = country;
  