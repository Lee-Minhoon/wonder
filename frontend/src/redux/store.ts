import { createStore, applyMiddleware, combineReducers, AnyAction } from 'redux';
import { HYDRATE, createWrapper, MakeStore, Context } from "next-redux-wrapper";
import count from './count/reducer'

// create a makeStore function
const combinedReducer = combineReducers({
    count
})

const reducer = (state, action: AnyAction) => {
    if (action.type === HYDRATE) {
        return { ...state, ...action.payload };
    } else {
        return combinedReducer(state, action);
    }
};

const makeStore = (context: Context) => createStore(reducer);

// export an assembled wrapper
const wrapper = createWrapper(makeStore, {
    debug: process.env.NODE_ENV === 'development'
});

export default wrapper;