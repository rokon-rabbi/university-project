import { configureStore } from '@reduxjs/toolkit';
import loginSlice from '../state/loginState/loginSlice';


const store = configureStore({
  reducer: {
    user: loginSlice  // Add your reducer to the store
  }
});
export default store; 
