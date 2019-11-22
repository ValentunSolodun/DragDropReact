import {takeEvery, put, call} from 'redux-saga/effects';
import API from '../api/fetctData'

function* fetchingAddItem() {

  const data = yield call(API.addItem, arguments[0].objField);
  if (data) {
    if (arguments[0].objField.kind === 'project') {
      arguments[0].objField._id = data._id;
      yield put({type: `RESULTADDITEMPROJECTS`, payload: arguments[0].objField})
    } else if (arguments[0].objField.kind === 'tasks') {
      arguments[0].objField.id = data.id;
      arguments[0].objField.boardId = data.boardId;
      yield put({type: `RESULTADDITEMTASKS`, payload: arguments[0].objField})
    } else if (arguments[0].objField.kind === 'statuses') {
      arguments[0].objField.id = data.id;
      arguments[0].objField.boardId = data.boardId;
      yield put({type: `RESULTADDITEMSTATUSES`, payload: arguments[0].objField})
    }
  } else {

  }
}

function* addItemSaga() {
  yield takeEvery("SENDADDITEM", fetchingAddItem)
}

export default addItemSaga;