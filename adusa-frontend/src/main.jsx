import { createRoot } from 'react-dom/client' // named import for react dom to create react dom 
import './index.css'
import App from './App.jsx' //default import

createRoot(document.getElementById('root')).render(<App />) // creating root node where we can define structure and layout of our app
