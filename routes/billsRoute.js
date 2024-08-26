const express = require("express");
const {
  addBillsController,
  getBillsController,
  // deleteBillsController,
} = require("./../controllers/billsController");

const router = express.Router();

//routes

//MEthod - POST
router.post("/add-bills", addBillsController);

//MEthod - GET
router.get("/get-bills", getBillsController);
// router.post("/delete-item", deleteBillsController);

module.exports = router;
