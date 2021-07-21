import React from 'react'
import HoldingTable from './components/HoldingTable/HoldingTable'
import TransactionTable from './components/TransactionTable/TransactionTable'

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { NavBar } from './components/NavBar/Navbar';
import { Home } from './components/Home/Home';

function App() {
  return (
    <Router>
            <div>
                <NavBar />
                <Switch>
                    <Route path='/transactions' component={TransactionTable}></Route>
                    <Route path='/holdings' component={HoldingTable}></Route>
                    <Route path='/' component={Home}></Route>
                </Switch>
            </div>
        </Router>
  );
}

export default App;
