import * as React from 'react';
import {Component} from 'react';
import { ChangeEvent, FormEvent } from 'react';
import { ITodoItem } from './App';

interface ITodoItemProps {
    onSubmit: (todoItem: ITodoItem) => void;
}

interface ITodoItemState {
    todoInput: string,
}

class TodoForm extends Component<ITodoItemProps, ITodoItemState>{
    private id: number;

    constructor(props: ITodoItemProps) {
        super(props);
        this.state = {
            todoInput: '',
        };
        this.id = 0;
    }

    handleSubmit = (event: FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
        const todoItem: ITodoItem = { id: this.id, title: this.state.todoInput, isCompleted: false };
        this.id++;
        this.props.onSubmit(todoItem);
        this.setState({ todoInput: '' });
    }

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ todoInput: event.target.value });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} >
                <input type="text" value={this.state.todoInput} spellCheck="false" autoComplete="off" onChange={this.handleChange} />
                <button>Add</button>
            </form>
        );
    }
}

export default TodoForm;