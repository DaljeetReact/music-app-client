import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';


import userDataReducer from './reducers'


const persistConfig = {
    key: 'root',
    storage,
  };
const persistedReducer = persistReducer(persistConfig, userDataReducer);

export const store = configureStore({ reducer: persistedReducer,  middleware: [thunk]
});
export const persistor = persistStore(store);
// The store now has redux-thunk added and the Redux DevTools Extension is turned on