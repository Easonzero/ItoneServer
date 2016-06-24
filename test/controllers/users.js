const app = require('../../app');
/**
 * Created by eason on 6/6/16.
 */
exports.describe = 'user test';

exports.it = {
    //'register':register,
    'userbaseinfo':userbaseinfo,
    'userelseinfo':userelseinfo,
    'getrank':getrank,
    'usersbyorder':usersbyorder
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
