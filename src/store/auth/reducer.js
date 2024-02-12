import * as actionTypes from "./actionTypes";

const initialState = {
    auth: null,
    section: "poc",
    allPermissionJson: [],
    token: {}
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_AUTH_DATA:
            return {
                ...state,
                auth: action.payload,
            };
        case actionTypes.UPDATE_REDUCER:
            return {
                ...state,
                [action.payload.key]: action.payload.data,
            };
        case actionTypes.RESET:
            return {
                ...initialState
            };
        default:
            state = { ...state };
            break;
    }
    return state;
};

export default reducer;
