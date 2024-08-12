const express = require('express');
const { getAllDetails, updateDetails } = require('../controllers/banner');

const router = express.Router();

router.route('/all').get(getAllDetails);
router.route('/update/:id').put(updateDetails);

module.exports = router;