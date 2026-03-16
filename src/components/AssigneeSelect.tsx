import { useAppSelector } from "../redux/hooks";
import type { Member } from "../redux/members/membersReducer";
import Autocomplete, { type AutocompleteProps } from "@mui/joy/Autocomplete";

type AssigneeSelectType = {
	selectedAssigneeId: Member["id"] | null,
	onChange: AutocompleteProps<Member, false, false, false>["onChange"],
};

function AssigneeSelect({ selectedAssigneeId, onChange }: AssigneeSelectType) {

	const members = useAppSelector(state => state.members);

	return (
		<Autocomplete
			value={members.find(member => member.id === selectedAssigneeId) || null}
			options={members}
			openOnFocus={true}
			isOptionEqualToValue={(option, value) => option.id === value.id}
			getOptionLabel={option => option.name}
			getOptionKey={option => option.id}
			onChange={onChange}
		/>
	);
}

export default AssigneeSelect;
