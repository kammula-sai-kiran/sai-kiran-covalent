import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from './reducers';

const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
});

export default store;
