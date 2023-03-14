import { REQUEST_TYPE } from "../../type";

const USER_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/user/`;

const LOGIN_REQUEST = {
    type: REQUEST_TYPE.POST,
    url: `${USER_BASE_URL}/login`
}

const SIGNUP_REQUEST = {
    type: REQUEST_TYPE.POST,
    url: `${USER_BASE_URL}/signup`
}

const LOGOUT_REQUEST = {
    type: REQUEST_TYPE.GET,
    url: `${USER_BASE_URL}/logout`
}

const UPDATE_USER_REQUEST = {
    type: REQUEST_TYPE.PATCH,
    url: `${USER_BASE_URL}/profile/update`
}

export {
    LOGIN_REQUEST,
    SIGNUP_REQUEST,
    LOGOUT_REQUEST,
    UPDATE_USER_REQUEST
}