var server = require("./server.js");
var pagesModule = require("./pagesmodule.js");

server.Create(80);
server.Start();

server.onGet('/x.html',function(){
  var p1=new pagesModule();
  p1.title='Sei la';
  p1.Row.add('Linha');
  p1.Row.Col.add('bloco1');
  p1.Row.Col.add('bloco2');

  p1.selectCol('bloco1').html('<input id="x1" type="text"></input>');
  p1.onAction('resize','window',function(){            
    var vw=$(window).width();
    $('#x1').val('resized to: '+vw);
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
  var rtx=p1.selectRow('row1').html();
  //console.log(server.print_r(xx1));
 /* p1.selectRow('row1').html('<div><b>TEST</b>work html div');
  p1.selectRow('row1').css({
    'background-color':'blue'
  });
 */ 
  p1.Row.add('id1');
  p1.Row.Col.add('ida');
  p1.selectCol('ida').html(rtx);
  
  
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
