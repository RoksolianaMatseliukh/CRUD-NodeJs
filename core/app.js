const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const chalk = require('chalk');
const fileUpload = require('express-fileupload');
// eslint-disable-next-line import/no-extraneous-dependencies
const morgan = require('morgan');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

require('dotenv').config({ path: '../.env' });

const { sequelize } = require('./database');
const { sentry } = require('./errors');
const winston = require('./logger');
const {
    appEnum: {
        APP,
        APP_IN_PROCESS,
        DEV,
        PUBLIC
    },
    statusCodesEnum: {
        INTERNAL_SERVER_ERROR
    }
} = require('./constants');
const {
    appConfigs: {
        PORT
    }
} = require('./configs');
const {
    apiRouter,
    notFoundRouter
} = require('./routers');
const cronRun = require('./cron-jobs');

const app = express();
const logger = winston(APP);

app.use(fileUpload());
app.use(morgan(DEV));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), PUBLIC)));

app.use(sentry.Handlers.requestHandler());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', apiRouter);
app.use('*', notFoundRouter);

app.use(sentry.Handlers.errorHandler());

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    logger.error(err);
    sentry.captureException(err);

    res
        .status(err.statusCode || INTERNAL_SERVER_ERROR)
        .json({
            customCode: err.customCode,
            message: err.message
        });
});

(async () => {
    await sequelize.sync();
    app.listen(PORT, (err) => {
        if (!err) {
            console.log(chalk.blue.bold.underline(APP_IN_PROCESS));
            cronRun();
        }
    });
})();
