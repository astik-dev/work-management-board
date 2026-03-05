import { ADD_MEMBER, REMOVE_MEMBER } from "./membersTypes";

type AddMemberAction = {
	type: typeof ADD_MEMBER,
	payload: {
		id: number,
		name: string,
	},
}

type RemoveMemberAction = {
	type: typeof REMOVE_MEMBER,
	payload: number,
}

export type MembersAction = AddMemberAction | RemoveMemberAction;

let nextId = 10; 

export function addMember(name: string): AddMemberAction {
	return {
		type: ADD_MEMBER,
		payload: {
			id: nextId++,
			name,
		},
	}
}

export function removeMember(id: number): RemoveMemberAction {
	return {
		type: REMOVE_MEMBER,
		payload: id,
	}
}
