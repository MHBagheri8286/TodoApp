import React from 'react';
import {Component} from 'react';
import {MouseEvent} from 'react';
interface ITodoFilterProps {
    updateFilter: (filter: number) => void;
    filter: number;
}

class TodoFilter extends Component<ITodoFilterProps> {

    checkFilter = (event: MouseEvent<HTMLDivElement>) => {
        let filter = (event.target as HTMLButtonElement).value;
        if (filter)
            this.props.updateFilter(+filter);
    }

    render() {
        const { filter } = this.props;
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
