import React, { useState, useEffect } from 'react';
import './style.css';
import 'animate.css';
import Header from '../components/header/Header';

function Welcome() {
  return (
    <>
      <div className='mainDashView'>
        <Header />

        <div className='dashPanel mainDashPanel'>
          <div className='mainContent animate__animated animate__zoomIn'>
            <div className='md_graph'>
              <span className='welcome_text'>
                Welcome to Asyshye Fancy Flare
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Welcome;
