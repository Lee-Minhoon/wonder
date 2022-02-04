// import package, library
import { createStore, applyMiddleware, combineReducers, AnyAction } from 'redux';
import { HYDRATE, createWrapper, MakeStore, Context } from 'next-redux-wrapper';

// import utilities

// import components

// import etc
import category from './category';
import user from './user';

// create a makeStore function
const combinedReducer = combineReducers({
    user,
    category,
});

const reducer = (state, action: AnyAction) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        };
        if (state.count.count) nextState.count.count = state.count.count; // preserve count value on client side navigation
        return nextState;
    } else {
        return combinedReducer(state, action);
    }
};

export type RootState = ReturnType<typeof reducer>;

const makeStore = (context: Context) => createStore(reducer);

// export an assembled wrapper
const wrapper = createWrapper(makeStore, {
    debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
