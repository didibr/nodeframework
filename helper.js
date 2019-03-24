var pagesModule = require("./pagesmodule.js");
const fs = require('fs');

function CreateHelper(server){

    var basestyle={
        'body,html':{
            'background-color':'#1e2021',
            'color':'#c1c1c1'
        },
        '.evs':{
            'color':'#9291e4'
        },
        '.exp':{
            'color':'#940082'
        },
        '.coment':{
            'color':'#009400'
        },
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
        },
        '.col:hover i.fa':{
           'color':'#e00dd8'
        }
    };

    server.onGet('/?',function(){
        var p1=new pagesModule();
        p1.title='Helper Page';
        p1.style=basestyle;
        p1.Row.add('L1');
        p1.Row.Col.add('t1');
        p1.selectCol('t1').html('<br><div align=center><h2>Framework Helper</h2></div><br>');

        //SubMenu
        p1.Row.add('extra');
        p1.Row.Col.add('awess');
        p1.selectCol('awess').html(`<div align=center><p><a href='./?fotawessome'>Font Awessome List</a></p></div>`);
        p1.Row.Col.add('smpm');
        p1.selectCol('smpm').html(`<div align=center><p><a href='./?menuexample'>Menu Example</a></p></div>`);
        p1.Row.Col.add('xslid');
        p1.selectCol('xslid').html(`<div align=center><p><a href='./?slide'>Slide Example</a></p></div>`);
        
        //server creation
        p1.Row.add('srvcr');
        p1.Row.Col.add('s1');
        p1.selectCol('s1').html(`
        <h5><u>Web Server Creation</u></h5>
        <p>var server = require("./server.js");</p>        
        <p>server.Create(80);</p>
        <p>server.Start();</p>`);

            
        //page creation
        p1.Row.add('pgshw');
        p1.Row.Col.add('p1');
        p1.selectCol('p1').html(`
        <h5><u>Web Page Creation</u></h5>
        <p>var pagesModule = require("./pagesmodule.js");</p>        
        <p>server.onGet('/page.html',function(){</p>
        <p class='tab1'>    var p1=new pagesModule();</p>
        <p class='tab1'>    p1.title='Title';</p>
        <p class='coment'><i>//p1.Fluid(true); //Mode Fluid default = False</i></p>
        <p class='coment'><i>//p1.style={'body,html':{'background-color':'#1e2021'} //Custom Style</i></p>
        <p class='tab1'>    p1.Compactar(false);  <i class='coment'>//compress html code default=false</i></p>
        <p class='tab1'>    p1.Coments(true);  <i class='coment'>//show coments on html code default=true</i></p>
        <p class='tab1'>    p1.Row.add('line1');    <i class='coment'>//add horizontal row</i></p>
        <p class='tab1'>    p1.Row.Col.add('cel1'); <i class='coment'>//add col on row</i></p>
        <p class='tab1'>    p1.selectCol('cel1').html('text html'); <i class='coment'>//add html to col</i></p>
        <p class='tab1'>    server.sendPage(p1); <i class='coment'> //render page</i></p>
        <p class='coment'><i>//server.sendHtml('custom html');</i></p>
        <p>});</p>`);

        //Menu Creation
        p1.Row.add('mmshw');
        p1.Row.Col.add('m1');
        p1.selectCol('m1').html(`
        <h5><u>Menu Creation</u></h5>
        <p><i class='coment'>//Single Items</i></p>
        <p>p1.Menu.add('item1','#');</p>
        <p>p1.Menu.add('item3','#');</p>
        <p>p1.Menu.add('item2','#');</p>
        <p><i class='coment'>//Addm DropDown itens on 'item3'</i></p>
        <p>p1.Menu.add('DropDown','#','item3');<i class='coment'>//first one show as dropdown title</i></p>
        <p>p1.Menu.add('Sub1','#','item3');</p>
        <p>p1.Menu.add('Sub2','#','item3');</p>
        <p>p1.Menu.add('Sub3','#','item3');</p>
        <p><i class='coment'>//Addm Submenu on Dropdown item 'Sub3'</i></p>
        <p>p1.Menu.add('DropDown2','#','Sub3');<i class='coment'>//first one show as submenu title</i></p>
        <p>p1.Menu.add('XSub1','#','Sub3');</p>
        <p>p1.Menu.add('XSub2','#','Sub3');</p>
        <p>p1.Menu.add('XSub3','#','Sub3');</p>
        <p><i class='coment'>//Addm Submenu on Submenu item 'XSub3'</i></p>
        <p>p1.Menu.add('DropDown3','#','XSub3');<i class='coment'>//first one show as submenu title</i></p>
        <p>p1.Menu.add('YSub1','#','XSub3');</p>
        <p>p1.Menu.add('YSub2','#','XSub3');</p>`);   
        
        //Slide Creation
        p1.Row.add('slld');
        p1.Row.Col.add('sl1');
        p1.selectCol('sl1').html(
            `<h5><u>Slide Creation</u></h5>
            <p>p1.style={'#slidecol':{'padding-right': '0px','padding-left':'0px'}};<i class='coment'>//remove margins to fit window</i></p>
            <p>p1.Fluid(true);<i class='coment'>//Set Fluid to full window</i></p>    
            <p>p1.Slide.Create('slide1');</p>
            <p>p1.Slide.add(&lt;img src=&quot;./img/test.jpg&quot; alt=&quot;First slide&quot; width=&quot;100%&quot;&gt;,'Title1','Legenda 1');</p>
            <p>p1.Slide.add(&lt;img src=&quot;./img/test.jpg&quot; alt=&quot;Second slide&quot; width=&quot;100%&quot;&gt;,'Title2','Legenda 2');</p>
            <p>p1.Slide.add(&lt;img src=&quot;./img/test.jpg&quot; alt=&quot;Tird slide&quot; width=&quot;100%&quot;&gt;,'Title3','Legenda 3');</p>                   
            <p>p1.Row.add('sliderow');</p>
            <p>p1.Row.Col.add('slidecol');</p>
            <p>p1.selectCol('slidecol').html(p1.Slide.html());</p>            
            <p>server.sendPage(p1);</p>
            <p><a href='./?slide'>Slide Example</a>`
        );

        //page style
        p1.Row.add('pgstl');
        p1.Row.Col.add('s1');
        p1.selectCol('s1').html(`
        <h5><u>Web Page CSS</u></h5>
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
        p1.selectCol('j1').html(`
        <h5><u>Script Events</u></h5>
        <p><i class='coment'>//page.onAction(action,object,function);</i></p>
        <p>p1.Row.Col.add('col1');</p>
        <p>p1.selectCol('col1').html('Click Me');</p>
        <p>p1.onAction('click','col1',function(){ </p>   
        <p class='tab1'>$('#col1').html('Clicked');</p>
        <p>});</p>
        <p><a href='./?eventscript'>List of Events</a>`);
        

        server.sendPage(p1); 
    });


      
    server.onGet('/?eventscript',function(){
        var p1=new pagesModule();
        p1.title='Helper Page';
        p1.style=basestyle;
        p1.Row.add('L1');
        p1.Row.Col.add('t1');
        p1.selectCol('t1').html('<br><div align=center><h2>List of Events</h2></div><br>');

        //back header
        p1.Row.add('bck');
        p1.Row.Col.add('bc');
        p1.selectCol('bc').html(`<div align=center><p><a href='./?'>back to Helper Page</a></p></div>`);
        
        //mouseevents
        p1.Row.add('mevents');
        p1.Row.Col.add('j1');
        p1.selectCol('j1').html(`
        <h5><u>Mouse Events</u></h5>
        <p class='evs'>scroll, click, dblclick, mousedown, mouseup, mousemove, mouseover, mouseout, mouseenter, mouseleave, load, resize, scroll, unload, error</p>
        <p><i class='exp'>Example:</i></p>
        <p>p1.onAction('click','myID',function(e){ </p>   
        <p class='tab1'><i class='coment'>//mouse event fired (element clicked)</i></p>
        <p>});</p>
        `);

        //kboard
        p1.Row.add('kbevent');
        p1.Row.Col.add('k1');
        p1.selectCol('k1').html(`
        <h5><u>Keyboard Events</u></h5>
        <p class='evs'>keydown, keypress, keyup</p>
        <p><i class='exp'>Example:</i></p>
        <p>p1.onAction('keypress','myID',function(e){ </p>   
        <p class='tab1'><i class='coment'>//keyboard event fired</i></p>
        <p>});</p>
        `);

        //Browser Events
        p1.Row.add('bbevent');
        p1.Row.Col.add('b1');
        p1.selectCol('b1').html(`
        <h5><u>Browser Events</u></h5>
        <p class='evs'>load, resize, scroll, unload, error</p>
        <p><i class='exp'>Example:</i></p>
        <p>p1.onAction('load','document',function(){ </p>   
        <p class='tab1'><i class='coment'>//browser event fired (document object model loaded)</i></p>
        <p>});</p>
        `);

        //DOM Element Events
        p1.Row.add('domev');
        p1.Row.Col.add('d1');
        p1.selectCol('d1').html(`
        <h5><u>DOM Element Events</u></h5>
        <p class='evs'>blur, focus, focusin, focusout, change, select, submit</p>
        <p><i class='exp'>Example:</i></p>
        <p>p1.onAction('blur','myID',function(e){ </p>   
        <p class='tab1'><i class='coment'>//dom event fired (input focus)</i></p>
        <p>});</p>
        `);

         //back footer
         p1.Row.add('bck');
         p1.Row.Col.add('bc1');
         var bckhtml=p1.selectCol('bc').html();
         p1.selectCol('bc1').html(bckhtml);
        
        server.sendPage(p1); 
    });


    server.onGet('/?menuexample',function(){
        var p1=new pagesModule();
        p1.title='Menu Example';
        p1.style=basestyle;
        p1.Menu.Create('Menu','./?menuexample');
        p1.Menu.setColor('#ff5500','#f191e0','#85c3e2','#ffffff','#ffb100');        
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
       
        p1.Row.add('r1');
        p1.Row.Col.add('t1');
        p1.selectCol('t1').html('<br><div align=center><h2>Menu Example</h2></div><br>'+       
        '<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>');

        p1.Row.add('r2');
        p1.Row.Col.add('c1');
        p1.selectCol('c1').html(`
        <p>p1.Menu.setColor(
            '<font color="#ff5500">#ff5500</font>',
            '<font color="#f191e0">#f191e0</font>',
            '<font color="#85c3e2">#85c3e2</font>',
            '<font color="#ffffff">#ffffff</font>',
            '<font color="#ffb100">#ffb100</font>');</p>        
        `);

        //back header
        p1.Row.add('bck');
        p1.Row.Col.add('bc');
        p1.selectCol('bc').html(`<div align=center><p><a href='./?'>back to Helper Page</a></p></div>`);
       
        server.sendPage(p1);
    });


    server.onGet('/?fotawessome',function(){
        var p1=new pagesModule();        
        p1.title='Font Awessome List';
        p1.style=basestyle;
        p1.Row.add('L1');
        p1.Row.Col.add('t1');
        p1.selectCol('t1').html('<br><div align=center><h2>Font Awessome List</h2></div><br>');

        //back header
        p1.Row.add('bck');
        p1.Row.Col.add('bc');
        p1.selectCol('bc').html(`<div align=center><p><a href='./?'>back to Helper Page</a></p></div>`);      
               
        var cssfile=__dirname+'/src/css/shims.json';        
        var cssicons=__dirname+'/src/css/icons.json'; 
        var obj;
        var names=[];
        fs.readFile(cssfile, 'utf8', function (err, data) { //load Json icons linst
          if (err) throw err;
          obj = JSON.parse(data);
        
        obj.forEach(function(element){
           if(!names.includes(element[0])){names.push(element[0]);}
           if(!names.includes(element[1])){names.push(element[1]);}
           if(!names.includes(element[2])){names.push(element[2]);}
        });

        var total=0;
        //var totalrow=0;
        var counter=0;
        var maxperrow=4;
        p1.Row.add('rowicons');
        names.forEach(function(icname){
         counter+=1;total+=1;         
            /*if(counter==1){
              p1.Row.add('rr'+totalrow);
              totalrow+=1;
            }*/
         p1.Row.Col.add('ic'+total);
         p1.selectCol('ic'+total).html('<i class="fa fa-'+icname+'"></i>');
         if(counter>maxperrow)counter=0;
        });

        p1.onAction('load','document',function(){
            $( ".fa" ).each(function( index ) {
                if($( this ).width()<8){
                    //$( this ).hide();
                    $(this).closest('.col').remove();
                }
            });
            $('.col').click(function(){
                var fname=$(this).find('i').attr('class');
                if(typeof(fname)!='undefined')
                alert(fname.split(' ')[1]);
            })
        });

         //back footer
         p1.Row.add('bck');
         p1.Row.Col.add('bc1');
         var bckhtml=p1.selectCol('bc').html();
         p1.selectCol('bc1').html(bckhtml);

        server.sendPage(p1); 
        //server.sendHtml(server.print_r(names));
        });
        
                        
    });


    server.onGet('/?slide',function(){
        var p1=new pagesModule();
        p1.title='Slide Test';
        basestyle['#slidecol']={
                'padding-right': '0px', 
                'padding-left':'0px'
            };        
        p1.style=basestyle;
        p1.Fluid(true);
           
        p1.Slide.Create('slide1');
        p1.Slide.add('<img src="./img/test.jpg" alt="First slide" width="100%">','Title1','Legenda 1');
        p1.Slide.add('<img src="./img/test.jpg" alt="First slide" width="100%">','Title2','Legenda 2');
        p1.Slide.add('<img src="./img/test.jpg" alt="First slide" width="100%">','Title3','Legenda 3');
                
        p1.Row.add('sliderow');
        p1.Row.Col.add('slidecol');
        p1.selectCol('slidecol').html(p1.Slide.html());

        p1.Row.add('L1');
        p1.Row.Col.add('t2');        
        p1.selectCol('t2').html('<div align=center><p><a href="./?">back to Helper Page</a></p></div>');
        
        server.sendPage(p1);        
    });


}

module.exports=CreateHelper;

