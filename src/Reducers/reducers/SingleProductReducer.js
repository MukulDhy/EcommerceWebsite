import {
  SINGLE_PRODUCT_REQUEST,
  SINGLE_PRODUCT_FAIL,
  SINGLE_PRODUCT_SUCCESS,
} from "../constants/SingleProductConstant";

export const SingleProductReducer = (state = { Product: {} }, action) => {
  switch (action.type) {
    case SINGLE_PRODUCT_REQUEST:
      return { loading: true, Product: {} };
    case SINGLE_PRODUCT_SUCCESS:
      return { loading: false, Product: action.payload };
    case SINGLE_PRODUCT_FAIL:
      return { loading: false, error: action.payload, status: false };

    default:
      return state;
  }
};
