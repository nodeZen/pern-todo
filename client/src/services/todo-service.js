import axios from "axios";
import { getNewTodoList } from "../store/todo-slice";

export const getAllTodos = () => (dispatch) => {
  return axios
    .get("/todo-crud", {
      headers: {
        token: localStorage.token,
      },
    })
    .then((response) => {
      dispatch(getNewTodoList(response.data));
    });
};

export const addTodo = (userId, description) => (dispatch) => {
  const body = {
    userId,
    description,
  };
  return axios
    .post("/todo-crud", body, {
      headers: {
        token: localStorage.token,
      },
    })
    .then((response) => {
      dispatch(getAllTodos());
    });
};

export const deleteTodo = (todoId) => (dispatch) => {
  return axios
    .delete("/todo-crud/" + todoId, {
      headers: {
        token: localStorage.token,
      },
    })
    .then((response) => {
      dispatch(getAllTodos());
    });
};

export const editTodo = (todoId, description) => (dispatch) => {
  return axios
    .put(
      "/todo-crud/" + todoId,
      { description },
      {
        headers: {
          token: localStorage.token,
        },
      }
    )
    .then((response) => {
      dispatch(getAllTodos());
    });
};
