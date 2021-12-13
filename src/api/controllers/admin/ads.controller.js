const httpStatus = require('http-status');
const { omit } = require('lodash');
const Ads = require('../../models/admin/ads.model');

/**
 * Create new Hobby
 * @public
 */
 exports.create = async (req, res, next) => {
   console.log("file-data", req.file);
  
    try {
      const ads = new Ads(Object.assign({ createdBy: req.user._id,ads:req.file.filename },req.body));
      const savedAds = await ads.save();
      res.status(httpStatus.CREATED);
      res.status(httpStatus.CREATED);
      res.json({"message":"Ad Created Successfuly","data":savedAds.transform()});
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
    res.status(httpStatus.OK);
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
   res.status(httpStatus.OK);
   if(ads===null){
    res.json({"message":"Ad already deleted"});
   }else{
    res.json({"message":"Ad deleted Successfuly","data":ads});
   }
   
  } catch (error) {
    next(error);
  } 
};