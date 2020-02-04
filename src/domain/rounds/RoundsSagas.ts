import { takeEvery, call, select, put } from 'redux-saga/effects';
import { RoundsActionTypes } from './RoundsActionTypes';
import { GetRoundsActionCreator, storeRoundsActionCreator } from './RoundsActionCreators';
import { roundsUrlSelector } from './RoundsSelectors';
import { getRoundsAdapter } from '../../adapters/rounds/RoundsAdapter';
import { RoundModel } from './RoundsModels';

function* getRoundsSaga(action: GetRoundsActionCreator) {
   try {
      const url: string = yield select(roundsUrlSelector);
      const rounds: RoundModel[] = yield call(getRoundsAdapter, url);

      yield put(storeRoundsActionCreator(rounds));
   } catch (e) {
      // TODO MM
   }
}

export function* roundsSagas() {
   yield takeEvery(RoundsActionTypes.GET_ROUNDS, getRoundsSaga);
}