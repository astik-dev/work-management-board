import { Button, IconButton, Input, Snackbar, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { AccountBox, Delete, InfoOutline, PersonAddAlt } from "@mui/icons-material";
import { addMember, removeMember } from "../redux/members/membersActions";
import { useState } from "react";

function Members() {
	
	const members = useAppSelector(state => state.members);
	const dispatch = useAppDispatch();
	
	const [newMemberName, setNewMemberName] = useState("");
	const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

	return (
		<Stack direction="column" gap={2}>
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
							startDecorator={<PersonAddAlt />}
							disabled={newMemberName.trim() === ""}
							type="submit"
						>
							Add
						</Button>
					}
				/>
			</form>
			{members.map(member => (
				<Stack direction="row" alignItems="center" gap={1} key={member.id}>
					<Typography
						sx={{ flex: "1", overflowWrap: "anywhere" }}
						startDecorator={<AccountBox />}
					>
						{member.name}
					</Typography>
					<IconButton
						variant="outlined"
						color="danger"
						size="sm"
						onClick={() => dispatch(removeMember(member.id))}
					>
						<Delete />
					</IconButton>
				</Stack>
			))}
			<Snackbar
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				startDecorator={<InfoOutline />}
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
