const { Router } = require('express');

const oauthRouter = require('../oauth');
const usersRouter = require('../users');

const apiRouter = Router();

apiRouter.use('/auth', oauthRouter);
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
