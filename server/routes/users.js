const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/userController');

router.get('/', ctrl.getUsers);
router.post('/', ctrl.createUser);
router.put('/:id', ctrl.updateUser);
router.delete('/:id', ctrl.deleteUser);

module.exports = router;
