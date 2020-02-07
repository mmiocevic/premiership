import React from 'react';
import { MatchModel } from '../../domain/rounds/RoundsModels';
import './RoundSummaryComponent.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons/faTrophy';

export interface RoundSummaryComponentProps {
   matches: MatchModel[];
}

const winnerIcon = <span className="winner"><FontAwesomeIcon icon={faTrophy}/></span>;

export const RoundSummaryComponent = ({ matches }: RoundSummaryComponentProps): JSX.Element => {
   return (
      <table className="round-summary">
         <thead>
         <tr>
            <th>Home</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th>Away</th>
         </tr>
         </thead>

         <tbody>
         {matches.map((match: MatchModel, index: number) => {
            const [ homeTeam, awayTeam ] = Object.keys(match);
            const homeTeamGoals = match[homeTeam];
            const awayTeamGoals = match[awayTeam];
            const homeTeamWon = isHomeTeamWinner(homeTeamGoals, awayTeamGoals);
            const homeTeamWinner = homeTeamWon ? winnerIcon : null;
            const awayTeamWinner = !homeTeamWon ? winnerIcon : null;

            return (
               <tr key={index}>
                  <td>{homeTeam}</td>
                  <td>{homeTeamWinner}</td>
                  <td>{homeTeamGoals}</td>
                  <td>{awayTeamGoals}</td>
                  <td>{awayTeamWinner}</td>
                  <td>{awayTeam}</td>
               </tr>
            );
         })}
         </tbody>
      </table>
   );
};

const isHomeTeamWinner = (homeTeamGoals: number, awayTeamGoals: number) =>
   homeTeamGoals > awayTeamGoals;