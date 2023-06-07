import { configureStore } from '@reduxjs/toolkit'

import userDataReducer from './reducers'

export const store = configureStore({ reducer: userDataReducer })
// The store now has redux-thunk added and the Redux DevTools Extension is turned on