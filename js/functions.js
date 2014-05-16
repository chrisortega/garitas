function getData(){

  
var baseUrl = "http://apps.cbp.gov/bwt/mobile.asp?action=n&pn=2504";
	
    $.ajax({
        url: baseUrl,
        type: "get",
        dataType: "",
        success: function(data) {
          


          $heads = $(data.responseText).find(".contain_head")
          var ports = getPorts($heads)
          var x=0;
          $details = $(data.responseText).find(".pass_details")




              $.each($details,function(){    
                console.log(ports[x])

              $em =  $(this).find("p").text()  
                var arr = $em.split("\n") 

                var arc = jQuery.grep(arr, function(n, i){
                                    n = $.trim(n)
                                    return (n !== "" && n != null);
                    }); 


                var maxlines = arc[0];
                for (var i = 1; i <= arc.length-1; i++) {
                        
                        console.log(createWaitObject(arc[i]) )
                };                
              
                  x++
          })





  			
        	
        	/*

            $.each($foop.find('table'), function(idx, item) {
            	var table = $(item).tableToJSON();
                console.log(table)
                /*$("#div_si").html(item)
                
            })

        	/*$foop = $('<form>' + data.responseText + '</form>');*/
        		/*$("#div_si").html(data.responseText)*/
        }});

}

function createWaitObject(string){
  var obj =  string.split(",");
  var garita = {
    "times":'"'+obj[0]+'"',
    "waits" :'"'+obj[1]+'"',
    "lines":'"'+obj[2]+'"'
};

return garita;
}

function getPorts(heads){
          var ports = [];
          $.each($heads,function(){              
              ports.push($(this).find("strong").text())
          })
          //console.log(ports)
          return ports
}



