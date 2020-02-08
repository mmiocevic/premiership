import { getSearch } from "connected-react-router";
import { StoreState } from '../../../configuration/StoreConfiguration';

export const roundQueryParamSelector = (state: StoreState): number =>
   parseInt(new URLSearchParams(getSearch(state)).get('round') || '0');