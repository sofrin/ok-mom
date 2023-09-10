import { Landing } from "./pages/Landing"
import { Route, Routes } from 'react-router-dom';
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SIgnUp";
import { NotFound } from "./pages/NotFound";
import Home from './pages/Home'
import { FullTask } from "./pages/FullTask";

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
        path='*'
        element={<NotFound />}
      />
      <Route
        path='/SignUp'
        element={<SignUp />}
      />
      <Route
        path='/Home'
        element={<Home />}
      />
      <Route
        path='/Home/:id'
        element={<FullTask />}
      />

    </Routes>
  )
}

export default App
