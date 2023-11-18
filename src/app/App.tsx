import { Route, Routes } from 'react-router-dom';

import { Landing } from 'pages/Landing';

import { SignUpWidget } from 'widgets/SignUpWidget';
import { ParentLayout } from 'widgets/ParentLayout';
import Home from 'pages/Home';
import FullTask from 'widgets/FullTask';
import { NotFound } from 'widgets/NotFound';
import { SignInWidget } from 'widgets/SignInWidget';
import { ChildLayout } from 'widgets/ChildLayout';
import { ChildTasks } from 'pages/ChildTasks';
import { ChildSuggestions } from 'pages/ChildSuggestions';
import { ChildHistory } from 'pages/ChildHistory';
import { ChildGifts } from 'pages/ChildGifts';
import { ParentSuggestions } from 'pages/ParentSuggestions';
import { ParentGifts } from 'pages/ParentGifts';
import { ParentChildren } from 'pages/ParentChildren';
import { ParentStatistics } from 'pages/ParentStatistics';

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
					path='/Home/suggestions'
					element={<ParentSuggestions />}
				/>
				<Route
					path='/Home/statistics'
					element={<ParentStatistics />}
				/>
				<Route
					path='/Home/gifts'
					element={<ParentGifts />}
				/>
				<Route
					path='/Home/children'
					element={<ParentChildren />}
				/>
				<Route
					path='*'
					element={<NotFound />}
				/>
			</Route>
			<Route
				path='/child'
				element={<ChildLayout />}
			>
				<Route
					path='/child/tasks'
					element={<ChildTasks />}
				/>
				<Route
					path='/child/suggestions'
					element={<ChildSuggestions />}
				/>
				<Route
					path='/child/history'
					element={<ChildHistory />}
				/>
				<Route
					path='/child/gifts'
					element={<ChildGifts />}
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
