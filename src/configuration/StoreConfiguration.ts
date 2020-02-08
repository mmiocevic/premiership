import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { roundsReducer, RoundsReducerState } from '../domain/rounds/RoundsReducer';
import { roundsSagas } from '../domain/rounds/RoundsSagas';
import { connectRouter, routerMiddleware, RouterRootState } from 'connected-react-router';
import { createBrowserHistory } from 'history'
import { errorHandlingReducer, ErrorHandlingReducerState } from '../domain/error-handling/ErrorHandlingReducer';

const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();

export type StoreState<T> = RouterRootState & {
   roundsReducer: RoundsReducerState;
   errorHandlingReducer: ErrorHandlingReducerState<T>;
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