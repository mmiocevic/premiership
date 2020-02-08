import { call, put, takeEvery } from 'redux-saga/effects';
import {
   ChangeSelectedRoundIdActionCreator,
   GetRoundsActionCreator,
   storeRoundsActionCreator
} from './RoundsActionCreators';
import { RoundsActionTypes } from './RoundsActionTypes';
import { RoundModel } from './RoundsModels';
import { getRoundsAdapter } from '../../adapters/rounds/RoundsAdapter';
import { push } from 'connected-react-router';
import { select } from 'redux-saga-test-plan/matchers';
import { roundQueryParamSelector } from './__tests__/RoundsSelectors';
import { setErrorActionCreator } from '../error-handling/ErrorHandlingActionCreators';

function* getRoundsSaga(action: GetRoundsActionCreator) {
   try {
      const rounds: RoundModel[] = yield call(getRoundsAdapter);
      const selectedRoundId: number = yield select(roundQueryParamSelector);

      yield put(storeRoundsActionCreator(rounds, selectedRoundId));
   }
   catch (e) {
      yield put(setErrorActionCreator(e))
   }
}

function* changeSelectedRoundIdSaga(action: ChangeSelectedRoundIdActionCreator) {
   yield put(push({
      search: `round=${action.selectedRoundId}`
   }))
}

export function* roundsSagas() {
   yield takeEvery(RoundsActionTypes.GET_ROUNDS, getRoundsSaga);
   yield takeEvery(RoundsActionTypes.CHANGE_SELECTED_ROUND_ID, changeSelectedRoundIdSaga);
}