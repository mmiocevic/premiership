import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { connectRouter, routerMiddleware, RouterRootState } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { roundsReducer, RoundsReducerState } from '../domain/rounds/RoundsReducer';
import { errorHandlingReducer, ErrorHandlingReducerState } from '../domain/error-handling/ErrorHandlingReducer';
import { roundsSagas } from '../domain/rounds/RoundsSagas';

const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();

export type StoreState = RouterRootState & {
   roundsReducer: RoundsReducerState;
   errorHandlingReducer: ErrorHandlingReducerState;
}

export const store = createStore(
   combineReducers({
      router: connectRouter(history),
      roundsReducer,
      errorHandlingReducer
   }),
   compose(
      applyMiddleware(
         routerMiddleware(history),
         sagaMiddleware
      )
   )
);

sagaMiddleware.run(roundsSagas);