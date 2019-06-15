import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavBar from "./components/AppNavBar";
import { Provider } from 'react-redux';
import store from './store';
import SoppingList from "./components/ShoppingList";
import ItemModal from "./components/ItemModal";
import { loadUser } from "./actions/authAction";

class  App extends  Component{

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
        <Provider store={store}>
          <div className="App">
            <AppNavBar/>
            <ItemModal/>
            <SoppingList/>
          </div>
        </Provider>
    );
  }


}

export default App;
