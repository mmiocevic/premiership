import 'jest';
import { shallow } from 'enzyme';
import React from 'react';
import { StandingsComponent, StandingsComponentProps } from '../StandingsComponent';
import { localization } from '../../../configuration/LocalizationConfiguration';
import { MatchStatus, StandingsSet } from '../../../domain/standings/StandingsUtilities';

describe('StandingsComponent', () => {
   const dummyProps: StandingsComponentProps = {
      standings: []
   };

   describe('render', () => {
      it('should render table', () => {
         expect(shallow(<StandingsComponent {...dummyProps}/>).find('table'))
            .toHaveLength(1);
      });

      it('should render thead', () => {
         expect(shallow(<StandingsComponent {...dummyProps}/>).find('table')
                                                              .find('thead'))
            .toHaveLength(1);
      });

      it('should render tr in thead with specific tds', () => {
         const comp = shallow(<StandingsComponent {...dummyProps}/>).find('table')
                                                                    .find('thead')
                                                                    .find('th');

         expect(comp).toHaveLength(11);
         expect(comp.at(0).text()).toEqual(localization.rank);
         expect(comp.at(1).text()).toEqual(localization.club);
         expect(comp.at(2).text()).toEqual(localization.mp);
         expect(comp.at(3).text()).toEqual(localization.w);
         expect(comp.at(4).text()).toEqual(localization.d);
         expect(comp.at(5).text()).toEqual(localization.l);
         expect(comp.at(6).text()).toEqual(localization.gs);
         expect(comp.at(7).text()).toEqual(localization.ga);
         expect(comp.at(8).text()).toEqual(localization.gd);
         expect(comp.at(9).text()).toEqual(localization.pts);
         expect(comp.at(10).text()).toEqual(localization.lastFive);
      });

      it('should render tbody', () => {
         expect(shallow(<StandingsComponent {...dummyProps}/>).find('table')
                                                              .find('tbody'))
            .toHaveLength(1);
      });

      it('should render tr in tbody of how many standings exist and with specific tds', () => {
         const standings: StandingsSet[] = [
            {
               clubName: 'A',
               matchesPlayed: 1,
               wins: 1,
               draws: 0,
               losses: 0,
               goalsScored: 2,
               goalsAgainst: 1,
               goalsDifference: 1,
               points: 3,
               lastFiveMatches: [ MatchStatus.WIN,
                  MatchStatus.NOT_PLAYED,
                  MatchStatus.NOT_PLAYED,
                  MatchStatus.NOT_PLAYED,
                  MatchStatus.NOT_PLAYED
               ]
            },
            {
               clubName: 'B',
               matchesPlayed: 1,
               wins: 0,
               draws: 0,
               losses: 1,
               goalsScored: 1,
               goalsAgainst: 2,
               goalsDifference: -1,
               points: 0,
               lastFiveMatches: [ MatchStatus.LOSS,
                  MatchStatus.NOT_PLAYED,
                  MatchStatus.NOT_PLAYED,
                  MatchStatus.NOT_PLAYED,
                  MatchStatus.NOT_PLAYED
               ]
            }
         ];

         const trs = shallow(<StandingsComponent standings={standings}/>).find('table')
                                                                         .find('tbody')
                                                                         .find('tr');

         const trs0 = trs.at(0);
         const tds0 = trs0.find('td');

         expect(tds0).toHaveLength(11);
         expect(tds0.at(0).text()).toEqual('1');
         expect(tds0.at(1).text()).toEqual('A');
         expect(tds0.at(2).text()).toEqual('1');
         expect(tds0.at(3).text()).toEqual('1');
         expect(tds0.at(4).text()).toEqual('0');
         expect(tds0.at(5).text()).toEqual('0');
         expect(tds0.at(6).text()).toEqual('2');
         expect(tds0.at(7).text()).toEqual('1');
         expect(tds0.at(8).text()).toEqual('1');
         expect(tds0.at(9).text()).toEqual('3');

         const trs1 = trs.at(1);
         const tds1 = trs1.find('td');

         expect(tds1).toHaveLength(11);
         expect(tds1.at(0).text()).toEqual('2');
         expect(tds1.at(1).text()).toEqual('B');
         expect(tds1.at(2).text()).toEqual('1');
         expect(tds1.at(3).text()).toEqual('0');
         expect(tds1.at(4).text()).toEqual('0');
         expect(tds1.at(5).text()).toEqual('1');
         expect(tds1.at(6).text()).toEqual('1');
         expect(tds1.at(7).text()).toEqual('2');
         expect(tds1.at(8).text()).toEqual('-1');
         expect(tds1.at(9).text()).toEqual('0');
      });
   });
});