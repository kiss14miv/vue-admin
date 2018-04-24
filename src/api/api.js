import axios from 'axios';
//var qs=require('qs');
import qs from 'qs'
let base = '';
var instance = axios.create({
    headers: {'content-type': 'application/x-www-form-urlencoded'},
});

//export const requestLogin = params => { return instance.post("http://zidanexxx.free.ngrok.cc/krsjk/HttpServer?AES=N&ZIP=N", qs.stringify(params )).then(res => res.data); };

export const getUserList = params => { return instance.get("http://172.16.116.51:8080/krsjk/HttpServer?AES=N&ZIP=N", { params: params }); };

//export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

//export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

//export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

//export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

//export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };