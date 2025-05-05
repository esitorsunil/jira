import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import workspaceReducer from './workSpaceSlice';
import membersReducer from './memberSlice';

export default configureStore({
  reducer: {
    ui: uiReducer,
    workspace: workspaceReducer,
    members: membersReducer
  }
});