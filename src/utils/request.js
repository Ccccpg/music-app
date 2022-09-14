import axios from "axios";
const axios1=axios.create({
  baseURL:"http://192.168.0.104:3000",
  withCredentials:true
})
export default axios1