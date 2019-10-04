import { takeEvery, put, call } from 'redux-saga/effects';
import API from '../api/fetctData'

function* fetchingRemoveItem() {
    let {
        objField
    } = arguments[0];

    console.log(objField);

    const data = yield call(API.removeItem, objField);
    if(data) {
        if(objField.kind === 'project') {
            yield put({type:"RESULTREMOVEITEMPROJECTS", payload: {index: objField.index}})
        }else if(objField.kind === 'tasks') {
            yield put({type:"RESULTREMOVEITEMTASKS", payload: {index: objField.index}})
        } else if(objField.kind === 'statuses') {
            yield put({type:"RESULTREMOVEITEMSTATUSES", payload: {index: objField.index}})
        }
    }
}

function* removeItemSaga() {
    yield takeEvery("SENDREMOVEITEM", fetchingRemoveItem)
}

export default removeItemSaga;