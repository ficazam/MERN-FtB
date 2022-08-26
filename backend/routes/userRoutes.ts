const exp1 = require('express');
const router = exp1.Router();
const { registerUser, loginUser } = require('../controllers/userControllers')

router.post('/', registerUser)
router.post('/login', loginUser)

module.exports = router
export {}