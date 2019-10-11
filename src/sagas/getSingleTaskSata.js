import {takeEvery, put, call} from 'redux-saga/effects';
import API from '../api/fetctData'
import {history} from '../helpers/history'

function* fetchingGetSingleTask() {

  let {
    id_1,
    id_2
  } = arguments[0].url_id;

  const data = yield call(API.getSingleTask, {id_1, id_2});

  if (data) {
    yield put({type: "RESULTGETSINGLETASK", payload: data});
  } else {
    history.push('/login');
  }

}

function* getSingleTaskSaga() {
  yield takeEvery("SENDGETSINGLETASK", fetchingGetSingleTask)
}

export default getSingleTaskSaga;