const http = require('http');
const querystring = require('querystring');
let options = null;
let postData = null;
/**
 * Created by eason on 6/15/16.
 */

function initSmsUtil(){
    options = {
        host:'api.weimi.cc',
        path:'/2/sms/send.html',
        method:'POST',
        agent:false,
        rejectUnauthorized : false,
        headers:{
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Content-Length' :''
        }
    };
    postData = {
        uid:'dw7n0VIwcYXi',
        pas:'9rxvjuaj',
        mob:'',
        con:'',
        type:'json'
    };
}

function send(){
    let content = querystring.stringify(postData);
    options.headers['Content-Length'] = content.length;

    let req = http.request(options,function(res){
    	res.setEncoding('utf8');
    	res.on('data', function (chunk) {
        	//console.log(JSON.parse(chunk));
    	});
    	res.on('end',function(){
        	//console.log('over');
    	});
    });
    req.write(content);
    req.end();
}

exports.sendSms = (mob,callback)=>{
    if(!options||!postData) initSmsUtil();

    if (!mob) {
        throw new InvalidParamError("the mob is empty");
    }
    
    let ckn='';
    for(var i=0;i<6;i++)
    {
        ckn+=Math.floor(Math.random()*10);
    }
    postData.mob = mob;
    postData.con = `您的短信验证码：${ckn}`;
    
    callback(ckn);
    send();
};
