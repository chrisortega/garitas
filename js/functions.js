function getData(){

  
var baseUrl = "http://www.frontera.info/Garitas/InfoGaritas.aspx";
	
    $.ajax({
        url: baseUrl,
        type: "get",
        dataType: "",
        success: function(data) {
        	var $foop;
        	$foop = $('<form>' + data.responseText + '</form>');

        	
			var tobject = $foop.find('table');
  			var table = html2json(tobject); // Convert the table into a javascript object
  			$("#main").html(table)
  			
        	
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


function html2json(tab) {

  
   var json = '{';
   var text = "";
   var otArr = [];
   var tbl2 =tab.each(function(i) {        
      x = $(this).children();


      
      var itArr = [];
      x.each(function() {
      	
       
         itArr.push('"' + $(this).html() + '"');
         text = $(this).html();

      });


      otArr.push('"' + i + '": [' + itArr.join(',') + ']');
   })
   json += otArr.join(",") + '}'

   var splited  = text.split("<tr>");
   for (var i = splited.length - 1; i >= 0; i--) {
     console.log(splited[i])
   };



   return text;
}
