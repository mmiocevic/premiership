import { call, put, select, takeEvery } from 'redux-saga/effects';
import { RoundModel } from './RoundsModels';
import { RoundsActionTypes } from './RoundsActionTypes';
import { GetRoundsActionCreator, storeRoundsActionCreator } from './RoundsActionCreators';
import { roundsUrlSelector } from './RoundsSelectors';
import { getRoundsAdapter } from '../../adapters/rounds/RoundsAdapter';

function* getRoundsSaga(action: GetRoundsActionCreator) {
   try {
      const url: string = yield select(roundsUrlSelector);
      const rounds: RoundModel[] = yield call(getRoundsAdapter, url);

      yield put(storeRoundsActionCreator(rounds));
   }
   catch (e) {
      // TODO MM
   }
}

export function* roundsSagas() {
   yield takeEvery(RoundsActionTypes.GET_ROUNDS, getRoundsSaga);
}