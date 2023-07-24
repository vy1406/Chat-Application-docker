import axios from 'axios';

const PORT = 8080;
const url = new URL(window.location.href);

const customHost = `http://${url.host.slice(0, -4)}${PORT}`;

const customAxios = axios.create({
    baseURL: customHost,
})

export default customAxios

