import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './HeaderComponent.scss';
import { faFutbol } from '@fortawesome/free-solid-svg-icons/faFutbol';
import { locales, Locales } from '../../../configuration/LocalizationConfiguration';

interface HeaderComponentProps {
   selectedLocale: Locales;
   onLocaleChange: (locale: Locales) => void;
}

export const HeaderComponent = ({ selectedLocale, onLocaleChange }: HeaderComponentProps): JSX.Element => (
   <header className="header">
      <div className="brand">
         <FontAwesomeIcon className="brand__icon" icon={faFutbol}/>
         <span>Premiership</span>
      </div>
      <div>
         <select
            value={selectedLocale}
            onChange={(e) => {
               onLocaleChange(e.currentTarget.value as Locales);
            }}
         >
            {locales.map(locale => (
               <option key={locale} value={locale}>{locale}</option>
            ))}
         </select>
      </div>
   </header>
);