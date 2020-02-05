import React from 'react';
import { StandingsSet, StandingsSetComponent } from './set/StandingsSetComponent';

interface StandingsComponentProps {
   standings: StandingsSet[];
}

export const StandingsComponent = ({ standings }: StandingsComponentProps): JSX.Element => (
   <table className="standings">
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
         <StandingsSetComponent
            key={standingsSet.clubName}
            position={index}
            {...standingsSet}
         />
      ))}
      </tbody>
   </table>
);