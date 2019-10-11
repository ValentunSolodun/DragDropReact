import {Route} from 'react-router-dom';
import Boards from "../containers/boardsContainer";
import Tasks from "../containers/tasksContainer";
import SingleTasks from '../containers/singleTaskContainer';
import Statuses from '../containers/statusesContainer';
import TaskStatuses from "../containers/taskStatusesContainer";
import React from "react";
import Login from "../components/login/login";
import Register from "../components/register/register";


const Routing = () => {
  return (
    <div className="container">
      <Route path="/" exact component={Boards}/>
      <Route path="/project/:id" exact component={Tasks}/>
      <Route path="/project/:id_1/tasks/:id_2" component={SingleTasks}/>
      <Route path="/statuses/:id" component={Statuses}/>
      <Route path="/task_statuses/:id" component={TaskStatuses}/>
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>
    </div>
  )
}

export default Routing;
