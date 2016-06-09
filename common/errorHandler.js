const mailService = require('../service/mail');
/**
 * Created by eason on 6/9/16.
 */
exports.appErrorProcess = function (app) {
    //config for production env
    app.use(function(err, req, res, next) {
        mailService.sendMail({
            subject : "FixedAssetManager_Server[App Error]",
            text    : err.message + "\n" + err.stack + "\n" + err.toString()
        });
        if (err instanceof PageNotFoundError) {
            res.render("errors/404");
        } else if (err instanceof ServerError) {
            res.render("errors/500");
        }
    });

    //catch all errors on process and send mail
    process.on("uncaughtException", function (err) {
        mailService.sendMail({
            subject : "FixedAssetManager_Server[App Error]",
            text    : err.message + "\n" + err.stack + "\n" + err.toString()
        });
    });
};