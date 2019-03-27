var server = require("./server.js");
var pagesModule = require("./pagesmodule.js");

server.Create(80);
server.Start();

server.onGet('/x',function(){
  var p1=new pagesModule();
  p1.Compactar(false);
  p1.title='Sei la';
  p1.Row.add('Linha');
  p1.Row.Col.add('bloco1');
  p1.Row.Col.add('bloco2');

  p1.selectCol('bloco1').html('<input id="x1" type="text"></input>');
  p1.onAction('resize','window',function(){            
    var vw=$(window).width();
    $('#x1').val('resized to: '+vw);
  });


  p1.Message.Create('m1','Titulo1','alert alert-danger','alert alert-warning');
  p1.Message.select('m1');
  p1.Message.html('Message Here');
  p1.Message.addItem('Text1','Sample Input','text');
  p1.Message.onYes('Enviar',function(data){
    alert('typed: '+data['Text1']);
  });

  /*
  p1.Message.Create('m1','Titulo1','alert alert-danger');
  p1.Message.select('m1');
  p1.Message.html('This is a test only');
  p1.Message.addItem('tt1','Homen','checkbox');
  p1.Message.addItem('tt2','Mulher','checkbox');
  p1.Message.onYes('Enviar',function(data){
    $('#x1').val('msg enviada: '+data['tt1']);
  });
  */

  p1.selectCol('bloco2').html('<input type="button" id="bt1" value="OK"/>');
  p1.onAction('click','bt1',function(){
    ShowMessage('m1');
  });

  server.sendPage(p1); 
});

server.onGet('/menu',function(){
 var p1=new pagesModule();
 p1.Menu.Create('Titulo','./menu');
 p1.Menu.add('item1','#'); 
 p1.Menu.add('item3','#');
 p1.Menu.add('item2','#');
 
 p1.Menu.add('DropDown','#','item3');
 p1.Menu.add('Sub1','#','item3');
 p1.Menu.add('Sub2','#','item3');
 p1.Menu.add('Sub3','#','item3');

 p1.Menu.add('DropDown2','#','Sub3');
 p1.Menu.add('XSub1','#','Sub3');
 p1.Menu.add('XSub2','#','Sub3');
 p1.Menu.add('XSub3','#','Sub3');

 p1.Menu.add('DropDown3','#','XSub3');
 p1.Menu.add('YSub1','#','XSub3');
 p1.Menu.add('YSub2','#','XSub3');

 p1.Row.add('x1');
 p1.Row.Col.add('z1');
 p1.selectCol('z1').html('test');

 server.sendPage(p1);
});

server.onGet('/aa.html',function(){
  var p1=new pagesModule();
  //p1.Compactar(true);
  p1.title='Tituloaaa';
  p1.style={
    'body':{
      "background-color":"#ccc"
    },
     '#idb':{
      "background-color":"#ecec08",
      "color":"#888"
     },
     '#idb:hover':{
      'background-color':'#17ec11'   
     }
  };
  p1.Row.add('prop'); //coluna 1
  p1.Row.Col.add('x1');
  p1.selectCol('x1').html('<div style="height:100px;">Test<div align=center></div></div>');
 

  p1.Row.add('id1'); //coluna 2
  p1.Row.Col.add('ida');
  p1.selectCol('ida').html('primeira');
  p1.selectCol('ida').css({
    'background-color':'red'
  });
  
  p1.Row.Col.add('idb');
  p1.selectCol('idb').html('mouse detect');
  p1.onAction('mouseenter','idb',function(){    
    $('#idb').html('mouse entered');
  });
  p1.onAction('mouseleave','idb',function(){    
    $('#idb').html('mouse leave');
  });

  p1.Row.Col.add('idc');
  p1.selectCol('idc').html(
    `<img src='https://codemirror.net/doc/logo.png'/>`
  );

  server.sendPage(p1); 
});

server.onGet('/index2.html',function(){
  var p1=new pagesModule();
  p1.Compactar(true);
  p1.Row.add('row1');
  p1.Row.Col.add('idb');
  p1.selectCol('idb').html(
    '<input id="x3" type="text" value="0"></input>'+
    '<input id="x2" type="text" value="5000"></input>'+
    '<input id="x1" type="button" value="Create"></input>'
    );  
  p1.onAction('click','x1',function(){            
    CreateToast('toast1','5000','fa-facebook','Facebook','You have new message','now','warning','primary');
  });
 
  
  
  server.sendPage(p1); 
});


server.onSend=function(){ 
 //server.sendHtml('Testing'); 
 //server.sendPage(p1); 
}

/*
var pagina=server.pagina;
switch(pagina){
  case '/index.php':
     server.sendHtml('Index');
  default:
     server.sendHtml('Nenhuma pagina');
}
*/
