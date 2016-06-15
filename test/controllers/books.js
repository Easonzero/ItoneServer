const app = require('../../app');
/**
 * Created by eason on 6/13/16.
 */
exports.describe = 'book test';

exports.it = {
    //'search':search,
    //'booklist':booklist,
    'download':download,
    //'userbooks':userbooks
};

function search(done){
    let param = {
        bookName         : '数学',
        fromUniversity   : '哈尔滨工业大学'
    };

    app.client().request('post','/books/search').setBody(param).end(function (res) {
        console.dir(res.body);
        done();
    });
}

function booklist(done){
    let param = {
        subject          : '*',
        fromUniversity   : '哈尔滨工业大学',
        start            : 0
    };

    app.client().request('post','/books/booklist').setBody(param).end((res)=>{
        console.dir(res.body);
        done();
    });
}

function download(done){
    let param = {
        id               : '2',
        uid              : '13115511080'
    };

    app.client().request('post','/books/download').setBody(param).end((res)=>{
        console.dir(res.body);
        done();
    });
}

function userbooks(done){
    let param = {
        uid              : '13115511080'
    };

    app.client().request('post','/books/userbooks').setBody(param).end((res)=>{
        console.dir(res.body);
        done();
    });
}
