import axios from 'axios';

const url = process.env.API_URL;

const axiosInstance = axios.create({
    baseURL: url,
    timeout: 10000,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return error.response;
    }
);

const setToken: (newToken: string) => void = (newToken: string) => {
    console.log(url)
    axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
}

export {setToken, axiosInstance};