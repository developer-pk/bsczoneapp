const httpStatus = require('http-status');
const axios = require('axios');
const { omit } = require('lodash');
const tokenImage = require('../../models/admin/tokenImage.model');

/**
 * Create new Hobby
 * @public
 */
 exports.create = async (req, res, next) => {
  //  console.log("file-data", req.file.filename);
  
     try {

      const tokenData = new tokenImage(Object.assign({ createdBy: req.user._id,image:req.file.filename},req.body));
     
      

      const savedAds = await tokenData.save();
      res.status(httpStatus.CREATED);
      res.status(httpStatus.CREATED);
      res.json({"message":"Token Image Added Successfuly","data":savedAds.transform()});
    } catch (error) {
      next(tokenImage.checkDuplicateToken(error));
    }
  };

  /**
 * Get Hobby list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const promotedToken = await tokenImage.list(req.query);
    const transformedToken = promotedToken.map((promotedToken) => promotedToken.transform());
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

   const promotedToken = await tokenImage.findByIdAndDelete(req.params.tokenId);
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