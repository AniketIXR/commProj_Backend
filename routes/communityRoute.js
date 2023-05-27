const {createCommunity, createMods,setVisibility} = require('../controllers/communityController');    
const express = require('express');

const router = express.Router();

router.route('/createCommunity').post(createCommunity);
router.route('/createMods').patch(createMods);
router.route('/setVisibility').patch(setVisibility);

module.exports = router;