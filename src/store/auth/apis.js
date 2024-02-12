
import { apiFunction } from "../../apiCall/function";
import {
    LOGIN, GET_TOKEN, GET_PERMISSION
} from "../../apiCall/urls/auth";

export const handleLogin = (data) => {
    return apiFunction(LOGIN, "post", data, null, null);
};

export const getTokenData = (data) => {
    return apiFunction(GET_TOKEN, "post", data, true, null);
};

export const getPermission = () => {
    return apiFunction(GET_PERMISSION, "post", {}, true, null);
};