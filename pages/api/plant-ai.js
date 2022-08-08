import axios from "axios";

const localhost = "http://localhost:5000";

const plantAI = axios.create({baseURL : localhost});

export default plantAI;