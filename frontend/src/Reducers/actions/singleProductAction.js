import axios from "axios";
import {
  SINGLE_PRODUCT_REQUEST,
  SINGLE_PRODUCT_FAIL,
  SINGLE_PRODUCT_SUCCESS,
} from "../constants/SingleProductConstant";

export const SingleProductAction = (urlLink) => async (dispatch) => {
  try {
    // console.log("uel == " + urlLink)
    dispatch({ type: SINGLE_PRODUCT_REQUEST });
    const {data}  = await axios.get(
      `http://localhost:5000/api/product/${urlLink}`
    );
    // console.log("dwdwdwdawa6878daw" + data.Singleproduct);
    dispatch({ type: SINGLE_PRODUCT_SUCCESS, payload: data.Singleproduct});
  } catch (error) {
    dispatch({
      type: SINGLE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
