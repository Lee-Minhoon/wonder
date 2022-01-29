export const types = {
    ADD: 'ADD',
    ADD_COUNT: 'ADD_COUNT'
}

// export const addCount = () => (dispatch) => {
//     return dispatch({ type: types.ADD_COUNT })
// }

export const addCount = () => ({
    type: types.ADD_COUNT,
});

export const add = () => ({
    type: types.ADD,
});