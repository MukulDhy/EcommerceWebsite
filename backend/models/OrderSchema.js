const mongooose = require("mongoose");

const OrderSchema = mongooose.Schema(
  {
    User: {
      type: mongooose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    OrderItems: [
      {
        ProductId: {
          type: mongooose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        name: {
          type: String,
          reqruied: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          reqruied: true,
        },
      },
    ],
    shippingAddress : {
        address : {
            type : String,
            required : true,
        },
        city : {
            type : String,
            reqruied : true,
        },
        state : {
            type : String,
            reqruied : true,
        },
        pinCode : {
            type : Number,
            reqruied : true
        },
        country : {
            type : String,
            reqruied : true,
        },
    },
    payment : {
        type : String,
        reqruied : true
    },
    paymentResults : {
        id:{type : String},
        status : {type : String},
        update_time : {
            type : String
        },
        email_address : {
            type : String
        }
    },
    taxPrice : {
        type : Number,
        required : true,
        default : 0.00
    },
    shippingPrice : {
        type : Number,
        reqruied : true,
        default : 0.00
    },
    totalPrice: {
      type: Number,
      required: true,
      default : 0.00
    },
    isPaid : {
        type : Boolean,
        required : true,
        default : false
    },
    Status: {
      type: String,
      required: true,
    },
    paidAt : {
        type : Date
    },
    isDelevierd : {
        type : Boolean,
        reqruied : true,
        default : false
    },
    DelevierdAt : {
        type : Date
    }
  },
  { timestamps: true }
);

const Order = mongooose.model("Order",OrderSchema);

module.exports = Order;
