const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const templates = require('../../email-templates');
const {
    customErrors: {
        WRONG_TEMPLATE_NAME
    },
    ErrorHandler
} = require('../../errors');
const {
    appConfigs: {
        EMAIL_TRANSPORTER_PASSWORD,
        EMAIL_TRANSPORTER_SERVICE,
        EMAIL_TRANSPORTER_USER
    }
} = require('../../configs');
const {
    appEnum: {
        EMAIL_TEMPLATES,
        INNER_TEMPLATES
    },
    customCodesEnum: {
        WRONG_EMAIL_CREDENTIAL_CC
    },
    statusCodesEnum: {
        BAD_REQUEST
    }
} = require('../../constants');

const transporter = nodemailer.createTransport({
    auth: {
        pass: EMAIL_TRANSPORTER_PASSWORD,
        user: EMAIL_TRANSPORTER_USER
    },
    service: EMAIL_TRANSPORTER_SERVICE
});

const emailTemplates = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), EMAIL_TEMPLATES)
    }
});

class EmailService {
    // eslint-disable-next-line class-methods-use-this
    async sendEmail(userEmail, templateTitle, context) {
        const { templateName, subject } = templates[templateTitle];

        if (!templateName) {
            throw new ErrorHandler(
                WRONG_TEMPLATE_NAME.message,
                WRONG_TEMPLATE_NAME.statusCode,
                WRONG_TEMPLATE_NAME.customCode
            );
        }

        const html = await emailTemplates.render(templateName, context);

        const mailOptions = {
            from: EMAIL_TRANSPORTER_USER,
            to: userEmail,
            subject,
            html
        };

        return transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                throw new ErrorHandler(
                    err.message,
                    BAD_REQUEST,
                    WRONG_EMAIL_CREDENTIAL_CC
                );
            } else {
                const [receiver] = info.accepted;
                console.log(`email sent to ${receiver}`);
            }
        });
    }
}

module.exports = new EmailService();
