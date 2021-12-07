const httpStatus = require('http-status');
const { omit } = require('lodash');
const Country = require('../../models/common/country.model');
const States = require('../../models/common/state.model');
const City = require('../../models/common/city.model');

/**
 * Create new Industry
 * @public
 */
//  exports.create = async (req, res, next) => {
//     try {
//       const industry = new Industry(Object.assign({ createdBy: req.user._id },req.body));
//       const savedIndustry = await industry.save();
//       res.status(httpStatus.CREATED);
//       res.json(savedIndustry.transform());
//     } catch (error) {
//       next(Industry.checkDuplicateIndustry(error));
//     }
//   };

  /**
 * Get Country list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const country = await Country.list(req.query);

    console.log(country);
    const transformedcountry = country.map((country) => country.transform());
    res.json(transformedcountry);
  } catch (error) {
    next(error);
  }
};

/**
 * View Country
 * @public
 */
exports.view =async (req, res, next) =>{
 // console.log(req.params.countryId);
   try {
    const country = await Country.findById(req.params.countryId);
    const transformedcountry = country.transform();
    res.json(transformedcountry);
  } catch (error) {
    next(error);
  }
};


exports.getStates = async (req, res, next) =>{
   console.log(req.query.name);

   var options;
   if(req.query.name){
    options = {country:req.params.countryId,name: {$regex: ".*" + req.query.name + ".*"}};
   }else{
    options ={country:req.params.countryId};
   }
    try {
     const states = await States.find(options);
     console.log(states);
    res.json(states);
   } catch (error) {
     next(error);
   }
 };

 exports.getCities = async (req, res, next) =>{
    var options;
    if(req.query.name){
      options = {state:req.params.stateId,name: {$regex: ".*" + req.query.name + ".*"}};
    }else{
      options ={state:req.params.stateId};
    }
    try {
     const cities = await City.find(options);
     console.log(cities);
    res.json(cities);
   } catch (error) {
     next(error);
   }
 };
/**
 * Delete Industry
 * @public
 */
//  exports.remove = async (req, res, next) => {
//    console.log(req.params.industryId);
//    try {
//    const industry = await Industry.findByIdAndDelete(req.params.industryId);
//    res.status(httpStatus.NO_CONTENT).end();
//   } catch (error) {
//     next(error);
//   } 
// };