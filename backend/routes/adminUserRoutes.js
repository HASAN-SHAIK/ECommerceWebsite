const express = require('express');
const { adminRegister, adminLogin, adminUpdate, getTeam } = require('../controllers/adminUserController');
const router = express.Router();

router.get('/', getTeam)
router.post('/addadmin', adminRegister);
router.post('/login', adminLogin);
router.post('/update', adminUpdate);

module.exports = router;