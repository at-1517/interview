// Centralized constants for all tests

export const BASE_URL = 'https://www.automationexercise.com/';
export const API_BASE_URL = `${BASE_URL}api`;

export const HEADERS = {'Content-Type': 'application/x-www-form-urlencoded'};
export const ENDPOINTS = {
    verifyLogin: '/verifyLogin',
    createAccount: '/createAccount',
    getUserDetailByEmail: '/getUserDetailByEmail',
    updateAccount: '/updateAccount',
    deleteAccount: '/deleteAccount',
};