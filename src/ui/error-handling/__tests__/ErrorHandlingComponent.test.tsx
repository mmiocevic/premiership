import 'jest';
import { shallow } from 'enzyme';
import React from 'react';
import { ErrorHandlingComponent, ErrorHandlingComponentProps } from '../ErrorHandlingComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

describe('ErrorHandlingComponent', () => {
   const dummyProps: ErrorHandlingComponentProps = {
      error: undefined,
      clearError: () => {
      }
   };

   describe('render', () => {
      it('should render nothing if errors not exist', () => {
         expect(shallow(<ErrorHandlingComponent{...dummyProps}/>).find('.error-handling'))
            .toHaveLength(0);
      });

      it('should render error component if errors exist', () => {
         const comp = shallow(<ErrorHandlingComponent{...dummyProps} error={{ message: 'Err' }}/>)
            .find('.error-handling');

         expect(comp).toHaveLength(1);
         expect(comp.text()).toContain('Err');
         expect(comp.find(FontAwesomeIcon)).toHaveLength(1);
      });
   });

   describe('actions', () => {
      describe('clicking error icon', () => {
         it('should call clearError', (done) => {
            shallow(<ErrorHandlingComponent{...dummyProps} error={{ message: 'Err' }} clearError={() => done()}
            />)
               .find(FontAwesomeIcon)
               .simulate('click');
         });
      });
   });
});