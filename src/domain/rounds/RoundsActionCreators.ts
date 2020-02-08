import { RoundsActionTypes } from './RoundsActionTypes';
import { RoundModel } from './RoundsModels';

export interface GetRoundsActionCreator {
   type: RoundsActionTypes.GET_ROUNDS;
}

export const getRoundsActionCreator = (): GetRoundsActionCreator => ({
   type: RoundsActionTypes.GET_ROUNDS
});

export interface StoreRoundsActionCreator {
   type: RoundsActionTypes.STORE_ROUNDS;
   rounds: RoundModel[];
   selectedRoundId: number;
}

export const storeRoundsActionCreator = (rounds: RoundModel[], selectedRoundId: number): StoreRoundsActionCreator => ({
   type: RoundsActionTypes.STORE_ROUNDS,
   rounds,
   selectedRoundId
});

export interface ChangeSelectedRoundIdActionCreator {
   type: RoundsActionTypes.CHANGE_SELECTED_ROUND_ID;
   selectedRoundId: number;
}

export const changeSelectedRoundIdActionCreator = (selectedRoundId: number): ChangeSelectedRoundIdActionCreator => ({
   type: RoundsActionTypes.CHANGE_SELECTED_ROUND_ID,
   selectedRoundId
});