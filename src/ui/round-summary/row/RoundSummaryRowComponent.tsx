import React from 'react';
import { MatchModel } from '../../../domain/rounds/RoundsModels';
import './RoundSummaryRowComponent.scss';

interface RoundSummaryRowComponentProps {
   match: MatchModel;
}

export const RoundSummaryRowComponent = ({ match }: RoundSummaryRowComponentProps): JSX.Element => {
   /* Nazalost server vraca objekt u kojem nema primjerice property homeTeam ili property awayTeam,
    te se mora ovako pretpostavljati. */
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