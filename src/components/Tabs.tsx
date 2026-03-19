import JoyTabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Members from "./Members";
import Tasks from './Tasks';
import { useState } from 'react';
import MemberCountChip from "./MemberCountChip";
import TaskCountChip from "./TaskCountChip";

function Tabs() {

	const [activeTab, setActiveTab] = useState(0);

	return (
		<JoyTabs
			sx={{ px: { xs: 1, sm: 2 }, py: 2, height: "100dvh" }}
			value={activeTab}
			onChange={(_, newValue) => setActiveTab(Number(newValue))}
		>
			<TabList
				sx={{
					justifyContent: "center",
					[`&& .${tabClasses.root}`]: {
						bgcolor: "transparent",
						"&:hover": {
							bgcolor: "transparent",
						},
						[`&.${tabClasses.selected}`]: {
							color: "primary.plainColor",
						},
					},
				}}
			>
				<Tab indicatorInset>
					Tasks
					<TaskCountChip isActive={activeTab === 0} />
				</Tab>
				<Tab indicatorInset>
					Members
					<MemberCountChip isActive={activeTab === 1} />
				</Tab>
			</TabList>
			<TabPanel
				value={0}
				keepMounted
				sx={{
					display: activeTab === 0 ? "flex" : null,
					flex: "auto",
					minHeight: "0",
					px: { xs: 0, sm: 2 }
				}}
			>
				<Tasks />
			</TabPanel>
			<TabPanel
				value={1}
				keepMounted
				sx={{
					display: activeTab === 1 ? "flex" : null,
					flex: "auto",
					width: "100%",
					maxWidth: "500px",
					minHeight: "0",
					mx: "auto",
					px: { xs: 1, sm: 2 },
				}}
			>
				<Members />
			</TabPanel>
		</JoyTabs>
	);
}

export default Tabs;
