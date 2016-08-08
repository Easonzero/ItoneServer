const app = require('../../app');
/**
 * Created by eason on 6/13/16.
 */
exports.describe = 'constvar test';

// GET /base/university 200 177.269 ms - 64
// '[{"name":"吉林艺术学院"},{"name":"哈尔滨工业大学"}]'

// POST /base/class 200 26.468 ms - 0
// '{"name":"1143710403"}'

// POST /base/faculty 200 28.952 ms - 25
// '[{"name":"软件工程"}]'

// POST /base/sms 200 1.487 ms - 6
// '427451'

exports.it = {
    //'course':course,
    'university':university,
    'class':vclass,
    'faculty':faculty,
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
        fromUniversity        : "哈尔滨工业大学",
        faculty               : "软件工程"
    };

    app.client().request('post','/base/class').setBody(param).end(function (res) {
        console.dir(res.body);
        done();
    });
}

function faculty(done){
    let param = {
        fromUniversity        : "*"
    };

    app.client().request('post','/base/faculty').setBody(param).end(function (res) {
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
