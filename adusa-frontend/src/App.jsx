import ProtectedRoute from "./component/ProtectedRoute"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import {Routes,Route} from "react-router-dom"
function App()
{
  return(
 <Routes>
  <Route path="/" element={<Home/>} />
  <Route path="/login" element={<Login/>} />
  <Route path="/profile" element={
  <ProtectedRoute>
    <Profile/>
  </ProtectedRoute> 
  } />
 </Routes>
  )
}

export default App;