import React, { useRef } from 'react';

const PopupButton = () => {
  const dialogRef = useRef(null);

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  return (
    <div>
      <button onClick={openDialog} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Open Dialog
      </button>

      <dialog ref={dialogRef} className='h-72 w72 fixed top-0.5 right-0.5'>
        <p>This is a simple popup dialog.</p>
        <button onClick={closeDialog}>Close</button>
      </dialog>
    </div>
  );
};

export default PopupButton;
