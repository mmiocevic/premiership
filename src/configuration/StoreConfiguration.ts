import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { roundsReducer, RoundsReducerState } from '../domain/rounds/RoundsReducer';
import { roundsSagas } from '../domain/rounds/RoundsSagas';
import { connectRouter, routerMiddleware, RouterRootState } from 'connected-react-router';
import { createBrowserHistory } from 'history'

const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();

export type StoreState = RouterRootState & {
   roundsReducer: RoundsReducerState;
}

export const store = createStore(
   combineReducers({
      router: connectRouter(history),
      roundsReducer
   }),
   compose(
      applyMiddleware(
         routerMiddleware(history),
         sagaMiddleware
      )
   )
);

sagaMiddleware.run(roundsSagas);