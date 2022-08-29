const exp1 = require("express");
const router = exp1.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userControllers");
const { protect } = require('../middleware/authMiddleware')

router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/me", protect, getMe);

module.exports = router;
export {};
