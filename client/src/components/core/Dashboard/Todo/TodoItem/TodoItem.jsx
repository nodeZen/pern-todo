import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, editTodo } from "../../../../../services/todo-service";

import "./TodoItem.scss";

const TodoItem = ({ id, desrciption }) => {
  const dispatch = useDispatch();
  const [editMode, seteditMode] = useState(false);
  const [taskDescription, setTaskDescription] = useState(desrciption);

  const deleteTodoHandler = () => {
    dispatch(deleteTodo(id));
  };

  const editTaskHandler = () => {
    dispatch(editTodo(id, taskDescription));
  };

  const editHandler = (boolean) => {
    seteditMode(boolean);
  };

  const taskChangeHandler = (e) => {
    setTaskDescription(e.target.value);
  };

  return (
    <div className="row my-3 todo-item">
      <div className="col-md-10">
        {editMode ? (
          <input
            className="form-control edit-task"
            value={taskDescription}
            onChange={taskChangeHandler}
          />
        ) : (
          <h3>{desrciption}</h3>
        )}
      </div>
      <div className="col-md-1">
        {!editMode ? (
          <button
            className="btn btn-info"
            onClick={() => {
              editHandler(true);
            }}
          >
            Edit
          </button>
        ) : (
          <button
            className="btn btn-success"
            onClick={() => {
              editHandler(false);
              editTaskHandler();
            }}
          >
            Done
          </button>
        )}
      </div>
      <div className="col-md-1">
        <button className="btn btn-danger" onClick={deleteTodoHandler}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
