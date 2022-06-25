import { createStore, combineReducers, applyMiddleware } from "redux";
import serviceList from "./reducers/serviceList";
import serviceDetails from "./reducers/serviceDetails";
import thunk from "redux-thunk";

const combined = combineReducers({
  serviceList,
  serviceDetails
})

export default createStore(combined, applyMiddleware(thunk));
