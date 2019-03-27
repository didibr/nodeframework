//pages.js
// cria paginas dinamicamente em runtime
//cria estilos e objetos DOM
var os = require("os");
const repl = require('repl');
const ss = require("./server.js");
//const uglify = require("uglify-js");


var cssStyles=[];
cssStyles.push('<link rel="stylesheet" href="./css/solid.min.css" crossorigin="anonymous">');
cssStyles.push('<link rel="stylesheet" href="./css/messagebox.min.css" crossorigin="anonymous">');
cssStyles.push('<link rel="stylesheet" href="./css/fontawesome-all.min.css" crossorigin="anonymous">');
cssStyles.push('<link rel="stylesheet" href="./css/bootstrap.min.css" crossorigin="anonymous">');


var jsStyles=[];
jsStyles.push('<script src="./js/jquery.min.js"></script>');
jsStyles.push('<script src="./js/bootstrap.min.js"></script>');
jsStyles.push('<script src="./js/messagebox.min.js"></script>');
jsStyles.push('<script src="./js/record.js"></script>');


function makeid(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

var Pgs = function(){    
    var kspl1 = '#%';
    var kspl2 = '%#';           
    this.title = '';
    this.style = '';
    this.script = {};    
    var body = '';
    var compact='\n';
    var compactTab=' ';   
    var showcomments=true;
    var containerf='';
    private:{colx:[];};
    this.Row={      
      RowArray:[], 
      Tab:function(i){
        var tabs='';
        for(var x=0;x<i;x++)tabs=tabs+compactTab;
        return tabs;
      },     
      add:function(id=null,style=null){        
            if(id!==null||typeof id!=='undefined'||id!=='undefined'){id=' id="'+id+'" ';}else{id='';}
            if(style!==null||typeof style!=='undefined'||style!=='undefined'){style=style;}else{style={};}              
            var thisrow={
                'id':id,
                'style':style,    
                'class':'',
                'col':[],
                'html':'',
                'visible':true
              };
            var key=makeid(10);
            while((key in this.RowArray))key=makeid(10);
            this.RowArray[key]=thisrow;  
            this.Col.lastRow=this.RowArray[key];
            //console.log(this.Col.lastRow);
            return key; 
      },
      html:function(value){
        if(value!==null||typeof value!=='undefined'||value!=='undefined'){value=value;}else{value=null;}        
        var rowAR=this.RowArray;                 
        var activerow=this.Col.lastRow['id'];  
        var rethtml='';
        //console.log(rowAR);
        for (var key in rowAR) {                                           
              if(rowAR[key]['id']==activerow){
                if(value!=null){
                  //console.log(rowAR[key]['col']);
                  rowAR[key]['col']=[]; 
                  rowAR[key]['html']=value; 
                  rethtml=value;
                }else{
                  var bodycol=rowAR[key]['col'];
                  //console.log(bodycol);
                  rethtml+=getRowhtml(rowAR[key],3);                  
                }
                return rethtml;                                           
              }                                      
        }  
        return null;
      },                
      Col:{
        lastRow:null,
        lastCol:null,
        add:function(id=null,style=null){  
          if(id!==null||typeof id!=='undefined'||id!=='undefined'){id=' id="'+id+'" ';}else{id='';}
          if(style!==null||typeof style!=='undefined'||style!=='undefined'){style=style;}else{style={};}  
          //if(this.CowArray!==null||typeof this.CowArray!=='undefined'){this.CowArray=[];}
          var thiscol={
              'id':id,
              'style':style,    
              'class':'',
              'html':'a',  
              'visible':true                
          };          
          var key=makeid(10);
          while((key in this.lastRow['col']))key=makeid(10);
          this.lastRow['col'][key]=thiscol; 
          this.lastRow['html']='';
          this.lastCol=key; 
          //console.log(Pgs.Row)          
          return key; 
        },
        html:function(value){
          if(value!==null||typeof value!=='undefined'||value!=='undefined'){value=value;}else{value=null;}
          var activecol=this.lastCol['id'];
          var rowAR=this.lastRow['col'];                    
          //console.log(rowAR);
          for (var key in rowAR) {                                           
                if(rowAR[key]['id']==activecol){
                  if(value!=null)rowAR[key]['html']=value; 
                  return rowAR[key]['html'];                                            
                }                                      
          }  
          return null;
        },
        css:function(style){
          if(style!==null||typeof style!=='undefined'||style!=='undefined'){style=style;}else{style={};}  
          var activecol=this.lastCol['id'];
          var rowAR=this.lastRow['col'];                    
          //console.log('Seting CSS of '+activecol);          
          for (var key in rowAR) {                                           
                if(rowAR[key]['id']==activecol){
                  //if(style!=null){
                     var currentStyle=rowAR[key]['style'];
                     for (var key2 in currentStyle) {                                          
                       if(style[key2]==null)style[key2]=currentStyle;
                     }
                     rowAR[key]['style']=style;                    
                  //}
                  return rowAR[key]['style'];                                            
                }                                      
          }  
          return null;
        }
          
      }
    };

    var mhome='';
    var mmenu={};
    var mmenustyle='';
    var mfixed='';

    this.Menu={      
       Create:function(title,homelink='#',fixed=false){
        if(fixed==false){mfixed='fixed-top';}else{mfixed='sticky-top';}
        if(fixed==null)mfixed='';
        mmenu={};
        mhome=`<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#menu" aria-controls="menu" aria-expanded="false" aria-label="Toggle navigation">`+
        compact+Tab(6)+`<span class="navbar-toggler-icon"></span>`+compact+Tab(2)+`</button>`+
        compact+Tab(2)+`<a class="navbar-brand" href="`+homelink+`">`+title+`</a>`;
       },
       add:function(title,link,suboff=null){
         var menuitem={
           'name':title,
           'link':link,
           'sub':{}
         };
       if(suboff==null){
         mmenu[title]=menuitem;
       }else{
         addSubItem(mmenu,menuitem,suboff,0);
       }
       },
       setColor(background,text,link,hover,active){
        mmenustyle=        
      '.navbar-custom {'+'background-color: '+background+';'+'}'+
      '.navbar-custom .navbar-brand,.navbar-custom .navbar-text{'+'color: '+text+';'+'}'+
      '.navbar-custom .navbar-nav .nav-link {'+'color: '+link+';'+'}'+      
      '.navbar-custom .nav-item.active .nav-link,.navbar-custom .nav-item:hover .nav-link {'+'color: '+hover+';'+'}'+
      '.dropdown-menu {'+'background-color: '+background+';'+'}'+
      '.dropdown-item {'+'color: '+link+';'+'}'+
      '.dropdown-item:focus, .dropdown-item:hover {'+'color: '+hover+';background-color: '+active+'}'+
      ``
       }

    }

     function addSubItem(sub,item,key,lvl){      
      var lvlup=lvl+1;
      if(lvlup>3)return;
      for (var kx in sub) {    
        if(kx==key){
        sub[kx]['sub'][item['name']]=item;
        return;
        }
        addSubItem(sub[kx]['sub'],item,key,lvlup);
      }      
     }

     function getSubItem(menuitem,prev,lvl){       
      var resp=prev;
      var extralvl=lvl+1;
      var count=0;
      var closesub=false;  
      //console.log('Start:',extralvl);    
      if(extralvl>4)return resp;    
      for (var key in menuitem) {  
        count+=1;
        var subs=Object.keys(menuitem[key]['sub']).length;
        //console.log(key,subs);
        if(subs==0){ //no have subitem
          if(extralvl>1){ //dropdown item or sub dropdown
            if(extralvl==2){
            if(count==1){ //first drop
              closesub=true;
              resp+=Tab(4+(2*extralvl))+'<li class="nav-item dropdown">'+compact+
              Tab(6+(2*extralvl))+'<a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+compact+
              Tab(8+(2*extralvl))+menuitem[key]['name']+compact+
              Tab(6+(2*extralvl))+'</a>'+ compact+
              Tab(4+(2*extralvl))+'<div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">'+compact;
            }else{ //sub itens
                resp+=Tab(6+(2*extralvl))+'<a class="dropdown-item" href="#">'+menuitem[key]['name']+'</a>'+compact;
            }
          }if(extralvl==3||extralvl==4){
            if(count==1){ //first sub drop
              closesub=true;
              resp+=Tab(4+(2*extralvl))+'<a class="dropdown-item dropdown-toggle" href="#">'+compact+
              Tab(6+(2*extralvl))+menuitem[key]['name']+compact+
              Tab(4+(2*extralvl))+'</a>'+compact+
              Tab(6+(2*extralvl))+'<ul class="dropdown-menu leftmenu">'+compact;
              //resp+='<a class="dropdown-item" href="#">'+menuitem[key]['name']+'</a>'+compact;
            }else{ //sub drop itens
              resp+=Tab(8+(2*extralvl))+'<a class="dropdown-item" href="#">'+menuitem[key]['name']+'</a>'+compact;
              //  resp+='<li><a class="dropdown-item" href="#">'+menuitem[key]['name']+'</a></li>'+compact;
            }
          }
          }else{ //normal
            resp+=Tab(4+(2*extralvl))+'<li class="nav-item">'+compact+
            Tab(6+(2*extralvl))+'<a class="nav-link" href="'+menuitem[key]['link']+'">'+menuitem[key]['name']+'</a>'+compact+
            Tab(4+(2*extralvl))+'</li>'+compact;               
          }  
        }else{//have subitem
          //console.log(menuitem[key]['sub']);
          resp=getSubItem(menuitem[key]['sub'],resp,extralvl);          
        }    
      }
      if(closesub==true){
        if(extralvl==2){
          resp+=Tab(4+(2*extralvl))+'</div>'+compact+Tab(2+(2*extralvl))+'</li>'+compact;
        }
        if(extralvl==3||extralvl==4){
          resp+=Tab(6+(2*extralvl))+'</ul>'+compact+'';
        }
      }
      return resp;
     }

     function getMenu(){
      if(Object.keys(mmenu).length==0)if(showcomments==true){return '<!-- NO MENU -->'}else{return ''};        
      var resposta='';
      if(showcomments==true)resposta+='<!--- MENU START --->'+compact;
      resposta+='<nav class="navbar '+mfixed+' navbar-dark navbar-custom navbar-expand-lg">'+compact;
      resposta+=Tab(2)+mhome+compact+Tab(2)+'<div class="collapse navbar-collapse" id="menu">'+compact
      +Tab(4)+'<ul class="navbar-nav">'+compact;
      resposta+=getSubItem(mmenu,'',0);                         
      resposta+=Tab(4)+'</ul>'+compact+Tab(2)+'</div>'+compact+'</nav>'+compact;
      if(mfixed=='fixed-top')resposta+='<br><br>';
      if(showcomments==true)resposta+='<!--- MENU END --->';
      return resposta;
    }


     var sslide='';
     var sslideitem=new Array();
     var sslideid='';

    this.Slide={
      Create(id){
        sslideid=id;
        sslide = '<div id="'+id+'" class="carousel slide" data-ride="carousel">'+compact+
        '<div class="carousel-inner">';
        sslideitem=new Array();
      },
      add(item,title,legend){
       if(sslide=='')return;
       var first='';
       if(Object.keys(sslideitem).length==0)first=' active';       
       var sitem=
       '<div class="carousel-item'+first+'">'+compact+
       item+compact+
       '<div class="carousel-caption d-none d-md-block"><h1>'+title+'</h1><p>'+legend+'</p></div>'+
       '</div>'+compact;
       sslideitem.push(sitem);
      },
      html(){
        if(Object.keys(sslideitem).length>0){
          var resp=sslide;          
          sslideitem.forEach(function(item){
            resp+=item; 
          });
          resp+='</div>'+compact+'<a class="carousel-control-prev" href="#'+sslideid+'" role="button" data-slide="prev">'+
          compact+'<span class="carousel-control-prev-icon" aria-hidden="true"></span>'+compact+
          '<span class="sr-only">Previous</span>'+compact+'</a>'+compact+
          '<a class="carousel-control-next" href="#'+sslideid+'" role="button" data-slide="next">'+compact+
          '<span class="carousel-control-next-icon" aria-hidden="true"></span>'+compact+
          '<span class="sr-only">Next</span>'+compact+
          '</a>'+compact+'</div>';
          return resp;
        }else{
         return '<!--Empty Slide-->'; 
        }
      }
    }

     
    var messageboxid=null;
    var messageboxx={};

    this.Message={
      //possible styles - alert alert-primary || secondary || success || danger || warning || info || light || dark
      Create(id,title,style,bgstyle){
        var mymsg={
          'style':style,
          'bgstyle':bgstyle,
          'yes':'Ok',
          'no':'',
          'title':title,
          'html':'',
          'buttons':{},
          'actionyes':'function(){}',
          'actionno':'function(){}'
        }
        messageboxx[id]=mymsg;
        messageboxid=id;
        return messageboxx[id];
      },
      select(id){
        if(typeof(messageboxx[id])=='undefinied')return null;
        messageboxid=id;
        return messageboxx[id]
      },
      html(htmml){
        if(htmml!=null)
        messageboxx[messageboxid]['html']=htmml;
        return messageboxx[messageboxid]['html'];
      },
      addItem(name,label,type){ //type - "text", "password", "select", "checkbox" or "caption"
        messageboxx[messageboxid]['buttons'][name]={'type':type,'label': '','title': label};
      },
      onYes(texto,funcao){
        if(texto!=null)
        messageboxx[messageboxid]['yes']=texto;
        if(funcao!=null){
          var va=funcao.toString(); //JSON.stringify(funcao);
          messageboxx[messageboxid]['actionyes']=va;        
        }
      },
      onNo(texto,funcao){
        if(texto!=null)
        messageboxx[messageboxid]['no']=texto;
        if(funcao!=null){
          var va=funcao.toString(); //JSON.stringify(funcao);
          messageboxx[messageboxid]['actionno']=va;        
        }
      }
    }

    function getMessages(){
      var resp='';
      var first=true;
      //console.log(Object.keys(messageboxx).length);
      if(Object.keys(messageboxx).length==0)return '';
      resp+='var msgShow={'+compact;
      for (var key in messageboxx) {   
        var estilo=messageboxx[key]['style'];      
        var bgestilo=messageboxx[key]['bgstyle'];      
        var titulo=messageboxx[key]['title'];
        var msghtml=messageboxx[key]['html'];
        var action1=messageboxx[key]['actionyes'];
        var action2=messageboxx[key]['actionno'];
        var iyes=messageboxx[key]['yes'];
        var ino=messageboxx[key]['no'];
        var msgbutton=messageboxx[key]['buttons'];
        var inputbuttons='';
        if(estilo!=null){estilo='customClass         :"'+estilo+'",'+compact;}else{estilo='';}
        if(bgestilo!=null){bgestilo='customOverlayClass         :"'+bgestilo+'",'+compact;}else{bgestilo='';}
        if(Object.keys(msgbutton).length==0){
          //inputbuttons='buttonDone      : "OK"';
        }else{          
          inputbuttons=' input    : '+JSON.stringify(msgbutton)+','+compact;
        }     
        if(ino!=''){
          ino='buttonFail  : "'+ino+'",'+compact;
        }     
        if(first==false)resp+=',';
        resp+='show_'+key+'(){'+compact+            
          '$.MessageBox({'+compact+
          estilo+bgestilo+
          'title : "'+titulo+'",'+compact+
          'buttonDone  : "'+iyes+'",'+compact+
          ino+
          inputbuttons+
          ' message  : "'+msghtml+'"'+compact+
          '}).done('+action1+').fail('+action2+');'+
        '}';
        first=false;                
      }      
      resp+='};'+compact;
      resp+=`function ShowMessage(id){var ffnncc1='msgShow';var ffnncc2='show_'+id;this[ffnncc1][ffnncc2]();}`+compact;
      return resp;
    }
    


    this.onAction=function(action,objeto,funcao){
      var va=funcao.toString(); //JSON.stringify(funcao);
      if(funcao!=null&&action!=null&&objeto!=null){        
        //va='function '+objeto+'_'+action+va.substring(9);                
        var myscr={
          'obj':objeto,
          'act':action,    
          'scr':va          
        };      
        this.script[objeto+'_'+action]=myscr;
      }else{        
        if(action==null&&objeto==null){          
          if(!this.script['EXTRA'])this.script['EXTRA']={'obj':null,'act':null, 'scr':''};
          va=this.script['EXTRA']['scr']+'('+va+'());'+compact;
          this.script['EXTRA']={'obj':null,'act':null, 'scr':va};//add simple script          
        }else{
          if(this.script[objeto+'_'+action]) delete this.script[objeto+'_'+action];
        }        
      }
    };

    this.getScript=function(){
      var retorno='$(document).ready(function(){'+compact;
      var scrArr=this.script;
      for (var key in scrArr) {    
        var objeto=scrArr[key]['obj'];
        var action=scrArr[key]['act'];
        var funcao=scrArr[key]['scr'];
        if(objeto=='document'||objeto=='window'){ //document or window         
          if(action=='load'&&objeto=='document'){
            retorno+='$(document).ready('+funcao+');'+compact;
          }else{
            retorno+=
            `$(`+objeto+`).bind('`+action+`', `+funcao+`);`+compact;  
          }          
        }else{
          if(key=='EXTRA'){
            retorno+=funcao+compact;  
          }else{
            retorno+=
            `$('#`+objeto+`').bind('`+action+`', `+funcao+`);`+compact;  
          }          
        }        
      }  
      retorno+='});'+compact+getMessages();             
      return '<script>'+compact+retorno+'</script>';
    };

    this.selectRow=function(id){
      if(id!==null||typeof id!=='undefined'||id!=='undefined'){id=' id="'+id+'" ';}else{id='';}           
      var rowAR=this.Row.RowArray;
      for (var key in rowAR) {                             
        if(rowAR[key]['id']==id){
          this.Row.Col.lastRow=rowAR[key];
        }        
      }            
      return this.Row;
    };

    this.selectCol=function(id){
      if(id!==null||typeof id!=='undefined'||id!=='undefined'){id=' id="'+id+'" ';}else{id='';}           
      var rowAR=this.Row.RowArray;
      for (var key in rowAR) {                             
          var bodycol=rowAR[key]['col'];
          for (var key2 in bodycol) {             
            if(bodycol[key2]['id']==id){
              this.Row.Col.lastCol=bodycol[key2]; 
              this.Row.Col.lastRow=rowAR[key];                                         
              break;
            }              
          }          
      }                
      return this.Row.Col;
    };

    this.Tab=function(i){
        var tabs='';
        for(var x=0;x<i;x++)tabs=tabs+compactTab;
        return tabs;
    };

    this.Compactar=function(boolea){
      if(boolea==true){
        compact='';
        compactTab='';  
      }else{
        compact='\n';
        compactTab=' ';  
      }
    }

    this.Coments=function(boolea){
      showcomments=boolea;
    }

    this.Fluid=function(boolea){
      if(boolea==true){
        containerf='-fluid';
      }else{
        containerf='';
      }
    }

    function getCSS(arrayitem){
      if(arrayitem==null)return '';
      var respstyle='';
      for (var key in arrayitem) { 
        respstyle+=key+':'+arrayitem[key]+';';
      }
     return 'style="'+respstyle+'";';
    }

    function getBodycss(styleArray){
      var response='';      
      for (var key in styleArray) {                                         
        var arrayval=styleArray[key]; 
        response+=Tab(2)+key+'{'+compact;
        for(var key2 in arrayval) {  
          var valcss=arrayval[key2];
          if(valcss.endsWith(';')==false)valcss+=';';
          response+=Tab(3)+key2+':'+valcss+compact;
        }
        response+=Tab(2)+'}'+compact;
      }      
      response='<style>'+compact+Tab(2)+response.trim()+compact+mmenustyle+compact+'</style>';
      return response;
    }


    function Tab(i){
      var tabs='';
      for(var x=0;x<i;x++)tabs=tabs+compactTab;
      return tabs;
    };

    function getRowhtml(rowitem,extra){
      var retorno='';
      retorno+=Tab(1+extra)+'<div class="row"'+rowitem['id']+' >'+compact;      
            var bodycol=rowitem['col'];            
            if(Object.keys(bodycol).length==0){
              retorno+=rowitem['html']+compact;
            }else{
              for (var key2 in bodycol) { 
                retorno+=Tab(3+extra)+
                '<div class="col"'+bodycol[key2]['id']+' '+getCSS(bodycol[key2]['style'])+'>'+compact;        
                retorno+=Tab(4+extra);
                retorno+=bodycol[key2]['html'].trim()+compact; 
                retorno+=Tab(3+extra)+'</div>';
              }
            }
            retorno+=compact;
            retorno+=Tab(1+extra)+'</div>';          
            return retorno;
    }

  
    

    this.getHtml=function(){
        var bodyret='';
        var rowAR=this.Row.RowArray;
        if(showcomments==true)bodyret+='<!--- BODY START --->'+compact;
        for (var key in rowAR) {                 
            bodyret+=getRowhtml(rowAR[key],0);
        }    
        if(showcomments==true)bodyret+=compact+'<!--- BODY END --->';
        var cssItems='';
        if(showcomments==true)cssItems+='<!--- CSS START --->'+compact;
        cssStyles.forEach(element1 => {
          cssItems+=this.Tab(2)+element1+compact;
        });
        cssItems=cssItems.trim()+compact+getBodycss(this['style'])+compact;
        if(showcomments==true)cssItems+='<!--- CSS END --->';
        var jsX='';
        if(showcomments==true)jsX+='<!--- JAVASCRIPT START --->'+compact;
        jsStyles.forEach(element2 => {
          jsX+=this.Tab(2)+element2+compact;
        });
        jsX=this.Tab(2)+jsX.trim()+compact+
        this.getScript()+compact;        
        if(showcomments==true)jsX+=compact+'<!--- JAVASCRIPT END --->';
        var pagina="<!DOCTYPE html>"+compact+"<html>"+compact+
        "<head>"+compact+"<title>"+this.title+"</title>"+compact+  
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">'+compact+              
        cssItems+compact+
        "</head>"+compact+"<body>"+compact+
        "<div class='container"+containerf+"'>"+compact+         
        getMenu()+compact+
        bodyret+compact+
        '</div>'+compact+
        '<div id="toasterhiddencaller" style="display:block"></div>'+compact+    
        '</body>'+compact+
        jsX+compact+  
        '</html>';
        if(compactTab==''){
          pagina = pagina.replace(/ +(?= )/g,'');//double space
          pagina = pagina.replace(/\s\s+/g, '');//new lines
        }
        return pagina;
    }

    return this;
};


module.exports=Pgs;
