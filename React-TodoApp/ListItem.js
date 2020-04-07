import React from 'react';
import './ListItem.css';
import classNames from 'classnames';

class ListItem extends React.Component {

    sendIndex = (ev) => {
        const { id } = this.props.todo;
        const { onDeletedItem, onCompletedItem } = this.props;
        const name = ev.target.name;
        name === "delete" ? onDeletedItem(id) : onCompletedItem(id);
    }

    render() {
        const {title,isCompleted} = this.props.todo;
        const liClasses = classNames({
            'todo-listItem': true,
            'todo-complete': isCompleted === true
        });

        return (
            <li className={liClasses} >
                <span>{title}</span>
                <button name="complete" onClick={this.sendIndex}>{isCompleted ? "Active" : "Complete"}</button>
                <button name="delete" onClick={this.sendIndex}>Delete</button>
            </li>
        );
    }
}
export default ListItem;