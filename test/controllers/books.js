const app = require('../../app');
/**
 * Created by eason on 6/13/16.
 */
exports.describe = 'book test';

exports.it = {
    'search':search,
    'booklist':booklist,
    'download':download,
    'userbooks':userbooks
};

// POST /books/search 200 17.866 ms - 225
// '[{"id":1,"bookName":"工科数学","category":"课本","subject":"*","occupation":"*","fromUniversity":"哈尔滨工业大学","count":20889688,"downloadNumber":0,"uploader":"王祎","uid":"13115511080","money":0,"pic":null}]'
//
// POST /books/booklist 200 2.597 ms - 771
// '[{"id":1,"bookName":"工科数学","category":"课本","subject":"*","occupation":"*","fromUniversity":"哈尔滨工业大学","count":20889688,"downloadNumber":0,"uploader":"王祎","uid":"13115511080","money":0,"pic":null},{"id":2,"bookName":"编程珠玑","category":"课本","subject":"计算机科学技术","occupation":"计算机科学技术","fromUniversity":"哈尔滨工业大学","count":13776605,"downloadNumber":16,"uploader":"王希民","uid":"12511325826","money":1,"pic":null},{"id":3,"bookName":"深入理解计算机系统","category":"课本","subject":"计算机科学技术","occupation":"计算机科学技术","fromUniversity":"哈尔滨工业大学","count":7079105,"downloadNumber":5,"uploader":"王祎","uid":"13115511080","money":0,"pic":null}]'
//
// POST /books/download 200 56.858 ms - 26
// '/public/res/books/code.pdf'
//
// POST /books/userbooks 200 2.985 ms - 503
// '[{"id":1,"bookName":"工科数学","category":"课本","subject":"*","occupation":"*","fromUniversity":"哈尔滨工业大学","count":20889688,"downloadNumber":0,"uploader":"王祎","uid":"13115511080","money":0,"pic":null},{"id":3,"bookName":"深入理解计算机系统","category":"课本","subject":"计算机科学技术","occupation":"计算机科学技术","fromUniversity":"哈尔滨工业大学","count":7079105,"downloadNumber":5,"uploader":"王祎","uid":"13115511080","money":0,"pic":null}]'


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
        category		 : '课本',
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
