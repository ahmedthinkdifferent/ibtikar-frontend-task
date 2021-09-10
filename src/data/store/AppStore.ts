import {createStore} from "redux";
import {orderReducer} from "./orderReducer";

export const appStore = createStore(orderReducer);