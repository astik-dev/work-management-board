import type { SxProps, Theme } from "@mui/material/styles";
import { TASK_STATUSES, type Task as TaskType } from "../redux/tasks/tasksReducer";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { removeTask, updateTask } from "../redux/tasks/tasksActions";
import { createElement } from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SignalCellularAlt1BarIcon from '@mui/icons-material/SignalCellularAlt1Bar';
import SignalCellularAlt2BarIcon from '@mui/icons-material/SignalCellularAlt2Bar';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import WarningIcon from '@mui/icons-material/Warning';
import Box from "@mui/joy/Box";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import IconButton from "@mui/joy/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const PRIORITIES = [
	{ title: "None", Icon: MoreHorizIcon },
	{ title: "Low", Icon: SignalCellularAlt1BarIcon },
	{ title: "Medium", Icon: SignalCellularAlt2BarIcon },
	{ title: "High", Icon: SignalCellularAltIcon },
	{ title: "Urgent", Icon: WarningIcon },
] as const;

type TaskProps = {
	sx?: SxProps<Theme>,
	id: TaskType["id"],
}

function Task({ sx = [], id }: TaskProps) {

	const task = useAppSelector(state => state.tasks.entities[id]);
	const members = useAppSelector(state => state.members);
	const dispatch = useAppDispatch();

	return (
		<Box
			sx={[
				...(Array.isArray(sx) ? sx : [sx]),
				{
					border: "1px solid",
					borderColor: "neutral.softActiveBg",
					borderLeftWidth: "0px",
					"& > div, & > button": {
						borderRadius: 0,
						borderTopWidth: 0,
						borderBottomWidth: 0,
					},
				},
			]}
		>
			<Input
				value={task.title}
				onChange={event => {
					dispatch(updateTask({ id, title: event.target.value }));
				}}
			/>
			<Select
				defaultValue={task.status}
				onChange={(_, newValue) => {
					if (newValue === null) return;
					dispatch(updateTask({ id, status: newValue }));
				}}
			>
				{TASK_STATUSES.map(status => (
					<Option value={status} key={status}>{status}</Option>
				))}
			</Select>
			<Select
				defaultValue={task.priority}
				onChange={(_, newValue) => {
					if (newValue === null) return;
					dispatch(updateTask({ id, priority: newValue }));
				}}
				startDecorator={createElement(PRIORITIES[task.priority].Icon)}
			>
				{PRIORITIES.map((priority, index) => (
					<Option value={index} key={index}>{priority.title}</Option>
				))}
			</Select>
			<Select
				defaultValue={task.assignee?.id}
				onChange={(_, newValue) => {
					dispatch(updateTask({
						id,
						assignee: members.find(m => m.id === newValue),
					}));
				}}
			>
				{members.map(member => (
					<Option value={member.id} key={member.id}>{member.name}</Option>
				))}
			</Select>
			<IconButton
				color="danger"
				size="sm"
				onClick={() => dispatch(removeTask(id))}
			>
				<DeleteIcon />
			</IconButton>
		</Box>
	);
}

export default Task;
