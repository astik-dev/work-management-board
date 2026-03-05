import { combineReducers, createStore } from "redux";
import { membersReducer } from "./members/membersReducer";
import { tasksReducer } from "./tasks/tasksReducer";

const rootReducer = combineReducers({
	members: membersReducer,
	tasks: tasksReducer,
});

const store = createStore(rootReducer);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
