const httpStatus = require('http-status');
const { omit } = require('lodash');
const Alert = require('../../models/common/currencyAlert.model');
const Favorite = require('../../models/common/currencyFavorite.model');

/**
 * Create new Hobby
 * @public
 */
 exports.create = async (req, res, next) => {
  
    try {
      const alert = new Alert(Object.assign({ userId: req.user._id },req.body));
      const savedAlert = await alert.save();
      res.status(httpStatus.CREATED);
      res.json(savedAlert.transform());
    } catch (error) {
      next(error);
    }
  };

  /**
 * Get Hobby list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const alert = await Alert.list(req.query);
    const transformedAlert = alert.map((alert) => alert.transform());
    res.json(transformedAlert);
  } catch (error) {
    next(error);
  } 
};

exports.view =async (req, res, next) =>{
  // console.log(req.params.countryId);
    try {
     const alert = await Alert.findById(req.params.alertId);
     const transformedAlert = alert.transform();
     res.json(transformedAlert);
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
   const alert = await Alert.findByIdAndDelete(req.params.alertId);
   res.status(httpStatus.NO_CONTENT).end();
  } catch (error) {
    next(error);
  } 
};



exports.getMyAlert =async (req, res, next) =>{
  console.log(req.user.id);
    try {
     const alert = await Alert.find({
       userId:req.user.id
     });
     const transformedAlert = alert.map((alert) => alert.transform());
     res.json(transformedAlert);
   } catch (error) {
     next(error);
   }
 };


 exports.getSavedToken =async (req, res, next) =>{
  console.log(req.user.id);
  // console.log(req.params.tokenId);
    try {
      const alert = await Alert.findOne({
        userId:req.user.id,
        currencytoken:req.params.tokenId,
      });
      const favorite = await Favorite.findOne({
        userId:req.user.id,
        currencytoken:req.params.tokenId,
      });
var my_alert = true;
var my_favorite = true;
     if(alert){
      my_alert =true;
     }else{
      my_alert =false;
     }
     if(favorite){
      my_favorite =true;
     }else{
      my_favorite =false;
     }
    //  const transformedAlert = alert.transform();
     res.json({alert:my_alert,favorite:my_favorite});
   } catch (error) {
     next(error);
   }
 };
 

 

 exports.addTokenFavorite = async (req, res, next) => {
  
  try {
    const favorite = new Favorite(Object.assign({ userId: req.user._id },req.body));
    const savedFavorite = await favorite.save();
    res.status(httpStatus.CREATED);
    res.json(savedFavorite);
  } catch (error) {
    next(error);
  }
};


exports.unFavoriteToken = async (req, res, next) => {
  
  try {

    const favorite = await Favorite.findOneAndDelete({ userId: req.user._id,currencytoken:req.body.currencytoken }, function (err, token) {
      if (err){
        res.status(httpStatus.SERVER_ERROR);
        res.json({message:err});
      }
  });

  if(favorite){
    res.status(httpStatus.OK);
    res.json({message:"Token Removed from Favorite", favorite:false});
  }else{
    res.status(httpStatus.OK);
    res.json({message:"Token Already Removed from Favorite",favorite:false});
  }
  } catch (error) {
    next(error);
  }
};


exports.removeAlertUser = async (req, res, next) => {
  
  try {

    const alert = await Alert.findOneAndDelete({ userId: req.user._id,currencytoken:req.body.currencytoken }, function (err, token) {
      if (err){
        res.status(httpStatus.SERVER_ERROR);
        res.json({message:err});
      }
  });

  if(alert){
    res.status(httpStatus.OK);
    res.json({message:"Token Removed from Alert",alert:false});
  }else{
    res.status(httpStatus.OK);
    res.json({message:"Token Already Removed from Alert",alert:false});
  }
  } catch (error) {
    next(error);
  }
};


exports.myFavoriteToken = async (req, res, next) => {
  
  try {

    const favorite = await Favorite.find({ userId: req.user._id}, function (err, token) {
      if (err){
        res.status(httpStatus.SERVER_ERROR);
        res.json({message:err});
      }
  });

  if(favorite){
    res.status(httpStatus.OK);
    res.json({message:"Favorite Tokens", data:favorite});
  }else{
    res.status(httpStatus.OK);
    res.json({message:"Favorite Tokens not found"});
  }
  } catch (error) {
    next(error);
  }
};