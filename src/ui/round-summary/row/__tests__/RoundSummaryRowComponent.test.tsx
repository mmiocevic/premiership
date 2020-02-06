import 'jest';
import { shallow } from 'enzyme';
import React from 'react';
import { RoundSummaryRowComponent, RoundSummaryRowComponentProps } from '../RoundSummaryRowComponent';

describe('AppComponent', () => {
   const dummyProps: RoundSummaryRowComponentProps = {
      match: {}
   };
   const match = { 'A': 2, 'B': 1 };

   describe('render', () => {
      it('should render tr', () => {
         const comp = shallow(<RoundSummaryRowComponent{...dummyProps}/>);

         expect(comp.find('tr'))
            .toHaveLength(1);
      });

      it('should render 4 td with content', () => {
         const comp = shallow(<RoundSummaryRowComponent{...dummyProps} match={match}/>);
         const tds = comp.find('tr').find('td');

         expect(tds).toHaveLength(4);
         expect(tds.at(0).text()).toEqual('A');
         expect(tds.at(1).text()).toEqual('2');
         expect(tds.at(2).text()).toEqual('1');
         expect(tds.at(3).text()).toEqual('B');
      });
   });
});