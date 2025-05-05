// store/workspaceSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  workspaces: JSON.parse(localStorage.getItem('workspaces')) || [],
  currentWorkspace: null
};

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    addWorkspace: (state, action) => {
      state.workspaces.push(action.payload);
      localStorage.setItem('workspaces', JSON.stringify(state.workspaces));
    },
    setCurrentWorkspace: (state, action) => {
      state.currentWorkspace = action.payload;
    }
  }
});

export const { addWorkspace, setCurrentWorkspace } = workspaceSlice.actions;
export default workspaceSlice.reducer;