import { takeEvery, put, call } from 'redux-saga/effects';
import API from '../api/fetctData'

function* fetchingUpdatingItem() {
    let {
        objField
    } = arguments[0];

    const data = yield call(API.updateItem, objField);
    if(data) {
        yield put({type:"RESULTUPDATEITEM", payload: {index: objField.index, values: objField.values}})
    }
}

function* updatingItemSaga() {
    yield takeEvery("SENDUPDATINGITEM", fetchingUpdatingItem)
}

export default updatingItemSaga;