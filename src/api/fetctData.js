import axios from 'axios';
import cookie from 'react-cookies';

const getBoards = async () => {
  try {
    const response = await axios.get('http://localhost:3001/', {headers: {token: cookie.load('token')}});

    if (response.status === 200) {
      let json = response.data;
      return json;
    } else {
      return false;
    }
  } catch (e) {
    console.log("Fetch err (get boards) " + e);
  }
}

const getStatuses = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3001/statuses/${id}`, {headers: {token: cookie.load('token')}});

    if (response.status === 200) {
      let json = response.data;
      return json;
    } else {
      return false;
    }
  } catch (e) {
    console.log("Fetch err (get statuses) " + e);
  }
}

const getTasks = async data => {
  let id = data;
  try {
    const response = await axios.get(`http://localhost:3001/project/${id}`, {headers: {token: cookie.load('token')}});

    if (response.status === 200) {
      let json = response.data;
      return json;
    } else {
      return false;
    }
  } catch (e) {
    console.log("Fetch err (get tasks) " + e);
  }
}

const getSingleTask = async data => {
  let {id_1, id_2} = data;
  try {
    const response = await axios.get(`http://localhost:3001/project/${id_1}/tasks/${id_2}`, {headers: {token: cookie.load('token')}});

    if (response.status === 200) {
      let json = response.data;
      return json;
    } else {
      return false;
    }
  } catch (e) {
    console.log("Fetch err (get single task) " + e);
  }
}

const addItem = async data => {
  let body = data;
  try {
    let url;
    if (body.kind === 'project') {
      url = 'http://localhost:3001/'
    } else if (body.kind === 'tasks') {
      url = `http://localhost:3001/project/${body.id}`
    } else if (body.kind === 'statuses') {
      url = `http://localhost:3001/statuses/${body.id}`
    }
    const response = await axios.post(url, body, {headers: {token: cookie.load('token')}});

    if (response.status === 200) {
      console.log(response);
      let json = response.data;
      return json;
    } else {
      return false;
    }
  } catch (e) {
    console.log("Fetch err (add item) " + e);
  }
}

const removeItem = async data => {
  let body = data;
  try {
    let url;
    if (body.kind === 'project') {
      url = 'http://localhost:3001/'
    } else if (body.kind === 'tasks') {
      url = `http://localhost:3001/project/${body.id}`
    } else if (body.kind === 'statuses') {
      url = `http://localhost:3001/statuses/${body.id}`
    }
    const response = await axios.post(url, body, {headers: {token: cookie.load('token')}});

    if (response.status === 200) {
      let json = response.data;
      return json;
    } else {
      return false;
    }
  } catch (e) {
    console.log("Fetch err (remove item) " + e);
  }
}

const updateItem = async data => {
  let body = data;
  try {
    let url;
    if (body.kind === 'project') {
      url = 'http://localhost:3001/'
    } else if (body.kind === 'tasks') {
      url = `http://localhost:3001/project/${body.id_board}`
    } else if (body.kind === 'statuses') {
      url = `http://localhost:3001/statuses/${body.id_board}`
    }
    const response = await axios.post(url, body, {headers: {token: cookie.load('token')}});

    if (response.status === 200) {
      let json = response.data;
      return json;
    } else {
      return false;
    }
  } catch (e) {
    console.log("Fetch err (remove item) " + e);
  }
}

const getSelectedStatus = async data => {
  let { project_id, status_id } = data;
  try {
    const response = await axios.post(`http://localhost:3001/task_statuses/${project_id}`, data, {headers: {token: cookie.load('token')}});

    if (response.status === 200) {
      let json = response.data;
      return json;
    } else {
      return false;
    }
  } catch (e) {
    console.log("Fetch err (remove item) " + e);
  }
}

export default {
  getBoards,
  getTasks,
  addItem,
  removeItem,
  updateItem,
  getStatuses,
  getSingleTask,
  getSelectedStatus
};