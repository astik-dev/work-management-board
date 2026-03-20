import {
	createEntityAdapter,
	createSlice,
} from "@reduxjs/toolkit";
import { removeMember, type Member } from "./membersSlice";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import StreamIcon from "@mui/icons-material/Stream";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import SearchIcon from "@mui/icons-material/Search";

export type Task = {
	id: number,
	title: string,
	status: typeof TASK_STATUSES[number]["label"],
	priority: 0 | 1 | 2 | 3 | 4,
	assignee: Member["id"] | null,
}

export const TASK_STATUSES = [
	{ label: "To Do", color: "neutral", icon: PanoramaFishEyeIcon },
	{ label: "In Progress", color: "warning", icon: StreamIcon },
	{ label: "Ready for Review", color: "danger", icon: DoneIcon },
	{ label: "In Review", color: "primary", icon: SearchIcon },
	{ label: "Completed", color: "success", icon: DoneAllIcon },
] as const;

const tasksAdapter = createEntityAdapter<Task>();

const initialState = tasksAdapter.getInitialState(undefined, [
	{
		id: 0, 
		title: "Refactor navigation component",
		status: "To Do",
		priority: 3,
		assignee: null,
	},
	{
		id: 1,
		title: "Implement login form",
		status: "In Progress",
		priority: 4,
		assignee: 3,
	},
	{
		id: 2,
		title: "Fix header responsiveness",
		status: "In Review",
		priority: 3,
		assignee: 1,
	},
	{
		id: 3,
		title: "Optimize image loading",
		status: "Completed",
		priority: 1,
		assignee: null,
	},
	{
		id: 4,
		title: "Implement dark mode toggle",
		status: "In Progress",
		priority: 2,
		assignee: null,
	},
	{
		id: 5,
		title: "Add error handling to forms",
		status: "Ready for Review",
		priority: 4,
		assignee: 2,
	},
	{
		id: 6,
		title: "Update dependencies to latest versions",
		status: "To Do",
		priority: 0,
		assignee: 0,
	},
]);

let nextId = 10;

const tasksSlice = createSlice({
	name: "tasks",
	initialState,
	reducers: {
		addTask(state) {
			tasksAdapter.addOne(state, {
				id: nextId++,
				title: "",
				status: "To Do",
				priority: 0,
				assignee: null,
			});
		},
		updateTask: tasksAdapter.updateOne,
		removeTask: tasksAdapter.removeOne,
	},
	extraReducers: builder => {
		builder.addCase(removeMember, (state, action) => {
			state.ids.forEach(id => {
				if (state.entities[id].assignee === action.payload) {
					state.entities[id].assignee = null;
				}
			});
		});
	}
});

export const { addTask, updateTask, removeTask } = tasksSlice.actions;
export const tasksSelectors = tasksAdapter.getSelectors(
	(state: { tasks: ReturnType<typeof tasksSlice.reducer> }) => state.tasks
);
export default tasksSlice.reducer;
