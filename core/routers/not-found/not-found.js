const { Router } = require('express');

const { notFoundController: { catchAllNotFoundRoutes } } = require('../../controllers');

const notFoundRouter = Router();

notFoundRouter.all('*', catchAllNotFoundRoutes);

module.exports = notFoundRouter;
