const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getTickets,
  getSingleTicket,
  createTicket,
  deleteTicket,
  updateTicket,
} = require("../controllers/ticketController");

router.route("/").get(protect, getTickets).post(protect, createTicket);
router
  .route("/:id")
  .get(protect, getSingleTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket);

module.exports = router;
export {};
