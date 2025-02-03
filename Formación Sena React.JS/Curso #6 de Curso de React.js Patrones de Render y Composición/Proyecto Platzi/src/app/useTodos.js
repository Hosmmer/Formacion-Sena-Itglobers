import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
const { v4: uuidv4 } = require('uuid');


function useTodos() {

    //Estados globales De mis componentes
    const { item: todos, sincronizeItem: sincronizeTodos, saveItem: saveTodos, loading, error } = useLocalStorage('TODOS_V1', []);
    const [completedMessage, setCompletedMessage] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [openModal, setOpenModal] = useState(false);

    const completedTodos = todos.filter(todo => !!todo.completed).length;
    const totalTodos = todos.length;

    const searchedTodos = Array.isArray(todos)
        ? todos.filter((todo) => {
            const todoText = todo.text.toLowerCase();
            const searchText = searchValue.toLowerCase();
            return todoText.includes(searchText);
        })
        : [];  // Ensure it's always an array

    const addTodo = (text) => {
        const newTodos = [...todos];
        newTodos.push({
            id: uuidv4(),
            text,
            completed: false,
        });

        saveTodos(newTodos); // Save to localStorage via useLocalStorage

        // Manually trigger the storage event in the same tab
        const event = new StorageEvent('storage', {
            key: 'TODOS_V1',
            newValue: JSON.stringify(newTodos),
            oldValue: JSON.stringify(todos),
        });

        window.dispatchEvent(event);  // Dispatch custom event to trigger listeners
    };


    const completeTodo = (text) => {
        const newTodos = [...todos];
        const todoIndex = newTodos.findIndex(
            (todo) => todo.text === text
        );

        newTodos[todoIndex].completed = true;
        saveTodos(newTodos);

        // Establecer el mensaje de tarea completada con detalles personalizados
        const currentTime = new Date().toLocaleTimeString();
        setCompletedMessage(`🎉 ¡Excelente! Has completado la tarea "${text}" a las ${currentTime}. ¡Sigue así! 💪`);

        // Opción para ocultar el mensaje automáticamente después de unos segundos
        setTimeout(() => setCompletedMessage(''), 6000);
    }

    const deleteTodo = (text) => {
        const newTodos = [...todos];
        const todoIndex = newTodos.findIndex(
            (todo) => todo.text === text
        );

        newTodos.splice(todoIndex, 1);
        saveTodos(newTodos);

        // Establecer el mensaje personalizado de eliminación
        setFeedbackMessage(`❌ Has eliminado la tarea "${text}". Si fue un error, ¡puedes recrearla rápidamente!`);

        // Ocultar el mensaje automáticamente después de unos segundos
        setTimeout(() => setFeedbackMessage(''), 6000);

    }



    return (

        {
            loading,
            error,
            completedTodos,
            totalTodos,
            searchValue,
            setSearchValue,
            searchedTodos,
            addTodo,
            completeTodo,
            deleteTodo,
            completedMessage,
            feedbackMessage,
            openModal,
            setOpenModal,
            sincronizeTodos,
        }

    );


}
export { useTodos };