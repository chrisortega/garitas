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
          var x=0;
          
           var out=[];
          $details = $(data.responseText).find(".pass_details")




              $.each($details,function(){    
                

              $em =  $(this).find("p").text()  
                var arr = $em.split("\n") 

                var arc = jQuery.grep(arr, function(n, i){
                                    n = $.trim(n)
                                    return (n !== "" && n != null);
                    }); 


                var maxlines = arc[0];
                var waits = [];     
                  
                
                for (var i = 1; i <= arc.length-1; i++) {  
                        

                        if (arc[i] == "" || arc[i]==undefined || arc[i] == null || arc[i].indexOf("N/A") >=0 ){}else{
                          waits.push(createWaitObject(arc[i]))  
                      }

                };      

                
                  waitsa.push(waits)                  
                
                                
          })

               
              for (var i = 0; i <= ports.length; i++) {  

                if (waitsa[i]!=undefined){
                  var garita = []

                  garita["port"]  = ports[i]                       
                  garita["data"] = waitsa[i] 
                  
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
    }
  };
  

  $("#content").html(titles);
  
}

function processData(data){
  var out="";
  var cl="OK"
  for (var i = data.length - 1; i >= 0; i--) {
    cl = thresholds(data[i].wait)
    out = out + '<hr><k class="subport">'+data[i].name+'</k>';
    out = out + '<k class="time '+cl+'">'+data[i].wait+'</k>';
    out = out + "<em>"+data[i].lines+"</em>";
    out = out + "<br><br>"
  };
  return out
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
  if (time=="no delay") {return "OK";}  
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


