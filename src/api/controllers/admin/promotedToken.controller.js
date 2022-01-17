const httpStatus = require('http-status');
const axios = require('axios');
const { omit } = require('lodash');
const Promoted = require('../../models/admin/promotedToken.model');

/**
 * Create new Hobby
 * @public
 */
 exports.create = async (req, res, next) => {
  //  console.log("file-data", req.file.filename);
  
     try {

      const endpoint = "https://graphql.bitquery.io/";

      var gl_data = await axios.post(endpoint, {
        query: `{
          ethereum(network: bsc) {
            address(address: {is: "`+req.body.contractAddress+`"}) {
              annotation
              address
              smartContract {
                contractType
                currency {
                  symbol
                  name
                  decimals
                  tokenType
                }
              }
            }
          }
        }`,
        mode: 'cors',
      }, {
          headers: {
            "Content-Type": "application/json",
          "X-API-KEY": "BQYAOLGxCUZFuXBEylRKEPm2tYHdi2Wu",
          'Access-Control-Allow-Origin': '*',
          }
        });

      
// console.log('gl-data-----   ',JSON.stringify(gl_data.data.data.ethereum.address));
if(gl_data.data.data.ethereum.address[0].smartContract==null){
  var gl_data2 = await axios.post(endpoint, {
    query: `{
      ethereum(network: ethereum) {
        address(address: {is: "`+req.body.contractAddress+`"}) {
          annotation
          address
          smartContract {
            contractType
            currency {
              symbol
              name
              decimals
              tokenType
            }
          }
        }
      }
    }`,
    mode: 'cors',
  }, {
      headers: {
        "Content-Type": "application/json",
      "X-API-KEY": "BQYAOLGxCUZFuXBEylRKEPm2tYHdi2Wu",
      'Access-Control-Allow-Origin': '*',
      }
    });
    var api_data = gl_data2.data.data.ethereum.address;
}else{
  var api_data = gl_data.data.data.ethereum.address;
}

      const promotedToken = new Promoted(Object.assign({ createdBy: req.user._id,image:req.file.filename,apiData: api_data},req.body));
     
      console.log("sdfadffadfadfadasd",promotedToken);

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

   const promotedToken = await Promoted.findByIdAndDelete(req.params.tokenId);
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