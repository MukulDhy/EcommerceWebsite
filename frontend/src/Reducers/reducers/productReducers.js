import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
} from "../constants/productConstants";
import { PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS } from "../constants/SingleProductConstant";
export const ProductListReducer = (state = { Products: [] }, action) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return { loading: true, Products: [] };
    case GET_PRODUCTS_SUCCESS:
      return { loading: false, Products: action.payload };
    case GET_PRODUCTS_FAIL:
      return { loading: false, error: action.payload , status : false };
    default:
      return state;
  }
};

export const createProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload , status : false };
    default:
      return {product : null};
  }
};
