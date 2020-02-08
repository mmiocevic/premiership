import 'jest';
import { shallow } from 'enzyme';
import React from 'react';
import { StandingsLegendComponent } from '../StandingsLegendComponent';
import { localization } from '../../../../configuration/LocalizationConfiguration';
import { MatchStatusesClassNames } from '../../StandingsComponent';

describe('StandingsLegendComponent', () => {
   describe('render', () => {
      it('should render loss legend description first', () => {
         const comp = shallow(<StandingsLegendComponent/>).find('.standings-legend__loss').at(0);

         expect(comp.text()).toContain(localization.loss);
         expect(comp.find(`.${MatchStatusesClassNames[0]}`)).toHaveLength(1);
      });

      it('should render draw legend description first', () => {
         const comp = shallow(<StandingsLegendComponent/>).find('.standings-legend__draw').at(0);

         expect(comp.text()).toContain(localization.draw);
         expect(comp.find(`.${MatchStatusesClassNames[1]}`)).toHaveLength(1);
      });

      it('should render win legend description first', () => {
         const comp = shallow(<StandingsLegendComponent/>).find('.standings-legend__win').at(0);

         expect(comp.text()).toContain(localization.win);
         expect(comp.find(`.${MatchStatusesClassNames[2]}`)).toHaveLength(1);
      });

      it('should render not played legend description first', () => {
         const comp = shallow(<StandingsLegendComponent/>).find('.standings-legend__notPlayed').at(0);

         expect(comp.text()).toContain(localization.notPlayed);
         expect(comp.find(`.${MatchStatusesClassNames[3]}`)).toHaveLength(1);
      });
   });
});