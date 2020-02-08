import { AnyAction } from 'redux';
import { ClearErrorActionCreator, SetErrorActionCreator } from './ErrorHandlingActionCreators';
import { ErrorHandlingActionTypes } from './ErrorHandlingActionTypes';

export interface ErrorHandlingReducerState<T> {
   error: T | undefined;
}

const errorHandlingReducerState = {
   error: undefined
};

type ErrorHandlingReducerActions<T> = SetErrorActionCreator<T>
   | ClearErrorActionCreator
   | AnyAction;

export const errorHandlingReducer = <T>(state: ErrorHandlingReducerState<T> = errorHandlingReducerState,
                                 action: ErrorHandlingReducerActions<T>) => {
   switch (action.type) {
      case ErrorHandlingActionTypes.SET_ERROR:
         return setError(state, action as SetErrorActionCreator<T>);
      case ErrorHandlingActionTypes.CLEAR_ERROR:
         return clearError(state, action as ClearErrorActionCreator);
      default:
         return state;
   }
};

const setError = <T>(state: ErrorHandlingReducerState<T>,
                     action: SetErrorActionCreator<T>): ErrorHandlingReducerState<T> => ({
   ...state,
   error: action.error
});

const clearError = <T>(state: ErrorHandlingReducerState<T>,
                       action: ClearErrorActionCreator): ErrorHandlingReducerState<T> => ({
   ...state,
   error: undefined
});