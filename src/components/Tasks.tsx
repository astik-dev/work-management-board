import { useAppSelector } from "../redux/hooks";
import Task from "./Task";
import ColumnSeparator from "./ColumnSeparator";
import { useState } from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";

const TABLE_HEADERS = [ "Title", "Status", "Priority", "Assignee" ] as const;

const gridCss = {
	display: "grid",
	gridTemplateColumns: "var(--gcw-0) var(--gcw-1) var(--gcw-2) var(--gcw-3) 36px",
} as const;

const initialColumnWidths =
	[350, 200, 200, 200].map(width => ({ current: width, beforeResize: width }));

function Tasks() {

	const [columnWidths, setColumnWidths] = useState(initialColumnWidths);

	const taskIds = useAppSelector(state => state.tasks.ids);

	const handleColumnSeparatorDragMove = (columnIndex: number) => {
		return (movementFromStartX: number) => {
			setColumnWidths(prev =>
				prev.map((width, index) => index === columnIndex
					? { ...width, current: width.beforeResize + movementFromStartX }
					: width
				)
			);
		};
	};

	const handleColumnSeparatorDragEnd = (columnIndex: number) => {
		return () => {
			setColumnWidths(prev =>
				prev.map((width, index) => index === columnIndex
					? { ...width, beforeResize: width.current }
					: width
				)
			)
		}
	};

	return (
		<Box
			sx={[
				...columnWidths.map((width, index) => (
					{ [`--gcw-${index}`]: width.current + "px" }
				)),
				{ display: "grid", overflowX: "auto", overflowY: "hidden" },
			]}
		>
			<Box sx={gridCss}>
				{TABLE_HEADERS.map((header, index) =>
					<Box key={header} sx={{ position: "relative", m: 1 }}>
						<Typography level="title-md">{header}</Typography>
						<ColumnSeparator
							onDragMove={handleColumnSeparatorDragMove(index)}
							onDragEnd={handleColumnSeparatorDragEnd(index)}
						/>
					</Box>
				)}
			</Box>
			{taskIds.map(id => <Task id={id} sx={gridCss} key={id} />)}
		</Box>
	);
}

export default Tasks;
