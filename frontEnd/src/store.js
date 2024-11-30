import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {
  getAllUserReducer,
  UserSigninReducer,
  UserSignupReducer,
} from "./reduces/UserReduces";
import { ChatReducer } from "./reduces/ChatReducer";
import {
  getAllProductReducer,
  getProductByIdReducer,
  searchProductReducer,
} from "./reduces/ProductReducer";
import {
  SelectListReducer,
  UpdateSelectListReducer,
} from "./reduces/SelectListReducer";
import {
  ListTypeProductReducer,
  TypeProductReducer,
} from "./reduces/ListTypeProductReducer";
import { CartReducer } from "./reduces/CartReducer";
import {
  addressReducer,
  getAllOrderReducer,
  getOrderByUserReducer,
  OrderInfoReducer,
  orderPayReducer,
} from "./reduces/OrderReducer";
import { InfoGhnReducer } from "./reduces/GhnReducer";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : undefined,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

const reducer = combineReducers({
  users: getAllUserReducer,
  userSignin: UserSigninReducer,
  userSignup: UserSignupReducer,

  allProduct: getAllProductReducer,
  getProductById: getProductByIdReducer,

  searchProduct: searchProductReducer,

  cart: CartReducer,

  allOrder: getAllOrderReducer,
  address: addressReducer,
  orderByUser: getOrderByUserReducer,
  orderInfo: OrderInfoReducer,
  payOrder: orderPayReducer,

  orderGhn: InfoGhnReducer,

  chat: ChatReducer,

  selectList: SelectListReducer,
  updateSelect: UpdateSelectListReducer,

  allTypeProduct: ListTypeProductReducer,
  detailType: TypeProductReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
