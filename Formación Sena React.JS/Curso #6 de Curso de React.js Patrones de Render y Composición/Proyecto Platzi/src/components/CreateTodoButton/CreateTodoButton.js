import React from 'react';
import './CreateTodoButton.css';

function CreateTodoButton({ setOpenModal, loading }) {

  return (
    <div className="CreateTodoButtonContainer">
      {loading ? (
        <div className="SkeletonBtn Skeleton-button"></div>
      ) : (
        <button
          className="CreateTodoButton"
          onClick={() => {
            setOpenModal(state => !state)
          }}
        >
          +
        </button>
      )}
    </div>
  );
}

export { CreateTodoButton };
