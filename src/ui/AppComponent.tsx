import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { StoreState } from '../configuration/StoreConfiguration';
import {
   ChangeSelectedRoundIdActionCreator,
   changeSelectedRoundIdActionCreator,
   GetRoundsActionCreator,
   getRoundsActionCreator
} from '../domain/rounds/RoundsActionCreators';
import { RoundModel } from '../domain/rounds/RoundsModels';
import { RoundChangerComponent } from './round-changer/RoundChangerComponent';
import { RoundSummaryComponent } from './round-summary/RoundSummaryComponent';
import { StandingsComponent } from './standings/StandingsComponent';
import { roundToStandings } from '../domain/standings/StandingsUtilities';
import { extractRoundIds, getRoundById } from '../domain/rounds/RoundsUtilities';

interface PropsState {
   rounds: RoundModel[];
   selectedRoundId: number;
}

const mapStateToProps = (state: StoreState): PropsState => ({
   rounds: state.roundsReducer.rounds,
   selectedRoundId: state.roundsReducer.selectedRoundId
});

interface DispatchState {
   getRounds: () => void;
   changeSelectedRoundId: (selectedRoundId: number) => void;
}

type DispatchStateTypes = GetRoundsActionCreator
   | ChangeSelectedRoundIdActionCreator;

const mapDispatchToProps = (dispatch: Dispatch<DispatchStateTypes>): DispatchState => ({
   getRounds: () => dispatch(getRoundsActionCreator()),
   changeSelectedRoundId: (selectedRoundId: number) => dispatch(changeSelectedRoundIdActionCreator(selectedRoundId))
});

export type AppComponentProps = PropsState & DispatchState;

export const AppComponent = (
   {
      rounds,
      selectedRoundId,
      getRounds,
      changeSelectedRoundId
   }: AppComponentProps): JSX.Element => {

   useEffect(() => {
      getRounds();
   }, []);

   return (
      <div className="app">
         {rounds.length > 0 && (
            <>
               <div>
                  <RoundChangerComponent
                     selectedRoundId={selectedRoundId}
                     roundIds={extractRoundIds(rounds)}
                     onRoundIdChange={newRoundId => changeSelectedRoundId(newRoundId)}
                  />
               </div>

               <div>
                  <RoundSummaryComponent
                     matches={getRoundById(rounds, selectedRoundId).matches}
                  />
               </div>

               <div>
                  <StandingsComponent
                     standings={roundToStandings(rounds, selectedRoundId)}
                  />
               </div>
            </>
         )}
      </div>
   );
};

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
