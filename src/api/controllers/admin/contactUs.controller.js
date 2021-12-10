const httpStatus = require('http-status');
const { omit } = require('lodash');
const Ads = require('../../models/admin/contactUs.model');

/**
 * Create new Hobby
 * @public
 */
 exports.create = async (req, res, next) => {
  
    try {
      const ads = new Ads(Object.assign({ createdBy: req.user._id },req.body));
      const savedAds = await ads.save();
      res.status(httpStatus.CREATED);
      res.json(savedAds.transform());
    } catch (error) {
      next(Ads.checkDuplicateHobby(error));
    }
  };

  /**
 * Get Hobby list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const ads = await Ads.list(req.query);
    const transformedads = ads.map((ads) => ads.transform());
    res.json(transformedads);
  } catch (error) {
    next(error);
  } 
};
/**
 * Delete Hobby
 * @public
 */
 exports.remove = async (req, res, next) => {
  try {
   const ads = await Ads.findByIdAndDelete(req.params.adsId);
   res.status(httpStatus.NO_CONTENT).end();
  } catch (error) {
    next(error);
  } 
};