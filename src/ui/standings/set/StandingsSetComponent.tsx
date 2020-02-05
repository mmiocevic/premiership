import React from 'react';
import './StandingsSetComponent.scss';

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

type StandingsSetComponentProps = StandingsSet & {
   position: number;
}

export const StandingsSetComponent = ({
                                         position,
                                         clubName,
                                         matchesPlayed,
                                         wins,
                                         draws,
                                         losses,
                                         goalsScored,
                                         goalsAgainst,
                                         goalsDifference,
                                         points,
                                         lastFiveMatches
                                      }: StandingsSetComponentProps): JSX.Element => (
   <tr className="standings-set">
      <td>{position}</td>
      <td>{clubName}</td>
      <td>{matchesPlayed}</td>
      <td>{wins}</td>
      <td>{draws}</td>
      <td>{losses}</td>
      <td>{goalsScored}</td>
      <td>{goalsAgainst}</td>
      <td>{goalsDifference}</td>
      <td>{points}</td>
      <td>
         <div className="standings-set__match-statuses">
            {lastFiveMatches.map((matchStatus, index) => (
               <div
                  key={index}
                  className={getClassNameBasedOnMatchStatus(matchStatus)}
               />
            ))}
         </div>
      </td>
   </tr>
);

const MatchStatusesClassNames = [
   'loss',
   'draw',
   'win',
   'not_played'
];

const getClassNameBasedOnMatchStatus = (matchStatus: MatchStatus): string =>
   MatchStatusesClassNames[matchStatus];