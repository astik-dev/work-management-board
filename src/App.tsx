import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { Provider } from "react-redux";
import store from "./redux/store";
import Members from "./components/Members";

function App() {
	return (
		<Provider store={store}>
			<CssVarsProvider>

				<CssBaseline />

				<Tabs
					defaultValue={1}
					sx={{
						maxWidth: "1000px",
						mx: "auto",
						px: { xs: 1, sm: 2 },
						py: 2,
					}}
				>
					<TabList>
						<Tab>Tasks</Tab>
						<Tab>Members</Tab>
					</TabList>
					<TabPanel value={0}>

					</TabPanel>
					<TabPanel value={1} sx={{ px: { xs: 1, sm: 2 }, py: 2 }}>
						<Members />
					</TabPanel>
				</Tabs>

			</CssVarsProvider>
		</Provider>
	);
}

export default App;
