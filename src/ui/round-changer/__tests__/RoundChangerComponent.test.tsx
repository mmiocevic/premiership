import 'jest';
import { shallow } from 'enzyme';
import React from 'react';
import { RoundChangerComponent, RoundChangerComponentProps } from '../RoundChangerComponent';

describe('AppComponent', () => {
   const dummyProps: RoundChangerComponentProps = {
      selectedRoundId: 1,
      roundIds: [],
      onRoundIdChange: () => {
      }
   };
   const roundIds: number[] = [ 1, 2, 3, 4 ];

   describe('render', () => {
      it('should render select', () => {
         const comp = shallow(<RoundChangerComponent{...dummyProps}/>);

         expect(comp.find('select'))
            .toHaveLength(1);
      });

      it('should render select options of how many round numbers exist', () => {
         const comp = shallow(<RoundChangerComponent{...dummyProps} roundIds={roundIds}/>);

         expect(comp.find('select').find('option'))
            .toHaveLength(4);
      });
   });

   describe('actions', () => {
      it('should call onRoundIdChange prop if select changed', (done) => {
         const comp = shallow(<RoundChangerComponent
            {...dummyProps}
            roundIds={roundIds}
            onRoundIdChange={selectedRoundId => {
               expect(selectedRoundId).toEqual(4);
               done();
            }}
         />);

         comp.find('select')
             .simulate('change', { currentTarget: { selectedIndex: 3 } });
      });
   });
});