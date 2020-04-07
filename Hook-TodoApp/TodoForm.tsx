import * as React from 'react';
import { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import { ITodoItem } from './App';

interface ITodoFormProps {
    onSubmit: (todoItem: ITodoItem) => void;
}
function TodoForm(props: ITodoFormProps) {


    const [todoInput, setTodoInput] = useState<string>('');
    let [id, setID] = useState<number>(0);
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const todoItem: ITodoItem = { id: id, title: todoInput, isCompleted: false };
        setID(++id);
        props.onSubmit(todoItem);
        setTodoInput('');
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTodoInput(event.target.value);
    }

    return (
        <form onSubmit={handleSubmit} >
            <input type="text" value={todoInput} spellCheck="false" autoComplete="off" onChange={handleChange} />
            <button>Add</button>
        </form>
    )
}

export default TodoForm;