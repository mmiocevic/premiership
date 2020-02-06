import 'jest';
import { Http } from '../../Http';
import { getRoundsAdapter } from '../RoundsAdapter';

describe('getRoundsAdapter', () => {
   it('should call function for GET request with specific URL', () => {
      const spy = jest.spyOn(Http, 'get');

      getRoundsAdapter();

      expect(spy)
         .toHaveBeenCalledWith('/js-assignment/data.json');

      spy.mockClear();
   });
});