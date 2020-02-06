import 'jest';
import { shallow } from 'enzyme';
import React from 'react';
import { RoundSummaryComponent, RoundSummaryComponentProps } from '../RoundSummaryComponent';
import { RoundSummaryRowComponent } from '../row/RoundSummaryRowComponent';
import { MatchModel } from '../../../domain/rounds/RoundsModels';

describe('AppComponent', () => {
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

      it('should render 4 th', () => {
         const comp = shallow(<RoundSummaryComponent{...dummyProps}/>);
         const ths = comp.find('table').find('thead').find('th');

         expect(ths).toHaveLength(4);
         expect(ths.at(0).text()).toEqual('Home');
         expect(ths.at(1).text()).toEqual('');
         expect(ths.at(2).text()).toEqual('');
         expect(ths.at(3).text()).toEqual('Away');
      });

      it('should render tbody', () => {
         const comp = shallow(<RoundSummaryComponent{...dummyProps}/>);

         expect(comp.find('table').find('tbody'))
            .toHaveLength(1);
      });

      it('should render RoundSummaryRowComponent of how many matches exist', () => {
         const comp = shallow(<RoundSummaryComponent{...dummyProps} matches={matches}/>);
         const elements = comp.find(RoundSummaryRowComponent);

         expect(elements).toHaveLength(2);
         expect(elements.at(0).prop('match')).toEqual(matches[0]);
         expect(elements.at(1).prop('match')).toEqual(matches[1]);

      });
   });
});