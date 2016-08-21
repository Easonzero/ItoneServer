const app = require('../../app');
/**
 * Created by eason on 6/13/16.
 */
exports.describe = 'message test';

exports.it = {
    'sendMessage':sendMessage,
    //'getMessage':getMessage
};

function sendMessage(done){
    let param = {
        message:{
            uid         : '13115511080',
            message     : 'test message',
            date        : '2016-5-10',
            category    : 'class_change',
            picUrl      : 'false'
        }
    };

    app.client().request('post','/message/send').mutipart(param).end(function (res) {
        console.dir(res.body);
        done();
    });
}

function getMessage(done){
    let param = {
        id          : '13115511080',
        date        : '2016-5-7'
    };

    app.client().request('post','/message/getMessage').setBody(param).end(function (res) {
        console.dir(res.body);
        done();
    });
}
