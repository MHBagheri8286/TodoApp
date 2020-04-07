import * as React from 'react';
import { useState } from 'react';
import TodoForm from './TodoForm';
import TodoFilter from './TodoFilter';
import TodoList from './TodoList';
import './App.scss';

export interface ITodoItem {
  id: number,
  title: string,
  isCompleted: boolean
}

interface ITodoAppProps { }

function TodoApp(props: ITodoAppProps) {

  const [todos, setTodos] = useState<ITodoItem[]>([]);
  const [filter, setFilter] = useState<number>(0);

  const onSubmit = (todoItem: ITodoItem) => {
    setTodos(todos.concat(todoItem));

  }

  const onCompletedItem = (id: number) => {
    const index = todos.findIndex((todo) => todo.id === id);
    if (todos[index].isCompleted)
      todos[index].isCompleted = false;
    else
      todos[index].isCompleted = true;
    setTodos(([] as ITodoItem[]).concat(todos));
  }

  const onDeletedItem = (id: number) => {
    todos.splice(todos.findIndex((todo) => todo.id === id), 1);
    setTodos(([] as ITodoItem[]).concat(todos));
  }

  const updateFilter = (filter: number) => {
    setFilter(filter);
  }

  return (

    <div>
      <h1>Todo App</h1>
      <TodoForm onSubmit={onSubmit} />
      <TodoFilter filter={filter} updateFilter={updateFilter} />
      <TodoList
        todos={todos}
        filter={filter}
        onCompletedItem={onCompletedItem}
        onDeletedItem={onDeletedItem}
      />
    </div>

  )
}

export default TodoApp;