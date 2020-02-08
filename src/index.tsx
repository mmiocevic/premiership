import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { store, history } from './configuration/StoreConfiguration';
import AppComponent from './ui/AppComponent';
import './index.scss';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import ErrorHandlingComponent from './ui/error-handling/ErrorHandlingComponent';

ReactDOM.render((
   <Provider store={store}>
      <ConnectedRouter history={history}>
         <>
            <Switch>
               <Route component={AppComponent}/>
            </Switch>
            <ErrorHandlingComponent/>
         </>
      </ConnectedRouter>
   </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
