import { takeEvery, put, call } from 'redux-saga/effects';
import API from '../api/fetctData'
import { history } from '../helpers/history'

function* fetchingGetBoards() {
    const data = yield call(API.getBoards);
    if(data) {
        yield put({type: "RESULTGETTABLES", payload: data.rows});
        yield put({type: "SUCCESSFUL_USER", payload: data.user});
        // history.push('/boards');
    }else {
        history.push('/login');
    }

}

function* getBoardsSaga() {
    yield takeEvery("SENDGETTABLES", fetchingGetBoards)
}

export default getBoardsSaga;


