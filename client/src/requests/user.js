import axios from 'axios';

const User = {
    get: {}
};

User.get.all = (id) => { 
    return axios.get('/user/' + id).then(res => {
        return res.data;
    })
    .catch((err) => {
        console.log('There was an error retrieving the data');
    })
};

export default User;