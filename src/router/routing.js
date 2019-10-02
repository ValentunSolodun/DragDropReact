import { Route, Router } from 'react-router-dom';
import {history} from "../helpers/history";
import Boards from "../containers/boardsContainer";
import Tasks from "../containers/tasksContainer";
import React from "react";
import Login from "../components/login/login";
import Register from "../components/register/register";


const Routing = () => {
    return (
        <div className="container">
            <Route path="/" exact component={Boards} />
            <Route path="/tasks/:id" component={Tasks} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
        </div>
    )
}

export default Routing;
