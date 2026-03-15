import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import { Provider } from "react-redux";
import store from "./redux/store";
import Tabs from './components/Tabs';

function App() {
	return (
		<Provider store={store}>
			<CssVarsProvider>
				<CssBaseline />
				<Tabs />
			</CssVarsProvider>
		</Provider>
	);
}

export default App;
