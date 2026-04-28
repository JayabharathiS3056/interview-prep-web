const express = require("express");
const router = express.Router();
const {
  createSession,
  getSessions,
  getSessionById,
  deleteSession,
  togglePin,
  updateNote,
  getExplanation,
} = require("../controllers/sessionController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createSession);
router.get("/", protect, getSessions);
router.get("/:id", protect, getSessionById);
router.delete("/:id", protect, deleteSession);
router.put("/questions/:id/pin", protect, togglePin);
router.put("/questions/:id/note", protect, updateNote);
router.get("/questions/:id/explain", protect, getExplanation);

module.exports = router;