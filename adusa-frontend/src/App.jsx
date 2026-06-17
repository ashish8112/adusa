import ProtectedRoute from "./component/ProtectedRoute"
import NotFound from "./pages/NotFound"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import {Routes,Route} from "react-router-dom"
import ErrorBoundary from "./practice/ErrorBoundary"
function App()
{
  return(
 <Routes>
  <Route path="/" element={
    <ErrorBoundary>
        <Home/>
    </ErrorBoundary>
  } />
  <Route path="/login" element={
    <ErrorBoundary>
        <Login/>
    </ErrorBoundary>
    } />
  <Route path="/profile/:userId" element={  /*userId act as placeholder anything after profile/:123 will be stored in useParams */
  <ErrorBoundary>
  <ProtectedRoute>
    <Profile/>
  </ProtectedRoute> 
  </ErrorBoundary>
  } />
  <Route path="*" element={<NotFound/>}/>
 </Routes>
  )
}

export default App;