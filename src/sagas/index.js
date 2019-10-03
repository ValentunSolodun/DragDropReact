import { all } from 'redux-saga/effects';
import registerSend from "./userRegisterSaga";
import loginSend from "./userLoginSaga";
import getBoardSend from "./getBoardsSaga";
import addItemSaga from "./addItemSaga";
import removeItemSaga from "./removeItemSaga";
import updatingItemSaga from "./updateItemSaga";
import getTasksSaga from "./getTasksSaga";
import getStatusesSaga from "./getStatusesSaga";


export default function* rootSaga() {
    yield all([
        loginSend(),
        registerSend(),
        getBoardSend(),
        getTasksSaga(),
        addItemSaga(),
        removeItemSaga(),
        updatingItemSaga(),
        getStatusesSaga()
    ])
}