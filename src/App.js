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
import ForgetPass from "./screens/forgetPassword/ForgetPass.jsx";
import ServiceCard from "./screens/serviceCards/ServiceCard.jsx";
import ServiceCardsAddEdit from "./screens/serviceCards/ServiceCardsAddEdit.jsx";
import Speciality from "./screens/speciality/Speciality.jsx";
import SpecialityAddEdit from "./screens/speciality/SpecialityAddEdit.jsx";
import Orders from "./screens/orders/Orders.jsx";
import OrdersAddEdit from "./screens/orders/OrdersAddEdit.jsx";

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
          <Route path="/forgetPass" element={<ForgetPass />} />
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
            <Route path="/dashboard/speciality" element={<Speciality />} />
            <Route
              path="/dashboard/speciality/add"
              element={<SpecialityAddEdit />}
            />
            <Route
              path="/dashboard/speciality/edit"
              element={<SpecialityAddEdit isEdit />}
            />
            <Route path="/dashboard/service-cards" element={<ServiceCard />} />
            <Route
              path="/dashboard/service-cards/add"
              element={<ServiceCardsAddEdit />}
            />
            <Route
              path="/dashboard/service-cards/edit"
              element={<ServiceCardsAddEdit isEdit />}
            />
            <Route path="/dashboard/order" element={<Orders />} />
            <Route path="/dashboard/order/view" element={<OrdersAddEdit />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
