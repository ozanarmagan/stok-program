import {configureStore} from '@reduxjs/toolkit';
import  userReducer  from './reducers/user';


export default configureStore ({
    reducer:{userReducer},
    devTools:true
});

