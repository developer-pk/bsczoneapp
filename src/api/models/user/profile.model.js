const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const moment = require('moment-timezone');
const APIError = require('../../errors/api-error');

/**
 * Refresh Token Schema
 * @private
 */
 const userProfileSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    gender: {
        type: String,
        index: true,
        trim: true,
        default: null
      },
      contact: {
        type: Number,
        trim: true,
      },
      industryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Industry',
        required: true,
      },
      jobtitleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jobtitle',
        required: true,
      },
      countryId: {
        type: Number,
        ref: 'Country'
      },
      stateId:{
          type: Number,
          ref: 'State'
        },
      cityId: {
        type: Number,
        ref: 'Country'
      },
    postalCode: {
        type: Number,
        ref: 'Country'
      }
        
  }, {
    timestamps: true,
  });
  
//   userProfileSchema.statics = {
  
//     /**
//      * Generate a refresh token object and saves it into the database
//      *
//      * @param {User} user
//      * @returns {userProfileSchema}
//      */
//     generate(user) {
//       const userId = user._id;
//       const userEmail = user.email;
//       const token = `${userId}.${crypto.randomBytes(40).toString('hex')}`;
//       const expires = moment().add(30, 'days').toDate();
//       const tokenObject = new RefreshToken({
//         token, userId, userEmail, expires,
//       });
//       tokenObject.save();
//       return tokenObject;
//     },
  
//   };
  
  /**
   * @typedef userProfileSchema
   */
  const UserProfile = mongoose.model('UserProfile', userProfileSchema);
  module.exports = UserProfile;
  