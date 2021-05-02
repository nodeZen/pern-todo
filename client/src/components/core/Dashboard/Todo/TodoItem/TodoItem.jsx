import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, editTodo } from "../../../../../services/todo-service";

import "./TodoItem.scss";

const TodoItem = ({ id, desrciption }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [taskDescription, setTaskDescription] = useState(desrciption);
  const [errMessage, setErrMessage] = useState();

  const deleteTodoHandler = () => {
    dispatch(deleteTodo(id));
  };

  const editTaskHandler = () => {
    if (taskDescription.length) {
      dispatch(editTodo(id, taskDescription));
      setEditMode(false);
    } else {
      setErrMessage("Please enter task description");
      setEditMode(true);
    }
  };

  const taskChangeHandler = (e) => {
    setTaskDescription(e.target.value);
  };

  return (
    <div className="row my-3 todo-item">
      <div className="col-md-10">
        {editMode ? (
          <div>
            <input
              className="form-control edit-task"
              value={taskDescription}
              onChange={taskChangeHandler}
            />
            {errMessage && (
              <div className="my-3 error-message">{errMessage}</div>
            )}
          </div>
        ) : (
          <h3>{desrciption}</h3>
        )}
      </div>
      <div className="col-md-1">
        {!editMode ? (
          <button
            className="btn btn-info todo-item-button"
            onClick={() => {
              setEditMode(true);
            }}
          >
            Edit
          </button>
        ) : (
          <button
            className="btn btn-success todo-item-button"
            onClick={() => {
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
