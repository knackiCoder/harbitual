import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAILED, USER_VERIFY_REQUEST, USER_VERIFY_SUCCESS, USER_VERIFY_FAILED, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILED, USER_LOGOUT_SUCCESS, USER_LOGOUT_FAILED, USER_REFRESH } from "../constants/userConstant";
import axios from "axios";

const config = {
    headers: {
        "Content-type": "application/json",
    },
}


const BASE_URL = "http://localhost:5000/api/V1";
axios.defaults.withCredentials = true

export const publicRequest = axios.create({
    baseURL: BASE_URL,
  });

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-type": "application/json",
    },
    withCredentials: true
})

export const signInRequest = () => {
    return {
        type: USER_REGISTER_REQUEST, 
    }
}

export const signInSuccess = (action) => {
    return {
        type: USER_REGISTER_SUCCESS, 
        payload: action
    }
}

export const signInFailed = (action) => {
    return {
        type: USER_REGISTER_FAILED, 
        payload: action
    }
}

export const verifyRequest = () => {
    return {
        type: USER_VERIFY_REQUEST
    }
}

export const verifySuccess = (action) => {
    return {
        type: USER_VERIFY_SUCCESS,
        payload: action
    }
}

export const verifyFailed = (action) => {
    return {
        type: USER_VERIFY_FAILED,
        payload: action
    }
}

export const loginRequest = () => {
    return {
        type: USER_LOGIN_REQUEST
    }
}

export const loginSuccess = (action) => {
    return {
        type: USER_LOGIN_SUCCESS,
        payload: action
    }
}

export const loginFailed = (action) => {
    return {
        type: USER_LOGIN_FAILED,
        payload: action
    }
}

export const SignOutSuccess = (action) => {
    return {
        type: USER_LOGOUT_SUCCESS,
        payload: action
    }
}

export const SignOutFailed = (action) => {
    return {
        type: USER_LOGOUT_FAILED,
        payload: action
    }
}

export const userRefresh = (action) => {
    return {
        type: USER_REFRESH,
        payload: action
    }
}

export const SignIn = (email, name, password) => {
    return async (dispatch) => {
        try {
            dispatch(signInRequest())

            const { data } = await publicRequest.post('/auth/register', {email, name, password}, config)
            const { msg } = data
            dispatch(signInSuccess(msg))

        } catch (error) {
            dispatch(signInFailed(error.response.data.msg))
        }
    }
}

export const verifyEmail = (verificationToken, email) => {
    return async (dispatch) => {
        try {
            dispatch(verifyRequest())

            const { data } = await publicRequest.post('/auth/verify-email', { verificationToken, email }, config);


            const { accessToken, refreshToken } = data;
            dispatch(verifySuccess({accessToken, refreshToken}))
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
            

            localStorage.setItem("user", JSON.stringify(data))
        } catch(error) {
            dispatch(verifyFailed(error.response.data.msg))
        }
    }

}

export const SignUp = (email, password) => {
    return async (dispatch,getState) => {
        try {
            dispatch(loginRequest());

            const response = await publicRequest.post('/auth/login', { email, password }, config)

            const { access, name, roles  } = response?.data

            dispatch(loginSuccess({email, name, access, roles}))
        } catch (err) {
            console.log(err)
            if (err?.response.status === 0) {
                dispatch(loginFailed("No server Response"))
            } else if (err?.response.status === 400) {
                dispatch(loginFailed("Missing username and password"))
            } else if (err.response?.status === 401) {
                dispatch(loginFailed("Invalid Credentials! Try again"))
            } else if (err.response?.status === 500) {
                dispatch(loginFailed("Internal server error try again"))
            } else {
                dispatch(loginFailed(err?.response?.data.msg))
            }
        }
    }
}

export const refreshToken = () => {
    return async(dispatch, getState) => {
        try {
            const response = await publicRequest.get('/auth/refresh', config)
            const { email, access, roles  } = response?.data
            dispatch(userRefresh({email, access, roles}));
        } catch (err) {
            console.log(err);
        }
    }
}

export const SignOut = () => {
    return async (dispatch, getState) => {
        const { userLogout } = getState();
        console.log(getState())

        const { user } = userLogout;

        const userConfig = {
            "Content-type": "application/json",
             Authorization: `Bearer ${user.token}`,
        }
        
        try {
            const { data } = await axios.post('http://localhost:5000/api/V1/auth/logout', userConfig)
            dispatch(SignOutSuccess(data))
            window.localStorage.removeItem('user')
        } catch(error) {
            dispatch(SignOutFailed(error.response.data.msg))
        }
    }
}
