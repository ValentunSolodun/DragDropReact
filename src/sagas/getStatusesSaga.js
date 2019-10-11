import {takeEvery, put, call} from 'redux-saga/effects';
import API from '../api/fetctData'
import {history} from '../helpers/history'

function* fetchingGetStatuses(props) {
  let { id } = props;
  const data = yield call(API.getStatuses, id);
  if (data) {
    yield put({type: "RESULTGETSTATUSES", payload: data});
  } else {
    history.push('/login');
  }

}

function* getStatusesSaga() {
  yield takeEvery("SENDGETSTATUSES", fetchingGetStatuses)
}

export default getStatusesSaga;

