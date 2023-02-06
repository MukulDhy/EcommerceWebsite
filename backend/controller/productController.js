const Product = require("../models/productSchema");
const asyncHandler = require("express-async-handler");

const getProducts = asyncHandler(async (req, res, next) => {
  const DataProducts = await Product.find({});
  res.status(200).json({
    DataProducts,
  });
});

const getSingleProducts = asyncHandler(async (req, res) => {
  // console.log("hello".bgCyan);
  const Singleproduct = await Product.findById(req.params._id);
  // console.log(Singleproduct);
  if (!Singleproduct) {
    res.status(400).json({
      message: "Product not Found",
    });
  } else {
    res.status(200).json({
      Singleproduct,
    });
  }
});

const createProduct = asyncHandler(async (req, res) => {
  const { name, image, description, brand, category, price, countInStock } =
    req.body;

  const product = await Product.create({
    User : req.user.id,
    name,
    image,
    description,
    brand,
    category,
    price,
    countInStock,
  });

  if (product) {
    res.status(200).json({
      _id: product._id
    });
  } else {
    res.status(401);
    throw new Error("User Not Created");
  }
});

module.exports = { getProducts, getSingleProducts,createProduct };
