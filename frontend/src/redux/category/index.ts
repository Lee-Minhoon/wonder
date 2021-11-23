import { types } from "./action";

const initialState = {
    main: "",
    sub: "",
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case types.MOVE:
            return {
                ...state,
                main: action.main,
                sub: action.sub,
            };
        default:
            return state;
    }
}
