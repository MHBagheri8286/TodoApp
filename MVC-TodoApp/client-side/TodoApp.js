
var TodoApp = (function () {

    function TodoApp(root) {
        this.root = root;
        this._model = { todos: [], filter: 0 };
        //filter: 0=all   1=completed   2=active  3=removed
    }

    TodoApp.prototype.init = function () {
        this.root.innerHTML = getTamplate();

        this.elements = {
            todoForm: document.getElementById('todoForm'),
            todoInput: document.getElementById('todoInput'),
            todoList: document.getElementById('todoList'),
            todoFilter: document.getElementById('todoFilter'),
            todoUpDown: document.getElementById('todoUpDown')
        }

        this.elements.todoForm.onsubmit = (event) => {
            event.preventDefault();
            this._model.todos.unshift({ title: todoInput.value, isCompleted: false, isDeleted: false });
            render(filterTodos(this._model.todos, this._model.filter));
            todoInput.value = null;
        }

        this.elements.todoFilter.onclick = (event) => {
            if (event.target.value) {
                this._model.filter = +event.target.value;
                let filters = event.currentTarget.children;
                for (let i = 0; i < filters.length; i++)
                    filters[i].className = this._model.filter === +filters[i].value
                        ? 'todo-filter'
                        : '';
                render(filterTodos(this._model.todos, this._model.filter));
            }
        }

        this.elements.todoUpDown.onclick = (event) => {
            if (event.target.value)
                (event.target.value === 'upload')
                    ? uploadTodos(this._model.todos)
                    : downloadTodos(callback);
        }

        const uploadTodos = (todos) => {
            let xhttp = new XMLHttpRequest();
            xhttp.open("POST", "http://127.0.0.1:8080/upload", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify(todos));
        }

        const downloadTodos = (callback) => {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    if (this.responseText === '') return;
                    callback(JSON.parse(this.responseText));
                }
            };
            xhttp.open("GET", "http://127.0.0.1:8080/upload", true);
            xhttp.send();
        }

        const callback = (todos) => {
            this._model.todos = todos;
            render(filterTodos(this._model.todos, this._model.filter));
        }

        const render = (todos) => {
            this.elements.todoList.innerHTML = '';
            todos.forEach((todo) => { this.elements.todoList.prepend(createLi(todo)); });

        }

        const createLi = (todo) => {
            var li = document.createElement('li');
            var titleSpan = document.createElement('span');
            var completeButton = document.createElement('button');
            var deleteButton = document.createElement('button');

            completeButton.innerHTML = todo.isCompleted
                ? 'Active'
                : 'Complete';
            deleteButton.innerHTML = 'Delete';

            li.className = todo.isCompleted
                ? 'todo-completed'
                : '';

            li.style.display = todo.isDeleted && (this._model.filter !== 3)
                ? 'none'
                : 'block';

            titleSpan.innerHTML = todo.title;
            titleSpan.className = 'todo-title';

            li.appendChild(titleSpan);
            li.appendChild(completeButton);
            li.appendChild(deleteButton);

            completeButton.onclick = () => {
                (todo.isCompleted === true)
                    ? todo.isCompleted = false
                    : todo.isCompleted = true;
                render(filterTodos(this._model.todos, this._model.filter));
            }

            deleteButton.onclick = () => {
                todo.isDeleted = true;

                render(filterTodos(this._model.todos, this._model.filter));
            }
            return li;
        }

        const filterTodos = (todos, filter) => {
            return todos.filter((todo) => {
                return filter === 0
                    ? true
                    : filter === 1
                        ? todo.isCompleted
                        : filter === 2
                            ? !todo.isCompleted
                            : todo.isDeleted;
            });
        }
        render(filterTodos(this._model.todos, this._model.filter));
    }

    return TodoApp;

    function getTamplate() {
        return `
        <h1>Todo App</h1>
        <div id='container'>
            <form id='todoForm'>
                <input type="text" id="todoInput" spellcheck="false" autocomplete="off">
                <button>Add</button>
            </form>
            <div id='todoUpDown'>
                <button value='upload'>Upload</button>
                <button value='download'>Download</button>
            </div>
        </div>
        <div id='todoFilter'>
            <button value='0'>All</button>
            <button value='1'>Completed</button>
            <button value='2'>Active</button>
            <button value='3'>Removed</button>
        </div>
        <ul id="todoList"></ul>
        `
    }
})();
