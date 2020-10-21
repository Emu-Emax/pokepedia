import {
    LOGIN_USER_FAIL,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_SUCCESS,
    UserDispatchTypes,
} from "../dispatchTypes";
import {initUserType, UserType} from "../objectTypes";

const userReducer = (state: UserType = initUserType, action: UserDispatchTypes): UserType => {

    switch (action.type) {
        case LOGIN_USER_FAIL:
            return state
        case LOGIN_USER_SUCCESS:
            return {
                name: action.payload.user.name,
                password: action.payload.user.password,
                logged: true,
                token: action.payload.token,
            }
        case LOGOUT_USER_SUCCESS:
            return {
                name: '',
                password: '',
                logged: false,
                token: '',
            }
        default:
            return state
    }
}

export default userReducer;