const app = require('../../app');
/**
 * Created by eason on 6/13/16.
 */
exports.describe = 'homework test';

exports.it = {
    'sendHomework':sendHomework,
    //'getHomework':getHomework,
};

/*

 header:

 Content-Type:multipart/form-data; boundary=---------------------------leon
 Content-Length:35139

 body:

 -----------------------------leon
 Content-Disposition: form-data; name="homework"

 {"uid":"13115511080","message":"test homework","sdate":"2016-5-10","fdate":"2016-6-28","courseNo":"1","picUrl":"false"}
 -----------------------------leon
 Content-Disposition: form-data; name="upfile"; filename="xxx.jpg"
 Content-Type: application/octet-stream


 -----------------------------leon--

 */

function sendHomework(done){
    let param = {
        homework:{
            uid              : '13115511080',
            message          : 'test homework',
            sdate            : '2016-5-10',
            fdate            : '2016-6-28',
            courseNo         : '1',
            picUrl           : 'false'
        }
    };

    app.client().request('post','/homework/send').mutipart(param).end(function (res) {
        console.dir(res.body);
        done();
    });
}

function getHomework(done){
    let param = {
        id              : '15943709229'
    };

    app.client().request('post','/homework/getHomework').setBody(param).end(function (res) {
        console.dir(res.body);
        done();
    });
}
