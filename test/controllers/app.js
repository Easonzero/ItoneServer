const app = require('../../app');

exports.describe = 'app test';

exports.it = {
    'update':update
};

function update(done){
    let param = {
        version     : 	'49'
    };

    app.client().request('post','/app/update').setBody(param).end(function (res) {
    	console.log(res.body);
        done();
    });
}
