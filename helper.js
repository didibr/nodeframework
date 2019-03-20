var pagesModule = require("./pagesmodule.js");

function CreateHelper(server){

    server.onGet('/?',function(){
        var p1=new pagesModule();
        p1.title='Helper Page';
        p1.style={
            '.row':{
              'padding-bottom':'0.5em'
            },
            'p':{
                'line-height': '2pt'
            },
            '.tab1': { 
                'padding-left': '2em' 
            },
            '.tab2': { 
                'padding-left': '2.5em' 
            }
        }
        p1.Row.add('L1');
        p1.Row.Col.add('t1');
        p1.selectCol('t1').html('<br><div align=center><h2>Framework Helper</h2></div><br>');
        
        //server creation
        p1.Row.add('srvcr');
        p1.Row.Col.add('s1');
        p1.selectCol('s1').html(`
        <h5>Web Server Creation</h5>
        <p>var server = require("./server.js");</p>        
        <p>server.Create(80);</p>
        <p>server.Start();</p>`);

        //page creation
        p1.Row.add('pgshw');
        p1.Row.Col.add('p1');
        p1.selectCol('p1').html(`
        <h5>Web Page Creation</h5>
        <p>var pagesModule = require("./pagesmodule.js");</p>        
        <p>server.onGet('/page.html',function(){</p>
        <p class='tab1'>    var p1=new pagesModule();</p>
        <p class='tab1'>    p1.title='Title';</p>
        <p class='tab1'>    p1.Compactar(false);  //compress html code</p>
        <p class='tab1'>    p1.Row.add('line1');    //add horizontal row</p>
        <p class='tab1'>    p1.Row.Col.add('cel1'); //add col on row</p>
        <p class='tab1'>    p1.selectCol('cel1').html('text html'); //add html to col</p>
        <p class='tab1'>    server.sendPage(p1);  //render page</p>
        <p>});</p>`);

        //page style
        p1.Row.add('pgstl');
        p1.Row.Col.add('s1');
        p1.selectCol('s1').html(`
        <h5>Web Page CSS</h5>
        <p>var p1=new pagesModule();</p>        
        <p>p1.style={</p>
        <p class='tab1'>'body':{</p>
        <p class='tab2'>"background-color":"#ccc"</p>
        <p class='tab1'>}</p>
        <p>}</p>
        `);

        //JqueryEvents
        p1.Row.add('jevents');
        p1.Row.Col.add('j1');
        p1.selectCol('j1').html(`<h5>Script Events</h5><p>page.onAction(action,object,function);</p>`);
        

        server.sendPage(p1); 
      });


}

module.exports=CreateHelper;

