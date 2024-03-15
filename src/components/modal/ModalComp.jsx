import React, { useEffect } from 'react';
import './modal.css';
import Modal from 'react-modal';
import 'animate.css';
import { RxCross2 } from 'react-icons/rx';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { HiOutlineExclamationCircle } from 'react-icons/hi2';
export default function SimpleModal({
  isVisible,
  setIsVisible = () => {},
  isDisabled = false,
  isErr = false,
  isCaution = false,
  isLoading = false,
  msg = 'Data recieved successfully.',
  errMsg = 'Error',
  onClick = () => {},
}) {
  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  return (
    <Modal
      isOpen={isVisible}
      className='modal animate__animated animate__zoomIn'
      style={{ display: 'flex' }}
    >
      <div
        className='modal_container'
        style={{ minHeight: '31%', minWidth: '25%' }}
      >
        <div
          className='del_cross_icon'
          onClick={(e) => {
            setIsVisible(false);
          }}
        >
          <RxCross2 color='white' size={'16'} />
        </div>
        {isErr ? (
          <div
            style={{
              position: 'absolute',
              top: '5px',
              left: '15px',
              color: 'red',
              fontSize: '0.87rem',
            }}
          >
            {errMsg}
          </div>
        ) : null}
        {isErr || isCaution ? (
          <HiOutlineExclamationCircle
            size={34}
            color={isErr ? 'red' : '#43c475'}
          />
        ) : (
          <IoIosCheckmarkCircleOutline size={34} color='#43c475' />
        )}
        <h5
          style={{
            color: isErr ? 'red' : '#43c475',
            marginBottom: '60px',
            marginTop: '30px',
          }}
        >
          {msg}
        </h5>
        <button disabled={isDisabled} onClick={onClick} className='delete_btn'>
          {isLoading ? <LoadingSpinner /> : 'Delete'}
        </button>
      </div>
    </Modal>
  );
}
