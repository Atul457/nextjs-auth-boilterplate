import { configureStore } from '@reduxjs/toolkit'
import { user } from './slices/user/user.slice'

const store = configureStore({
  reducer: {
    user
  }
})
export { store }
