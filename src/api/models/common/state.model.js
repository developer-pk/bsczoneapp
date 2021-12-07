const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const moment = require('moment-timezone');
const APIError = require('../../errors/api-error');

const stateSchema = new mongoose.Schema({
    _id: {
      type: Number
    },
    name: {
      type: String
    },
    cities: [
      {
        type: Number,
        ref: 'City'
      }
    ],
    country: {
      type: Number,
      ref: 'Country'
    }
  });
  const state = mongoose.model('State', stateSchema);
  
  module.exports = state;
  