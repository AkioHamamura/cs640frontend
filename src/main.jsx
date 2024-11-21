import { createRoot } from 'react-dom/client'
import './index.css'
import {Route, Routes, BrowserRouter} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Properties from "./pages/Properties.jsx";
import ResidentsPage from "./pages/Residents.jsx";
import MaintenancePage from "./pages/Maintenance.jsx";
import PaymentsPage from "./pages/Payments.jsx";
createRoot(document.getElementById('root')).render(

    <>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/residents" element={<ResidentsPage />} />
            <Route path="/WorkOrder" element={<MaintenancePage />} />
            <Route path="/Payments" element={<PaymentsPage />} />
            <Route path="/login" element={<Login/>}/>

        </Routes>
    </BrowserRouter>
    </>

)
