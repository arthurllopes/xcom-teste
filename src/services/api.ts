import axios from "axios";

const api = axios.create({
    baseURL: 'https://xcom-teste-3queewgqc-arthurllopes.vercel.app/api',
})

export default api
