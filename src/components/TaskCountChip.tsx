import Chip from "@mui/joy/Chip";
import { useAppSelector } from "../redux/hooks";
import { tasksSelectors } from "../redux/tasksSlice";

function TaskCountChip({ isActive }: { isActive: boolean }) {

	const total = useAppSelector(tasksSelectors.selectTotal);

	return (
		<Chip size="sm" color={isActive ? "primary" : "neutral"}>
			{total}
		</Chip>
	);
}

export default TaskCountChip;
