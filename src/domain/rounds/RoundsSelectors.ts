import { StoreState } from '../../configuration/StoreConfiguration';

export const roundsUrlSelector = (state: StoreState) =>
   state.roundsReducer.url;