import { configureStore } from '@reduxjs/toolkit';
import inventoryReducer from '../features/inventorySlice';

export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
  },
});