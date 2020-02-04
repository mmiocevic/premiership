import React from 'react';
import { MatchModel } from '../../domain/rounds/RoundsModels';
import { RoundSummaryRowComponent } from './row/RoundSummaryRowComponent';

interface RoundSummaryComponentProps {
   matches: MatchModel[];
}

export const RoundSummaryComponent = ({ matches }: RoundSummaryComponentProps): JSX.Element => {
   return (
      <table className="round-summary">
         <thead>
            <tr>
               <th>Home</th>
               <th></th>
               <th></th>
               <th>Away</th>
            </tr>
         </thead>

         <tbody>
         {matches.map((match: MatchModel, index: number) => (
            <RoundSummaryRowComponent
               key={index}
               match={match}
            />
         ))}
         </tbody>
      </table>
   );
};