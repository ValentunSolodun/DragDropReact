import {takeEvery, put, call} from 'redux-saga/effects';
import API from '../api/fetctData'

function* fetchingDragDrop() {

  const data = yield call(API.dropSend, arguments[0].objField);
  if (data) {
      yield put({type: `DROP_RESULT`, payload: arguments[0].objField})
  } else {

  }
}

export function* dragDropSaga() {
  yield takeEvery("DROP_SEND", fetchingDragDrop)
}

////////////////////////////////////////////////////

function* fetchingRemoveStatusFromTaskStatuses() {

  const data = yield call(API.removeStatusFromTaskStatuses, arguments[0].objField);
  if (data) {
    yield put({type: `REMOVE_STATUS_FROM_TASK_STATUS_RESULT`, payload: arguments[0].objField})
  } else {

  }
}

export function* removeStatusFromTaskStatusesSaga() {
  yield takeEvery("SEND_REMOVE_STATUS_FROM_TASK_STATUS", fetchingRemoveStatusFromTaskStatuses)
}

