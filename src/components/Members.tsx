import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Snackbar from "@mui/joy/Snackbar";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addMember, removeMember } from "../redux/members/membersActions";
import { useState } from "react";

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
					<Stack direction="row" alignItems="center" gap={1} key={member.id}>
						<Typography
							sx={{ flex: "1", overflowWrap: "anywhere" }}
							startDecorator={<AccountBoxIcon />}
						>
							{member.name}
						</Typography>
						<IconButton
							variant="outlined"
							color="danger"
							size="sm"
							onClick={() => dispatch(removeMember(member.id))}
						>
							<DeleteIcon />
						</IconButton>
					</Stack>
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
