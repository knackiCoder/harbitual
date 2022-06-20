import { publicRequest } from '../actions/userActions';
import useAuth from './useAuth';
import store from '..';
import { useDispatch } from 'react-redux';
import { refreshToken } from '../actions/userActions';
import { useEffect, useState } from 'react';

const useRefreshToken = () => {
    const dispatch = useDispatch()

    useEffect(() => {
          dispatch(refreshToken())
    }, [dispatch, refreshToken])

};

console.log(useRefreshToken)

export default useRefreshToken;