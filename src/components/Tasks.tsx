import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Task from "./Task";
import ColumnSeparator from "./ColumnSeparator";
import { useEffect, useRef } from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import AddIcon from '@mui/icons-material/Add';
import { addTask } from "../redux/tasks/tasksActions";
import Stack from "@mui/joy/Stack";

const TABLE_HEADERS = [ "Title", "Status", "Priority", "Assignee" ] as const;

const INITIAL_COLUMN_WIDTHS = [ 350, 200, 200, 200 ] as const;

function columnWidthCssVar<T extends number>(columnIndex: T): `--column-width-${T}` {
	return `--column-width-${columnIndex}`;
}

const gridCss = {
	display: "grid",
	gridTemplateColumns:
		INITIAL_COLUMN_WIDTHS
			.map((_, i) => `var(${columnWidthCssVar(i)})`).join(" ") + " 36px",
} as const;

function Tasks() {

	const containerRef = useRef<HTMLDivElement>(null);
	const lastTaskInputRef = useRef<HTMLInputElement>(null);
	const shouldFocusLastTaskInputRef = useRef<boolean>(false);

	const taskIds = useAppSelector(state => state.tasks.ids);
	const dispatch = useAppDispatch();

	const handleColumnSeparatorDragStart = (columnIndex: number) => () => {
		const container = containerRef.current;
		if (!container) return;
		const currentValue =
			container.style.getPropertyValue(columnWidthCssVar(columnIndex));
		container.dataset.activeColumnWidthBeforeResize =
			String(parseFloat(currentValue));
	}

	const handleColumnSeparatorDragMove = (columnIndex: number) => {
		return (movementFromStartX: number) => {
			const container = containerRef.current;
			const activeColumnWidthBeforeResize =
				container?.dataset.activeColumnWidthBeforeResize;
			if (container && activeColumnWidthBeforeResize) {
				const newWidth = +activeColumnWidthBeforeResize + movementFromStartX;
				container.style.setProperty(
					columnWidthCssVar(columnIndex),
					Math.max(newWidth, 100) + "px"
				);
			}
		};
	};

	useEffect(() => {
		if (shouldFocusLastTaskInputRef.current) {
			lastTaskInputRef.current?.focus();
			shouldFocusLastTaskInputRef.current = false;
		}
	}, [taskIds]);
	
	return (
		<Stack sx={{ flex: "auto", width: "100%", minHeight: "0" }}>
			<Box sx={{ display: "flex", justifyContent: "right", mb: 1 }}>
				<Button
					startDecorator={<AddIcon />}
					onClick={() => {
						shouldFocusLastTaskInputRef.current = true;
						dispatch(addTask());
					}}
				>
					Task
				</Button>
			</Box>
			<Box
				ref={containerRef}
				sx={{
					flex: "auto",
					display: "grid",
					alignContent: "start",
					minHeight: "0",
					overflow: "auto",
				}}
				style={Object.fromEntries(
					INITIAL_COLUMN_WIDTHS.map(
						(w, i) => [columnWidthCssVar(i), w + "px"]
					)
				)}
			>
				<Box sx={gridCss}>
					{TABLE_HEADERS.map((header, index) =>
						<Box key={header} sx={{ position: "relative", m: 1 }}>
							<Typography level="title-md">{header}</Typography>
							<ColumnSeparator
								onDragStart={handleColumnSeparatorDragStart(index)}
								onDragMove={handleColumnSeparatorDragMove(index)}
							/>
						</Box>
					)}
				</Box>
				{taskIds.map(id =>
					<Task id={id} sx={gridCss} key={id} ref={lastTaskInputRef} />
				)}
			</Box>
		</Stack>
	);
}

export default Tasks;
