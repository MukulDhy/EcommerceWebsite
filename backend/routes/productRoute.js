const express = require("express");
const route = express.Router();

require("colors");
const {   getProducts,
  getSingleProducts,
  createProduct,
} = require("../controller/productController");
const { adminprotected } = require("../middlewares/authMiddleware");


// Get Route For All Products
route.route("/products").get(getProducts);

// Get Route for Single Products
route.route("/product/:_id").get(getSingleProducts);

route.route("/product/createProduct").post(adminprotected,createProduct);



module.exports = route;
