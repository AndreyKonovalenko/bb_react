import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://bb-react-5d531.firebaseio.com/'
});

export default instance;