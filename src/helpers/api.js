import axios from 'axios';
// import 'dotenv/config';
// require('dotenv').config()


export default function requestApi(endpoint, method, body = [], responseType = 'json', contentType = 'application/json') {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': contentType,
    'Access-Control-Allow-Origin': '*'
  }

  const instace = axios.create({ headers });

  instace.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('access_token')
      if (token) {
        config.headers['Authorization'] = `Bearer ${ token }`
      }
      return config;
    },
    (error) => {
      return Promise.reject(error)
    }
  );

  instace.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalConfig = error.config;
      console.log('Access token expired');
      if (error.response && error.response.status === 419) {
        try {
          console.log('call refresh token api');
          const result = await instace.post(`http://localhost:8000/auth/refresh-token`, {
            refresh_token: localStorage.getItem('refresh_token')
          })
          const { access_token, refresh_token } = result.data;
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', refresh_token);
          originalConfig.headers['Authorization'] = `Bearer ${ access_token }`;

          return instace(originalConfig)
        } catch (error) {
          if (error.response && error.response.status === 400) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/login'
          }
          return Promise.reject(error);
        }
      }
    }
  )

  return instace.request({
    method: method,
    url: `${ 'http://localhost:8000' }${ endpoint }`,
    // url: `${ process.env.REACT_APP_API_URL }${ endpoint }`,
    data: body,
    responseType: responseType
  })
}