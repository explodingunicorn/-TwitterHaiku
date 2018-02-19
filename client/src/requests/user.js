import axios from 'axios';

const User = {
    get: {}
};

User.get.all = () => { return axios.get('/user') };

export default User;