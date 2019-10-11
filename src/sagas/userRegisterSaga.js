import {takeEvery, put, call} from 'redux-saga/effects';
import {history} from '../helpers/history'

function* fetchingRegister({name, email, password}) {
  let objDispatch = {
    name: name,
    email: email,
    password: password
  }

  console.log(objDispatch);

  let fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/users/register', {
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
  if (data === 'Registered') {
    history.push('/login');
    yield put({type: 'REGISTERRESULT', payload: data})
  } else {
    yield put({type: 'REGISTERRESULT', payload: data})
  }
}


function* registerSend() {
  yield takeEvery('REGISTERSEND', fetchingRegister);
}

export default registerSend;