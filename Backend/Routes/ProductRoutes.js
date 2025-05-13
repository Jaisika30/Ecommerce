const express = require("express");
const { addProduct, upload, getAll, getallByUserId } = require("../Controller/ProductApi");
const router = express.Router();
router.post("/addProduct/:id",upload.single("productImg"), addProduct);
router.get("/getall/",getAll);
router.get("/getallByUserId",getallByUserId);


module.exports = router;
