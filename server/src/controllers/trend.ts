const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.status(200).json({ message: 'Current Trends' });
});

export default routes;