import 'jest';
import { shallow } from 'enzyme';
import React from 'react';
import { HeaderComponent, HeaderComponentProps } from '../HeaderComponent';
import { brandName } from '../../../../configuration/Globals';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFutbol } from '@fortawesome/free-solid-svg-icons/faFutbol';
import { locales } from '../../../../configuration/LocalizationConfiguration';

describe('HeaderComponent', () => {
   const dummyProps: HeaderComponentProps = {
      selectedLocale: 'en',
      onLocaleChange: () => {
      }
   };

   describe('render', () => {
      it('should render brand', () => {
         const comp = shallow(<HeaderComponent {...dummyProps}/>).find('.brand').at(0);

         expect(comp.find(FontAwesomeIcon).prop('icon')).toEqual(faFutbol);
         expect(comp.text()).toContain(brandName);
      });

      it('should render locale changer', () => {
         const comp = shallow(<HeaderComponent {...dummyProps}/>).find('select').at(0);
         const options = comp.find('option');

         expect(options).toHaveLength(locales.length);
         expect(options.at(0).prop('value')).toEqual(locales[0]);
         expect(options.at(0).text()).toEqual(locales[0]);
         expect(options.at(1).prop('value')).toEqual(locales[1]);
         expect(options.at(1).text()).toEqual(locales[1]);
      });
   });
});