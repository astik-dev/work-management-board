import Box from "@mui/joy/Box";
import { useEffect, useState } from "react";

function getClientX(
	event: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent
): number {
	return "touches" in event ? event.touches[0].clientX : event.clientX;
}

type ColumnSeparatorProps = {
	onDragMove: (movementFromStartX: number) => any,
	onDragEnd: () => any,
};

function ColumnSeparator({ onDragMove, onDragEnd }: ColumnSeparatorProps) {

	const [isDragging, setIsDragging] = useState(false);
	const [startX, setStartX] = useState(0);

	function handleDragStart(event: React.MouseEvent | React.TouchEvent) {
		setStartX(getClientX(event));
		setIsDragging(true);
	}

	useEffect(() => {
		if (!isDragging) return;

		document.body.style.userSelect = "none";

		const handleDragMove = (event: MouseEvent | TouchEvent) => {
			event.preventDefault();
			onDragMove(getClientX(event) - startX);
		};

		const handleDragEnd = () => {
			setIsDragging(false);
			onDragEnd();
		};

		window.addEventListener('mousemove', handleDragMove);
		window.addEventListener('touchmove', handleDragMove, { passive: false });
		window.addEventListener('mouseup', handleDragEnd);
		window.addEventListener('touchend', handleDragEnd);

		return () => {
			window.removeEventListener('mousemove', handleDragMove);
			window.removeEventListener('touchmove', handleDragMove);
			window.removeEventListener('mouseup', handleDragEnd);
			window.removeEventListener('touchend', handleDragEnd);
			document.body.style.userSelect = "";
		};
	}, [isDragging]);

	const activeSx = {
		backgroundColor: "focusVisible",
		transform: "scale(1.75, 1.1)",
	};

	return (
		<Box
			onMouseDown={handleDragStart}
			onTouchStart={handleDragStart}
			sx={{
				position: "absolute",
				top: "50%",
				right: `-${8 + 6 + 1}px`,
				p: "5px",
				transform: "translateY(-50%)",
				cursor: "col-resize",
				"@media (hover: hover)": {
					"&:hover div": activeSx,
				},
			}}
		>
			<Box
				sx={{
					width: "2px",
					height: "20px",
					backgroundColor: "divider",
					borderRadius: "1px",
					transition: "all 0.15s",
					...(isDragging ? activeSx : {})
				}} />
		</Box>
	);
}

export default ColumnSeparator;
