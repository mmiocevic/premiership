import 'jest';
import { shallow } from 'enzyme';
import React from 'react';
import { AppComponent, AppComponentProps } from '../AppComponent';
import { RoundChangerComponent } from '../round-changer/RoundChangerComponent';
import { RoundSummaryComponent } from '../round-summary/RoundSummaryComponent';
import { StandingsComponent } from '../standings/StandingsComponent';
import { RoundModel } from '../../domain/rounds/RoundsModels';
import * as roundsUtilitiesScope from '../../domain/rounds/RoundsUtilities';
import * as standingsUtilitiesScope from '../../domain/standings/StandingsUtilities';
import { HeaderComponent } from '../layout/header/HeaderComponent';
import { FooterComponent } from '../layout/footer/FooterComponent';
import * as localizationConfigurationScope from '../../configuration/LocalizationConfiguration';

describe('AppComponent', () => {
   const dummyProps: AppComponentProps = {
      rounds: [],
      selectedRoundId: -1,
      getRounds: () => {
      },
      changeSelectedRoundId: () => {
      }
   };
   const rounds: RoundModel[] = [ { round: 1, matches: [ { 'A': 2, 'B': 1 } ] } ];

   describe('render', () => {
      it('should render HeaderComponent', () => {
         expect(shallow(<AppComponent{...dummyProps} rounds={rounds}/>).find(HeaderComponent))
            .toHaveLength(1);
      });

      it('should render background component', () => {
         expect(shallow(<AppComponent{...dummyProps} rounds={rounds}/>).find('.football'))
            .toHaveLength(1);
      });

      it('should not render specific components if rounds data not exists', () => {
         const comp = shallow(<AppComponent{...dummyProps}/>);

         expect(comp.find(RoundChangerComponent)).toHaveLength(0);
         expect(comp.find(RoundSummaryComponent)).toHaveLength(0);
         expect(comp.find(StandingsComponent)).toHaveLength(0);
      });

      it('should render RoundChangerComponent if rounds data exists', () => {
         expect(shallow(<AppComponent{...dummyProps} rounds={rounds}/>).find(RoundChangerComponent))
            .toHaveLength(1);
      });

      it('should render RoundSummaryComponent if rounds data exists', () => {
         expect(shallow(<AppComponent{...dummyProps} rounds={rounds}/>).find(RoundSummaryComponent))
            .toHaveLength(1);
      });

      it('should render StandingsComponent if rounds data exists', () => {
         expect(shallow(<AppComponent{...dummyProps} rounds={rounds}/>).find(StandingsComponent))
            .toHaveLength(1);
      });

      it('should render FooterComponent', () => {
         expect(shallow(<AppComponent{...dummyProps} rounds={rounds}/>).find(FooterComponent))
            .toHaveLength(1);
      });
   });

   describe('mounted', () => {
      /*it('should call getRound prop only once', () => {
         // https://github.com/airbnb/enzyme/issues/2086
         // jos nemaju taj support sa shallow :(
         // inace nekakva implementacija bi mozda izgledala kao (da se koristi class based komponenta):

         const spy = jest.spyOn(dummyProps, 'getRounds');

         shallow(<AppComponent{...dummyProps}/>);

         expect(spy)
            .toHaveBeenCalledTimes(1);

         spy.mockClear();
      });*/
   });

   describe('components props', () => {
      describe('HeaderComponent', () => {
         it('selectedLocale', () => {
            expect(shallow(<AppComponent{...dummyProps}/>)
               .find(HeaderComponent).at(0).prop('selectedLocale'))
               .toEqual('en');
         });

         it('onLocaleChange', () => {
            const spy = jest.spyOn(localizationConfigurationScope, 'setLocaleToStorage');

            shallow(<AppComponent{...dummyProps}/>).find(HeaderComponent).at(0)
                                                   .simulate('localeChange', 'hr');

            expect(spy)
               .toHaveBeenCalledWith('hr');

            spy.mockClear();
         });
      });

      describe('RoundChangerComponent', () => {
         it('selectedRoundId', () => {
            expect(shallow(<AppComponent{...dummyProps} rounds={rounds} selectedRoundId={3}/>)
               .find(RoundChangerComponent).at(0).prop('selectedRoundId'))
               .toEqual(3);
         });

         it('roundIds', () => {
            const spy = jest.spyOn(roundsUtilitiesScope, 'extractRoundIds')
                            .mockImplementationOnce(() => [ rounds[0].round ]);

            expect(shallow(<AppComponent{...dummyProps} rounds={rounds}/>)
               .find(RoundChangerComponent).at(0).prop('roundIds'))
               .toEqual([ 1 ]);

            spy.mockClear();
         });

         it('onRoundIdChange', (done) => {
            shallow(<AppComponent{...dummyProps} rounds={rounds} changeSelectedRoundId={newRoundId => {
               expect(newRoundId).toEqual(55);
               done();
            }}/>).find(RoundChangerComponent).at(0)
                 .simulate('roundIdChange', 55);
         });
      });

      describe('RoundSummaryComponent', () => {
         it('matches', () => {
            const spy = jest.spyOn(roundsUtilitiesScope, 'getRoundById')
                            .mockImplementationOnce(() => rounds[0]);

            expect(shallow(<AppComponent{...dummyProps} rounds={rounds} selectedRoundId={1}/>)
               .find(RoundSummaryComponent).at(0).prop('matches'))
               .toEqual(rounds[0].matches);

            spy.mockClear();
         });
      });

      describe('StandingsComponent', () => {
         it('standings', () => {
            const spy = jest.spyOn(standingsUtilitiesScope, 'roundsToStandings')
                            .mockImplementationOnce((rounds, selectedRoundId): any => {
                               expect(rounds).toEqual(rounds);
                               expect(selectedRoundId).toEqual(1);
                               return 2;
                            });

            expect(shallow(<AppComponent{...dummyProps} rounds={rounds} selectedRoundId={1}/>)
               .find(StandingsComponent).at(0).prop('standings'))
               .toEqual(2);

            spy.mockClear();
         });
      });
   });
});
