import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com',
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
    axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
}

export {setToken, axiosInstance};