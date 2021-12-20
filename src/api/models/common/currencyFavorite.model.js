const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const moment = require('moment-timezone');
const APIError = require('../../errors/api-error');

const statuses = ['active', 'inactive'];

const currencyFavoriteSchema = new mongoose.Schema({
   
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    currencytoken: {
      type: String,
    },
    currencySymbol: {
      type: String,
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
 currencyFavoriteSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'ip','userId','currencytoken', 'currencySymbol', 'status'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },


  
});

/**
 * Statics
 */
 currencyFavoriteSchema.statics = {

  list({
    page = 1, perPage = 30, ip,userId,currencytoken, currencySymbol, status,
  }) {
    const options = omitBy({ ip,userId,currencytoken, currencySymbol, status }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },

};


  const favorite = mongoose.model('Favorite', currencyFavoriteSchema);
  
  module.exports = favorite;
  