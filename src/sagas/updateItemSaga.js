import {takeEvery, put, call} from 'redux-saga/effects';
import API from '../api/fetctData'

function* fetchingUpdatingItem() {
  let {
    objField
  } = arguments[0];

  console.log(objField);

  const data = yield call(API.updateItem, objField);
  if (data) {
    if (objField.kind === 'project') {
      yield put({type: "RESULTUPDATEITEMPROJECT", payload: {index: objField.index, values: objField.values}})
    } else if (objField.kind === 'tasks') {
      yield put({type: "RESULTUPDATEITEMTASKS", payload: {index: objField.index, values: objField.values}})
    } else if (objField.kind === 'statuses') {
      yield put({type: "RESULTUPDATEITEMSTATUSES", payload: {index: objField.index, values: objField.values}})
    }
  }
}

function* updatingItemSaga() {
  yield takeEvery("SENDUPDATINGITEM", fetchingUpdatingItem)
}

export default updatingItemSaga;