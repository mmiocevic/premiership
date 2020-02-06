import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { roundsReducer, RoundsReducerState } from '../domain/rounds/RoundsReducer';
import { roundsSagas } from '../domain/rounds/RoundsSagas';

const sagaMiddleware = createSagaMiddleware();

export interface StoreState {
   roundsReducer: RoundsReducerState;
}

export const store = createStore(
   combineReducers({
      roundsReducer
   }),
   applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(roundsSagas);