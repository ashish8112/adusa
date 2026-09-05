import Register from "./features/auth/Register";
import {Routes,Route} from "react-router-dom"
import ErrorBoundary from "./components/ErrorBoundary"
import Login from "./features/auth/Login";
import Feed from "./features/feed/Feed";
import Navbar from "./components/Navbar";
import ProfilePage from "./features/profile/ProfilePage";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      <main className="flex-1 grid">
          <Routes>
              <Route path="/" element={ <ErrorBoundary> <Feed/> </ErrorBoundary>}/>
              <Route path="/register" element={<ErrorBoundary> <Register/> </ErrorBoundary>}/>
              <Route path="/login" element={<ErrorBoundary> <Login/> </ErrorBoundary>}/>
              <Route path="/profile/:id" element = { <ErrorBoundary> <ProfilePage/> </ErrorBoundary>}/>
          </Routes>
      </main>
   </div>
  )
}