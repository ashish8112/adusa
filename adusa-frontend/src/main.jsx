import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx' 
import AuthProvider from './features/auth/AuthProvider.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import {BrowserRouter} from "react-router-dom"
createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <ErrorBoundary>
            <AuthProvider>
                <App />
            </AuthProvider>
        </ErrorBoundary>
    </BrowserRouter>
) 
