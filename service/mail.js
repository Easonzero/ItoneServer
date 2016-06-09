/**
 * Created by eason on 6/9/16.
 */
var mailer    = require("nodemailer");
var config = require("../config").initConfig();

var transport = mailer.createTransport("SMTP", config.mailConfig);

exports.sendMail = function (mailObj) {
    if (!mailObj.hasOwnProperty("from")) {
        mailObj.from = config.mailConfig.auth.user;
    }

    if (!mailObj.hasOwnProperty("to")) {
        mailObj.to = '451114984@qq.com';
    }

    transport.sendMail(mailObj, function (err) {
        if (err) {
            console.log("mail error:");
            console.log(err);
        }
    });
};