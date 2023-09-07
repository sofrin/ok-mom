import { Landing } from "./pages/Landing"
import { Route, Routes } from 'react-router-dom';
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SIgnUp";
import { NotFound } from "./pages/NotFound";
import Home from './pages/ParentHome/Home'

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

    </Routes>
  )
}

export default App
