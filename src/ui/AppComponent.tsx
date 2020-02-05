import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { StoreState } from '../configuration/StoreConfiguration';
import { RoundModel } from '../domain/rounds/RoundsModels';
import {
   ChangeSelectedRoundActionCreator,
   changeSelectedRoundActionCreator,
   GetRoundsActionCreator,
   getRoundsActionCreator
} from '../domain/rounds/RoundsActionCreators';
import { RoundChangerComponent } from './round-changer/RoundChangerComponent';
import { RoundSummaryComponent } from './round-summary/RoundSummaryComponent';
import { StandingsComponent } from './standings/StandingsComponent';
import { roundToStandings } from '../domain/standings/StandingsUtilities';

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
   changeSelectedRound: (selectedRoundId: number) => void;
}

type DispatchStateTypes = GetRoundsActionCreator
   | ChangeSelectedRoundActionCreator;

const mapDispatchToProps = (dispatch: Dispatch<DispatchStateTypes>): DispatchState => ({
   getRounds: () => dispatch(getRoundsActionCreator()),
   changeSelectedRound: (selectedRoundId: number) => dispatch(changeSelectedRoundActionCreator(selectedRoundId))
});

type AppProps = PropsState & DispatchState;

export default connect(mapStateToProps, mapDispatchToProps)((
   {
      rounds,
      selectedRoundId,
      getRounds,
      changeSelectedRound
   }: AppProps): JSX.Element => {

   useEffect(() => {
      getRounds();
   }, []);

   return (
      <div className="app">
         {rounds.length > 0 && selectedRoundId > -1 && (
            <>
               <div>
                  <RoundChangerComponent
                     selectedRoundId={selectedRoundId}
                     rounds={extractRoundNumbers(rounds)}
                     onRoundChange={newRoundId => changeSelectedRound(newRoundId)}
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
});

const extractRoundNumbers = (rounds: RoundModel[]) =>
   rounds.map(round => round.round);

const getRoundById = (rounds: RoundModel[], id: number) =>
   rounds.find(round => round.round === id) || {
      round: -1,
      matches: []
   };