const httpStatus = require('http-status');
const { omit } = require('lodash');
const Alert = require('../../models/common/currencyAlert.model');

/**
 * Create new Hobby
 * @public
 */
 exports.create = async (req, res, next) => {
  
    try {
      const alert = new Alert(req.body);
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