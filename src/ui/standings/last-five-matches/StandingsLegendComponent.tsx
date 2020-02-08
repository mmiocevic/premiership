import React from 'react';
import './StandingsLegendComponent.scss';
import { MatchStatusesClassNames } from '../StandingsComponent';
import { localization } from '../../../configuration/LocalizationConfiguration';

export const StandingsLegendComponent = (): JSX.Element => {
   return (
      <div className="standings-legend">
         <div>
            <div>{localization.loss}</div>
            <div className={MatchStatusesClassNames[0]} />
         </div>

         <div>
            <div>{localization.draw}</div>
            <div className={MatchStatusesClassNames[1]} />
         </div>

         <div>
            <div>{localization.win}</div>
            <div className={MatchStatusesClassNames[2]} />
         </div>

         <div>
            <div>{localization.notPlayed}</div>
            <div className={MatchStatusesClassNames[3]} />
         </div>
      </div>
   );
};