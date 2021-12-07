const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const moment = require('moment-timezone');
const APIError = require('../../errors/api-error');

const statuses = ['active', 'inactive'];

const currencyAlertSchema = new mongoose.Schema({
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

/**
 * Methods
 */
 currencyAlertSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'ip', 'currencySymbol', 'highPrice', 'lowPrice', 'status'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },


  
});

/**
 * Statics
 */
 currencyAlertSchema.statics = {

  list({
    page = 1, perPage = 30, ip, currencySymbol, highPrice, status,
  }) {
    const options = omitBy({ ip, currencySymbol, highPrice, status }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },

};


  const alert = mongoose.model('Alert', currencyAlertSchema);
  
  module.exports = alert;
  