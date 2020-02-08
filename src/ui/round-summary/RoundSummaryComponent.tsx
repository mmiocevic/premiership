import React from 'react';
import { MatchModel } from '../../domain/rounds/RoundsModels';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons/faTrophy';
import { localization } from '../../configuration/LocalizationConfiguration';
import './RoundSummaryComponent.scss';

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
               <th>{localization.home}</th>
               <th></th>
               <th></th>
               <th></th>
               <th></th>
               <th></th>
               <th>{localization.away}</th>
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
                     <td>:</td>
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