const httpStatus = require('http-status');
const { omit } = require('lodash');
const User = require('../../models/user.model');
const emailProvider = require('../../services/emails/emailProvider');

/**
 * Create new Hobby
 * @public
 */
 exports.verifyOtp = async (req, res, next) => {
  console.log(req.body);
  console.log(req.user);
    try {
    if(req.body.otp===req.user.otp){
        const user = Object.assign(req.user, { otp: null,verifiedAt: new Date() });

        user.save()
        .then((savedUser) => {
            res.status(httpStatus.OK);
            res.json({"message":"Account Verified Successfuly"});
        })
        .catch((e) => {
            res.status(httpStatus.BAD_REQUEST);
            res.json({"message":"Problem with Verify Account, Try Again"});
        });
    }else{
        res.status(httpStatus.BAD_REQUEST);
        res.json({"message":"OTP not correct, Try Again"});
    }
    } catch (error) {
        next(error);
        }
 
 
  };

  
  exports.resendotp = async (req, res, next) => {
    console.log(req.body);
    console.log(req.user);
  try {
    const user = Object.assign(req.user, { otp: generateOTP() });

    user.save()
      .then((savedUser) => {
        emailProvider.sendOTPonEmail(savedUser);
        res.status(httpStatus.OK);
        res.json({"message":"OTP Send Successfuly"});
      })
      .catch((e) => {
        res.status(httpStatus.BAD_REQUEST);
        res.json({"message":"Problem with Sending OTP, Try Again"});
      });
    } catch (error) {
          next(error);
        }
    
     
    };

    function generateOTP() {
          
        // Declare a digits variable 
        // which stores all digits
        var digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 6; i++ ) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
      }