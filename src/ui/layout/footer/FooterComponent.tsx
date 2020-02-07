import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';
import './FooterComponent.scss';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';

export const FooterComponent = (): JSX.Element => (
   <footer className="footer">
      <div>
         <a href="mailto:mislavmiocevic@gmail.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faEnvelope}/>
         </a>
      </div>

      <div>
         <a href="https://hr.linkedin.com/in/mislavmiocevic" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin}/>
         </a>
      </div>

      <div>
         <a href="https://github.com/mmiocevic" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub}/>
         </a>
      </div>
   </footer>
);