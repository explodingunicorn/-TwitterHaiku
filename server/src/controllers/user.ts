import { Router } from 'express';
import UserService from '../services/user.service';

const service = new UserService();
const routes = Router();

routes.get('/:id', (req, res) => {
    service.getUserHaikus(req.params.id).then((tweets) => {
        res.status(200).json({ tweets });
    })
    .catch((errors) => {
        console.log(errors);
    })
    
});

export default routes;