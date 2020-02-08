import { push } from 'connected-react-router';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import {
   ChangeSelectedRoundIdActionCreator,
   GetRoundsActionCreator,
   storeRoundsActionCreator
} from './RoundsActionCreators';
import { RoundsActionTypes } from './RoundsActionTypes';
import { RoundModel } from './RoundsModels';
import { roundQueryParamSelector } from './RoundsSelectors';
import { setErrorActionCreator } from '../error-handling/ErrorHandlingActionCreators';
import { getRoundsAdapter } from '../../adapters/rounds/RoundsAdapter';

function* getRoundsSaga(action: GetRoundsActionCreator) {
   try {
      const rounds: RoundModel[] = yield call(getRoundsAdapter);
      const selectedRoundId: number = yield select(roundQueryParamSelector);

      yield put(storeRoundsActionCreator(rounds, selectedRoundId));
   }
   catch (e) {
      yield put(setErrorActionCreator(e));
   }
}

function* changeSelectedRoundIdSaga(action: ChangeSelectedRoundIdActionCreator) {
   yield put(push({
      search: `round=${action.selectedRoundId}`
   }));
}

export function* roundsSagas() {
   yield takeEvery(RoundsActionTypes.GET_ROUNDS, getRoundsSaga);
   yield takeEvery(RoundsActionTypes.CHANGE_SELECTED_ROUND_ID, changeSelectedRoundIdSaga);
}