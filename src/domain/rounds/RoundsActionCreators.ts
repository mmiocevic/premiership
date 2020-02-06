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
}

export const storeRoundsActionCreator = (rounds: RoundModel[]): StoreRoundsActionCreator => ({
   type: RoundsActionTypes.STORE_ROUNDS,
   rounds
});

export interface ChangeSelectedRoundIdActionCreator {
   type: RoundsActionTypes.CHANGE_SELECTED_ROUND_ID;
   selectedRoundId: number;
}

export const changeSelectedRoundIdActionCreator = (selectedRoundId: number): ChangeSelectedRoundIdActionCreator => ({
   type: RoundsActionTypes.CHANGE_SELECTED_ROUND_ID,
   selectedRoundId
});