import { Landing } from "./pages/Landing"
import { Route, Routes } from 'react-router-dom';
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SIgnUp";
import { NotFound } from "./pages/NotFound";
import Home from './pages/Home'
import { FullTask } from "./pages/FullTask";
import ParentLayout from "./layouts/ParentLayout";

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={<Landing />}
      />
      <Route
        path='/SignIn'
        element={<SignIn />}
      />

      <Route
        path='/SignUp'
        element={<SignUp />}
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
  )
}

export default App
