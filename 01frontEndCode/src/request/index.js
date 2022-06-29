import axios from "axios";
let service = axios.create({
    // baseURL:"http://localhost:3000",
    // baseURL:"https://netease-cloud-music-api-beta-lyart.vercel.app",
    timeout:10000,
    withCredentials: true,
    baseURL: 'https://netease-cloud-music-api-beta-lyart.vercel.app',
    headers: {
     'Content-Type': 'application/json; charset=utf-8'
   }

})
export default service