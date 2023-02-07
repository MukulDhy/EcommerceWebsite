import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstant";

export const addToCart = (id, qyt) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`https://ecommercewebsitefinal.onrender.com/api/product/${id}`);
    const orgData = data.Singleproduct;
    // console.log("data = " + orgData.name);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: orgData._id,
        name: orgData.name,
        image: orgData.image,
        price: orgData.price,
        countInStock: orgData.countInStock,
        qyt,
      },
    });
    // console.log("data = hellp " + orgData.name);
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
    // console.log(getState().cart.cartItems)
  } catch (error) {
    console.log("ERRORRR FOUND in add to Cart:  " + error.stack);
  }
};

export const removeToCart = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: {
        product: id,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    console.log("ERRORRR FOUND in Remove to Cart :  " + error.stack);
  }
};

export const ShippingAddressAction = (address) => async (dispatch) => {
  try {
    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS , payload : address
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify(address)
    );
  } catch (error) {
    console.log(error);
  }
};

export const paymentMethodAction = (paymentDetails) => async (dispatch) => {
  try {
    dispatch({
      type: CART_SAVE_PAYMENT_METHOD , payload : paymentDetails
    });
    localStorage.setItem(
      "paymentDetailMethod",
      JSON.stringify(paymentDetails)
    );
  } catch (error) {
    console.log(error);
  }
};
