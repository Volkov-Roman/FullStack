import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'Welcome to Anecdotes app!',
  reducers: {
    setNotificationText(state, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    }
  }
})

export const { setNotificationText, clearNotification } = notificationSlice.actions

export const setNotification = (text, seconds) => {
  return async (dispatch) => {
    dispatch(setNotificationText(text))
    setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
