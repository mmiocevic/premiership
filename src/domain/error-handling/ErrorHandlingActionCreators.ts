import { ErrorHandlingActionTypes } from './ErrorHandlingActionTypes';

export interface ErrorType {
   message: string;
}

export interface SetErrorActionCreator {
   type: ErrorHandlingActionTypes.SET_ERROR;
   error: ErrorType | undefined;
}

export const setErrorActionCreator = (error: ErrorType | undefined): SetErrorActionCreator => ({
   type: ErrorHandlingActionTypes.SET_ERROR,
   error
});

export interface ClearErrorActionCreator {
   type: ErrorHandlingActionTypes.CLEAR_ERROR;
}

export const clearErrorActionCreator = (): ClearErrorActionCreator => ({
   type: ErrorHandlingActionTypes.CLEAR_ERROR
});