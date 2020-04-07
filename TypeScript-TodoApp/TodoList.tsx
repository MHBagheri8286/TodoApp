import React from 'react';
import {Component} from 'react';
import ListItem from './ListItem';
import { ITodoItem } from './App';

interface ITodoListProps {
    todos: ITodoItem[];
    filter: number;
    onCompletedItem: (id: number) => void;
    onDeletedItem: (id: number) => void;
}

class TodoList extends Component<ITodoListProps>{
    
    render() {
        const { onDeletedItem, onCompletedItem, filter } = this.props;
        let todos = this.props.todos;
        todos = todos.filter((todo) => {
            let result;
            switch (filter) {
                case 1:
                    result = todo.isCompleted;
                    break;
                case 2:
                    result = !todo.isCompleted;
                    break;
                default:
                    result = true;
            }
            return result;
        });

        const ListItems = todos.map((todo, index) =>
            <ListItem
                key={index}
                todo={todo}
                onDeletedItem={onDeletedItem}
                onCompletedItem={onCompletedItem}
            />
        );

        return (
            <ul>
                {ListItems}
            </ul>
        );
    }
}

export default TodoList;