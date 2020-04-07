import React from 'react';
import {Component} from 'react';
import { ITodoItem } from './App';

interface IListItemProps {
    todo: ITodoItem;
    onCompletedItem: (id: number) => void;
    onDeletedItem: (id: number) => void;
}

class ListItem extends Component<IListItemProps> {

    sendIndex = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const { id } = this.props.todo;
        const { onDeletedItem, onCompletedItem } = this.props;
        const name = event.currentTarget.name;
        name === "delete" ? onDeletedItem(id) : onCompletedItem(id);
    }

    render() {
        const { title, isCompleted } = this.props.todo;

        return (
            <li className={`todo-listItem${isCompleted ? " todo-complete" : ""}`} >
                <span>{title}</span>
                <button name="complete" onClick={this.sendIndex}>{isCompleted ? "Active" : "Complete"}</button>
                <button name="delete" onClick={this.sendIndex}>Delete</button>
            </li>
        );
    }
}

export default ListItem;