import { 
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAILED, USER_VERIFY_REQUEST, USER_VERIFY_SUCCESS, USER_VERIFY_FAILED, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILED, USER_LOGOUT_FAILED, USER_LOGOUT_SUCCESS, USER_REFRESH } from "../constants/userConstant";

    const initial = {
        user: {},
        loading: true
    }

export const userRegisterReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_REGISTER_REQUEST:
            return {
                loading: true
            }
        case USER_REGISTER_SUCCESS:
            return {
                loading: false,
                user: action.payload
            }
        case USER_REGISTER_FAILED:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const userVerifyReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_VERIFY_REQUEST:
            return {
                loading: true
            }
        case USER_VERIFY_SUCCESS:
            return {
                loading: false,
                user: action.payload
            }
        case USER_VERIFY_FAILED:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const userLoginReducer = (state = {}, action) => { 
    switch(action.type) {
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            }
        case USER_LOGIN_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
            case USER_REFRESH:
                return {
                    ...state,
                    user: action.payload
                }
        default:
            return state;
    }
}

export const userLogoutReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_LOGOUT_SUCCESS:
            return {
                loading: false,
                user: localStorage.removeItem("user"),
            }
        case USER_LOGOUT_FAILED:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

// export const userRefreshReducer = (state = {}, action) => {
//     switch(action.type) {
//         case USER_REFRESH:
//             return {
//                 ...state,
//                 user: action.payload
//             }
//         default:
//             return state;
//     }
// }
