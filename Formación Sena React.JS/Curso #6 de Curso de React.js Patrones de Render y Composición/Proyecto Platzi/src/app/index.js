import React from 'react';
import { useTodos } from './useTodos';
import { TodoCounter } from '../components/TodoCounter/TodoCounter';
import { TodoSearch } from '../components/TodoSearch/TodoSearch';
import { TodoList } from '../components/TodoList/TodoList';
import { TodoItem } from '../components/TodoItem/TodoItem';
import { TodosLoading } from '../helpers/TodosLoading';
import { TodosError } from '../helpers/TodosError';
import { EmptyTodos } from '../helpers/EmptyTodos';
import { CreateTodoButton } from '../components/CreateTodoButton/CreateTodoButton';
import { Modal } from '../Modal';
import { TodoForm } from '../components/Form/TodoForm';
import { TodoHeader } from '../components/TodoHeader';
import { ChangeAlertWithStorageListener } from '../helpers/ChangeAlert';



function App() {

  const {
    loading,
    error,
    searchedTodos,
    completedMessage,
    feedbackMessage,
    openModal,
    setOpenModal,
    totalTodos,
    completedTodos,
    searchValue, setSearchValue, addTodo,
    completeTodo, deleteTodo, sincronizeTodos,
  } = useTodos();

  return (

    <>
      <TodoHeader loading={loading}>
        <TodoCounter
          totalTodos={totalTodos}
          completedTodos={completedTodos}
        />
        <TodoSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </TodoHeader >

      {
        completedMessage && (
          <div className="CompletedMessage">
            {completedMessage}
          </div>
        )
      }
      {
        feedbackMessage && (
          <div className="FeedbackMessage">
            {feedbackMessage}
          </div>
        )
      }

      <TodoList
        error={error}
        loading={loading}
        searchedTodos={searchedTodos}
        totalTodos={totalTodos}
        onError={() => <TodosError />}
        onLoading={() => <TodosLoading />}
        searchText={searchValue}
        onEmptyTodos={() => <EmptyTodos />}
        onEmptySearchResults={(searchText) => <p>No hay resultados para {searchText}</p>}
        render={todo => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
            loading={loading}
          />
        )}
      >
        {/* {todo => (
          <TodoItem
            key={todo.text}   // Unique key using text + index
            text={todo.text}
            completed={todo.completed}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
            loading={loading}
          />

        )} */}
      </TodoList>
      <CreateTodoButton loading={loading} setOpenModal={setOpenModal} />
      {
        openModal && (
          <Modal>
            <TodoForm addTodo={addTodo} setOpenModal={setOpenModal} />
          </Modal>
        )
      }
      <ChangeAlertWithStorageListener
        loading={loading}
        sincronize={sincronizeTodos}
      />
    </>
  );


}

export default App;