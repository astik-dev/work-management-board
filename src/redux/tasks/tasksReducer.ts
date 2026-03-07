import type { RemoveMemberAction } from "../members/membersActions";
import type { Member } from "../members/membersReducer";
import { initialState as membersInitialState } from "../members/membersReducer";
import { REMOVE_MEMBER } from "../members/membersTypes";
import type { TasksAction } from "./tasksActions";
import { ADD_TASK, REMOVE_TASK, UPDATE_TASK } from "./tasksTypes";

export type Task = {
	id: number,
	title: string,
	status: typeof TASK_STATUSES[number],
	priority: 0 | 1 | 2 | 3 | 4,
	assignee: Member | null,
}

type TasksState = {
	ids: Task["id"][],
	entities: Record<Task["id"], Task>,
};

export const TASK_STATUSES = [
	"To Do", "In Progress", "Ready for Review", "In Review", "Paused", "Completed"
] as const;

const initialState: TasksState = {
	ids: [ 0, 1, 2, 3, 4, 5, 6 ],
	entities: {
		0: {
			id: 0, 
			title: "Refactor navigation component",
			status: "To Do",
			priority: 3,
			assignee: null,
		},
		1: {
			id: 1,
			title: "Implement login form",
			status: "In Progress",
			priority: 4,
			assignee: membersInitialState[3],
		},
		2: {
			id: 2,
			title: "Fix header responsiveness",
			status: "In Review",
			priority: 3,
			assignee: membersInitialState[1],
		},
		3: {
			id: 3,
			title: "Optimize image loading",
			status: "Paused",
			priority: 1,
			assignee: null,
		},
		4: {
			id: 4,
			title: "Implement dark mode toggle",
			status: "To Do",
			priority: 2,
			assignee: null,
		},
		5: {
			id: 5,
			title: "Add error handling to forms",
			status: "Ready for Review",
			priority: 4,
			assignee: membersInitialState[2],
		},
		6: {
			id: 6,
			title: "Update dependencies to latest versions",
			status: "To Do",
			priority: 0,
			assignee: membersInitialState[0],
		},
	}
};

export function tasksReducer(
	state: TasksState = initialState,
	action: TasksAction | RemoveMemberAction
): TasksState {
	switch (action.type) {
		case ADD_TASK:
			return {
				...state,
				ids: [ ...state.ids, action.payload.id ],
				entities: {
					...state.entities,
					[action.payload.id]: action.payload,
				},
			};
		case UPDATE_TASK:
			return {
				...state,
				entities: {
					...state.entities,
					[action.payload.id]: {
						...state.entities[action.payload.id],
						...action.payload,
					},
				},
			};
		case REMOVE_TASK:
			const newEntities = { ...state.entities };
			delete newEntities[action.payload];
			return {
				...state,
				ids: state.ids.filter(id => id !== action.payload),
				entities: newEntities,
			};
		case REMOVE_MEMBER:
			const tasksWithRemovedAssignee: typeof state.entities = {};
			state.ids.forEach(id => {
				const task = state.entities[id];
				if (task.assignee?.id === action.payload) {
					tasksWithRemovedAssignee[task.id] = {
						...task,
						assignee: null,
					};
				}
			});
			return {
				...state,
				entities: {
					...state.entities,
					...tasksWithRemovedAssignee,
				},
			};
		default:
			return state;
	}
}
