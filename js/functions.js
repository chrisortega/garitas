$(function() {
  getData(2504)
  $(".ports").click(function(){
    getData(this.id)
  })
});


function getData(portnumber){
  
var baseUrl = "http://apps.cbp.gov/bwt/mobile.asp?action=n&pn="+portnumber;
	var ports
    $.ajax({
        url: baseUrl,
        type: "get",
        dataType: "",
        success: function(data) {
          


          $heads = $(data.responseText).find(".contain_head")
          ports = getPorts($heads)
          
          var waitsa = []
          var pwaitsa = []
          var superdata = []
          var x=0;
          
           var out=[];
          $details = $(data.responseText).find(".pass_details")

          $ped_details = $(data.responseText).find(".ped_details")




               $.each($details,function(){                  
                  $em =  $(this).find("p").text()  
                  var name =  $(this).find("strong").text()
                  var arr = $em.split("\n") 
                  var arc = jQuery.grep(arr, function(n, i){
                      n = $.trim(n)
                      return (n !== "" && n != null);
                  }); 
                  var maxlines = arc[0];
                  var waits = [];                                       
                  for (var i = 1; i <= arc.length-1; i++) {                          
                    if (arc[i] == "" || arc[i]==undefined || arc[i] == null || arc[i].indexOf("N/A") >=0 ){
                    }else{
                      waits.push(createWaitObject(arc[i]))  
                    }
                  };                      
                waits['cross'] = name 
                waitsa.push(waits)  
                                                                           
              })



              $.each($ped_details,function(){ 
                $pem =  $(this).find("p").text()
                var name =  $(this).find("strong").text()
                
                var parr = $pem.split("\n")

                var parc = jQuery.grep(parr, function(n, i){
                       n = $.trim(n)
                        return (n !== "" && n != null);
                      });                
                var pwaits = [];

                for (var i = 1; i <= parc.length-1; i++) {                          
                    if (parc[i] == "" || parc[i]==undefined || parc[i] == null || parc[i].indexOf("N/A") >=0 ){
                    }else{
                      pwaits.push(createWaitObject(parc[i]))  
                    }
                };
                pwaits["cross"] = name
                pwaitsa.push(pwaits)
                
              })



               
              for (var i = 0; i <= ports.length; i++) {  

                if (waitsa[i]!=undefined){
                  var garita = []
                  garita["port"]  = ports[i]                       
                  garita["data"] = waitsa[i] 
                  garita["pdata"] = pwaitsa[i]                  

                  
                  if (waitsa[i].length > 0){                  
                   out.push(garita) 
                  }

                  
                }
              };
              

              printToPanel("main",out)



        }});

}

function createWaitObject(string){
  var obj =  string.split(",");
  var garita = {
    "name":obj[0],
    "wait" :obj[1],
    "lines":obj[2]
};

return garita;
}

function printToPanel(div,info){
  var titles = "";
  var tmp = "";
 
  for (var i = 0; i <= info.length; i++) {
    if (info[i]!=undefined){
      tmp = info[i].port

      titles = titles + '<k class="garita">'+ tmp + '</k>';       


      
      titles = titles + "<br>"+processData(info[i].data) 

      
      titles = titles + "<br>"+processData(info[i].pdata)
    }
  };
  $("#content").html(titles);  
}

function processData(data){
  var out='<b  class="cross ui-btn">'+ data['cross'] + '</b>';;
  var cl="OK"
  for (var i = data.length - 1; i >= 0; i--) {
    var update = proccesUpdate(data[i].name)

    cl = thresholds(data[i].wait)
    out = out + '<hr><k class="subport">'+proccesName(data[i].name)+'</k>';
    
    if (update!="Lanes Closed"){
      out = out + '<k class="time '+cl+'">'+data[i].wait+'</k>';
      out = out + "<em>"+data[i].lines+"</em>";
    }else{
      out = out + '<k class="time CRITICAL">'+update+'</k>';
      out = out + "<em>"+update+"</em>";
    }
    
    out = out + "<br><br>"
  };
  return out
}

function proccesName(name){
var tmp = name.split(":");
var n = $.trim(tmp[0])
return n
}


function proccesUpdate(name){

var tmp = name.split(":");
if ($.trim(tmp[1]) == "Lanes Closed"){return $.trim(tmp[1])}
var n = $.trim(tmp[1]+":"+tmp[2])
return n
}

function proccesTime(time){

}

function getPorts(heads){
          var ports = [];
          $.each($heads,function(){              
              ports.push($(this).find("strong").text())
          })
          //console.log(ports)
          return ports
}

function thresholds(time){
  if (time=="no delay"  ) {return "OK";}  
  if (time==undefined ) {return "CRITICAL";}
  var tm = time.split(" ");
  tm = tm.filter(function(n){ return (n !== "" && n != null) });
  var wait = tm[0];
  var scale = tm[1];
  switch (scale) {
    case "min":
      if (wait > 30 ) {
        return "WARNING";
      }
      return "OK";
    break;
    case "hr":
    case "hrs":
      if (wait <= 1 ) {
        return "WARNING";
      }
      if (wait > 1 ) {
        return "CRITICAL";
      }
    break;
  }
  return "OK"
}


