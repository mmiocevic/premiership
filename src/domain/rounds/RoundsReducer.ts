import { AnyAction } from 'redux';
import { RoundsActionTypes } from './RoundsActionTypes';
import { ChangeSelectedRoundActionCreator, StoreRoundsActionCreator } from './RoundsActionCreators';
import { RoundModel } from './RoundsModels';

export interface RoundsReducerState {
   url: string;
   selectedRoundId: number;
   rounds: RoundModel[];
}

const roundsReducerState = {
   url: '/js-assignment/data.json',
   selectedRoundId: -1,
   rounds: []
};

type RoundsReducerActions = StoreRoundsActionCreator
   | ChangeSelectedRoundActionCreator
   | AnyAction;

export const roundsReducer = (state: RoundsReducerState = roundsReducerState,
                              action: RoundsReducerActions) => {
   switch (action.type) {
      case RoundsActionTypes.STORE_ROUNDS:
         return storeRounds(state, action as StoreRoundsActionCreator);
      case RoundsActionTypes.CHANGE_SELECTED_ROUND:
         return changeSelectedRound(state, action as ChangeSelectedRoundActionCreator);
      default:
         return state;
   }
};

const storeRounds = (state: RoundsReducerState,
                     action: StoreRoundsActionCreator): RoundsReducerState => {
   const { rounds } = action;

   return {
      ...state,
      selectedRoundId: rounds[rounds.length - 1].round,
      rounds
   };
};

const changeSelectedRound = (state: RoundsReducerState,
                             action: ChangeSelectedRoundActionCreator): RoundsReducerState => ({
   ...state,
   selectedRoundId: action.selectedRoundId
});