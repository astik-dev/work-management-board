import Chip from "@mui/joy/Chip";
import { useAppSelector } from "../redux/hooks";

function TaskCountChip({ isActive }: { isActive: boolean }) {

	const taskIds = useAppSelector(state => state.tasks.ids);

	return (
		<Chip size="sm" color={isActive ? "primary" : "neutral"}>
			{taskIds.length}
		</Chip>
	);
}

export default TaskCountChip;
