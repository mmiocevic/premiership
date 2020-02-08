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
      <div className="round-summary">
         <table>
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

               return (
                  <tr key={index}>
                     <td>{homeTeam}</td>
                     <td>{isTeamWinner(homeTeamGoals, awayTeamGoals) ? winnerIcon : null}</td>
                     <td>{homeTeamGoals}</td>
                     <td>{awayTeamGoals}</td>
                     <td>{isTeamWinner(awayTeamGoals, homeTeamGoals) ? winnerIcon : null}</td>
                     <td>{awayTeam}</td>
                  </tr>
               );
            })}
            </tbody>
         </table>
      </div>
   );
};

const isTeamWinner = (teamOneGoals: number, teamTwoGoals: number) =>
   teamOneGoals > teamTwoGoals;