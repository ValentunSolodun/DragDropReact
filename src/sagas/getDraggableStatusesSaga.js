import {takeEvery, put, call} from 'redux-saga/effects';
import API from '../api/fetctData'
import {history} from '../helpers/history'

function* fetchingDraggableStatuses() {

  let {
    objField
  } = arguments[0];

  const data = yield call(API.getDraggableStatuses, objField);
  if (data) {
    yield put({type: "RESULT_GET_DRAGGABLE_STATUSES", payload: data});
  } else {
    history.push('/login');
  }

}

function* getDraggableStatusesSaga() {
  yield takeEvery("SEND_GET_DRAGGABLE_STATUSES", fetchingDraggableStatuses)
}

export default getDraggableStatusesSaga;
