import React from 'react';
import { MatchStatusesClassNames } from '../StandingsComponent';
import { localization } from '../../../configuration/LocalizationConfiguration';
import './StandingsLegendComponent.scss';

export const StandingsLegendComponent = (): JSX.Element => {
   return (
      <div className="standings-legend">
         <div className="standings-legend__loss">
            <div>{localization.loss}</div>
            <div className={MatchStatusesClassNames[0]} />
         </div>

         <div className="standings-legend__draw">
            <div>{localization.draw}</div>
            <div className={MatchStatusesClassNames[1]} />
         </div>

         <div className="standings-legend__win">
            <div>{localization.win}</div>
            <div className={MatchStatusesClassNames[2]} />
         </div>

         <div className="standings-legend__notPlayed">
            <div>{localization.notPlayed}</div>
            <div className={MatchStatusesClassNames[3]} />
         </div>
      </div>
   );
};