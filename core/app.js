const express = require('express');
const chalk = require('chalk');
const fileUpload = require('express-fileupload');
const path = require('path');

require('dotenv').config({ path: '../.env' });

const { sequelize } = require('./database');
const {
    appEnum: { APP_IN_PROCESS, PUBLIC },
    statusCodesEnum: { INTERNAL_SERVER_ERROR }
} = require('./constants');
const { appConfigs: { PORT } } = require('./configs');
const { apiRouter, notFoundRouter } = require('./routers');

const app = express();

app.use(fileUpload());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), PUBLIC)));

app.use('/api', apiRouter);
app.use('*', notFoundRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (error, req, res, next) => {
    res
        .status(error.statusCode || INTERNAL_SERVER_ERROR)
        .json({
            customCode: error.customCode,
            message: error.message
        });
});

(async () => {
    await sequelize.sync();
    app.listen(PORT, (err) => {
        if (!err) {
            console.log(chalk.blue.bold.underline(APP_IN_PROCESS));
        }
    });
})();
