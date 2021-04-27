import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllTodos, addTodo } from "../../../../services/todo-service";
import TodoItem from "./TodoItem/TodoItem";
import "./Todo.scss";
import { useState } from "react";

const Todo = ({ userId }) => {
  const dispatch = useDispatch();
  const allTodos = useSelector((state) => state.todo.todoList);
  const [taskDescription, setTaskDescription] = useState("");
  const [errMessage, setErrMessage] = useState();

  useEffect(() => {
    dispatch(getAllTodos());
  }, []);

  const addTaskHandler = (e) => {
    e.preventDefault();
    if (taskDescription.length) {
      dispatch(addTodo(userId, taskDescription));
      setTaskDescription("");
    } else {
      setErrMessage("Please enter task description");
    }
  };

  const setTaskDescriptionHandler = (e) => {
    setTaskDescription(e.target.value);
  };
  return (
    <div className="container">
      <form className="todo-form row" onSubmit={addTaskHandler}>
        <div className=" col-md-11">
          <input
            type="text"
            className="form-control"
            placeholder="New ToDo"
            value={taskDescription}
            onChange={setTaskDescriptionHandler}
          />
        </div>
        <div className="col-md-1 add-todo">
          <button type="submit" className="btn btn-primary">
            Add Task
          </button>
        </div>
        {errMessage && <div className="error-message">{errMessage}</div>}
      </form>
      {allTodos.length? <div className="container my-5">
        {allTodos.map((todo) => {
          return (
            <TodoItem
              key={todo.todo_id}
              id={todo.todo_id}
              desrciption={todo.description}
            />
          );
        })}
      </div>:<h1 className="text-center my-5 no-todo">No ToDos in the list!</h1>}
    </div>
  );
};

export default Todo;
