const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const moment = require('moment-timezone');
const APIError = require('../../errors/api-error');

const statuses = ['active', 'inactive'];

const currencyAlertSchema = new mongoose.Schema({
    _id: {
      type: Number
    },
    ip: {
      type: String
    },
    currencySymbol: {
      type: String,
    },
    highPrice: {
      type: Number,
    },
    lowPrice: {
      type: Number,
    },
    status: {
      type: String,
      enum: statuses,
      default: 'active',
    },
  }, {
    timestamps: true,
  });
  const alert = mongoose.model('Alert', currencyAlertSchema);
  
  module.exports = alert;
  