import React from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from './redux/store';
import './App.scss';
import ThemeApp from "./containers";

function App() {
  return (
      <ReduxProvider store={store}>
          <ThemeApp />
      </ReduxProvider>
  );
}

export default App;
