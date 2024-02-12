import * as actionTypes from "./actionTypes";
import { handleLogin, getTokenData, getPermission } from "./apis";
import { apiLoading, apiLoadingEnd } from "../../store/notification/action";
import { getAllPermission } from "../../shared/permission";

// import { getDataFromStore } from "../../store/getStore";

export const onLogin = (state, navigate) => {
    return async (dispatch) => {
        dispatch(apiLoading())
        state = {
            ...state,
            "tenantId":1
        }
        let result = await handleLogin(state)
        if (result.status) {
            localStorage.setItem("mad-influence-admin-token", JSON.stringify(result.data))
            let section = "admin"
            dispatch(updateReducer("section", section))
            dispatch(updateAuthData(result.data));
            dispatch(updateReducer("allPermissionJson", getAllPermission(result.data.globalPermissions)))
            if (section === "poc")
                window.open("/campaign-pannel/campaign-list", "_self")
            else
                window.open("/home/influencer", "_self")
        } else {
            actionNotifier.error(result.message);
        }
        dispatch(apiLoadingEnd());
    };
};

export const onReload = () => {
    return async (dispatch) => {
        // dispatch(apiLoading())
        let result = await getPermission()
        // console.log(result);
        if (result.status) {
            let token = localStorage.getItem("mad-influence-admin-token")
            if (token) {
                token = JSON.parse(token)
                token = {
                    ...result.data,
                    data:[result.data.user],
                    token: token.token
                }
                // console.log(token);
                dispatch(updateAuthData(token));
                dispatch(updateReducer("allPermissionJson", getAllPermission(result.data.globalPermissions)))
            }
        }
        // dispatch(apiLoadingEnd());
    };
};


export const onLogout = (navigate) => {
    return (dispatch) => {
        localStorage.removeItem("mad-influence-admin-token")
        localStorage.clear();
        dispatch(resetAuth())
        navigate("/")
    }
};

export const updateAdminFromLocal = () => {
    return (dispatch) => {
        let token = localStorage.getItem("mad-influence-admin-token")
        if (token) {
            token = JSON.parse(token)
            let section = "admin"
            dispatch(updateReducer("allPermissionJson", getAllPermission(token.globalPermissions)))
            dispatch(updateReducer("section", section))
            dispatch(updateAuthData(token))
        }
    }
};

export const getAvailableToken = () => {
    return async (dispatch) => {
        let result = await getTokenData()
        if (result.status) {
            dispatch(updateReducer("token", result.data))
        }
    }
};


export const updateAuthData = (data) => {
    return {
        type: actionTypes.UPDATE_AUTH_DATA,
        payload: data,
    };
};


export const resetAuth = (data) => {
    return {
        type: actionTypes.RESET,
    };
};

export const updateReducer = (key, data) => {
    return {
        type: actionTypes.UPDATE_REDUCER,
        payload: { key, data }
    };
};




