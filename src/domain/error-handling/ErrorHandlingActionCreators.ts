import { ErrorHandlingActionTypes } from './ErrorHandlingActionTypes';

export interface SetErrorActionCreator <T>{
   type: ErrorHandlingActionTypes.SET_ERROR;
   error: T
}

export const setErrorActionCreator = <T>(error: T): SetErrorActionCreator<T> => ({
   type: ErrorHandlingActionTypes.SET_ERROR,
   error
});

export interface ClearErrorActionCreator {
   type: ErrorHandlingActionTypes.CLEAR_ERROR
}

export const clearErrorActionCreator = (): ClearErrorActionCreator => ({
   type: ErrorHandlingActionTypes.CLEAR_ERROR
});