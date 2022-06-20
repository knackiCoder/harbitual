import { combineReducers } from  'redux';
import { userLoginReducer, userLogoutReducer, userRegisterReducer, userVerifyReducer, userRefreshReducer } from './userReducer';

export default combineReducers({
    userRegister: userRegisterReducer,
    userVerify: userVerifyReducer,
    userLogin: userLoginReducer,
    userLogout: userLogoutReducer,
    // userRefresh: userRefreshReducer
})