import { createSlice } from '@reduxjs/toolkit'

export const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todoList: [],
  },
  reducers: {
    getNewTodoList:(state,action)=>{
        state.todoList = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { getNewTodoList } = todoSlice.actions

export default todoSlice.reducer;