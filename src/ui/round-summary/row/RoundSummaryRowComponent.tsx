import React from 'react';
import { MatchModel } from '../../../domain/rounds/RoundsModels';
import './RoundSummaryRowComponent.scss';

export interface RoundSummaryRowComponentProps {
   match: MatchModel;
}

export const RoundSummaryRowComponent = ({ match }: RoundSummaryRowComponentProps): JSX.Element => {
   const [ homeTeam, awayTeam ] = Object.keys(match);

   return (
      <tr className="round-summary-row">
         <td>{homeTeam}</td>
         <td>{match[homeTeam]}</td>
         <td>{match[awayTeam]}</td>
         <td>{awayTeam}</td>
      </tr>
   );
};