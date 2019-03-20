var server = require("./server.js");
var pagesModule = require("./pagesmodule.js");

server.Create(80);
server.Start();


server.onGet('/index.html',function(){
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
  p1.Row.add('prop');
  p1.Row.Col.add('p1');
  p1.selectCol('p1').html('<div style="height:100px;"><div align=center>'+
  `<script>
  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(async function(stream) {
    let recorder = RecordRTC(stream, {
        type: 'video'
    });
    recorder.startRecording();

    const sleep = m => new Promise(r => setTimeout(r, m));
    await sleep(3000);

    recorder.stopRecording(function() {
        let blob = recorder.getBlob();
        invokeSaveAsDialog(blob);
    });
});
   </script>`
  +'</div></div>');


  p1.Row.add('id1');
  p1.Row.Col.add('ida');
  p1.selectCol('ida').html('primeira');
  p1.selectCol('ida').css({
    'background-color':'red'
  });
  
  p1.Row.Col.add('idb');
  p1.Row.Col.add('idc');
  p1.selectCol('idb').html('div2');
  p1.selectCol('idc').html('div3');
  
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
