import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import Welcome from './screens/Welcome';
import Login from './screens/login/Login.jsx';
import Reviews from './screens/reviews/Reviews.jsx';
import ContactUsers from './screens/contactUsers/ContactUsers.jsx';
import Products from './screens/products/Products.jsx';
import ProductAddEdit from './screens/products/ProductAddEdit.jsx';
import ForgetPass from './screens/forgetPassword/ForgetPass.jsx';
import Subscribers from './screens/subscribers/Subscribers.jsx';
import Orders from './screens/orders/Orders.jsx';
import OrdersAddEdit from './screens/orders/OrdersAddEdit.jsx';
import CustomerAddEdit from './screens/contactUsers/CustomerAddEdit.jsx';
import HeroImages from './screens/heroImages/HeroImages.jsx';
import Categories from './screens/categories/Categories.jsx';

function App() {
  const Dashboard = () => {
    return (
      <>
        <div style={{ display: 'flex' }}>
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
          <Route path='/' element={<Login />} />
          <Route path='/forgetPass' element={<ForgetPass />} />
          <Route path='/dashboard/main' element={<Dashboard />}>
            <Route path='' element={<Welcome />} />
          </Route>
          <Route path='/dashboard' element={<Dashboard />}>
            <Route path='' element={<Welcome />} />
            <Route path='/dashboard/reviews' element={<Reviews />} />
            <Route path='/dashboard/customers' element={<ContactUsers />} />
            <Route
              path='/dashboard/customer/add'
              element={<CustomerAddEdit />}
            />
            <Route
              path='/dashboard/customer/edit'
              element={<CustomerAddEdit isEdit />}
            />

            <Route path='/dashboard/products' element={<Products />} />
            <Route path='/dashboard/product/add' element={<ProductAddEdit />} />
            <Route
              path='/dashboard/product/view'
              element={<ProductAddEdit isView />}
            />
            <Route
              path='/dashboard/product/edit'
              element={<ProductAddEdit isEdit />}
            />

            <Route path='/dashboard/subscribers' element={<Subscribers />} />

            <Route path='/dashboard/order' element={<Orders />} />
            <Route path='/dashboard/order/view' element={<OrdersAddEdit />} />

            <Route path='/dashboard/hero-images' element={<HeroImages />} />
            <Route path='/dashboard/categories' element={<Categories />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
