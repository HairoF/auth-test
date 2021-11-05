import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import Store from './store/store';

interface State {
  store: Store
}

const store = new Store()

export const Context = React.createContext<State>({store})

ReactDOM.render(
  <Context.Provider value={{store}}>
    <App/>
  </Context.Provider>,
  document.getElementById('app')
);
