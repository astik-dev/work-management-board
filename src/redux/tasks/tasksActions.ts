import type { Task } from "./tasksReducer";
import { ADD_TASK, REMOVE_TASK, UPDATE_TASK } from "./tasksTypes";

type AddTaskAction = {
	type: typeof ADD_TASK,
	payload: Task,
}

type RemoveTaskAction = {
	type: typeof REMOVE_TASK,
	payload: Task["id"],
}

type UpdateTaskPayload = Partial<Omit<Task, "id">> & Pick<Task, "id">;

type UpdateTaskAction = {
	type: typeof UPDATE_TASK,
	payload: UpdateTaskPayload,
}

export type TasksAction = AddTaskAction | RemoveTaskAction | UpdateTaskAction;

let nextId = 10;

export function addTask(): AddTaskAction {
	return {
		type: ADD_TASK,
		payload: {
			id: nextId++,
			title: "",
			status: "To Do",
			priority: 0,
			assignee: null,
		}
	}
}

export function removeTask(id: Task["id"]): RemoveTaskAction {
	return {
		type: REMOVE_TASK,
		payload: id,
	}
}

export function updateTask(payload: UpdateTaskPayload): UpdateTaskAction {
	return {
		type: UPDATE_TASK,
		payload,
	}
}
