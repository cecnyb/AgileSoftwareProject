import React from 'react';

import './index.css';
import ReactDOM from "react-dom";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Signin";
import Signup from './Pages/Signup';
import Profile from "./Profile";
import App from './App';
import { AuthProvider } from "./AuthProvider";
import DatabaseAccess from "./Pages/DatabaseAccess";

//const root = ReactDOM.createRoot(document.getElementById('root'));
//root.render(
ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="profile" element={<Profile />} />
            <Route path="databaseaccess" element={<DatabaseAccess />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
