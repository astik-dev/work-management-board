import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Member = {
	id: number,
	name: string,
}

const initialState: Member[] = [
	{ id: 0, name: "Liam Carter" },
	{ id: 1, name: "Aria Bennett" },
	{ id: 2, name: "Mateo Alvarez" },
	{ id: 3, name: "Sofia Navarro" },
	{ id: 4, name: "Noah Walker" },
];

let nextId = 10;

const membersSlice = createSlice({
	name: "members",
	initialState,
	reducers: {
		addMember(state, action: PayloadAction<Member["name"]>) {
			state.push({
				name: action.payload,
				id: nextId++,
			});
		},
		removeMember(state, action: PayloadAction<Member["id"]>) {
			return state.filter(member => member.id !== action.payload);
		},
	},
});

export const { addMember, removeMember } = membersSlice.actions;
export default membersSlice.reducer;
