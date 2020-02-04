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

export interface ChangeSelectedRoundActionCreator {
   type: RoundsActionTypes.CHANGE_SELECTED_ROUND;
   selectedRoundId: number;
}

export const changeSelectedRoundActionCreator = (selectedRoundId: number): ChangeSelectedRoundActionCreator => ({
   type: RoundsActionTypes.CHANGE_SELECTED_ROUND,
   selectedRoundId
});