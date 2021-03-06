import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFutbol } from '@fortawesome/free-solid-svg-icons/faFutbol';
import { locales, Locales } from '../../../configuration/LocalizationConfiguration';
import { brandName } from '../../../configuration/Globals';
import './HeaderComponent.scss';

export interface HeaderComponentProps {
   selectedLocale: Locales;
   onLocaleChange: (locale: Locales) => void;
}

export const HeaderComponent = ({ selectedLocale, onLocaleChange }: HeaderComponentProps): JSX.Element => (
   <header className="header">
      <div className="brand">
         <FontAwesomeIcon className="brand__icon" icon={faFutbol}/>
         <span>{brandName}</span>
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