import { takeEvery, put, call } from 'redux-saga/effects';
import API from '../api/fetctData'

function* fetchingRemoveItem() {
    let {
        objField
    } = arguments[0]

    const data = yield call(API.removeItem, objField);
    if(data) {
        yield put({type:"RESULTREMOVEITEM", payload: {index: objField.index}})
    }
}

function* removeItemSaga() {
    yield takeEvery("SENDREMOVEITEM", fetchingRemoveItem)
}

export default removeItemSaga;