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
import { roundsToStandings } from '../domain/standings/StandingsUtilities';
import { extractRoundIds, getRoundById } from '../domain/rounds/RoundsUtilities';
import { HeaderComponent } from './layout/header/HeaderComponent';
import { FooterComponent } from './layout/footer/FooterComponent';
import {
   getLocaleFromStorageOrDefaultLocale,
   Locales,
   localization,
   setLocaleToStorage
} from '../configuration/LocalizationConfiguration';
import './AppComponent.scss';

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

type DispatchStateType = GetRoundsActionCreator
   | ChangeSelectedRoundIdActionCreator;

const mapDispatchToProps = (dispatch: Dispatch<DispatchStateType>): DispatchState => ({
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
   const [ currentLocale, setCurrentLocale ] = React.useState(getLocaleFromStorageOrDefaultLocale());
   localization.setLanguage(currentLocale);

   useEffect(() => {
      getRounds();
   }, []);

   return (
      <div className="app">
         <HeaderComponent
            selectedLocale={currentLocale}
            onLocaleChange={(locale: Locales) => {
               setLocaleToStorage(locale);
               setCurrentLocale(locale);
            }}
         />

         <div className="football"/>

         {rounds.length > 0 && (
            <>
               <div className="center space-top-bottom">
                  <RoundChangerComponent
                     selectedRoundId={selectedRoundId}
                     roundIds={extractRoundIds(rounds)}
                     onRoundIdChange={newRoundId => changeSelectedRoundId(newRoundId)}
                  />
               </div>

               <div className="table-container space-top-bottom">
                  <RoundSummaryComponent
                     matches={getRoundById(rounds, selectedRoundId).matches}
                  />
               </div>

               <div className="table-container space-top-bottom">
                  <StandingsComponent
                     standings={roundsToStandings(rounds, selectedRoundId)}
                  />
               </div>
            </>
         )}

         <FooterComponent/>
      </div>
   );
};

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
