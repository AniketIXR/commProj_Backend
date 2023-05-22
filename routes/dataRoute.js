const express = require('express');
const  {getAllData,createUser} = require('../controller/userController');

const router = express.Router();

const app = express();
app.use(express.json());

router.route('/').get(getAllData).post(createUser);

module.exports = router;