import React from 'react';
import './StandingsComponent.scss';
import { MatchStatus, StandingsSet } from '../../domain/standings/StandingsUtilities';
import { StandingsLegendComponent } from './last-five-matches/StandingsLegendComponent';

interface StandingsComponentProps {
   standings: StandingsSet[];
}

export const StandingsComponent = ({ standings }: StandingsComponentProps): JSX.Element => (
   <div className="standings">
      <table>
         <thead>
         <tr>
            <th>Rank</th>
            <th>Club</th>
            <th>MP</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>GS</th>
            <th>GA</th>
            <th>GD</th>
            <th>Pts</th>
            <th>Last 5</th>
         </tr>
         </thead>

         <tbody>
         {standings.map((standingsSet: StandingsSet, index: number) => (
            <tr key={index}>
               <td>{index + 1}</td>
               <td>{standingsSet.clubName}</td>
               <td>{standingsSet.matchesPlayed}</td>
               <td>{standingsSet.wins}</td>
               <td>{standingsSet.draws}</td>
               <td>{standingsSet.losses}</td>
               <td>{standingsSet.goalsScored}</td>
               <td>{standingsSet.goalsAgainst}</td>
               <td>{standingsSet.goalsDifference}</td>
               <td>{standingsSet.points}</td>
               <td>
                  <div className="match-statuses">
                     {standingsSet.lastFiveMatches.map((matchStatus, index) => (
                        <div
                           key={index}
                           className={getClassNameBasedOnMatchStatus(matchStatus)}
                        />
                     ))}
                  </div>
               </td>
            </tr>
         ))}
         </tbody>
      </table>

      <StandingsLegendComponent/>
   </div>
);

export const MatchStatusesClassNames = [
   'loss',
   'draw',
   'win',
   'not_played'
];

const getClassNameBasedOnMatchStatus = (matchStatus: MatchStatus): string =>
   MatchStatusesClassNames[matchStatus];