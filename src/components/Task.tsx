import type { SxProps, Theme } from "@mui/material/styles";
import { TASK_STATUSES, type Task as TaskType } from "../redux/tasks/tasksReducer";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { removeTask, updateTask } from "../redux/tasks/tasksActions";
import { createElement, forwardRef } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SignalCellularAlt1BarIcon from "@mui/icons-material/SignalCellularAlt1Bar";
import SignalCellularAlt2BarIcon from "@mui/icons-material/SignalCellularAlt2Bar";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import WarningIcon from "@mui/icons-material/Warning";
import Box from "@mui/joy/Box";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import IconButton from "@mui/joy/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AssigneeAutocomplete from "./AssigneeAutocomplete";
import Chip from "@mui/joy/Chip";

const PRIORITIES = [
	{ title: "None", icon: MoreHorizIcon, color: null },
	{ title: "Low", icon: SignalCellularAlt1BarIcon, color: "#4C77E9" },
	{ title: "Medium", icon: SignalCellularAlt2BarIcon, color: "#D03AEB" },
	{ title: "High", icon: SignalCellularAltIcon, color: "#4BBE62" },
	{ title: "Urgent", icon: WarningIcon, color: "#CE2A30" },
] as const;

type TaskProps = {
	sx?: SxProps<Theme>,
	id: TaskType["id"],
}

const Task = forwardRef((
	{ sx = [], id }: TaskProps,
	inputRef: React.ForwardedRef<HTMLInputElement>
) => {

	const task = useAppSelector(state => state.tasks.entities[id]);
	const dispatch = useAppDispatch();

	const SelectedPriorityIcon = PRIORITIES[task.priority].icon;

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
				placeholder="Enter task title"
				onChange={event => {
					dispatch(updateTask({ id, title: event.target.value }));
				}}
				slotProps={{
					input: {
						ref: inputRef,
						onKeyDown: event => {
							if (event.key === "Enter") event.currentTarget.blur();
						}
					}
				}}
			/>
			<Select
				value={task.status}
				onChange={(_, newValue) => {
					if (newValue === null) return;
					dispatch(updateTask({ id, status: newValue }));
				}}
				renderValue={option => {
					if (!option) return null;
					const status = TASK_STATUSES.find(s => s.label === option.value);
					if (!status) throw new Error("status = undefined");
					return (
						<Chip
							startDecorator={createElement(status.icon)}
							color={status.color}
						>
							{option.value}
						</Chip>
					);
				}}
			>
				{TASK_STATUSES.map(({ label, color, icon }) => (
					<Option value={label} key={label}>
						<Chip startDecorator={createElement(icon)} color={color}>
							{label}
						</Chip>
					</Option>
				))}
			</Select>
			<Select
				value={task.priority}
				onChange={(_, newValue) => {
					if (newValue === null) return;
					dispatch(updateTask({ id, priority: newValue }));
				}}
				startDecorator={
					<SelectedPriorityIcon
						sx={{ color: PRIORITIES[task.priority].color }}
					/>
				}
			>
				{PRIORITIES.map((priority, index) => {
					const Icon = priority.icon;
					return (
						<Option value={index} key={index}>
							<Icon sx={{ color: priority.color }} />
							{priority.title}
						</Option>
					)
				})}
			</Select>
			<AssigneeAutocomplete
				selectedAssigneeId={task.assignee}
				onChange={(_, newValue) => {
					dispatch(updateTask({
						id,
						assignee: newValue ? newValue.id : null,
					}));
				}}
			/>
			<IconButton
				color="danger"
				size="sm"
				onClick={() => dispatch(removeTask(id))}
			>
				<DeleteIcon />
			</IconButton>
		</Box>
	);
});

export default Task;
