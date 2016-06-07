const app = require('../../app');
/**
 * Created by eason on 6/6/16.
 */
exports.describe = 'user test';

exports.it = {
    'register':register,
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

    app.test().request('post','/users/register').setBody(param).end(function (res) {
        console.log(res.body);
        done();
    });
}

function login(done,callback){
    let param = {
        id               : '13115511080',
        passWords        : 'qwe123'
    };

    app.test().request('post','/users/login').setBody(param).end((res)=>{
        console.log(res.body)
        callback(done);
    });
}

function userbaseinfo(done){
    login(done,(done)=>{
        app.test().request('post','/users/userbaseinfo').end((res)=>{
            console.log(res.body);
            done();
        });
    });
}

function userelseinfo(done){
    login(done,(done)=>{
        app.test().request('post','/users/userelseinfo').end((res)=>{
            done();
        });
    });
}

function getrank(done){
    login(done,(done)=>{
        app.test().request('get','/users/getrank').end((res)=>{
            done();
        });
    });
}

function usersbyorder(done){
    login(done,(done)=>{
        app.test().request('get','/users/usersbyorder').end((res)=>{
            done();
        });
    });
}