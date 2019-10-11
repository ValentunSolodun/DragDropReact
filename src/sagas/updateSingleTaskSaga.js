import {takeEvery, put, call} from 'redux-saga/effects';
import API from '../api/fetctData'

function* fetchingUpdatingSingleTask() {
  let {
    objField
  } = arguments[0];

  console.log(objField);

  const data = yield call(API.updateItem, objField);
  if (data) {
    yield put({type: "RESULTUPDATEITEMSINGLETASKS", payload: {index: objField.index, values: objField.values}})
  }
}

function* updatingSingleTaskSaga() {
  yield takeEvery("SENDUPDATEITEMSINGLETASKS", fetchingUpdatingSingleTask)
}

export default updatingSingleTaskSaga;