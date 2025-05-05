// store/membersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://esitorsunil.github.io/jira-clone-data/user.json';
const LOCAL_STORAGE_KEY = 'workspace_members';

export const fetchMembers = createAsyncThunk(
    'members/fetchMembers',
    async () => {
      const response = await axios.get(API_URL);
      const apiMembers = response.data.users.map(({ password, projects, username, ...rest }) => rest);
  
      const localMembers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  
      // Merge with preference to localStorage for matching IDs
      const mergedMembers = apiMembers.map(apiMember => {
        const localMatch = localMembers.find(local => local.id === apiMember.id);
        return localMatch ? { ...apiMember, ...localMatch } : apiMember;
      });
  
      // Include new local-only members
      const newLocalOnly = localMembers.filter(local => !apiMembers.some(api => api.id === local.id));
  
      return [...mergedMembers, ...newLocalOnly];
    }
  );
const membersSlice = createSlice({
  name: 'members',
  initialState: {
    list: [],
    status: 'idle',
    error: null
  },
  reducers: {
    updateMemberRole: (state, action) => {
      const { id, role } = action.payload;
      const member = state.list.find(m => m.id === id);
      if (member) {
        member.role = role;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.list));
      }
    },
    removeMember: (state, action) => {
      state.list = state.list.filter(m => m.id !== action.payload);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.list));
    },
    addMember: (state, action) => {
      const newMember = {
        ...action.payload,
        id: Date.now(), // Generate unique ID
        createdAt: new Date().toISOString()
      };
      state.list.push(newMember);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.list));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { updateMemberRole, removeMember, addMember } = membersSlice.actions;
export default membersSlice.reducer;