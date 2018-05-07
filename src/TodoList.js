import React, { Component } from "react";

const Form = ({ addTodo }) => {
    let input;
    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                if (input.value !== "") {
                    addTodo(input.value);
                    input.value = "";
                }
            }}
        >
            <input
                ref={node => {
                    input = node;
                }}
            />
            <button type="submit">Add</button>
        </form>
    );
};

const Todo = ({ data, id, toggleDone }) => {
    return (
        <li
            className={data.done ? "is-done" : ""}
            onClick={() => {
                toggleDone(id);
            }}
        >
            {data.body}
        </li>
    );
};

const List = ({ items, toggleDone }) => {
    const todos = items.map((todo, id) => {
        return <Todo data={todo} key={id} id={id} toggleDone={toggleDone} />;
    });
    return <ul>{todos}</ul>;
};

export default class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        };
    }

    addTodo(text) {
        const todo = { body: text, done: false };
        this.setState(prevState => ({
          ...prevState,
          todos: [...prevState.todos, todo]
        }));
    }

    handleToggleDone(id) {
        const newTodos = this.state.todos.map((todo, index) => {
            if (index !== id) {
                return todo;
            }
            return Object.assign({}, todo, { done: !todo.done });
        });
        this.setState(prevState => ({
            ...prevState,
            todos: newTodos
        }));
    }

    render() {
        return (
            <div>
                <div>
                    <h2>Todo List</h2>
                    <Form addTodo={this.addTodo.bind(this)} />
                    <p className="task-counter">{this.state.todos.filter(todo => !todo.done).length} remaining out of {this.state.todos.length} tasks</p>
                    <List
                        items={this.state.todos}
                        toggleDone={this.handleToggleDone.bind(this)}
                    />
                </div>
                <style>{`
                    .is-done {
                        text-decoration: line-through;
                    }
                `}</style>
            </div>
        );
    }
}
