export const types = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
};

export const login = (userId, userNickname) => ({
    type: types.LOGIN,
    userId,
    userNickname,
});

export const logout = () => ({
    type: types.LOGOUT,
});
