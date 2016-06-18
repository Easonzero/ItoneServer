var {EventEmitter} = require('events');
var methods = ['get', 'post', 'put', 'delete', 'head'];
var http = require('http');
var express = require('express');
var querystring = require('querystring');

//version > 4.x
express.application.client = (addr)=>{return new Request(addr)};

function Request(addr) {
    this.data = [];
    this.header = {};
    this.addr = addr||{address:'119.29.229.214',port:'3000'};
};

/**
 * Inherit from `EventEmitter.prototype`.
 */

Request.prototype.__proto__ = EventEmitter.prototype;

methods.forEach((method)=>{
    Request.prototype[method] = path=>this.request(method, path);
});

Request.prototype.set = function(field, val){
    this.header[field] = val;
    return this;
};

Request.prototype.setBody = function(body){
    this.set('Content-Type', 'application/x-www-form-urlencoded');
    return this.write(querystring.stringify(body));
};

Request.prototype.write = function(data){
    this.data.push(data);
    return this;
};

Request.prototype.request = function(method, path){
    this.method = method;
    this.path = path;
    return this;
};

Request.prototype.end = function(fn){
    var req = http.request({
        method: this.method,
        port: this.addr.port||'',
        host: this.addr.address,
        path: this.path,
        headers: this.header,
        agent:false,
        rejectUnauthorized : false
    });

    this.data.forEach((chunk)=>req.write(chunk));

    req.on('response', res=>{
        var chunks = [], size = 0;
        res.on('data', (chunk)=>{
            chunks.push(chunk);
            size += chunk.length;
        });
        res.on('end', ()=>{
            var buf = null;
            switch (chunks.length) {
                case 0:
                    buf = new Buffer(0);
                    break;
                case 1:
                    buf = chunks[0];
                    break;
                default:
                    buf = new Buffer(size);
                    var pos = 0;
                    for (var i = 0, l = chunks.length; i < l; i++) {
                        var chunk = chunks[i];
                        chunk.copy(buf, pos);
                        pos += chunk.length;
                    }
                    break;
            }
            res.body = buf.toString();
            res.bodyJSON = ()=>JSON.parse(res.body);
            
            fn(res);
        });
    });

    req.end();

    return this;
};
