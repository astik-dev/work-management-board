import Stack from "@mui/material/Stack";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addMember, removeMember } from "../redux/members/membersActions";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";

function Members() {
	
	const members = useAppSelector(state => state.members);
	const dispatch = useAppDispatch();
	
	const [newMemberName, setNewMemberName] = useState("");
	const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

	return (
		<Stack direction="column" gap={2}>
			<Box
				component="form"
				onSubmit={event => {
					event.preventDefault();
					const newMemberNameTrimmed = newMemberName.trim();
					if (newMemberNameTrimmed === "") return;
					dispatch(addMember(newMemberNameTrimmed));
					setNewMemberName("");
					setIsSnackbarOpen(true);
				}}
				sx={{ display: "flex", gap: 1 }}
			>
				<TextField
					size="small"
					sx={{ flex: 1 }}
					placeholder="Enter new member name"
					value={newMemberName}
					onChange={e => setNewMemberName(e.target.value)}
				/>
				<Button
					variant="contained"
					sx={{ textTransform: "none" }}
					startIcon={<PersonAddAltIcon />}
					disabled={newMemberName.trim() === ""}
					type="submit"
				>
					Add
				</Button>
			</Box>
			{members.map(member => (
				<Stack
					direction="row"
					alignItems="center"
					spacing={1}
					key={member.id}
				>
					<Avatar
						sx={{ width: "32px", height: "32px", fontSize: "1.1rem" }}
					>
						{member.name[0]}
					</Avatar>
					<Typography sx={{ flex: "1" }}>{member.name}</Typography>
					<IconButton
						color="error"
						size="small"
						onClick={() => dispatch(removeMember(member.id))}
					>
						<DeleteIcon fontSize="small" />
					</IconButton>
				</Stack>
			))}
			<Snackbar
				message={(
					<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
						<InfoOutlineIcon />
						New member added successfully
					</Box>
				)}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				autoHideDuration={1200}
				open={isSnackbarOpen}
				onClose={() => setIsSnackbarOpen(false)}
			/>
		</Stack>
	);
}

export default Members;
