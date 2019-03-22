<!DOCTYPE html>
<html>
<head>
<title>Helper Page</title>
<!--- CSS START --->
  <link rel="stylesheet" href="./css/bootstrap.min.css" crossorigin="anonymous">
  <link rel="stylesheet" href="./css/solid.min.css" crossorigin="anonymous">
  <link rel="stylesheet" href="./css/fontawesome.min.css" crossorigin="anonymous">

<!--- CSS END --->
</head>
<body>
<div class='container'>
<!-- NO MENU -->
<!--- BODY START --->
 <div class="row" id="L1"  >
   <div class="col" id="t1"  >
    <br><div align=center><h2>Framework Helper</h2></div><br>
   </div>
 </div> <div class="row" id="srvcr"  >
   <div class="col" id="s1"  >
    <h5><u>Web Server Creation</u></h5>
        <p>var server = require("./server.js");</p>        
        <p>server.Create(80);</p>
        <p>server.Start();</p>
   </div>
 </div> <div class="row" id="pgshw"  >
   <div class="col" id="p1"  >
    <h5><u>Web Page Creation</u></h5>
        <p>var pagesModule = require("./pagesmodule.js");</p>        
        <p>server.onGet('/page.html',function(){</p>
        <p class='tab1'>    var p1=new pagesModule();</p>
        <p class='tab1'>    p1.title='Title';</p>
        <p class='tab1'>    p1.Compactar(false);  <i class='coment'>//compress html code default=false</i></p>
        <p class='tab1'>    p1.Coments(true);  <i class='coment'>//show coments on html code default=true</i></p>
        <p class='tab1'>    p1.Row.add('line1');    <i class='coment'>//add horizontal row</i></p>
        <p class='tab1'>    p1.Row.Col.add('cel1'); <i class='coment'>//add col on row</i></p>
        <p class='tab1'>    p1.selectCol('cel1').html('text html'); <i class='coment'>//add html to col</i></p>
        <p class='tab1'>    server.sendPage(p1); <i class='coment'> //render page</i></p>
        <p class='coment'><i>//server.sendHtml('custom html');</i></p>
        <p>});</p>
   </div>
 </div> <div class="row" id="mmshw"  >
   <div class="col" id="m1"  >
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
        <p>p1.Menu.add('YSub2','#','XSub3');</p>
   </div>
 </div> <div class="row" id="pgstl"  >
   <div class="col" id="s1"  >
    <h5><u>Web Page CSS</u></h5>
        <p>var p1=new pagesModule();</p>        
        <p>p1.style={</p>
        <p class='tab1'>'body':{</p>
        <p class='tab2'>"background-color":"#ccc"</p>
        <p class='tab1'>}</p>
        <p>}</p>
   </div>
 </div> <div class="row" id="jevents"  >
   <div class="col" id="j1"  >
    <h5><u>Script Events</u></h5>
        <p><i class='coment'>//page.onAction(action,object,function);</i></p>
        <p>p1.Row.Col.add('col1');</p>
        <p>p1.selectCol('col1').html('Click Me');</p>
        <p>p1.onAction('click','col1',function(){ </p>   
        <p class='tab1'>$('#col1').html('Clicked');</p>
        <p>});</p>
        <p><a href='./?eventscript'>List of Events</a>
   </div>
 </div>
<!--- BODY END --->
</div>
</body>
  
</html>