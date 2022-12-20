import { compose, createStore, applyMiddleware } from "redux";
// import { configureStore, compose, applyMiddleware, createStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import thunk from "redux-thunk";
import createSagaMiddleWare from "redux-saga";
import { rootSaga } from "./root-saga";

const sagaMiddleware = createSagaMiddleWare();

const middleWares = [
  process.env.NODE_ENV === "development" && logger,
  sagaMiddleware,
].filter(Boolean);
const composeEnhancers =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const composedEnhancers = composeEnhancers(applyMiddleware(...middleWares));

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
// import { compose, createStore, applyMiddleware } from "redux";
// import logger from "redux-logger";

// import { rootReducer } from "./root-reducer";

// const middleWares = [process.env.NODE_ENV === "development" && logger].filter(
//   Boolean
// );

// const composedEnhancers = compose(applyMiddleware(...middleWares));

// export const store = createStore(rootReducer, undefined, composedEnhancers);
