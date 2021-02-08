import './App.css';
import { DynamicFormArray } from './Component/DynamicArray';
import Router from './Component/Router';
import Navbar from './Component/Navbar';
function App() {
	return (
		<>
			<div>
				{/* <DynamicFormArray /> */}
				<Navbar />
				<Router />
			</div>
		</>
	);
}

export default App;
