import axios from 'axios';
import { 
    USER_LOGIN_SUCCESS, 
    AUTH_SYSTEM_ERROR, 
    AUTH_LOADING,
    USER_LOGOUT
} from './types';
import {API_URL} from '../helpers'

export const onUserRegister = ({ username, email,password }) => {
    return (dispatch) => {
        dispatch({ type: AUTH_LOADING })
        if(username === '' || email === '' ||  password === '') {
            dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'Semua form diatas wajib diisi!' })
        }
        else {
            axios.post(API_URL + '/user/register', {
                username, email, password
            }).then((res) => {
                console.log(res)
                if(res.data.status === 'error') {
                    dispatch({ type: AUTH_SYSTEM_ERROR, payload: res.data.message })
                }
                else {
                    localStorage.setItem('username',username)
                    dispatch({ type : USER_LOGIN_SUCCESS, payload: res.data })
                }
            }).catch((err) => {
                console.log(err);
                dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'System Error' })
            })        
        }
    }
}

export const keepLogin = (username) => {
    return(dispatch) =>{
        axios.post(API_URL + '/user/keeplogin',{
            username
        }).then((res)=>{
            dispatch({ type : USER_LOGIN_SUCCESS, payload: res.data })
        }).catch((err)=>{
            console.log(err);
            
        })
    }
}

export const onUserLogin = ({ username,password }) => {
    return (dispatch) => {
        dispatch({ type: AUTH_LOADING })
        if(username === '' || password === '') {
            dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'Semua form diatas wajib diisi!' })
        }
        else {
            axios.post(API_URL + '/user/login', {
                username, password
            }).then((res) => {
                console.log(res)
                if(res.data.status !== 'error'){
                    localStorage.setItem('username',username)
                    dispatch({ type : USER_LOGIN_SUCCESS, payload: res.data })  
                }else{
                    dispatch({ type: AUTH_SYSTEM_ERROR, payload: res.data.message })
                }
            }).catch((err) => {
                console.log(err);
                dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'System Error' })
            })        
        }
    }
}

export const onUserLogOut = () => {
    localStorage.removeItem('username')
    return {
        type : USER_LOGOUT
    }
}