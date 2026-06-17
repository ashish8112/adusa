import { createRoot } from 'react-dom/client' // named import for react dom to create react dom 
import './index.css'
import App from './App.jsx' //default import
import {BrowserRouter} from "react-router-dom"
import ErrorBoundary from './practice/ErrorBoundary.jsx'

createRoot(document.getElementById('root'))
.render(
    <BrowserRouter>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </BrowserRouter>
) // creating root node where we can define structure and layout of our app
