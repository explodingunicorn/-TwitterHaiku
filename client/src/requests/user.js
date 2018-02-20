import axios from 'axios';

const User = {
    get: {}
};

User.get.all = (id) => { return axios.get('/user/' + id) };

export default User;