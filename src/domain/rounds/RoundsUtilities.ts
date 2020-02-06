import { RoundModel } from './RoundsModels';

export const extractRoundIds = (rounds: RoundModel[]) =>
   rounds.map(round => round.round);

export const getRoundById = (rounds: RoundModel[], id: number) =>
   rounds.find(round => round.round === id) || {
      round: -1,
      matches: []
   };