import React from 'react';
import { Route, Router } from 'react-router-dom';
import Header from './components/navbar/header';
import { history } from "./helpers/history";
import Boards from "./containers/boardsContainer"
import Tasks from "./containers/tasksContainer"

function App() {
    return (
        <div>
            <Header />
            <div className="container">
                <Router history={history}>
                    <Route path="/tasks" component={Tasks} />
                    <Route path="/a" component={Boards} />
                </Router>
            </div>
        </div>
    )
}

export default App;
