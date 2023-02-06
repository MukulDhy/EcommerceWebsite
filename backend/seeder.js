const mongoose = require("mongoose");
require("colors");
const dotenv = require("dotenv");
const User = require("./models/userSchema");
const Product = require("./models/productSchema");
const Order = require("./models/OrderSchema");
// Dummy Data File
const users = require("./data/users");
const products = require("./data/products");
const connectDb = require("./DataBase/mongoDb");

dotenv.config();
connectDb();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    const createUser = await User.insertMany(users);
    const sampleData = products.map((product) => {
      return { ...product, User: createUser[0]._id };
    });
    await Product.insertMany(sampleData);
    console.log("Data Imported".green.inverse.bgMagenta);
    process.exit();
  } catch (err) {
    console.log(`Errors : ${err}`.red.inverse.bgGreen);
    process.exit(1);
  }
};

const dataDestroy = async (err) => {
  await User.deleteMany();
  await Product.deleteMany();
  await Order.deleteMany();
  if(err){
      console.log(`Errors : ${err}`.red.inverse.bgGreen); 
  }
  console.log("Data Destroy".green)
  process.exit();
};

if(process.argv[2] === '-d'){
    dataDestroy();
}else{
    importData(); 
}
