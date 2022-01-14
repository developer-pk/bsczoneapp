const httpStatus = require('http-status');
const { omit } = require('lodash');
const Promoted = require('../../models/admin/promotedToken.model');

/**
 * Create new Hobby
 * @public
 */
 exports.create = async (req, res, next) => {
   console.log("file-data", req.file);
  
    try {
      const promotedToken = new Promoted(Object.assign({ createdBy: req.user._id,image:req.file.filename },req.body));
      const savedAds = await promotedToken.save();
      res.status(httpStatus.CREATED);
      res.status(httpStatus.CREATED);
      res.json({"message":"Promoted Added Successfuly","data":savedAds.transform()});
    } catch (error) {
      next(Promoted.checkDuplicateToken(error));
    }
  };

  /**
 * Get Hobby list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const promotedToken = await Promoted.list(req.query);
    const transformedToken = ads.map((promotedToken) => promotedToken.transform());
    res.status(httpStatus.OK);
    res.json(transformedToken);
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
   const promotedToken = await Promoted.findByIdAndDelete(req.params.adsId);
   res.status(httpStatus.OK);
   if(promotedToken===null){
    res.json({"message":"Token already deleted"});
   }else{
    res.json({"message":"Token deleted Successfuly","data":promotedToken});
   }
   
  } catch (error) {
    next(error);
  } 
};