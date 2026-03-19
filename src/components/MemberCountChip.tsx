import Chip from "@mui/joy/Chip";
import { useAppSelector } from "../redux/hooks";

function MemberCountChip({ isActive }: { isActive: boolean }) {

	const members = useAppSelector(state => state.members);

	return (
		<Chip size="sm" color={isActive ? "primary" : "neutral"}>
			{members.length}
		</Chip>
	);
}

export default MemberCountChip;
