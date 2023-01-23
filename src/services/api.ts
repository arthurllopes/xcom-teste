import axios from "axios";

const api = axios.create({
    baseURL: 'https://xcom-teste.vercel.app/api',
})

export default api
