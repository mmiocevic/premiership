import React from 'react';
import './StandingsLegendComponent.scss';
import { MatchStatusesClassNames } from '../StandingsComponent';

export const StandingsLegendComponent = (): JSX.Element => {
   return (
      <div className="standings-legend">
         <div>
            <div>Loss</div>
            <div className={MatchStatusesClassNames[0]} />
         </div>

         <div>
            <div>Draw</div>
            <div className={MatchStatusesClassNames[1]} />
         </div>

         <div>
            <div>Win</div>
            <div className={MatchStatusesClassNames[2]} />
         </div>

         <div>
            <div>Not played</div>
            <div className={MatchStatusesClassNames[3]} />
         </div>
      </div>
   );
};