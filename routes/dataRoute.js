const express = require('express');
const  {getAllData} = require('./../controller/dataController');

const router = express.Router();

const app = express();
app.use(express.json());

router.route('/').get(getAllData);

module.exports = router;