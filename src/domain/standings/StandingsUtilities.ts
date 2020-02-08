import { MatchModel, RoundModel } from '../rounds/RoundsModels';

export enum MatchStatus {
   LOSS,
   DRAW,
   WIN,
   NOT_PLAYED
}

export type LastFiveMatchesStatuses = [ MatchStatus, MatchStatus, MatchStatus, MatchStatus, MatchStatus ];

export interface StandingsSet {
   clubName: string;
   matchesPlayed: number;
   wins: number;
   draws: number;
   losses: number;
   goalsScored: number;
   goalsAgainst: number;
   goalsDifference: number;
   points: number;
   lastFiveMatches: LastFiveMatchesStatuses;
}

interface StandingsHash {
   [key: string]: StandingsSet;
}

export const roundsToStandings = (rounds: RoundModel[], round: number): StandingsSet[] => {
   const standingsHash: StandingsHash = {};
   let currentRound: RoundModel;

   for (let i = 0; i < rounds.length; i++) {
      currentRound = rounds[i];

      if (currentRound.round > round) {
         break;
      }

      for (let j = 0; j < currentRound.matches.length; j++) {
         updateStandingsWithMatchResults(standingsHash, currentRound.matches[j]);
      }
   }

   return sortStandingSetsByWinsAndGoalsDifferenceAndGoalsScored(standingsHash);
};

const updateStandingsWithMatchResults = (standings: StandingsHash, match: MatchModel): void => {
   const [ homeTeam, awayTeam ] = Object.keys(match);

   const homeTeamGoals: number = match[homeTeam];
   const awayTeamGoals: number = match[awayTeam];

   standings[homeTeam] = updateTeamStandingSet(standings[homeTeam], {
      ...getTeamWinningStatus(homeTeamGoals, awayTeamGoals),
      team: homeTeam,
      goalsScored: homeTeamGoals,
      goalsAgainst: awayTeamGoals
   });
   standings[awayTeam] = updateTeamStandingSet(standings[awayTeam], {
      ...getTeamWinningStatus(awayTeamGoals, homeTeamGoals),
      team: awayTeam,
      goalsScored: awayTeamGoals,
      goalsAgainst: homeTeamGoals
   });
};

interface TeamStats {
   team: string;
   wins: boolean;
   draws: boolean;
   losses: boolean;
   goalsScored: number;
   goalsAgainst: number;
}

const updateTeamStandingSet = (standingSet: StandingsSet, teamStats: TeamStats): StandingsSet => {
   const {
      team,
      wins,
      draws,
      losses,
      goalsScored,
      goalsAgainst
   } = teamStats;

   if (standingSet) {
      const {
         matchesPlayed,
         wins: teamWins,
         draws: teamDraws,
         losses: teamLosses,
         goalsScored: teamGoalsScored,
         goalsAgainst: teamGoalsAgainst,
         points,
         lastFiveMatches
      } = standingSet;
      const newGoalsScored = goalsScored + teamGoalsScored;
      const newGoalsAgainst = goalsAgainst + teamGoalsAgainst;

      return {
         ...standingSet,
         matchesPlayed: matchesPlayed + 1,
         wins: wins ? teamWins + 1 : teamWins,
         draws: draws ? teamDraws + 1 : teamDraws,
         losses: losses ? teamLosses + 1 : teamLosses,
         goalsScored: newGoalsScored,
         goalsAgainst: newGoalsAgainst,
         goalsDifference: newGoalsScored - newGoalsAgainst,
         points: points + calculatePoints(wins, draws),
         lastFiveMatches: updateLastFiveMatchesWithMostRecentAtFirstPlace(lastFiveMatches, { wins, draws, losses })
      };
   }
   else {
      return {
         clubName: team,
         matchesPlayed: 1,
         wins: wins ? 1 : 0,
         draws: draws ? 1 : 0,
         losses: losses ? 1 : 0,
         goalsScored: goalsScored,
         goalsAgainst: goalsAgainst,
         goalsDifference: goalsScored - goalsAgainst,
         points: calculatePoints(wins, draws),
         lastFiveMatches: updateLastFiveMatchesWithMostRecentAtFirstPlace([
            MatchStatus.NOT_PLAYED,
            MatchStatus.NOT_PLAYED,
            MatchStatus.NOT_PLAYED,
            MatchStatus.NOT_PLAYED,
            MatchStatus.NOT_PLAYED
         ], { wins, draws, losses })
      };
   }
};

const calculatePoints = (wins: boolean, draws: boolean): number =>
   (wins && 3) || (draws && 1) || 0;

const updateLastFiveMatchesWithMostRecentAtFirstPlace = (lastFiveMatches: LastFiveMatchesStatuses,
                                                         teamWinningStatus: TeamWinningStatus)
   : LastFiveMatchesStatuses => {
   const { wins, losses, draws } = teamWinningStatus;
   const newLastFiveMatches = [ ...lastFiveMatches ] as LastFiveMatchesStatuses;

   newLastFiveMatches.pop();

   const matchStatus = wins ? MatchStatus.WIN
                            : losses ? MatchStatus.LOSS :
                              draws ? MatchStatus.DRAW
                                    : MatchStatus.NOT_PLAYED;
   newLastFiveMatches.unshift(matchStatus);

   return newLastFiveMatches;
};

type TeamWinningStatus = Pick<TeamStats,
   'wins' |
   'draws' |
   'losses'>;

const getTeamWinningStatus = (teamOneGoals: number, teamTwoGoals: number): TeamWinningStatus => ({
   wins: teamOneGoals > teamTwoGoals,
   draws: teamOneGoals === teamTwoGoals,
   losses: teamOneGoals < teamTwoGoals
});

const sortStandingSetsByWinsAndGoalsDifferenceAndGoalsScored = (standings: StandingsHash) =>
   Object.keys(standings).map(i => standings[i])
         .sort((a: StandingsSet, b: StandingsSet) => {
            if (a.points > b.points) {
               return -1;
            }
            else if (b.points > a.points) {
               return 1;
            }
            else if (a.goalsDifference > b.goalsDifference) {
               return -1;
            }
            else if (b.goalsDifference > a.goalsDifference) {
               return 1;
            }

            return b.goalsScored - a.goalsScored;
         });
