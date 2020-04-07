import * as React from 'react';
import ListItem from './ListItem';
import { ITodoItem } from './App';

interface ITodoListProps {
    todos: ITodoItem[];
    filter: number;
    onCompletedItem: (id: number) => void;
    onDeletedItem: (id: number) => void;
}

function TodoList(props: ITodoListProps) {

    const { onDeletedItem, onCompletedItem, filter } = props;
    let todos = props.todos;
    todos = props.todos.filter((todo) => {
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
    )


}

export default TodoList;