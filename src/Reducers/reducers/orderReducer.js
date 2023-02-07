import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS } from "../constants/orderConstant";

export const orderCreateReducer = (state = {orders : []},action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {loading : true}
        case ORDER_CREATE_SUCCESS:
            return {loading : false,success : true,orders : action.payload};
        case ORDER_CREATE_FAIL :
            return {loading : false,success : false,error : action.payload};
        default:
            return state
    }
}