import { Landing } from "../pages/Landing"
import { Route, Routes } from 'react-router-dom';

import { NotFound } from "../widgets/NotFound/NotFound";
import Home from '../pages/Home'

import ParentLayout from "../widgets/ParentLayout/ParentLayout";
import SignUpWidget from "src/widgets/SignUpWidget/SignUpWidget";
import { SIgnInWidget } from "src/widgets/SIgnInWidget/SIgnInWidget";
import { FullTask } from "src/widgets/FullTask/FullTaskWidget";

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={<Landing />}
      />
      <Route
        path='/SignIn'
        element={<SIgnInWidget />}
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
  )
}

export default App
