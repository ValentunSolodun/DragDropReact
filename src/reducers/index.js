import {combineReducers} from 'redux';

import boards from './boards'
import user from '../reducers/user'
import item from "./item";
import tasks from "./tasks";
import statuses from "./statuses";

const allReducers = combineReducers({
    boards,
    tasks,
    user,
    statuses,
    item
});

export default allReducers;
