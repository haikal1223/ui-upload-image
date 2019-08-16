import {
    AUTH_LOADING,
    USER_LOGIN_SUCCESS,
    AUTH_SYSTEM_ERROR,
    USER_LOGOUT
}
 from '../action/types'

const INITIAL_STATE = {
    username : '',
    email : '',
    status : '',
    error : '',
    loading : false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case USER_LOGIN_SUCCESS :
            return {...INITIAL_STATE,...action.payload}
        case AUTH_SYSTEM_ERROR: 
            return {...INITIAL_STATE,error: action.payload}
        case AUTH_LOADING :
            return {...state, error : '', loading : true}
        case USER_LOGOUT :
            return INITIAL_STATE
        default :
        return state
    }
}