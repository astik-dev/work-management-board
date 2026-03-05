import type { MembersAction } from "./membersActions";
import { ADD_MEMBER, REMOVE_MEMBER } from "./membersTypes";

export type Member = {
	id: number,
	name: string,
}

export const initialState: Member[] = [
	{ name: "Liam Carter", id: 0 },
	{ name: "Aria Bennett", id: 1 },
	{ name: "Mateo Alvarez", id: 2 },
	{ name: "Sofia Navarro", id: 3 },
	{ name: "Noah Walker", id: 4 },
];

export function membersReducer(
	state: Member[] = initialState,
	action: MembersAction
): Member[] {
	switch (action.type) {
		case ADD_MEMBER:
			return [ ...state, action.payload ];
		case REMOVE_MEMBER:
			return state.filter(member => member.id !== action.payload);
		default:
			return state;
	}
}
