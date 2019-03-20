//pages.js
// cria paginas dinamicamente em runtime
//cria estilos e objetos DOM
var os = require("os");
const repl = require('repl');
var ss = require("./server.js");

var cssStyles=[];
cssStyles.push('<link rel="stylesheet" href="./css/bootstrap.min.css" crossorigin="anonymous">');

var jsStyles=[];
jsStyles.push('<script src="./js/jquery.min.js"></script>');
jsStyles.push('<script src="./js/bootstrap.min.js"></script>');
jsStyles.push('<script src="./js/jquery.slim.min.js"></script>');
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
    this.script = '';
    var body = '';
    var compact='\n';
    var compactTab=' ';   
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
      response='<style>'+compact+Tab(2)+response.trim()+compact+'</style>';
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
        for (var key in rowAR) {                 
            bodyret+=getRowhtml(rowAR[key],0);
        }    
        var cssItems='';
        cssStyles.forEach(element1 => {
          cssItems+=this.Tab(2)+element1+compact;
        });
        var jsX='';
        jsStyles.forEach(element2 => {
          jsX+=this.Tab(2)+element2+compact;
        });
        return "<!DOCTYPE html>"+compact+"<html>"+compact+
        "<head>"+compact+"<title>"+this.title+"</title>"+compact+        
        cssItems.trim()+compact+  
        getBodycss(this['style'])+compact+
        "</head>"+compact+"<body>"+compact+"<div class='container'>"+compact+         
        bodyret+compact+
        '</div>'+compact+'</body>'+compact+
        this.Tab(2)+jsX.trim()+compact+  
        '</html>';
    }

    return this;
};


module.exports=Pgs;
