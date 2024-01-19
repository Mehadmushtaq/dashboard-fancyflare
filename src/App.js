import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Welcome from "./screens/Welcome";
import Login from "./screens/login/Login.jsx";
import Reviews from "./screens/reviews/Reviews.jsx";
import ContactUsers from "./screens/contactUsers/ContactUsers.jsx";
import Faq from "./screens/faq/Faq.jsx";
import FaqAddEdit from "./screens/faq/FaqAddEdit.jsx";

function App() {
  const Dashboard = () => {
    return (
      <>
        <div style={{ display: "flex" }}>
          <Sidebar />
          <Outlet />
        </div>
      </>
    );
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard/main" element={<Dashboard />}>
            <Route path="" element={<Welcome />} />
          </Route>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="" element={<Welcome />} />
            <Route path="/dashboard/reviews" element={<Reviews />} />
            <Route path="/dashboard/contacts" element={<ContactUsers />} />
            <Route path="/dashboard/faq" element={<Faq />} />
            <Route path="/dashboard/faq/add" element={<FaqAddEdit />} />
            <Route path="/dashboard/faq/edit" element={<FaqAddEdit isEdit />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
