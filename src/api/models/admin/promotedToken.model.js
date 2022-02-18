const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const moment = require('moment-timezone');
const APIError = require('../../errors/api-error');
const { json } = require('body-parser');

const statuses = ['active', 'inactive'];

 const promotedTokenSchema = new mongoose.Schema({
  tokenName:{
      type: String,
      required: true,
    },
    contractAddress: {
      type: String,
      unique: true
    },
    apiData: {
      type: String
    },
    status: {
        type: String,
        enum: statuses,
        default: 'active',
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    
  }, {
    timestamps: true,
  });
  
  /**
   * @typedef adsSchema
   */
  
   
  
/**
 * Methods
 */
 promotedTokenSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'image', 'contractAddress', 'tokenName','apiData','status','createdAt'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },
});

/**
 * Statics
 */
 promotedTokenSchema.statics = {
   /**
   * Return new validation error
   * if error is a mongoose duplicate key error
   *
   * @param {Error} error
   * @returns {Error|APIError}
   */
    checkDuplicateToken(error) {
      if (error.name === 'MongoError' && error.code === 11000) {
        return new APIError({
          message: 'Validation Error',
          errors: [{
            field: 'contractAddress',
            location: 'body',
            messages: ['"Token" already Promoted'],
          }],
          status: httpStatus.CONFLICT,
          isPublic: true,
          stack: error.stack,
        });
      }
      return error;
    },
  /**
   * List users in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
   list({
    page = 1, perPage = 30, image, contractAddress,tokenName, apiData, status,
  }) {
    const options = omitBy({ image, contractAddress,tokenName, apiData, status }, isNil);
console.log(options);
    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },
 };

  
  const promotedToken = mongoose.model('promotedToken', promotedTokenSchema);
  
  module.exports = promotedToken;
  