import { createStore } from "redux";
import thunk from "redux-thunk";

import { combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createProductReducer, ProductListReducer } from "./Reducers/reducers/productReducers";
import { SingleProductReducer } from "./Reducers/reducers/SingleProductReducer";
import { cartReducer } from "./Reducers/reducers/cartReducer";
import {
  userDetailsReducer,
  userLoginReducer,
  userRegistrationReducer,
  userUpdateDetails,
} from "./Reducers/reducers/user/userReducer";
import { orderCreateReducer } from "./Reducers/reducers/orderReducer";

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const loginFromStorgae = localStorage.getItem("userInfos")
  ? JSON.parse(localStorage.getItem("userInfos"))
  : null;
const shippingAddressfromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};
const paymentDetailsfromStorage = localStorage.getItem("paymentDetailMethod")
  ? JSON.parse(localStorage.getItem("paymentDetailMethod"))
  : {};
// console.log(cartItemsFromStorage);
const rootReducers = combineReducers({
  ProductList: ProductListReducer,
  Product: SingleProductReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegistrationReducer,
  userDetail: userDetailsReducer,
  updateUserDetail: userUpdateDetails,
  orderCreate : orderCreateReducer,
  createProduct : createProductReducer,
});

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressfromStorage,
    paymentDetail: paymentDetailsfromStorage,
  },
  userLogin: { userInfo: loginFromStorgae },
};
const middleWare = [thunk];

const store = createStore(
  rootReducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
