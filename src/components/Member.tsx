import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeMember, type Member as MemberType } from "../redux/membersSlice";
import { useAppDispatch } from "../redux/hooks";
import Avatar from "@mui/joy/Avatar";

function Member({ id, name }: MemberType) {

	const dispatch = useAppDispatch();

	return (
		<Stack direction="row" alignItems="center" spacing={1}>
			<Avatar size="sm">{name[0]}</Avatar>
			<Typography sx={{ flex: "1", overflowWrap: "anywhere" }}>
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
