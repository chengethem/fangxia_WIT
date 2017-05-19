import React from 'react';
import ReactDOM from 'react-dom';
import routes from '../apps/dashboard/routes/index';
import { Provider } from 'react-redux';
import configureStore from '../apps/dashboard/store/configureStore';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
injectTapEventPlugin();

const store = configureStore(window.__REDUX_STATE__)
ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      {routes}
    </MuiThemeProvider>
  </Provider>,
  document.querySelector('#app')
)
