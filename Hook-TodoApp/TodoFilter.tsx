import * as React from 'react';
import { MouseEvent } from 'react';

interface ITodoFilterProps {
    updateFilter: (filter: number) => void;
    filter: number;
}

function TodoFilter(props: ITodoFilterProps) {

    const checkFilter = (event: MouseEvent<HTMLDivElement>) => {
        let filter = (event.target as HTMLButtonElement).value;
        if (filter)
            props.updateFilter(+filter);
    }

    return (
        <div onClick={checkFilter}>
            <button className={props.filter === 0 ? 'todo-filter' : ''} value='0'>All</button>
            <button className={props.filter === 1 ? 'todo-filter' : ''} value='1'>Completed</button>
            <button className={props.filter === 2 ? 'todo-filter' : ''} value='2'>Active</button>
        </div>
    )
}

export default TodoFilter;