import 'jest';
import { createStore } from 'redux';
import { errorHandlingReducer } from '../ErrorHandlingReducer';
import { clearErrorActionCreator, setErrorActionCreator } from '../ErrorHandlingActionCreators';

describe('ErrorHandlingDomain', () => {
   it('should have specific initial state in reducer', () => {
      const store = createStore(errorHandlingReducer);

      expect(store.getState().error).toEqual(undefined);
   });

   describe('initiating action for setting error', () => {
      it('should set error', () => {
         const store = createStore(errorHandlingReducer);

         expect(store.getState().error)
            .toEqual(undefined);

         store.dispatch(setErrorActionCreator({ message: 'My error' }));

         expect(store.getState().error)
            .toEqual({ message: 'My error' });
      });
   });

   describe('initiating action for clearing error', () => {
      it('should clear error', () => {
         const store = createStore(errorHandlingReducer);

         store.dispatch(setErrorActionCreator({ message: 'My error' }));
         expect(store.getState().error)
            .not.toEqual(undefined);

         store.dispatch(clearErrorActionCreator());
         expect(store.getState().error)
            .toEqual(undefined);
      });
   });
});