import {combineReducers} from 'redux';

import boards from './boards'
import user from '../reducers/user'
import item from "./item";
import tasks from "./tasks";

const allReducers = combineReducers({
    boards,
    tasks,
    user,
    item
});

export default allReducers;
