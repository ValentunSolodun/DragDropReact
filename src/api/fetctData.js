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

const getStatuses = async () => {
    try {
        const response = await axios.get(`http://localhost:3001/statuses/`, { headers: {token: cookie.load('token')}});

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

const getTasks = async data => {
    let id = data;
    try {
        const response = await axios.get(`http://localhost:3001/project/${id}`, { headers: {token: cookie.load('token')}});

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
        let url;
        if(body.kind == 'project') {
            url = 'http://localhost:3001/'
        }else if(body.kind == 'tasks') {
            url = `http://localhost:3001/project/${body.id}`
        }
        const response = await axios.post(url , body, { headers: {token: cookie.load('token')}});

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

const removeItem = async data => {
    let body = data;
    try {
        let url;
        if(body.kind == 'project') {
            url = 'http://localhost:3001/'
        }else if(body.kind == 'tasks') {
            url = `http://localhost:3001/project/${body.id_board}`
        }
        const response = await axios.post(url, body, { headers: {token: cookie.load('token')}});

        if(response.status === 200){
            let json = response.data;
            return json;
        }else {
            return false;
        }
    }catch (e) {
        console.log("Fetch err (remove item) " + e);
    }
}

const updateItem = async data => {
    let body = data;
    try {
        const response = await axios.post('http://localhost:3001/', body, { headers: {token: cookie.load('token')}});

        if(response.status === 200){
            let json = response.data;
            return json;
        }else {
            return false;
        }
    }catch (e) {
        console.log("Fetch err (remove item) " + e);
    }
}

export default {getBoards, getTasks, addItem, removeItem, updateItem, getStatuses};