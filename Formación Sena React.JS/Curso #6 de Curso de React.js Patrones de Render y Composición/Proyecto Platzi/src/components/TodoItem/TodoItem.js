import React from 'react';
import { CompleteIcon } from '../TodoItem/CompleteIcon';
import { DeleteIcon } from '../TodoItem/DeleteIcon';
import './TodoItem.css';

function TodoItem({ text, completed, completeTodo, deleteTodo, loading }) {
  // Return the skeleton loader if loading is true
  if (loading) {
    return (
      <li className="TodoItem skeleton">
        <div className="skeleton-item skeleton-complete"></div>
        <div className="skeleton-item skeleton-text"></div>
        <div className="skeleton-item skeleton-delete"></div>
      </li>
    );
  }

  // Return the regular TodoItem if loading is false
  return (
    <li className="TodoItem">
      <CompleteIcon
        completed={completed}
        onComplete={() => completeTodo(text)}
      />
      <p className={`TodoItem-p ${completed && 'TodoItem-p--complete'}`}>
        {text}
      </p>
      <DeleteIcon onDelete={() => deleteTodo(text)} />
    </li>
  );
}

export { TodoItem };
