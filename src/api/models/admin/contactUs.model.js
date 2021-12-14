const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const moment = require('moment-timezone');
const APIError = require('../../errors/api-error');

const statuses = ['read', 'unread'];

 const contactUsSchema = new mongoose.Schema({
    name:{
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      required: true,
      trim: true,
      lowercase: true,
    },
    phoneNumber:{
      type: Number,
      required: true,
    },
    subject:{
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
        type: String,
        enum: statuses,
        default: 'unread',
      },
    
  }, {
    timestamps: true,
  });
  
  /**
   * @typedef contactUsSchema
   */

/**
 * Methods
 */
 contactUsSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'name', 'email','phoneNumber', 'subject', 'message','status', 'createdAt'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },
});

/**
 * Statics
 */
 contactUsSchema.statics = {
   
  /**
   * List users in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
   list({
    page = 1, perPage = 30, name, email, phoneNumber,subject,message, status,
  }) {
    const options = omitBy({ name, email, phoneNumber, subject, message, status }, isNil);
console.log(options);
    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },
 };

  const contactUs = mongoose.model('Contactus', contactUsSchema);
  
  module.exports = contactUs;
  