const app = require('../../app');
/**
 * Created by eason on 6/13/16.
 */
exports.describe = 'constvar test';

exports.it = {
    //'course':course,
    //'university':university,
    //'class':vclass,
    'sms':sms
};

function course(done){
    let param = {
        fromUniversity        : "哈尔滨工业大学"
    };

    app.client().request('post','/base/course').setBody(param).end(function (res) {
        console.dir(res.body);
        done();
    });
}

function university(done){
    app.client().request('get','/base/university').end(function (res) {
        console.dir(res.body);
        done();
    });
}

function vclass(done){
    let param = {
        fromUniversity        : "哈尔滨工业大学"
    };

    app.client().request('post','/base/class').setBody(param).end(function (res) {
        console.dir(res.body);
        done();
    });
}

function sms(done){
    let param = {
        mob                 : "13115511080"
    };

    app.client().request('post','/base/sms').setBody(param).end(function (res) {
        console.dir(res.body);
        done();
    });
}