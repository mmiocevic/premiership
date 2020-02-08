import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { StoreState } from '../../configuration/StoreConfiguration';
import {
   clearErrorActionCreator,
   ClearErrorActionCreator
} from '../../domain/error-handling/ErrorHandlingActionCreators';
import './ErrorHandlingComponent.scss';
import { AxiosError } from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons/faWindowClose';

interface PropsState<T> {
   error: T;
}

const mapStateToProps = (state: StoreState<AxiosError>) => ({
   error: state.errorHandlingReducer.error
});

interface DispatchState {
   clearError: () => void;
}

type DispatchStateType = ClearErrorActionCreator;

const mapDispatchToProps = (dispatch: Dispatch<DispatchStateType>): DispatchState => ({
   clearError: () => dispatch(clearErrorActionCreator())
});

export type ErrorHandlingComponentProps<T> = PropsState<T> & DispatchState;

export const ErrorHandlingComponent = ({ error, clearError }: ErrorHandlingComponentProps<AxiosError | undefined>): JSX.Element | null =>
   error ? (
      <div className="error-handling">
         <div>{error.message}</div>
         <div className="close">
            <FontAwesomeIcon
               onClick={() => clearError()}
               icon={faWindowClose}
            />
         </div>
      </div>
   ) : null;

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandlingComponent);