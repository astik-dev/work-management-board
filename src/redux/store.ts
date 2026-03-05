import { combineReducers, createStore } from "redux";
import { membersReducer } from "./members/membersReducer";

const rootReducer = combineReducers({
	members: membersReducer,
});

const store = createStore(rootReducer);

export default store;
