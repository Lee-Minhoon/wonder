export const types = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
};

// export const addCount = () => (dispatch) => {
//     return dispatch({ type: types.ADD_COUNT })
// }

export const login = (userId, userNickname) => ({
    type: types.LOGIN,
    userId,
    userNickname,
});

export const logout = () => ({
    type: types.LOGOUT,
});
