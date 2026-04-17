const express = require("express");
const router = express.Router();

const {
  getAllAdmissions,
  updateAdmission,
  deleteAdmission
} = require("../controllers/dashboardController");

router.get("/", getAllAdmissions);
router.put("/:id", updateAdmission);
router.delete("/:id", deleteAdmission);

module.exports = router;