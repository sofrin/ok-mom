import { Route, Routes } from 'react-router-dom';

import { Landing } from 'pages/Landing';

import { tasksApi } from 'entities/CardTask/api/tasksApi';
import { ChildGifts } from 'pages/ChildGifts';
import { ChildHistory } from 'pages/ChildHistory';
import { ChildSchedule } from 'pages/ChildSchedule';
import { ChildSuggestions } from 'pages/ChildSuggestions';
import { ChildTasks } from 'pages/ChildTasks';
import Home from 'pages/Home';
import { ParentChildren } from 'pages/ParentChildren';
import { ParentGifts } from 'pages/ParentGifts';
import { ParentSchedule } from 'pages/ParentSchedule';
import { ParentStatistics } from 'pages/ParentStatistics';
import { ParentSuggestions } from 'pages/ParentSuggestions';
import { ChildLayout } from 'widgets/ChildLayout';
import FullTask from 'widgets/FullTask';
import { NotFound } from 'widgets/NotFound';
import { ParentLayout } from 'widgets/ParentLayout';
import { SignInWidget } from 'widgets/SignInWidget';
import { SignUpWidget } from 'widgets/SignUpWidget';

tasksApi.endpoints.getTasks.initiate('');

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
					path='/Home/schedule'
					element={<ParentSchedule />}
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
					path='/child/schedule'
					element={<ChildSchedule />}
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
