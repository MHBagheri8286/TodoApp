import React from 'react';
import './TodoFilter.css';

class TodoFilter extends React.Component {
  checkFilter = (event) => {  
    if (event.target.value)
      this.props.updateFilter(+event.target.value);
  }

  render() {
    const {filter}=this.props;
    return (
      <div onClick={this.checkFilter}>
        <button className={filter === 0 ? 'todo-filter' : ''} value='0'>All</button>
        <button className={filter === 1 ? 'todo-filter' : ''} value='1'>Completed</button>
        <button className={filter === 2 ? 'todo-filter' : ''} value='2'>Active</button>
      </div>
    );
  }
}
export default TodoFilter;