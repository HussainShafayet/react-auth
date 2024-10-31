import {configureStore} from "@reduxjs/toolkit";
import userSlice from '../features/userSlice'

const store = configureStore({
    reducer:{
        auth: userSlice
    }
});

export default store;