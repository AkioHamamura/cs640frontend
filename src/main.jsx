import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Route, Routes, BrowserRouter} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
createRoot(document.getElementById('root')).render(

    <>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login/>}/>

        </Routes>
    </BrowserRouter>
    </>

)
