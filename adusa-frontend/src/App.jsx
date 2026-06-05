import ProtectedRoute from "./component/ProtectedRoute"
import NotFound from "./pages/NotFound"
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
  <Route path="/profile/:userId" element={  /*userId act as placeholder anything after profile/:123 will be stored in useParams */
  <ProtectedRoute>
    <Profile/>
  </ProtectedRoute> 
  } />
  <Route path="*" element={<NotFound/>}/>
 </Routes>
  )
}

export default App;