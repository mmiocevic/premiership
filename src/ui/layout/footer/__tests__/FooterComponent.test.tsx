import 'jest';
import { shallow } from 'enzyme';
import React from 'react';
import { FooterComponent } from '../FooterComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';

describe('FooterComponent', () => {
   describe('render', () => {
      it('should render mail link first', () => {
         const comp = shallow(<FooterComponent/>).find('a').at(0);

         expect(comp.prop('href')).toEqual('mailto:mislavmiocevic@gmail.com');
         expect(comp.prop('target')).toEqual('_blank');
         expect(comp.prop('rel')).toEqual('noopener noreferrer');
         expect(comp.find(FontAwesomeIcon).prop('icon')).toEqual(faEnvelope);
      });

      it('should render linkedin link second', () => {
         const comp = shallow(<FooterComponent/>).find('a').at(1);

         expect(comp.prop('href')).toEqual('https://hr.linkedin.com/in/mislavmiocevic');
         expect(comp.prop('target')).toEqual('_blank');
         expect(comp.prop('rel')).toEqual('noopener noreferrer');
         expect(comp.find(FontAwesomeIcon).prop('icon')).toEqual(faLinkedin);
      });

      it('should render github link third', () => {
         const comp = shallow(<FooterComponent/>).find('a').at(2);

         expect(comp.prop('href')).toEqual('https://github.com/mmiocevic');
         expect(comp.prop('target')).toEqual('_blank');
         expect(comp.prop('rel')).toEqual('noopener noreferrer');
         expect(comp.find(FontAwesomeIcon).prop('icon')).toEqual(faGithub);
      });
   });
});