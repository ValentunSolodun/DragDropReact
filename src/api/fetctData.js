import axios from 'axios';
import cookie from 'react-cookies';

const getBoards = async () => {
    try {
        const response = await axios.get('http://localhost:3001/', { headers: {token: cookie.load('token')}});

        if(response.status === 200) {
            let json = response.data;
            return json;
        }else {
            return false;
        }
    }catch (e) {
        console.log("Fetch err (get boards) " + e);
    }
}

const addItem = async data => {
    let body = data;
    try {
        const response = await axios.post('http://localhost:3001/', body, { headers: {token: cookie.load('token')}});

        if(response.status === 200){
            console.log(response);
            let json = response.data;
            return json;
        }else {
            return false;
        }
    }catch (e) {
        console.log("Fetch err (add item) " + e);
    }
}

export default {getBoards, addItem};