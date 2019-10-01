import { takeEvery, put, call } from 'redux-saga/effects';
import API from '../api/fetctData'

function* fetchingAddItem() {
    const data = yield call(API.addItem, arguments[0].objField);
    if(data) {
        arguments[0].objField.id = data.insertId;
        console.log(arguments[0].objField);
        yield put({type:"RESULTADDITEM", payload: arguments[0].objField})
    }else {

    }
}

function* addItemSaga() {
    yield takeEvery("SENDADDITEM", fetchingAddItem)
}

export default addItemSaga;