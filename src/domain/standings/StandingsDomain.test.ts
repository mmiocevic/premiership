import * as stdUtiScope from './StandingsUtilities';
import {
   calculatePoints,
   getTeamWinningStatus,
   MatchStatus,
   roundsToStandings,
   sortStandingSetsByPointsAndGoalsDifferenceAndGoalsScored,
   StandingsHash,
   StandingsSet,
   updateLastFiveMatchesWithMostRecentAtFirstPlace,
   updateStandingsWithMatchResults,
   updateTeamStandingSet
} from './StandingsUtilities';
import { RoundModel } from '../rounds/RoundsModels';

describe('StandingsDomain', () => {
   describe('utilities', () => {
      describe('roundsToStandings - full test', () => {
         it('should convert rounds to standings without issues', () => {
            const rounds: RoundModel[] = [
               { round: 1, matches: [ { A: 2, B: 1 }, { C: 0, D: 0 } ] },
               { round: 2, matches: [ { C: 1, A: 3 }, { B: 1, D: 2 } ] },
               { round: 3, matches: [ { D: 2, A: 2 }, { C: 4, B: 4 } ] }
            ];

            expect(roundsToStandings(rounds, 3))
               .toEqual([
                  {
                     clubName: 'A',
                     matchesPlayed: 3,
                     wins: 2,
                     draws: 1,
                     losses: 0,
                     goalsScored: 7,
                     goalsAgainst: 4,
                     goalsDifference: 3,
                     points: 7,
                     lastFiveMatches: [
                        MatchStatus.DRAW,
                        MatchStatus.WIN,
                        MatchStatus.WIN,
                        MatchStatus.NOT_PLAYED,
                        MatchStatus.NOT_PLAYED
                     ]
                  },
                  {
                     clubName: 'D',
                     matchesPlayed: 3,
                     wins: 1,
                     draws: 2,
                     losses: 0,
                     goalsScored: 4,
                     goalsAgainst: 3,
                     goalsDifference: 1,
                     points: 5,
                     lastFiveMatches: [
                        MatchStatus.DRAW,
                        MatchStatus.WIN,
                        MatchStatus.DRAW,
                        MatchStatus.NOT_PLAYED,
                        MatchStatus.NOT_PLAYED
                     ]
                  },
                  {
                     clubName: 'C',
                     matchesPlayed: 3,
                     wins: 0,
                     draws: 2,
                     losses: 1,
                     goalsScored: 5,
                     goalsAgainst: 7,
                     goalsDifference: -2,
                     points: 2,
                     lastFiveMatches: [
                        MatchStatus.DRAW,
                        MatchStatus.LOSS,
                        MatchStatus.DRAW,
                        MatchStatus.NOT_PLAYED,
                        MatchStatus.NOT_PLAYED
                     ]
                  },
                  {
                     clubName: 'B',
                     matchesPlayed: 3,
                     wins: 0,
                     draws: 1,
                     losses: 2,
                     goalsScored: 6,
                     goalsAgainst: 8,
                     goalsDifference: -2,
                     points: 1,
                     lastFiveMatches: [
                        MatchStatus.DRAW,
                        MatchStatus.LOSS,
                        MatchStatus.LOSS,
                        MatchStatus.NOT_PLAYED,
                        MatchStatus.NOT_PLAYED
                     ]
                  }
               ]);
         });
      });

      describe('updateStandingsWithMatchResults', () => {
         it('should call function to update standings set for home team', () => {
            const standingsHash: StandingsHash = {
               A: {
                  clubName: 'A',
                  matchesPlayed: 1,
                  wins: 1,
                  draws: 0,
                  losses: 0,
                  goalsScored: 10,
                  goalsAgainst: 6,
                  goalsDifference: 4,
                  points: 123,
                  lastFiveMatches: []
               }
            };
            const spy = jest.spyOn(stdUtiScope, 'updateTeamStandingSet')
                            .mockImplementation(() => ({} as StandingsSet));

            updateStandingsWithMatchResults(standingsHash, {
               A: 2, B: 1
            });

            expect(standingsHash['A'])
               .toEqual({});

            spy.mockRestore();
         });

         it('should call function to update standings set for away team', () => {
            const standingsHash: StandingsHash = {
               B: {
                  clubName: 'B',
                  matchesPlayed: 1,
                  wins: 1,
                  draws: 0,
                  losses: 0,
                  goalsScored: 10,
                  goalsAgainst: 6,
                  goalsDifference: 4,
                  points: 123,
                  lastFiveMatches: []
               }
            };
            const spy = jest.spyOn(stdUtiScope, 'updateTeamStandingSet')
                            .mockImplementation(() => ({} as StandingsSet));

            updateStandingsWithMatchResults(standingsHash, {
               A: 2, B: 1
            });

            expect(standingsHash['B'])
               .toEqual({});

            spy.mockRestore();
         });
      });

      describe('updateTeamStandingSet', () => {
         it('should return object with initial properties if standing set is not passed', () => {
            const spy = jest.spyOn(stdUtiScope, 'calculatePoints')
                            .mockImplementation(() => 123);
            const spy2 = jest.spyOn(stdUtiScope, 'updateLastFiveMatchesWithMostRecentAtFirstPlace')
                             .mockImplementation(() => []);

            expect(updateTeamStandingSet({
               team: 'A',
               wins: true,
               draws: false,
               losses: false,
               goalsScored: 10,
               goalsAgainst: 6
            }, undefined))
               .toEqual({
                  clubName: 'A',
                  matchesPlayed: 1,
                  wins: 1,
                  draws: 0,
                  losses: 0,
                  goalsScored: 10,
                  goalsAgainst: 6,
                  goalsDifference: 4,
                  points: 123,
                  lastFiveMatches: []
               });

            spy.mockRestore();
            spy2.mockRestore();
         });

         it('should return object updated for win', () => {
            const spy = jest.spyOn(stdUtiScope, 'calculatePoints')
                            .mockImplementation(() => 123);
            const spy2 = jest.spyOn(stdUtiScope, 'updateLastFiveMatchesWithMostRecentAtFirstPlace')
                             .mockImplementation(() => []);

            expect(updateTeamStandingSet({
               team: 'A',
               wins: true,
               draws: false,
               losses: false,
               goalsScored: 2,
               goalsAgainst: 1
            }, {
               clubName: 'A',
               matchesPlayed: 7,
               wins: 1,
               draws: 0,
               losses: 0,
               goalsScored: 10,
               goalsAgainst: 6,
               goalsDifference: 4,
               points: 123,
               lastFiveMatches: []
            }))
               .toEqual({
                  clubName: 'A',
                  matchesPlayed: 8,
                  wins: 2,
                  draws: 0,
                  losses: 0,
                  goalsScored: 12,
                  goalsAgainst: 7,
                  goalsDifference: 5,
                  points: 246,
                  lastFiveMatches: []
               });

            spy.mockRestore();
            spy2.mockRestore();
         });

         it('should return object updated for draw', () => {
            const spy = jest.spyOn(stdUtiScope, 'calculatePoints')
                            .mockImplementation(() => 123);
            const spy2 = jest.spyOn(stdUtiScope, 'updateLastFiveMatchesWithMostRecentAtFirstPlace')
                             .mockImplementation(() => []);

            expect(updateTeamStandingSet({
               team: 'A',
               wins: false,
               draws: true,
               losses: false,
               goalsScored: 2,
               goalsAgainst: 1
            }, {
               clubName: 'A',
               matchesPlayed: 7,
               wins: 1,
               draws: 0,
               losses: 0,
               goalsScored: 10,
               goalsAgainst: 6,
               goalsDifference: 4,
               points: 123,
               lastFiveMatches: []
            }))
               .toEqual({
                  clubName: 'A',
                  matchesPlayed: 8,
                  wins: 1,
                  draws: 1,
                  losses: 0,
                  goalsScored: 12,
                  goalsAgainst: 7,
                  goalsDifference: 5,
                  points: 246,
                  lastFiveMatches: []
               });

            spy.mockRestore();
            spy2.mockRestore();
         });

         it('should return object updated for loss', () => {
            const spy = jest.spyOn(stdUtiScope, 'calculatePoints')
                            .mockImplementation(() => 123);
            const spy2 = jest.spyOn(stdUtiScope, 'updateLastFiveMatchesWithMostRecentAtFirstPlace')
                             .mockImplementation(() => []);

            expect(updateTeamStandingSet({
               team: 'A',
               wins: false,
               draws: false,
               losses: true,
               goalsScored: 2,
               goalsAgainst: 1
            }, {
               clubName: 'A',
               matchesPlayed: 7,
               wins: 1,
               draws: 0,
               losses: 0,
               goalsScored: 10,
               goalsAgainst: 6,
               goalsDifference: 4,
               points: 123,
               lastFiveMatches: []
            }))
               .toEqual({
                  clubName: 'A',
                  matchesPlayed: 8,
                  wins: 1,
                  draws: 0,
                  losses: 1,
                  goalsScored: 12,
                  goalsAgainst: 7,
                  goalsDifference: 5,
                  points: 246,
                  lastFiveMatches: []
               });

            spy.mockRestore();
            spy2.mockRestore();
         });
      });

      describe('calculatePoints', () => {
         it('should return 3 for win', () => {
            expect(calculatePoints(true, false)).toEqual(3);
            expect(calculatePoints(true, true)).toEqual(3);
         });

         it('should return 1 for draw', () => {
            expect(calculatePoints(false, true)).toEqual(1);
         });

         it('should return 0 for loss', () => {
            expect(calculatePoints(false, false)).toEqual(0);
         });
      });

      describe('updateLastFiveMatchesWithMostRecentAtFirstPlace', () => {
         it('should add most recent winning status at first position and remove last one to have 5 max only', () => {
            let lastFiveMatches: MatchStatus[] = [
               MatchStatus.NOT_PLAYED,
               MatchStatus.NOT_PLAYED,
               MatchStatus.NOT_PLAYED,
               MatchStatus.NOT_PLAYED,
               MatchStatus.NOT_PLAYED
            ];

            lastFiveMatches = updateLastFiveMatchesWithMostRecentAtFirstPlace(lastFiveMatches, {
               wins: true,
               draws: false,
               losses: false
            });
            expect(lastFiveMatches).toEqual([
               MatchStatus.WIN,
               MatchStatus.NOT_PLAYED,
               MatchStatus.NOT_PLAYED,
               MatchStatus.NOT_PLAYED,
               MatchStatus.NOT_PLAYED
            ]);

            lastFiveMatches = updateLastFiveMatchesWithMostRecentAtFirstPlace(lastFiveMatches, {
               wins: true,
               draws: false,
               losses: false
            });
            expect(lastFiveMatches).toEqual([
               MatchStatus.WIN,
               MatchStatus.WIN,
               MatchStatus.NOT_PLAYED,
               MatchStatus.NOT_PLAYED,
               MatchStatus.NOT_PLAYED
            ]);

            lastFiveMatches = updateLastFiveMatchesWithMostRecentAtFirstPlace(lastFiveMatches, {
               wins: false,
               draws: true,
               losses: false
            });
            expect(lastFiveMatches).toEqual([
               MatchStatus.DRAW,
               MatchStatus.WIN,
               MatchStatus.WIN,
               MatchStatus.NOT_PLAYED,
               MatchStatus.NOT_PLAYED
            ]);

            lastFiveMatches = updateLastFiveMatchesWithMostRecentAtFirstPlace(lastFiveMatches, {
               wins: true,
               draws: false,
               losses: false
            });
            expect(lastFiveMatches).toEqual([
               MatchStatus.WIN,
               MatchStatus.DRAW,
               MatchStatus.WIN,
               MatchStatus.WIN,
               MatchStatus.NOT_PLAYED
            ]);

            lastFiveMatches = updateLastFiveMatchesWithMostRecentAtFirstPlace(lastFiveMatches, {
               wins: false,
               draws: false,
               losses: true
            });
            expect(lastFiveMatches).toEqual([
               MatchStatus.LOSS,
               MatchStatus.WIN,
               MatchStatus.DRAW,
               MatchStatus.WIN,
               MatchStatus.WIN
            ]);

            lastFiveMatches = updateLastFiveMatchesWithMostRecentAtFirstPlace(lastFiveMatches, {
               wins: false,
               draws: true,
               losses: false
            });
            expect(lastFiveMatches).toEqual([
               MatchStatus.DRAW,
               MatchStatus.LOSS,
               MatchStatus.WIN,
               MatchStatus.DRAW,
               MatchStatus.WIN
            ]);
         });
      });

      describe('getTeamWinningStatus', () => {
         it('should return true only for wins property if team one has more goals', () => {
            expect(getTeamWinningStatus(3, 1))
               .toEqual({
                  wins: true,
                  draws: false,
                  losses: false
               });
         });

         it('should return true only for draws property if team one has equal goals', () => {
            expect(getTeamWinningStatus(2, 2))
               .toEqual({
                  wins: false,
                  draws: true,
                  losses: false
               });
         });

         it('should return true only for losses property if team one has less goals', () => {
            expect(getTeamWinningStatus(0, 1))
               .toEqual({
                  wins: false,
                  draws: false,
                  losses: true
               });
         });
      });

      describe('sortStandingSetsByPointsAndGoalsDifferenceAndGoalsScored', () => {
         it('should sort first by points', () => {
            const B = { points: 3, goalsDifference: 0, goalsScored: 0 } as StandingsSet;
            const A = { points: 2, goalsDifference: 100, goalsScored: 200 } as StandingsSet;
            const C = { points: 1, goalsDifference: 200, goalsScored: 100 } as StandingsSet;

            expect(sortStandingSetsByPointsAndGoalsDifferenceAndGoalsScored({ A, B, C }))
               .toEqual([ B, A, C ]);
         });

         it('should sort second by goals difference', () => {
            const C = { points: 3, goalsDifference: 200, goalsScored: 100 } as StandingsSet;
            const A = { points: 3, goalsDifference: 100, goalsScored: 200 } as StandingsSet;
            const B = { points: 3, goalsDifference: 0, goalsScored: 0 } as StandingsSet;

            expect(sortStandingSetsByPointsAndGoalsDifferenceAndGoalsScored({ A, B, C }))
               .toEqual([ C, A, B ]);
         });

         it('should sort third by goals scored', () => {
            const A = { points: 3, goalsDifference: 100, goalsScored: 200 } as StandingsSet;
            const C = { points: 3, goalsDifference: 100, goalsScored: 100 } as StandingsSet;
            const B = { points: 3, goalsDifference: 100, goalsScored: 0 } as StandingsSet;

            expect(sortStandingSetsByPointsAndGoalsDifferenceAndGoalsScored({ A, B, C }))
               .toEqual([ A, C, B ]);
         });

         it('should sort by all criteria', () => {
            const E = { points: 6, goalsDifference: 0, goalsScored: 0 } as StandingsSet;
            const C = { points: 5, goalsDifference: 33, goalsScored: 5 } as StandingsSet;
            const G = { points: 5, goalsDifference: 10, goalsScored: 10 } as StandingsSet;
            const B = { points: 4, goalsDifference: 10, goalsScored: 33 } as StandingsSet;
            const A = { points: 4, goalsDifference: 10, goalsScored: 0 } as StandingsSet;
            const F = { points: 3, goalsDifference: 50, goalsScored: 50 } as StandingsSet;
            const D = { points: 3, goalsDifference: 50, goalsScored: 50 } as StandingsSet;
            const H = { points: 2, goalsDifference: -5, goalsScored: -5 } as StandingsSet;

            expect(sortStandingSetsByPointsAndGoalsDifferenceAndGoalsScored({ A, B, C, D, E, F, G, H }))
               .toEqual([ E, C, G, B, A, F, D, H ]);
         });
      });
   });
});