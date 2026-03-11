import { useAppSelector } from "../redux/hooks";
import Task from "./Task";
import ColumnSeparator from "./ColumnSeparator";
import { useRef } from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";

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

	const taskIds = useAppSelector(state => state.tasks.ids);

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

	return (
		<Box
			ref={containerRef}
			sx={{ display: "grid", overflowX: "auto", overflowY: "hidden" }}
			style={Object.fromEntries(
				INITIAL_COLUMN_WIDTHS.map((w, i) => [columnWidthCssVar(i), w + "px"])
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
			{taskIds.map(id => <Task id={id} sx={gridCss} key={id} />)}
		</Box>
	);
}

export default Tasks;
