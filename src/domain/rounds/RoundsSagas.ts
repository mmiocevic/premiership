import { call, put, takeEvery } from 'redux-saga/effects';
import { GetRoundsActionCreator, storeRoundsActionCreator } from './RoundsActionCreators';
import { RoundsActionTypes } from './RoundsActionTypes';
import { RoundModel } from './RoundsModels';
import { getRoundsAdapter } from '../../adapters/rounds/RoundsAdapter';

function* getRoundsSaga(action: GetRoundsActionCreator) {
   try {
      const rounds: RoundModel[] = yield call(getRoundsAdapter);

      yield put(storeRoundsActionCreator(rounds));
   }
   catch (e) {
      // TODO MM
   }
}

export function* roundsSagas() {
   yield takeEvery(RoundsActionTypes.GET_ROUNDS, getRoundsSaga);
}