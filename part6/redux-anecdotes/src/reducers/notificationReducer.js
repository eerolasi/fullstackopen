import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    hideNotification() {
      return '';
    },
  },
});

export const { setNotification, hideNotification } = notificationSlice.actions;

export const showNotification = (message, time) => {
  return (dispatch) => {
    dispatch(setNotification(message));
    setTimeout(() => {
      dispatch(hideNotification());
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
