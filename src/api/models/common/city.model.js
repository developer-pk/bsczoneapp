const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const moment = require('moment-timezone');
const APIError = require('../../errors/api-error');

const citySchema = new mongoose.Schema({
    _id: {
      type: Number
    },
    name: {
      type: String
    },
    state: {
      type: Number,
      ref: 'State'
    }
  });
  const city = mongoose.model('City', citySchema);
  
  module.exports = city;
  