import { AnyAction } from 'redux';
import { ClearErrorActionCreator, ErrorType, SetErrorActionCreator } from './ErrorHandlingActionCreators';
import { ErrorHandlingActionTypes } from './ErrorHandlingActionTypes';

export interface ErrorHandlingReducerState {
   error: ErrorType | undefined;
}

const errorHandlingReducerState = {
   error: undefined
};

type ErrorHandlingReducerActions = SetErrorActionCreator
   | ClearErrorActionCreator
   | AnyAction;

export const errorHandlingReducer = (state: ErrorHandlingReducerState = errorHandlingReducerState,
                                     action: ErrorHandlingReducerActions) => {
   switch (action.type) {
      case ErrorHandlingActionTypes.SET_ERROR:
         return setError(state, action as SetErrorActionCreator);
      case ErrorHandlingActionTypes.CLEAR_ERROR:
         return clearError(state, action as ClearErrorActionCreator);
      default:
         return state;
   }
};

const setError = (state: ErrorHandlingReducerState,
                  action: SetErrorActionCreator): ErrorHandlingReducerState => ({
   ...state,
   error: action.error
});

const clearError = (state: ErrorHandlingReducerState,
                    action: ClearErrorActionCreator): ErrorHandlingReducerState => ({
   ...state,
   error: undefined
});