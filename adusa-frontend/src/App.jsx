import Register from "./features/auth/Register";
import {Routes,Route} from "react-router-dom"
import ErrorBoundary from "./components/ErrorBoundary"
import Login from "./features/auth/Login";
import Feed from "./features/feed/Feed";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      <main className="flex-1 grid">
          <Routes>
              <Route path="/" element={<ErrorBoundary><Feed></Feed></ErrorBoundary>}/>
              <Route path="/register" element={<ErrorBoundary>
                <Register></Register>
              </ErrorBoundary>}/>
              <Route path="/login" element={<ErrorBoundary>
                <Login></Login>
              </ErrorBoundary>}/>
          </Routes>
      </main>
   </div>
  )
}