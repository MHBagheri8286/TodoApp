import * as React from 'react';
import {MouseEvent} from 'react';
import { ITodoItem } from './App';

interface IListItemProps {
    todo: ITodoItem;
    onCompletedItem: (id: number) => void;
    onDeletedItem: (id: number) => void;
}

function ListItem(props: IListItemProps) {

    const sendIndex = (event: MouseEvent<HTMLButtonElement>) => {

        const { id } = props.todo;
        const { onDeletedItem, onCompletedItem } = props;
        const name = event.currentTarget.name;
        name === "delete" ? onDeletedItem(id) : onCompletedItem(id);
    }

    const { title, isCompleted } = props.todo;
    return (
        <li className={`todo-listItem${isCompleted ? " todo-complete" : ""}`} >
            <span>{title}</span>
            <button name="complete" onClick={sendIndex}>{isCompleted ? "Active" : "Complete"}</button>
            <button name="delete" onClick={sendIndex}>Delete</button>
        </li>
    )
}

export default ListItem;