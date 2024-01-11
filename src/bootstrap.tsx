import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from '@store';
import { Provider } from 'react-redux';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// Mount function to start up the app
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

serviceWorkerRegistration.register();
