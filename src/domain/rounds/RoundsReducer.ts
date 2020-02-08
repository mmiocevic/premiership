import { AnyAction } from 'redux';
import { RoundsActionTypes } from './RoundsActionTypes';
import { ChangeSelectedRoundIdActionCreator, StoreRoundsActionCreator } from './RoundsActionCreators';
import { RoundModel } from './RoundsModels';

export interface RoundsReducerState {
   selectedRoundId: number;
   rounds: RoundModel[];
}

const roundsReducerState = {
   selectedRoundId: -1,
   rounds: []
};

type RoundsReducerActions = StoreRoundsActionCreator
   | ChangeSelectedRoundIdActionCreator
   | AnyAction;

export const roundsReducer = (state: RoundsReducerState = roundsReducerState,
                              action: RoundsReducerActions) => {
   switch (action.type) {
      case RoundsActionTypes.STORE_ROUNDS:
         return storeRounds(state, action as StoreRoundsActionCreator);
      case RoundsActionTypes.CHANGE_SELECTED_ROUND_ID:
         return changeSelectedRoundId(state, action as ChangeSelectedRoundIdActionCreator);
      default:
         return state;
   }
};

const storeRounds = (state: RoundsReducerState,
                     action: StoreRoundsActionCreator): RoundsReducerState => {
   const { rounds, selectedRoundId } = action;
   const numberOfRounds = rounds.length;

   return {
      selectedRoundId: selectedRoundId <= numberOfRounds && selectedRoundId > 0 ? selectedRoundId
                                                                                : rounds[numberOfRounds - 1].round,
      rounds
   };
};

const changeSelectedRoundId = (state: RoundsReducerState,
                               action: ChangeSelectedRoundIdActionCreator): RoundsReducerState => ({
   ...state,
   selectedRoundId: action.selectedRoundId
});