const {createCommunity, createMods} = require('../controllers/communityController');    
const express = require('express');

const router = express.Router();

router.route('/createCommunity').post(createCommunity);
router.route('/createMods').patch(createMods);

module.exports = router;