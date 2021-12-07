const httpStatus = require('http-status');
const { omit } = require('lodash');
const User = require('../../models/user.model');
const Profile = require('../../models/user/profile.model');

exports.step2 = async (req, res, next) => {
    try {
      const updatedUser = omit(req.body);
      const user = Object.assign(req.user, updatedUser);
  
    user.save()
      .then(
        (UpdatedUser) => {
          var query = {},
        update =  Object.assign({ userId: req.user._id },req.body),
        options = { upsert: true, new: true, setDefaultsOnInsert: true };
  
  // Find the document
      Profile.findOneAndUpdate(query, update, options, function(error, result) {
              if (error) next(error);
              res.status(httpStatus.OK).json({user:UpdatedUser,profile:result})
          });
        })
      .catch((e) => next(User.checkDuplicateEmail(e)));
    } catch (error) {
      next(error);
    }
  };
  