import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;


// import { configureStore, combineReducers, applyMiddleware } from 'redux';
// import thunkMiddleware from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import rootReducer from './reducers';

// const middleware = [thunkMiddleware];

// const store = configureStore(
//     combineReducers(rootReducer),
//     composeWithDevTools(applyMiddleware(...middleware))
// );

// export default store;

// import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './reducers';

// const store = configureStore({
//     reducer: rootReducer
// });

// export default store;