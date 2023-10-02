import { Route, Routes } from 'react-router-dom';

import { Landing } from 'pages/Landing';
import { SignInWidget } from 'widgets/SignInWidget/SIgnInWidget';
import { SignUpWidget } from 'widgets/SignUpWidget';
import { ParentLayout } from 'widgets/ParentLayout';
import Home from 'pages/Home';
import FullTask from 'widgets/FullTask';
import { NotFound } from 'widgets/NotFound';

function App() {
	return (
		<Routes>
			<Route
				path='/'
				element={<Landing />}
			/>
			<Route
				path='/SignIn'
				element={<SignInWidget />}
			/>
			<Route
				path='/SignUp'
				element={<SignUpWidget />}
			/>
			<Route
				path='/Home'
				element={<ParentLayout />}
			>
				<Route
					path='/Home/tasks'
					element={<Home />}
				/>
				<Route
					path='/Home/tasks/:id'
					element={<FullTask />}
				/>
				<Route
					path='*'
					element={<NotFound />}
				/>
			</Route>
		</Routes>
	);
}

export default App;
