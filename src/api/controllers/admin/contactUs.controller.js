const httpStatus = require('http-status');
const { omit } = require('lodash');
const ContactUs = require('../../models/admin/contactUs.model');

/**
 * Create new Hobby
 * @public
 */
 exports.create = async (req, res, next) => {
  
    try {
      const contact_us = new ContactUs(Object.assign(req.body));
      const savedMessge = await contact_us.save();
      res.status(httpStatus.CREATED);
      res.json({"message":"Message Send Successfuly","data":savedMessge.transform()});
    } catch (error) {
      next(error);
    }
  };
  exports.update = async (req, res, next) => {
    let message = await ContactUs.findOneAndUpdate(req.params.messageID, req.body, {
      new: true
    });
    res.status(httpStatus.OK);
    if(message!==null){
      
      res.json({"message":"Message Status Updated Successfuly","data":message.transform()});
    }else{
      res.json({"message":"Message Status Not Updated"});
    }
    
  };
  /**
 * Get Hobby list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const contact_us = await ContactUs.list(req.query);
    const transformedMessage = contact_us.map((contact_us) => contact_us.transform());
    res.json(transformedMessage);
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
   const contact_us = await ContactUs.findByIdAndDelete(req.params.messageID);
   res.status(httpStatus.OK);
   if(contact_us===null){
    res.json({"message":"Message already deleted"});
   }else{
    res.json({"message":"Message deleted Successfuly","data":contact_us});
   }
  } catch (error) {
    next(error);
  } 
};