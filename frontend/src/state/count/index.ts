import { types } from './action'

const initialState = {
    count: 0,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case types.ADD:
            return {
                ...state, count: state.count + 1
            }
        case types.ADD_COUNT:
            return {
                ...state, count: state.count + 2
            }
        default:
            return state
    }
}