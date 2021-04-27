import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './store/todo-slice';

export default configureStore({
    reducer:{
        todo:todoReducer
    }
});

