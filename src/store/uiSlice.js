import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    profileDropdownOpen: false
  },
  reducers: {
    toggleProfileDropdown: (state) => {
      state.profileDropdownOpen = !state.profileDropdownOpen;
    },
    closeProfileDropdown: (state) => {
      state.profileDropdownOpen = false;
    }
  }
});

export const { toggleProfileDropdown, closeProfileDropdown } = uiSlice.actions;
export default uiSlice.reducer;