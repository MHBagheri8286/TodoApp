import React from 'react';
import TodoFilter from './TodoFilter.js'
import TodoForm from './TodoForm.js';
import TodoList from './TodoList.js';
import './App.css';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      filter: 0
    }
  }

  onSubmit = (todoItem) => {
    const { todos } = this.state;
    this.setState({ todos: todos.concat(todoItem) });
  }

  onCompletedItem = (id) => {
    const { todos } = this.state;
    const index = todos.findIndex((todo) => todo.id === id);
    if (todos[index].isCompleted)
      todos[index].isCompleted = false;
    else
      todos[index].isCompleted = true;
    this.setState({ todos });
  }

  onDeletedItem = (id) => {
    const { todos } = this.state;
    todos.splice(todos.findIndex((todo) => todo.id === id), 1);
    this.setState({ todos });
  }

  updateFilter = (filter) => {
    this.setState({ filter: filter });
  }

  render() {
    const { todos, filter } = this.state;

    return (
      <div>
        <h1>Todo App </h1>
        <TodoForm onSubmit={this.onSubmit} />
        <TodoFilter updateFilter={this.updateFilter} filter={filter} />
        <TodoList onCompletedItem={this.onCompletedItem} onDeletedItem={this.onDeletedItem} todos={todos} filter={filter} />
      </div>
    );
  }

}

export default TodoApp;