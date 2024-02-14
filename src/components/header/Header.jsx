import React, { useEffect, useRef, useState } from 'react';
import './header.css';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import noImage from '../../assets/placeholderAvatar.png';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { DashbboardIcon } from '../../SVGS';
import { PRIMARY } from '../../constants/Colors';

function DashNav(props) {
  const [imgErr, setImgErr] = useState(false);

  const [isClick, setIsClick] = useState(false);
  const handleImageErr = () => {
    setImgErr(true);
  };
  const data = {
    image_path: '../../Assests/profile2.jpeg',
  };

  const dropdownRef = useRef();
  const navigate = useNavigate();
  const logoutOnclick = () => {
    localStorage.removeItem('loginUser');
    navigate('/');
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsClick(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  function handleDropdown() {
    setIsClick(!isClick);
  }

  return (
    <>
      <div className='DashNav'>
        {props.svg ? (
          <div
            className=''
            style={{
              height: '40px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span className='svg'>
              <props.svg />
            </span>
            <span className='NavView'>{props.DashboardNavText}</span>
            {props.DashboardNavSubText ? (
              <div className='NavViewSubText'>{props.DashboardNavSubText}</div>
            ) : null}
          </div>
        ) : (
          <div className='svgnText'>
            <span className='svg'>
              <DashbboardIcon fill={PRIMARY} size='26' />
            </span>
            <span className='NavView'>Dashboard</span>
          </div>
        )}

        <div ref={dropdownRef}>
          <div className='dashNavProfile' onClick={handleDropdown}>
            <img
              className='dashNavProfileImg'
              src={imgErr ? noImage : data.image_path}
              onError={handleImageErr}
              alt='pp'
            />
            <p>Admin</p>
            <span>
              {isClick ? (
                <RiArrowDropUpLine size={28} viewBox='0 -1 22 22' />
              ) : (
                <RiArrowDropDownLine size={28} viewBox='0 -1 22 22' />
              )}
            </span>
          </div>
          <div class={isClick ? 'dropdown-content-show' : 'dropdown-content'}>
            <div className='myDropdown'>
              <div onClick={logoutOnclick} className='dropLinks'>
                <FiLogOut />
                <span>Logout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashNav;
