import { configureStore} from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER } from 'redux-persist';
import createSagaMiddleware from 'redux-saga'
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk'


import {watcherSaga} from './watcherSaga';
import userDataReducer from './reducers'

// config Presist Storage
const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig,userDataReducer);

// config Redux Saga
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
   reducer: persistedReducer, 
   middleware:(getDefaultMiddleware) => [...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  }),sagaMiddleware,thunk]
});


sagaMiddleware.run(watcherSaga);

export const persistor = persistStore(store);