import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeMember } from "../redux/members/membersActions";
import type { Member as MemberType } from "../redux/members/membersReducer";
import { useAppDispatch } from "../redux/hooks";

function Member({ id, name }: MemberType) {

	const dispatch = useAppDispatch();

	return (
		<Stack direction="row" alignItems="center" spacing={1}>
			<Typography
				sx={{ flex: "1", overflowWrap: "anywhere" }}
				startDecorator={<AccountBoxIcon />}
			>
				{name}
			</Typography>
			<IconButton
				variant="outlined"
				color="danger"
				size="sm"
				onClick={() => dispatch(removeMember(id))}
			>
				<DeleteIcon />
			</IconButton>
		</Stack>
	);
}

export default Member;
