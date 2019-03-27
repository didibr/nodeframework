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
        '.tab3': { 
            'padding-left': '3.5em' 
        },
        '.col:hover i.fa':{
           'color':'#e00dd8'
        }
    };

    server.onGet('/?',function(){
        var p1=new pagesModule();
        //p1.Compactar(true);
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
        p1.Row.Col.add('cmp');
        p1.selectCol('cmp').html(`<div align=center><p><a href='./?samples'>Samples</a></p></div>`);
        
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


        //MessageBox Functions
        p1.Message.Create('msgid','Titulo1','alert alert-danger');
        p1.Message.select('msgid');
        p1.Message.html('Message Here');
        p1.Message.addItem('Text1','Sample Input','text');
        p1.Message.onYes('Enviar',function(data){
            alert('typed: '+data['Text1']);
        });

        p1.Row.add('mmsgg');
        p1.Row.Col.add('msg1');
        p1.selectCol('msg1').html(`
        <h5><u>Create Message Input Dialog</u></h5>
        <p><i class='coment'>//page.Message.Create(ID,Title,DialogClass,BgClass);</i></p>
        <p><i class='coment'>//page.Message.html(MessageHtml);</i></p>
        <p><i class='coment'>//page.Message.addItem(ID,DisplayText,Type);</i></p>
        <p>p1.Message.Create('msgid','Titulo1','alert alert-danger','alert alert-dark');</p>
        <p>p1.Message.select('msgid');</p>
        <p>p1.Message.html('Message Here');</p>
        <p>p1.Message.addItem('Text1','Sample Input','text');</p>
        <p>p1.Message.onYes('Enviar',function(data){<i class='coment'>//Event on OK click</i></p>
            <p class="tab1">alert('typed: '+data['Text1']);</p>
        <p>});</p>
        <p><i class='coment'>//ShowMessage('msgid'); javascript show message</i></p>
        <p><a href='JAVASCRIPT:ShowMessage("msgid");'>Show m1</a></p>
        `);


        //Toast Message
        p1.Row.add('toasted');
        p1.Row.Col.add('toos1');
        p1.selectCol('toos1').html(`   
        <h5><u>Create Toast Message</u></h5>            
        <p><i class='coment'>function CreateToast(id,delay,icon,header,body,time,background,icon_background)</i></p>
        <p>CreateToast('toast1','5000','fa-facebook','Facebook','You have new message','now','warning','primary');</p>
        <p><a href="JAVASCRIPT:CreateToast('toast1','5000','fa-facebook','Facebook','You have new message','now','warning','primary');">Show this Toast</a></p>
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
        

        //execute this function on ready - add round class to all href
        p1.onAction(null,null,function(){            
          $('a').each(function(){
            $(this).addClass('btn btn-lg rounded-pill btn-outline-primary');
          });
        });

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
        p1.selectCol('bc').html(`<div align=center><p><a href='./?' class='btn btn-lg rounded-pill btn-outline-primary'>back to Helper Page</a></p></div>`);
        
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
        p1.selectCol('t1').html('<br><div align=center><h2>Menu Example</h2></div><br>');

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
        p1.selectCol('bc').html(`<div align=center><p><a href='./?' class='btn btn-lg rounded-pill btn-outline-primary'>back to Helper Page</a></p></div>`);
       
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
        p1.selectCol('bc').html(`<div align=center><p><a href='./?' class='btn btn-lg rounded-pill btn-outline-primary'>back to Helper Page</a></p></div>`);      
               
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
        p1.selectCol('t2').html('<div align=center><p><a href="./?" class="btn btn-lg rounded-pill btn-outline-primary">back to Helper Page</a></p></div>');
        
        server.sendPage(p1);        
    });


    server.onGet('/?samples',function(){
        var p1=new pagesModule();
        p1.title='Samples';        
        p1.style=basestyle;                
        p1.Row.add('m1');
        p1.Row.Col.add('m11');
        p1.selectCol('m11').html('<br><div align=center><h2>List of Examples</h2></div><br>');

        p1.Row.add('L1');
        p1.Row.Col.add('t1');        
        p1.selectCol('t1').html('<div align=center><p><a href="./?" class="btn btn-lg rounded-pill btn-outline-primary">back to Helper Page</a></p></div>');
            
        p1.Row.add('sam1');
        p1.Row.Col.add('sx1');
        p1.selectCol('sx1').html('<h1>Samples List</h1><br><br>');



        p1.Row.add('xx0');
        p1.Row.Col.add('x0');
        p1.selectCol('x0').html(`
        <P>Background Colors Example <i class="exp">.bg-NAME</i> works with text too <i class="exp">.text-NAME</i></p>
<div class="p-3 mb-2 bg-primary text-white">.bg-primary .text-white</div>
<div class="p-3 mb-2 bg-secondary text-white">.bg-secondary .text-white</div>
<div class="p-3 mb-2 bg-success text-white">.bg-success .text-white</div>
<div class="p-3 mb-2 bg-danger text-white">.bg-danger .text-white</div>
<div class="p-3 mb-2 bg-warning text-dark">.bg-warning .text-dark</div>
<div class="p-3 mb-2 bg-info text-white">.bg-info .text-white</div>
<div class="p-3 mb-2 bg-light text-dark">.bg-light .text-dark</div>
<div class="p-3 mb-2 bg-dark text-white">.bg-dark .text-white</div>
<div class="p-3 mb-2 bg-white text-dark">.bg-white .text-dark</div>
<div class="p-3 mb-2 bg-transparent text-dark">.bg-transparent .text-dark</div>
<br>
`);

        p1.Row.add('xx1');
        p1.Row.Col.add('x1');
        p1.selectCol('x1').html(`
        <button class="btn btn-secondary" type="button">
        <span class="fa fa-thumbs-up"></span>
        Like
        </button>
        <button class="btn btn-primary" type="button">
        <span class="fa fa-thumbs-up"></span>
        Liked!
        </button><br><div class="card card-body bg-dark text-white">
<p>&lt;button class=&quot;btn btn-secondary&quot; type=&quot;button&quot;&gt;</p> 
<p class='tab1'>&lt;span class=&quot;fa fa-thumbs-up&quot;&gt;&lt;/span&gt;</p>
<p class='tab1'>Like</P>
<p>&lt;/button&gt;</p>
<p>&lt;button class=&quot;btn btn-primary&quot; type=&quot;button&quot;&gt; </p>
<p class='tab1'>&lt;span class=&quot;fa fa-thumbs-up&quot;&gt; &lt;/span&gt;</p>
<p class='tab1'>Liked!</p>
<p>&lt;/button&gt;</p></div>
<br><br>`);


        p1.Row.add('xx2');
        p1.Row.Col.add('x2');
        p1.selectCol('x2').html(`
        <ul class="nav nav-pills">
  <li class="nav-item">
    <a class="nav-link active" href="#">
      <span class="fa fa-comments"></span>
      Discussions
    </a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">
      <span class="fa fa-bell-o"></span>
      Notifications
    </a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">
      <span class="fa fa-user"></span>
      Members
    </a>
  </li>
</ul>
<div class="card card-body bg-dark text-white">
<p>&lt;ul class=&quot;nav nav-pills&quot;&gt; </p>
<p class='tab1'>&lt;li class=&quot;nav-item&quot;&gt; </p>
<p class='tab2'>&lt;a class=&quot;nav-link active&quot; href=&quot;#&quot;&gt; </p>
<p class='tab3'>&lt;span class=&quot;fa fa-comments&quot;&gt;&lt;/span&gt; </p>
<p class='tab3'>Discussions </p>
<p class='tab2'>&lt;/a&gt; </p>
<p class='tab1'>&lt;/li&gt; </p>
<p class='tab1'>&lt;li class=&quot;nav-item&quot;&gt; </p>
<p class='tab2'>&lt;a class=&quot;nav-link&quot; href=&quot;#&quot;&gt; </p>
<p class='tab3'>&lt;span class=&quot;fa fa-bell-o&quot;&gt;&lt;/span&gt; </p>
<p class='tab3'>Notifications </p>
<p class='tab2'>&lt;/a&gt; </p>
<p class='tab1'>&lt;/li&gt; </p>
<p class='tab1'>&lt;li class=&quot;nav-item&quot;&gt; </p>
<p class='tab2'>&lt;a class=&quot;nav-link&quot; href=&quot;#&quot;&gt; </p>
<p class='tab3'>&lt;span class=&quot;fa fa-user&quot;&gt;&lt;/span&gt; </p>
<p class='tab3'>Members </p>
<p class='tab2'>&lt;/a&gt; </p>
<p class='tab1'>&lt;/li&gt;</p> 
<p>&lt;/ul&gt;</p></div>
<br><br>`);


        p1.Row.add('xx3');
        p1.Row.Col.add('x3');
        p1.selectCol('x3').html(`<i class="exp">.rounded-pill</i> to make rounded border <i class="exp">btn-outline-XXX</i> make outline transparent<br>
        <button type="button" class="btn btn-lg rounded-pill btn-primary">Primary</button>
<button type="button" class="btn btn-lg rounded-pill btn-outline-secondary">Secondary</button>
<button type="button" class="btn rounded-pill btn-success">Success</button>
<button type="button" class="btn rounded-pill btn-info">Info</button>
<button type="button" class="btn btn-sm rounded-pill btn-outline-warning">Warning</button>
<button type="button" class="btn btn-sm rounded-pill btn-danger">Danger</button>
<button type="button" class="btn btn-xs rounded-pill btn-link">Link</button><br>
<div class="card card-body bg-dark text-white">
<p>&lt;button type=&quot;button&quot; class=&quot;<i class='exp'>btn btn-lg rounded-pill btn-primary</i>&quot;&gt;Primary&lt;/button&gt; </p>
<p>&lt;button type=&quot;button&quot; class=&quot;<i class='exp'>btn btn-lg rounded-pill btn-outline-secondary</i>&quot;&gt;Secondary&lt;/button&gt; </p>
<p>&lt;button type=&quot;button&quot; class=&quot;<i class='exp'>btn rounded-pill btn-success</i>&quot;&gt;Success&lt;/button&gt; </p>
<p>&lt;button type=&quot;button&quot; class=&quot;<i class='exp'>btn rounded-pill btn-info</i>&quot;&gt;Info&lt;/button&gt; </p>
<p>&lt;button type=&quot;button&quot; class=&quot;<i class='exp'>btn btn-sm rounded-pill btn-outline-warning</i>&quot;&gt;Warning&lt;/button&gt; </p>
<p>&lt;button type=&quot;button&quot; class=&quot;<i class='exp'>btn btn-sm rounded-pill btn-danger</i>&quot;&gt;Danger&lt;/button&gt;</p> 
<p>&lt;button type=&quot;button&quot; class=&quot;<i class='exp'>btn btn-xs rounded-pill btn-link</i>&quot;&gt;Link&lt;/button&gt;</p>
</div>
<br><br>`);

        p1.Row.add('xx4');
        p1.Row.Col.add('x4');
        p1.selectCol('x4').html(`<p>Use the <i class="exp">.d-flex flex-row</i> classes when you need to keep related elements on the same row, but with flexible individual widths.</p>        
        <i class="exp">class="btn-group mr-2" role="group"</i> Create group of buttons<br>
<div class="d-flex flex-row">
    <input type="text" class="col-6" placeholder="Search orders">
    <div class="btn-group mr-2" role="group">
        <button type="button" class="btn btn-success"><span class="fa fa-pencil"></span></button>
        <button type="button" class="btn btn-danger"><span class="fa fa-remove"></span></button>
    </div>
</div>
<div class="card card-body bg-dark text-white">
<p>&lt;div class=&quot;d-flex flex-row&quot;&gt; </p>
<p class='tab1'>&lt;input type=&quot;text&quot; class=&quot;col-6&quot; placeholder=&quot;Search orders&quot;&gt; </p>
<p class='tab1'>&lt;div class=&quot;btn-group mr-2&quot; role=&quot;group&quot;&gt; </p>
<p class='tab2'>&lt;button type=&quot;button&quot; class=&quot;btn btn-success&quot;&gt;&lt;span class=&quot;fa fa-pencil&quot;&gt;&lt;/span&gt;&lt;/button&gt; </p>
<p class='tab2'>&lt;button type=&quot;button&quot; class=&quot;btn btn-danger&quot;&gt;&lt;span class=&quot;fa fa-remove&quot;&gt;&lt;/span&gt;&lt;/button&gt; </p>
<p class='tab1'>&lt;/div&gt; </p>
<p>&lt;/div&gt;</p></div>
<br><br>`);


        p1.Row.add('xx4');
        p1.Row.Col.add('x4');
        p1.selectCol('x4').html(`
        <span class="badge badge-primary">Primary</span>
        <span class="badge badge-secondary">Secondary</span>
        <span class="badge badge-success">Success</span>
        <span class="badge badge-danger">Danger</span>
        <span class="badge badge-warning">Warning</span>
        <span class="badge badge-info">Info</span>
        <span class="badge badge-light">Light</span>
        <span class="badge badge-dark">Dark</span>
        <button type="button" class="btn btn-primary">
            Profile <span class="badge badge-danger">9</span>
            <span class="sr-only">unread messages</span>
        </button><br>
        <div class="card card-body bg-dark text-white">
        <p>&lt;span class=&quot;badge badge-primary&quot;&gt;Primary&lt;/span&gt; </p>
        <p>&lt;span class=&quot;badge badge-secondary&quot;&gt;Secondary&lt;/span&gt; </p>
        <p>&lt;span class=&quot;badge badge-success&quot;&gt;Success&lt;/span&gt; </p>
        <p>&lt;span class=&quot;badge badge-danger&quot;&gt;Danger&lt;/span&gt; </p>
        <p>&lt;span class=&quot;badge badge-warning&quot;&gt;Warning&lt;/span&gt; </p>
        <p>&lt;span class=&quot;badge badge-info&quot;&gt;Info&lt;/span&gt;</p>
        <p>&lt;span class=&quot;badge badge-light&quot;&gt;Light&lt;/span&gt; </p>
        <p>&lt;span class=&quot;badge badge-dark&quot;&gt;Dark&lt;/span&gt; </p>
        <p>&lt;button type=&quot;button&quot; class=&quot;btn btn-primary&quot;&gt; </p>
        <p class='tab1'>Profile &lt;span class=&quot;badge badge-danger&quot;&gt;9&lt;/span&gt; </p>
        <p class='tab1'>&lt;span class=&quot;sr-only&quot;&gt;unread messages&lt;/span&gt; </p>
        <p>&lt;/button&gt;</p></div>
        <br><br>        
        `);

        p1.Row.add('xx5');
        p1.Row.Col.add('x5');
        p1.selectCol('x5').html(`
        <p>
            <a class="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                Link with href
            </a>
            <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                Button with data-target
            </button>
        </p>
        <div class="collapse" id="collapseExample">
            <div class="card card-body bg-success text-white">
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
            </div>
        </div>
        <div class="card card-body bg-dark text-white">
        <p>&lt;p&gt; </p>
        <p class='tab1'>&lt;a class=&quot;btn btn-primary&quot; data-toggle=&quot;collapse&quot; href=&quot;#collapseExample&quot; role=&quot;button&quot; </p>
        <p class='tab1'>aria-expanded=&quot;false&quot; aria-controls=&quot;collapseExample&quot;&gt; </p>
        <p class='tab2'>Link with href</p>
        <p class='tab1'>&lt;/a&gt; </p>
        <p class='tab1'>&lt;button class=&quot;btn btn-primary&quot; type=&quot;button&quot; data-toggle=&quot;collapse&quot; data-target=&quot;#collapseExample&quot;</p> 
        <p class='tab1'>aria-expanded=&quot;false&quot; aria-controls=&quot;collapseExample&quot;&gt; </p>
        <p class='tab2'>Button with data-target </p>
        <p class='tab1'>&lt;/button&gt; </p>
        <p>&lt;/p&gt; </p>
        <p>&lt;div class=&quot;collapse&quot; id=&quot;collapseExample&quot;&gt; </p>
        <p class='tab1'>&lt;div class=&quot;card card-body bg-success text-white&quot;&gt; </p>
        <p class='tab2'>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica,</p>
        <p class='tab2'>craft beer labore wes anderson cred nesciunt sapiente ea proident. </p>
        <p class='tab1'>&lt;/div&gt;</p> 
        <p>&lt;/div&gt;</p></div>
        <br><br>`);


        p1.Row.add('xx5');
        p1.Row.Col.add('x5');
        p1.selectCol('x5').html(`
        <div class="embed-responsive embed-responsive-16by9 col-4">
            <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/ePRtorpaKmE?autoplay=1"></iframe>
        </div>
        <div class="card card-body bg-dark text-white">
        <p>&lt;!-- 21:9 aspect ratio --&gt; </p>
        <p>&lt;div class=&quot;embed-responsive embed-responsive-21by9&quot;&gt; </p>
        <p class='tab1'>&lt;iframe class=&quot;embed-responsive-item&quot; src=&quot;...&quot;&gt;&lt;/iframe&gt; </p>
        <p>&lt;/div&gt; </p>
        <p>&lt;!-- 16:9 aspect ratio --&gt; </p>
        <p>&lt;div class=&quot;embed-responsive embed-responsive-16by9&quot;&gt; </p>
        <p class='tab1'>&lt;iframe class=&quot;embed-responsive-item&quot; src=&quot;...&quot;&gt;&lt;/iframe&gt; </p>
        <p>&lt;/div&gt; &lt;!-- 4:3 aspect ratio --&gt; </p>
        <p>&lt;div class=&quot;embed-responsive embed-responsive-4by3&quot;&gt; </p>
        <p class='tab1'>&lt;iframe class=&quot;embed-responsive-item&quot; src=&quot;...&quot;&gt;&lt;/iframe&gt; </p>
        <p>&lt;/div&gt; &lt;!-- 1:1 aspect ratio --&gt; </p>
        <p>&lt;div class=&quot;embed-responsive embed-responsive-1by1&quot;&gt; </p>
        <p class='tab1'>&lt;iframe class=&quot;embed-responsive-item&quot; src=&quot;...&quot;&gt;&lt;/iframe&gt; </p>
        <p>&lt;/div&gt;</p>
        </div><br><br>`);

        p1.Row.add('xx6');
        p1.Row.Col.add('x6');
        p1.selectCol('x6').html(`
        <!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#mod1">
  Launch demo modal
</button>
<!--- modal dialog -->
<div id="mod1" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      ... Text Here
    </div>
  </div>
</div><br><div class="card card-body bg-dark text-white">
<p><i class="exp">&lt;!-- Button trigger modal --&gt; </i></p>
<p>&lt;button type=&quot;button&quot; class=&quot;btn btn-primary&quot; data-toggle=&quot;modal&quot; data-target=&quot;#mod1&quot;&gt; </p>
<p class='tab1'>Launch demo modal </p>
<p>&lt;/button&gt; </p>
<p><i class="exp">&lt;!--- modal dialog --&gt; </i></p>
<p>&lt;div id=&quot;mod1&quot; class=&quot;modal fade bd-example-modal-lg&quot; tabindex=&quot;-1&quot; role=&quot;dialog&quot; aria-labelledby=&quot;myLargeModalLabel&quot; aria-hidden=&quot;true&quot;&gt; </p>
<p class='tab1'>&lt;div class=&quot;modal-dialog modal-lg&quot;&gt; </p>
<p class='tab2'>&lt;div class=&quot;modal-content&quot;&gt; </p>
<p class='tab3'>... Text Here </p>
<p class='tab2'>&lt;/div&gt; </p>
<p class='tab1'>&lt;/div&gt; </p>
<p>&lt;/div&gt;</p></div><br><br>`);



        p1.Row.add('xx7');
        p1.Row.Col.add('x7');
        p1.selectCol('x7').html(`<div class="spinner-border text-primary" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-border text-secondary" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-border text-success" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-border text-danger" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-border text-warning" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-border text-info" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-border text-light" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-border text-dark" role="status">
  <span class="sr-only">Loading...</span>
</div><br><div class="card card-body bg-dark text-white">
<p>&lt;div class=&quot;spinner-border text-primary&quot; role=&quot;status&quot;&gt; </p>
<p class='tab1'>&lt;span class=&quot;sr-only&quot;&gt;Loading...&lt;/span&gt; </p>
<p>&lt;/div&gt;</p>
</div><br><br>`);

        p1.Row.add('L1');
        p1.Row.Col.add('t2');     
        var t1h=p1.selectCol('t1').html();   
        p1.selectCol('t2').html(t1h);
        
        
        server.sendPage(p1);        
    });


}

module.exports=CreateHelper;

