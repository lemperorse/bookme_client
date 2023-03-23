import axios from "axios";
import env from './env'
 

let config = {
  baseURL: process.env.baseURL || process.env.apiUrl || env.host , 
  // timeout: 600 * 1000, // Timeout
  //withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config); 

export default _axios