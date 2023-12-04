import axios from 'axios';
// import 'dotenv/config';
// require('dotenv').config()


export default function requestApi(endpoint, method, body, responseType = 'json') {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }

  const instace = axios.create({ headers });

  return instace.request({
    method: method,
    url: `${ 'http://localhost:8000' }${ endpoint }`,
    // url: `${ process.env.REACT_APP_API_URL }${ endpoint }`,
    data: body,
    responseType: responseType
  })
}