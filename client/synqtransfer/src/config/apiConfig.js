// src/config/apiConfig.js

const BASE_URL = 'https://synqtransfer.onrender.com/api';
// export const BASE_URL = 'https://518dhcgx-5000.inc1.devtunnels.ms/api';
// export const BASE_URL = 'http://65.2.142.111/api';

export const SOCKET_URL = BASE_URL.replace('/api', '');

export const API_ENDPOINTS = {
  UPLOADFILE: `${BASE_URL}/files/upload`,
  CONTACT: `${BASE_URL}/contact`,
  SIGNIN: `${BASE_URL}/users/signin`,
  SAVE_SESSION: `${BASE_URL}/sessions/save`,
  GET_HISTORY: `${BASE_URL}/sessions/history`,

};

export const REQUEST_METHODS = {
  POST: 'POST',
  GET: 'GET',
  PATCH: 'PATCH',
  PUT: 'PUT'
};
