const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const moment = require('moment-timezone');
const APIError = require('../../errors/api-error');
const { json } = require('body-parser');

const statuses = ['active', 'inactive'];

 const tokenImageSchema = new mongoose.Schema({
    image:{
      type: String,
      required: true,
    },
    
    tokenName: {
      type: String,
      unique: true
    },
    contractAddress: {
      type: String,
      unique: true
    },
    symbol: {
      type: String,
      unique: true
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
 tokenImageSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'image','tokenName', 'contractAddress', 'symbol','status','createdAt'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },
});

/**
 * Statics
 */
 tokenImageSchema.statics = {
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
            messages: ['"Token" already Exist'],
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
    page = 1, perPage = 30, image,tokenName, contractAddress, symbol, status,
  }) {
    const options = omitBy({ image,tokenName, contractAddress, symbol, status }, isNil);
console.log(options);
    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },
 };

  
  const tokenImage = mongoose.model('tokenImage', tokenImageSchema);
  
  module.exports = tokenImage;
  