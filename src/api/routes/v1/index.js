const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const adsRoutes = require('./admin/ads.route');
const alertRoutes = require('./common/alert.route');
const contactUsRoutes = require('./admin/contactus.route');
const veryfyOtpRoutes = require('./common/veryfyOtp.route');
const promotedTokenRoutes = require('./admin/promotedToken.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/ads', adsRoutes);
router.use('/alert', alertRoutes);
router.use('/message', contactUsRoutes);
router.use('/otp', veryfyOtpRoutes);
router.use('/otp', veryfyOtpRoutes);
router.use('/promoted-token', promotedTokenRoutes);



module.exports = router;
