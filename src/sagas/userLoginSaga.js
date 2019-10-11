import {takeEvery, put, call} from 'redux-saga/effects';
import {history} from '../helpers/history';
import cookie from 'react-cookies';


function* fetchingLogin({email, password}) {

  let objDispatch = {
    email: email,
    password: password
  }

  let fetchData = async () => {

    try {
      const response = await fetch('http://localhost:3001/users/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(objDispatch)
      });
      let text = await response.text();
      return text;
    } catch (e) {
      // history.push('/login');
      return false;
    }
  }

  const data = yield call(fetchData);

  if (data === false) {
    alert('Error fetch login');
    return;
  }

  cookie.save('token', data, {path: '/'});
  history.push('/');
  yield put({type: 'LOGINRESULT', payload: data})
}

function* loginSend() {
  yield takeEvery('LOGINSEND', fetchingLogin);
}

export default loginSend;