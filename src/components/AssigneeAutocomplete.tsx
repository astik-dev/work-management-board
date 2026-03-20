import Avatar from "@mui/joy/Avatar";
import { useAppSelector } from "../redux/hooks";
import type { Member } from "../redux/membersSlice";
import Autocomplete, { type AutocompleteProps } from "@mui/joy/Autocomplete";
import AutocompleteOption from "@mui/joy/AutocompleteOption";

type AssigneeAutocompleteProps = {
	selectedAssigneeId: Member["id"] | null,
	onChange: AutocompleteProps<Member, false, false, false>["onChange"],
};

function AssigneeAutocomplete(
	{ selectedAssigneeId, onChange }: AssigneeAutocompleteProps
) {

	const members = useAppSelector(state => state.members);

	const value = members.find(member => member.id === selectedAssigneeId) || null;

	return (
		<Autocomplete
			autoHighlight
			blurOnSelect
			value={value}
			startDecorator={value && <Avatar size="sm">{value.name[0]}</Avatar>}
			options={members}
			openOnFocus={true}
			isOptionEqualToValue={(option, value) => option.id === value.id}
			getOptionLabel={option => option.name}
			getOptionKey={option => option.id}
			onChange={onChange}
			renderOption={(props, option) => (
				<AutocompleteOption {...props} key={option.id}>
					<Avatar size="sm">{option.name[0]}</Avatar>
					{option.name}
				</AutocompleteOption>
			)}
		/>
	);
}

export default AssigneeAutocomplete;
