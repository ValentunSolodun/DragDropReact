import React from 'react';
import { Route, Router } from 'react-router-dom';
import Header from './components/header/header';
import Routing from "./router/routing";
import {history} from "./helpers/history";
// import { history } from "./helpers/history";
// import Boards from "./containers/boardsContainer"
// import Tasks from "./containers/tasksContainer"

function App() {
    return (
        <div>
            <Router history={history}>
                <Header />
                <Routing />
            </Router>
        </div>
    )
}

export default App;
