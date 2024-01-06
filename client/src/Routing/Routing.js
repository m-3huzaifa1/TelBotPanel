import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Dashboard from "../components/Dashboard"; 
import Login from "../components/Login";
import Register from "../components/Register";
import { AuthProvider } from "../Hooks/auth/AuthProvider";
import PersistLogin from '../Hooks/Token/PersistLogin'
import ProtectedRoutes from './ProtectedRoutes'

export default function Routing() {
   return(<>
    <AuthProvider>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="login" element={<Login/>}/>
        {/* <Route path="register" element={<Register/>}/>  */}
        <Route element={<PersistLogin/>}>
        <Route element={<ProtectedRoutes/>}>    
                <Route path='dashboard' element={<Dashboard/>} />  
        </Route>
        </Route> 
    </Routes>
    </BrowserRouter>
    </AuthProvider>
    </>
)
}