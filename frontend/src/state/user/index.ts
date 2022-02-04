import { types } from './action';

const initialState = {
    isLogin: false,
    userId: 0,
    userNickname: '',
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case types.LOGIN:
            return {
                ...state,
                isLogin: true,
                userId: action.userId,
                userNickname: action.userNickname,
            };
        case types.LOGOUT:
            return {
                ...state,
                isLogin: false,
                userId: 0,
                userNickname: '',
            };
        default:
            return state;
    }
}
