import React from 'react';
import './TodoForm.css';

class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todoInput: '',
        };
        this.id = 0;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const todoItem = { id: this.id, title: this.state.todoInput, isCompleted: false };
        this.id++;
        this.props.onSubmit(todoItem);
        this.setState({ todoInput: '' });
    }
    
    handleChange = (event) => {
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
