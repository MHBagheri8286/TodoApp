import React from 'react';
import ListItem from './ListItem.js';

class TodoList extends React.Component {

  render() {
    
    const { onDeletedItem, onCompletedItem } = this.props;
    let todos = this.props.todos;
    todos = todos.filter((todo) => {
      let result;
      switch (this.props.filter) {
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