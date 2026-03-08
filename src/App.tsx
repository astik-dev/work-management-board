import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from "react-redux";
import store from "./redux/store";
import Members from "./components/Members";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';
import Box from '@mui/material/Box';

function App() {

	const [activeTab, setActiveTab] = useState(1);

	return (
		<Provider store={store}>

			<CssBaseline />

			<TabContext value={activeTab}>
				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
					<TabList
						centered
						onChange={(_, newValue: number) => setActiveTab(newValue)}
					>
						<Tab label="Tasks" />
						<Tab label="Members" />
					</TabList>
				</Box>
				<TabPanel value={0}>

				</TabPanel>
				<TabPanel value={1} sx={{ maxWidth: "500px", p: 2, mx: "auto" }}>
					<Members />
				</TabPanel>
			</TabContext>

		</Provider>
	);
}

export default App;
