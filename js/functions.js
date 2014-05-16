function getData(){

  
var baseUrl = "http://apps.cbp.gov/bwt/mobile.asp?action=n&pn=2506";
	
    $.ajax({
        url: baseUrl,
        type: "get",
        dataType: "",
        success: function(data) {
          


          $heads = $(data.responseText).find(".contain_head")
          getPorts($heads)
          $details = $(data.responseText).find(".pass_details")




              $.each($details,function(){    
                console.log(this)

              $em =  $(this).find("p").text()  
                console.log($em)
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

function getPorts(heads){
          var ports = [];
          $.each($heads,function(){              
              ports.push($(this).find("strong").text())
          })
          console.log(ports)
          return ports
}



