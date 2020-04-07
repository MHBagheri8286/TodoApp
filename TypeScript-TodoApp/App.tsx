import * as React from 'react';
import { Component } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';
import './App.scss';

export interface ITodoItem {
  id: number,
  title: string,
  isCompleted: boolean
}

interface ITodoAppProps { }

interface ITodoAppState {
  todos: ITodoItem[],
  filter: number
}

class TodoApp extends Component<ITodoAppProps, ITodoAppState> {

  constructor(props: ITodoAppProps) {
    super(props);
    this.state = {
      todos: [],
      filter: 0
    }
  }

  onSubmit = (todoItem: ITodoItem) => {
    const { todos } = this.state;
    this.setState({ todos: todos.concat(todoItem) });
  }

  onCompletedItem = (id: number) => {
    const { todos } = this.state;
    const index = todos.findIndex((todo) => todo.id === id);
    if (todos[index].isCompleted)
      todos[index].isCompleted = false;
    else
      todos[index].isCompleted = true;
    this.setState({ todos });
  }

  onDeletedItem = (id: number) => {
    const { todos } = this.state;
    todos.splice(todos.findIndex((todo) => todo.id === id), 1);
    this.setState({ todos });
  }

  updateFilter = (filter: number) => {
    this.setState({ filter: filter });
  }

  render() {
    const { todos, filter } = this.state;
    return (
      <div>
        <h1>Todo App </h1>
        <TodoForm onSubmit={this.onSubmit} />
        <TodoFilter filter={filter} updateFilter={this.updateFilter} />
        <TodoList
          todos={todos}
          filter={filter}
          onCompletedItem={this.onCompletedItem}
          onDeletedItem={this.onDeletedItem}
        />

      </div>
    );
  }

}

export default TodoApp;