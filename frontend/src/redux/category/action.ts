export const types = {
    MOVE: "MOVE",
};

// export const addCount = () => (dispatch) => {
//     return dispatch({ type: types.ADD_COUNT })
// }

export const move = (main, sub) => ({
    type: types.MOVE,
    main,
    sub,
});
