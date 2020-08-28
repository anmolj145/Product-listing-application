import React from 'react';
import './App.css';
import { Provider } from "react-redux";
import { useHistory, Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import store from "./store/store";
import List from './Components/List/List';
import Menu from './Components/Menu/Menu';
import Trash from './Components/Trash/Trash';
import AddItem from './Components/AddItem/AddItem'
import Description from './Components/Description/Description';

function App() {

  const history = useHistory()

  return (
    <div className="App">
      <Provider store={store}>
        <div className="split left">
            <Menu/>
        </div>
        <div className="split right">
          <Router history={history}>
            <Switch>
              <Route path="/" exact component={List} /> 
              <Route path="/trash" exact component={Trash} />
              <Route path="/add" exact component={AddItem} /> 
              <Route path="/detail" exact component={Description} /> 
            </Switch>
          </Router>
        </div>
      </Provider>
    </div>
  );
}

export default App;