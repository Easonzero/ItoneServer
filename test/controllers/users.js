const app = require('../../app');
/**
 * Created by eason on 6/6/16.
 */
exports.describe = 'user test';

// GET /users/userbaseinfo 200 3.987 ms - 167
// '{"id":"12511325826","passWords":null,"userName":"王希民","university":"吉林艺术学院","faculty":"工业设计","grade":"本三","Class":"1437104","picture":""}'

// GET /users/usersbyorder 200 41.426 ms - 385
// '[{"rank":1,"userName":"王祎","downloadNum":20,"university":"哈尔滨工业大学","url":"/res/user/13115511080/","id":"13115511080"},{"rank":2,"userName":"王希民","downloadNum":1,"university":"吉林艺术学院","url":"","id":"12511325826"},{"rank":3,"userName":"王文博","downloadNum":0,"university":"哈尔滨工业大学","url":"/res/user/13985473522/","id":"13985473522"}]'

// GET /users/userelseinfo 200 8.836 ms - 66
// '{"id":"12511325826","money":2,"downloadNum":2,"isMonitor":"FALSE"}'

// GET /users/getrank 200 8.819 ms - 1
// '2'

exports.it = {
    //'register':register,
   // 'userbaseinfo':userbaseinfo,
    'userelseinfo':userelseinfo,
    'getrank':getrank,
   // 'usersbyorder':usersbyorder
};

function register(done){
    let param = {
        id               : "15528756693",
        passWords        : 'qwe123',
        userName         : '萧凉',
        fromUniversity   : '哈尔滨工业大学',
        faculty          : '软件工程',
        grade            : '本二',
        picture          : false
    };

    app.client().request('post','/users/register').setBody(param).end(function (res) {
        done();
    });
}

function login(done,callback){
    let param = {
        id               : '12511325826',
        passWords        : 'qwe123'
    };

    app.client().request('post','/users/login').setBody(param).end((res)=>{
        let session = res.headers['set-cookie'];
        callback(session,done);
    });
}

function userbaseinfo(done){
    login(done,(session,done)=>{
        app.client().request('get','/users/userbaseinfo').set('Cookie',session).end((res)=>{
            console.dir(res.body);
            done();
        });
    });
}

function userelseinfo(done){
    login(done,(session,done)=>{
        app.client().request('get','/users/userelseinfo').set('Cookie',session).end((res)=>{
            console.dir(res.body);
            done();
        });
    });
}

function getrank(done){
    login(done,(session,done)=>{
        app.client().request('get','/users/getrank').set('Cookie',session).end((res)=>{
            console.dir(res.body);
            done();
        });
    });
}

function usersbyorder(done){
    login(done,(session,done)=>{
        app.client().request('get','/users/usersbyorder').set('Cookie',session).end((res)=>{
            console.dir(res.body);
            done();
        });
    });
}
