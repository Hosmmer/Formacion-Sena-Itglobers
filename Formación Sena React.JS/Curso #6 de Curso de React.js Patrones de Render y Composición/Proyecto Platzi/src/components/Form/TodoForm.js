import React, { useState } from 'react';
import './TodoForm.css';

function TodoForm({ addTodo, setOpenModal }) {

    const [newTodoValue, setNewTodoValue] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();
        addTodo(newTodoValue);
        setOpenModal(false);
    };
    const onCancel = (event) => {
        event.preventDefault();
        setOpenModal(false);
    };

    const onChange = (event) => {
        setNewTodoValue(event.target.value);
    };


    return (
        <form
            onSubmit={onSubmit}
            className="todo-form"
        >
            <label className="todo-form__label">Escribe Tu Nuevo TODO</label>
            <textarea
                className="todo-form__textarea"
                placeholder="Escribe Tu Nueva Tarea"
                value={newTodoValue}
                onChange={onChange}
            />
            <div className="todo-form__button-container">
                <button
                    type="button"
                    className="todo-form__button--cancel"
                    onClick={onCancel}
                >
                    Cancelar
                </button>

                <button
                    type="submit"
                    className="todo-form__button--add"
                >
                    Añadir
                </button>
            </div>
        </form>
    );
}

export { TodoForm };
