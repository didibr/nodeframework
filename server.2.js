//server.js
// cria servidor HTTP / HTTPS
//faz funções relativas ao servidor
const fs = require('fs');
const path = require('path');
//const http = require('http');
const express=require('express');
const url = require('url');
const util = require("util");
const querystring = require('querystring');
//helper pages
const helper=require("./helper.js");
module.exports.req=null;
module.exports.res=null;
module.exports.server = null;
module.exports.porta=80;
module.exports.srvUrl = null;
module.exports.fullRequest = null;
module.exports.method = null;
module.exports.rawReaders = null;
module.exports.protocolo = null;
module.exports.pagina =  null;
module.exports.query=null;
//localvars
//module.exporst.local=`${process.cwd()}/`;

 /*  app.use(function (req, res) { //catch error
    this.srvUrl = url.parse(`http://${req.url}`);
    console.log(this.srvUrl);
    if(this.srvUrl.path=='/index.html'){
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write('<b><br><h3>It Works</h3><br><br>This is a default page of this Server</b>');
      res.end();
      return;
    }
    res.status(404).send({ msg: `${req.originalUrl} not found` }) ;
  });*/

module.exports.res=null;
module.exports.req=null;

const extmap = {
  '.ico': 'image/x-icon',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword'
};

var app = express();
var UrlDocs={};

var exports = module.exports = {
 Create: function(port){
  module.exports.porta=port;
  app.use(express.static('src'));   
  app.get('*', function (reqIn, resIn) {
    module.exports.req=reqIn;
    module.exports.res=resIn;    
    module.exports.onReceive();     
    var achou=false;
    this.srvUrl = url.parse(`http://${reqIn.url}`);    
    for (var key in UrlDocs) {                 
      if(key==this.srvUrl.path){
        console.log('Request Received '+this.srvUrl.path);
        UrlDocs[key]();
        return;
      }
    }
    if(this.srvUrl.path=='/index.html'){ //index.html not created byt server listen
      module.exports.onSendResp();
      return;
    }
    //not page found 404    
    console.log('404 NOT FOUND: '+this.srvUrl.path);
    resIn.writeHead(404, { 'Content-Type': 'text/html' });
    resIn.write('<div align=center><br><br>Error 404<br><h3>Page not Found: '+this.srvUrl.path+'</h3></div>');
    resIn.end();   
  });
  helper(this);
 },
 Start: function(){   
   app.listen(module.exports.porta, function () {
    console.log('Server listening on port '+module.exports.porta+'.');
   });
 },
 onReceive:function(){     
    this.srvUrl = url.parse(`http://${this.req.url}`);
    this.fullRequest = util.inspect(this.req);
    this.method = this.req.method;
    this.rawReaders = [];
    var tmprawReaders=this.req.rawHeaders;
    this.protocolo = this.srvUrl.protocol;if(this.protocolo==null)this.protocolo='';
    var tmpquery = this.srvUrl.query;if(tmpquery==null)tmpquery='';
    this.pagina =  this.srvUrl.pathname;if(this.pagina==null)this.pagina='';
    this.query=[];
    //PEGAR RAWHEADERS
    var count=0;
    for (var i = 0; i < tmprawReaders.length; i++) {
      if(count==0){
        this.rawReaders[tmprawReaders[i]]=null;
        count+=1;
      }else{
        this.rawReaders[tmprawReaders[i-1]]=tmprawReaders[i];
        count=0;
      }
    }
    //Teste de Saida do HawHeaders
    //for (var key in rawReaders) {res.write(key+' = '+rawReaders[key]+'<br>');}
    //pega query variaveis de entrada GET
    if(tmpquery!=null && tmpquery!=''){
    tmpquery=tmpquery.split('&');
    for (var i = 0; i < tmpquery.length; i++) {
      var tempq2=tmpquery[i].split('=');
      var key=querystring.unescape(tempq2[0]);
      var value=querystring.unescape(tempq2[1]);
      this.query[key]=value;
    }}
  
    //teste de saida de queryes
    //this.res.writeHead(200, { 'Content-Type': 'text/html' });
    //for (var key in this.query) {this.res.write(key+' = '+this.query[key]+'<br>');}
   //this.res.writeHead(200, { 'Content-Type': 'text/html' });
   //this.res.write('Continuar');
   //this.res.end();
   //console.log('Data Rcv');    
 },
 onSendResp:function(){  
  module.exports.res.writeHead(200, { 'Content-Type': 'text/html' });
  module.exports.res.write('<div align=center><b><br><h1>It Works</h1><br><br>This is a default page of this Server</b><br><br>create page name /index.html to show up'+
  '<br><br><a href="./?">Framework Helper</a></div>');
  module.exports.res.end();
 },
 sendHtml:function(codigo){
  module.exports.res.writeHead(200, { 'Content-Type': 'text/html' });
  module.exports.res.write(codigo);
  module.exports.res.end();
 },
 sendPage:function(pagina){
  module.exports.res.writeHead(200, { 'Content-Type': 'text/html' });
   var phtml=pagina.getHtml();
   if(phtml)module.exports.res.write(phtml);
   module.exports.res.end();
 },
 print_r:function(objeto){
   return util.inspect(objeto);
 },
 onGet: function(url,fmain){ 
  UrlDocs[url]=fmain;
 }


};
