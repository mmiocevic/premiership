import 'jest';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { Http } from '../Http';

describe('Http', () => {
   describe('get method', () => {
      it('should return data if GET request succeeded', (done) => {
         const data = {
            myData: 2
         };
         const mock = new MockAdapter(axios);
         mock.onGet('/my-url').reply(200, data);

         Http.get('/my-url')
             .then(res => {
                expect(res)
                   .toEqual(data);

                done();
             });

         mock.restore();
      });

      it('should return error data if GET request failed', (done) => {
         const mock = new MockAdapter(axios);
         mock.onGet('/my-url').reply(404);

         Http.get('/my-url')
             .catch(e => {
                expect(e.response.status)
                   .toEqual(404);

                done();
             });

         mock.restore();
      });
   });
});