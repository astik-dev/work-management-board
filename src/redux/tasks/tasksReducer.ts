import type { RemoveMemberAction } from "../members/membersActions";
import type { Member } from "../members/membersReducer";
import { initialState as membersInitialState } from "../members/membersReducer";
import { REMOVE_MEMBER } from "../members/membersTypes";
import type { TasksAction } from "./tasksActions";
import { ADD_TASK, REMOVE_TASK, UPDATE_TASK } from "./tasksTypes";

export type Task = {
	id: number,
	title: string,
	status:
		| "To Do"
		| "In Progress"
		| "Ready for Review"
		| "In Review"
		| "Paused"
		| "Completed",
	priority: 0 | 1 | 2 | 3 | 4,
	assignee: Member | null,
}

const initialState: Task[] = [
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
		assignee: membersInitialState[3],
	},
	{
		id: 2,
		title: "Fix header responsiveness",
		status: "In Review",
		priority: 3,
		assignee: membersInitialState[1],
	},
	{
		id: 3,
		title: "Optimize image loading",
		status: "Paused",
		priority: 1,
		assignee: null,
	},
	{
		id: 4,
		title: "Implement dark mode toggle",
		status: "To Do",
		priority: 2,
		assignee: null,
	},
	{
		id: 5,
		title: "Add error handling to forms",
		status: "Ready for Review",
		priority: 4,
		assignee: membersInitialState[2],
	},
	{
		id: 6,
		title: "Update dependencies to latest versions",
		status: "To Do",
		priority: 0,
		assignee: membersInitialState[0],
	},
];

export function tasksReducer(
	state: Task[] = initialState,
	action: TasksAction | RemoveMemberAction
): Task[] {
	switch (action.type) {
		case ADD_TASK:
			return [ ...state, action.payload ];
		case UPDATE_TASK:
			return state.map(task => {
				return task.id === action.payload.id
					? { ...task, ...action.payload }
					: task;
			});
		case REMOVE_TASK:
			return state.filter(task => task.id !== action.payload);
		case REMOVE_MEMBER:
			return state.map(task => {
				return task.assignee && task.assignee.id === action.payload
					? { ...task, assignee: null }
					: task;
			});
		default:
			return state;
	}
}
