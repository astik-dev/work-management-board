import { configureStore } from "@reduxjs/toolkit";
import membersReducer from "./membersSlice";
import tasksReducer from "./tasksSlice";

export const store = configureStore({
	reducer: {
		members: membersReducer,
		tasks: tasksReducer,
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
