const express = require('express');
const rewardsRoute = require('./rewards.js');
const userRewardsRoute = require('./userRewards.js');

const router = express.Router();

router.use('/',rewardsRoute);
router.use('/',userRewardsRoute);

module.exports = router;