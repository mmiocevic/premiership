import React from 'react';
import './StandingsSetComponent.scss';

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
                                         points
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
   </tr>
);