export interface RoundModel {
   round: number;
   matches: MatchModel[]
}

export interface MatchModel {
   [key: string]: number;
}