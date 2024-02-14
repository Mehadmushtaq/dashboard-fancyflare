import { React } from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/logo-croped.png';
import {
  ContactIcon,
  DashbboardIcon,
  EmployeeIcon,
  InventoryIcon,
  OrdersIcon,
  PaperIcon,
} from '../../SVGS';
import { PRIMARY } from '../../constants/Colors';

function Sidebar() {
  let height = '24'; // these are the sizes of icons
  let width = '22';
  let size = '22';

  const ActiveStyle = ({ isActive }) => {
    return {
      backgroundColor: isActive ? 'white' : '',
      color: isActive ? PRIMARY : '',
      textDecoration: 'none',
      border: 'none',
      borderRadius: '7px',
    };
  };

  return (
    <nav className=''>
      <div className='sidebar_main'>
        <div className='logo'>
          <img style={{ height: '40px', width: '80%' }} src={Logo} alt='logo' />
        </div>

        <div className='catageory'>
          <div className='subCatBox'>
            <NavLink
              to='/dashboard/main'
              className='subCat'
              style={ActiveStyle}
            >
              <span className='subCatsvgs'>
                <DashbboardIcon
                  fill='currentColor'
                  stroke='currentColor'
                  height={height}
                  width={width}
                  size={size}
                />
              </span>
              <span
                className='subCatText'
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  height: '27px',
                }}
              >
                Dashboard
              </span>
            </NavLink>

            <NavLink
              to='/dashboard/order'
              className='subCat'
              style={ActiveStyle}
            >
              <span className='subCatsvgs'>
                <OrdersIcon
                  fill='currentColor'
                  stroke='currentColor'
                  height={height}
                  width={width}
                  size={size}
                />
              </span>
              <span
                className='subCatText'
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  height: '27px',
                }}
              >
                Orders
              </span>
            </NavLink>

            <NavLink
              to='/dashboard/subscribers'
              className='subCat'
              style={ActiveStyle}
            >
              <span className='subCatsvgs'>
                <ContactIcon
                  fill='currentColor'
                  stroke='currentColor'
                  height={height}
                  width={width}
                  size={size}
                />
              </span>
              <span
                className='subCatText'
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  height: '27px',
                }}
              >
                Subscribers
              </span>
            </NavLink>

            <NavLink
              to='/dashboard/products'
              className='subCat'
              style={ActiveStyle}
            >
              <span className='subCatsvgs'>
                <InventoryIcon
                  fill='currentColor'
                  stroke='currentColor'
                  height={height}
                  width={width}
                  size={size}
                />
              </span>
              <span
                className='subCatText'
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  height: '27px',
                }}
              >
                Products
              </span>
            </NavLink>
            <NavLink
              to='/dashboard/categories'
              className='subCat'
              style={ActiveStyle}
            >
              <span className='subCatsvgs'>
                <EmployeeIcon
                  fill='currentColor'
                  stroke='currentColor'
                  height={height}
                  width={width}
                  size={size}
                />
              </span>
              <span
                className='subCatText'
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  height: '27px',
                }}
              >
                Categories
              </span>
            </NavLink>

            <NavLink
              to='/dashboard/reviews'
              className='subCat'
              style={ActiveStyle}
            >
              <span className='subCatsvgs'>
                <PaperIcon
                  fill='currentColor'
                  stroke='currentColor'
                  height={height}
                  width={width}
                  size={size}
                />
              </span>
              <span
                className='subCatText'
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  height: '27px',
                }}
              >
                Reviews
              </span>
            </NavLink>

            <NavLink
              to='/dashboard/customers'
              className='subCat'
              style={ActiveStyle}
            >
              <span className='subCatsvgs'>
                <EmployeeIcon
                  fill='currentColor'
                  stroke='currentColor'
                  height={height}
                  width={width}
                  size={size}
                />
              </span>
              <span
                className='subCatText'
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  height: '27px',
                }}
              >
                Customers
              </span>
            </NavLink>

            <NavLink
              to='/dashboard/hero-images'
              className='subCat'
              style={ActiveStyle}
            >
              <span className='subCatsvgs'>
                <EmployeeIcon
                  fill='currentColor'
                  stroke='currentColor'
                  height={height}
                  width={width}
                  size={size}
                />
              </span>
              <span
                className='subCatText'
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  height: '27px',
                }}
              >
                Main Images
              </span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
