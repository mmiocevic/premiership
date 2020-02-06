import 'jest';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { createStore } from 'redux';
import { getRoundsAdapter } from '../../../adapters/rounds/RoundsAdapter';
import { roundsReducer } from '../RoundsReducer';
import { roundsSagas } from '../RoundsSagas';
import { changeSelectedRoundIdActionCreator, getRoundsActionCreator } from '../RoundsActionCreators';
import { RoundModel } from '../RoundsModels';
import { extractRoundIds, getRoundById } from '../RoundsUtilities';

describe('RoundsDomain', () => {
   it('should have specific initial state in reducer', () => {
      const store = createStore(roundsReducer);

      expect(store.getState().selectedRoundId).toEqual(-1);
      expect(store.getState().rounds).toEqual([]);
   });

   describe('initiating action for rounds data retrieval', () => {
      it('should successfully store rounds data', () => {
         const rounds: RoundModel[] = [
            { round: 1, matches: [ { 'A': 2, 'B': 1 }, { 'C': 0, 'D': 0 } ] }
         ];

         return expectSaga(roundsSagas)
            .withReducer(roundsReducer)
            .provide([
               [ matchers.call.fn(getRoundsAdapter), rounds ]
            ])
            .dispatch(getRoundsActionCreator())
            .hasFinalState({
               selectedRoundId: 1,
               rounds: rounds
            })
            .run();
      });

      it('should set selectedRoundId to last item', () => {
         const rounds: RoundModel[] = [
            { round: 1, matches: [] },
            { round: 2, matches: [] },
            { round: 3, matches: [] },
            { round: 8, matches: [] }, // intentional round number
            { round: 4, matches: [] }
         ];

         return expectSaga(roundsSagas)
            .withReducer(roundsReducer)
            .provide([
               [ matchers.call.fn(getRoundsAdapter), rounds ]
            ])
            .dispatch(getRoundsActionCreator())
            .hasFinalState({
               selectedRoundId: 4,
               rounds: rounds
            })
            .run();
      });
   });

   describe('initiating action for selected round update', () => {
      it('should set new selectedRoundId', () => {
         const store = createStore(roundsReducer);

         expect(store.getState().selectedRoundId)
            .toEqual(-1);

         store.dispatch(changeSelectedRoundIdActionCreator(55));

         expect(store.getState().selectedRoundId)
            .toEqual(55);
      });
   });

   describe('utilities', () => {
      const data = [
         { round: 1, matches: [] },
         { round: 2, matches: [] },
         { round: 3, matches: [] }
      ];

      describe('extractRoundIds', () => {
         it('should return only round numbers', () => {
            expect(extractRoundIds(data))
               .toEqual([ 1, 2, 3 ]);
         });
      });

      describe('getRoundById', () => {
         it('should return round with specific id', () => {
            expect(getRoundById(data, 2))
               .toEqual(data[1]);
         });
      });
   });
});