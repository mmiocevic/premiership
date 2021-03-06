import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { StoreState } from '../../configuration/StoreConfiguration';
import {
   clearErrorActionCreator,
   ClearErrorActionCreator,
   ErrorType
} from '../../domain/error-handling/ErrorHandlingActionCreators';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons/faWindowClose';
import './ErrorHandlingComponent.scss';

interface PropsState {
   error: ErrorType | undefined;
}

const mapStateToProps = (state: StoreState) => ({
   error: state.errorHandlingReducer.error
});

interface DispatchState {
   clearError: () => void;
}

type DispatchStateType = ClearErrorActionCreator;

const mapDispatchToProps = (dispatch: Dispatch<DispatchStateType>): DispatchState => ({
   clearError: () => dispatch(clearErrorActionCreator())
});

export type ErrorHandlingComponentProps = PropsState & DispatchState;

export const ErrorHandlingComponent = ({ error, clearError }: ErrorHandlingComponentProps): JSX.Element | null =>
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