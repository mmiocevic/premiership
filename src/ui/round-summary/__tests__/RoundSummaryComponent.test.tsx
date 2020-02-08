import 'jest';
import { shallow } from 'enzyme';
import React from 'react';
import { RoundSummaryComponent, RoundSummaryComponentProps } from '../RoundSummaryComponent';
import { MatchModel } from '../../../domain/rounds/RoundsModels';
import { localization } from '../../../configuration/LocalizationConfiguration';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons/faTrophy';

describe('RoundSummaryComponent', () => {
   const dummyProps: RoundSummaryComponentProps = {
      matches: []
   };
   const matches: MatchModel[] = [
      { 'A': 2, 'B': 1 },
      { 'C': 1, 'D': 1 }
   ];

   describe('render', () => {
      it('should render table', () => {
         const comp = shallow(<RoundSummaryComponent{...dummyProps}/>);

         expect(comp.find('table'))
            .toHaveLength(1);
      });

      it('should render thead', () => {
         const comp = shallow(<RoundSummaryComponent{...dummyProps}/>);

         expect(comp.find('table').find('thead'))
            .toHaveLength(1);
      });

      it('should render 7 th', () => {
         const comp = shallow(<RoundSummaryComponent{...dummyProps}/>);
         const ths = comp.find('table').find('thead').find('th');

         expect(ths).toHaveLength(7);
         expect(ths.at(0).text()).toEqual(localization.home);
         expect(ths.at(1).text()).toEqual('');
         expect(ths.at(2).text()).toEqual('');
         expect(ths.at(3).text()).toEqual('');
         expect(ths.at(4).text()).toEqual('');
         expect(ths.at(5).text()).toEqual('');
         expect(ths.at(6).text()).toEqual(localization.away);
      });

      it('should render tbody', () => {
         const comp = shallow(<RoundSummaryComponent{...dummyProps}/>);

         expect(comp.find('table').find('tbody'))
            .toHaveLength(1);
      });

      it('should render tr of how many matches exist with specific td', () => {
         const comp = shallow(<RoundSummaryComponent{...dummyProps} matches={matches}/>);
         const trs = comp.find('tbody').find('tr');

         expect(trs).toHaveLength(2);

         const tds0 = trs.at(0).find('td');

         expect(tds0).toHaveLength(7);
         expect(tds0.at(0).text()).toEqual('A');
         expect(tds0.at(1).find(FontAwesomeIcon).prop('icon')).toEqual(faTrophy);
         expect(tds0.at(2).text()).toEqual('2');
         expect(tds0.at(3).text()).toEqual(':');
         expect(tds0.at(4).text()).toEqual('1');
         expect(tds0.at(5).find(FontAwesomeIcon)).toHaveLength(0);
         expect(tds0.at(6).text()).toEqual('B');

         const tds1 = trs.at(1).find('td');

         expect(tds1).toHaveLength(7);
         expect(tds1.at(0).text()).toEqual('C');
         expect(tds1.at(1).find(FontAwesomeIcon)).toHaveLength(0);
         expect(tds1.at(2).text()).toEqual('1');
         expect(tds1.at(3).text()).toEqual(':');
         expect(tds1.at(4).text()).toEqual('1');
         expect(tds1.at(5).find(FontAwesomeIcon)).toHaveLength(0);
         expect(tds1.at(6).text()).toEqual('D');
      });
   });
});