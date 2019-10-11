import {takeEvery, put, call} from 'redux-saga/effects';
import API from '../api/fetctData'
import {history} from '../helpers/history'

function* fetchingGetTasks() {

  let {
    id
  } = arguments[0];

  const data = yield call(API.getTasks, id);

  if (data) {
    yield put({type: "RESULTGETTASKS", payload: data});
  } else {
    history.push('/login');
  }

}

function* getTasksSaga() {
  yield takeEvery("SENDGETTASKS", fetchingGetTasks)
}

export default getTasksSaga;
