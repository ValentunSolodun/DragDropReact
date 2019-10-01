import { all } from 'redux-saga/effects';
import registerSend from "./userRegisterSaga";
import loginSend from "./userLoginSaga";
import getBoardSend from "./getTableSaga";
import addItemSaga from "./addItemSaga";


export default function* rootSaga() {
    yield all([
        loginSend(),
        registerSend(),
        getBoardSend(),
        addItemSaga()
    ])
}