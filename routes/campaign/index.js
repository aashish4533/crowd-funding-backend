const express = require('express');
const CreateCampaignRoute = require('./createCampaign.js');
const DeleteCampaignRoute = require('./deleteCampaign.js');
const UpdateCampaignRoute = require('./updateCampaign.js');

const router = express.Router();

router.use('/create',CreateCampaignRoute);
router.use('/delete',DeleteCampaignRoute);
router.use('/update',UpdateCampaignRoute);
module.exports = router;