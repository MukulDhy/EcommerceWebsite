const User = require("../models/OrderSchema");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Order = require("../models/OrderSchema");

const addOrderItem = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemPrice,
    taxPrices,
    shippingPrices,
    totalPrices,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(401);
    throw new Error("No order Found");
    return;
  }
  const order = await Order.create({
    orderItems,
    User : req.user._id,
    shippingAddress,
    paymentMethod,
    itemPrice,
    taxPrices,
    shippingPrices,
    totalPrices,
  });
  await order.save();

  res.status(200).json(
    order
  );
});

module.exports = {addOrderItem};