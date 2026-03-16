import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Snackbar from "@mui/joy/Snackbar";
import Stack from "@mui/joy/Stack";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addMember } from "../redux/members/membersActions";
import { useState } from "react";
import Member from "./Member";

function Members() {
	
	const members = useAppSelector(state => state.members);
	const dispatch = useAppDispatch();
	
	const [newMemberName, setNewMemberName] = useState("");
	const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

	return (
		<Stack spacing={2} sx={{ flex: "auto" }}>
			<form
				onSubmit={event => {
					event.preventDefault();
					const newMemberNameTrimmed = newMemberName.trim();
					if (newMemberNameTrimmed === "") return;
					dispatch(addMember(newMemberNameTrimmed));
					setNewMemberName("");
					setIsSnackbarOpen(true);
				}}
			>
				<Input
					value={newMemberName}
					placeholder="Enter new member name"
					onChange={e => setNewMemberName(e.target.value)}
					endDecorator={
						<Button
							startDecorator={<PersonAddAltIcon />}
							disabled={newMemberName.trim() === ""}
							type="submit"
						>
							Add
						</Button>
					}
				/>
			</form>
			<Stack spacing={2} sx={{ overflow: "hidden auto" }}>
				{members.map(member => (
					<Member id={member.id} name={member.name} key={member.id} />
				))}
			</Stack>
			<Snackbar
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				startDecorator={<InfoOutlineIcon />}
				autoHideDuration={1200}
				open={isSnackbarOpen}
				onClose={() => setIsSnackbarOpen(false)}
			>
				New member added successfully
			</Snackbar>
		</Stack>
	);
}

export default Members;
