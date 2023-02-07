const express = require("express");
const app = express();
const port = 5000;
const products = require("./data/products");
const dotenv = require("dotenv");
require("colors");
const connectionDb = require("./DataBase/mongoDb");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoutes");
const orderRoute = require('./routes/orderRoute');

const { errorHandler } = require("./middlewares/errorMiddleware");
// dotenv config
dotenv.config();
// Connecting To Database Server Db
connectionDb();

// Body parser Route
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://ecommercewebsitef.onrender.com");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

/* Product Route */
app.use("/api", productRoute);

/* User Route */
app.use("/api/users", userRoute);

/* order Route */
app.use("/api/orders", orderRoute);

/* Middle Ware Hamesha Routes ka baad use krne hai */
app.use(errorHandler);


app.get("/", (req, res) => {
  res.send(`<h1>Hello Guyz</h1>`);
});


app.listen(process.env.PORT || port, () => {
  console.log(
    `Server is Working on port number ${process.env.PORT}.`.underline.bgGreen
  );
});
