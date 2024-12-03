const express = require('express');
const bodyParser = require('body-parser');
const userRoute = require('./user/index.js');
const campaignRoute = require('./campaign/index.js');
const dashboardRoute = require('./dashboard/index.js');
const backerRoute = require('./backer/index.js');
const rewardsRoute = require('./rewards/index.js');

const router = express.Router();


router.use(bodyParser.json());


router.use('/user',userRoute);
router.use('/campaign',campaignRoute);
router.use('/dashboard',dashboardRoute);
router.use('/backer',backerRoute);
router.use('/rewards',rewardsRoute);


module.exports = router;