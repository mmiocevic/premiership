import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './HeaderComponent.scss';
import { faFutbol } from '@fortawesome/free-solid-svg-icons/faFutbol';

export const HeaderComponent = (): JSX.Element => (
   <header className="header">
      <FontAwesomeIcon className="brand-icon" icon={faFutbol}/>
      <span className="brand">Premiership</span>
   </header>
);