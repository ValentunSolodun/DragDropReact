import {takeEvery, put, call} from 'redux-saga/effects';
import API from '../api/fetctData'
import {history} from '../helpers/history'

function* fetchingGetSelectedProject() {

  let {
    objField
  } = arguments[0];

  const data = yield call(API.getSelectedStatus, objField);

  if (data) {
    yield put({type: "RESULT_GET_TASKS_STATUSES", payload: data});
  } else {
    history.push('/login');
  }

}

function* getTaskStatusesSaga() {
  yield takeEvery("SEND_SELECT_STATUS", fetchingGetSelectedProject)
}

export default getTaskStatusesSaga;