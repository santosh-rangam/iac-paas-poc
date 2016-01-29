$(document).ready(function()
{
	$(".container").hide(); 
     $(".Circular").show();

     $('.Circular').click(function(){
	 
         $(".Circular").fadeOut();
		 $(".container").show(); 
     });
	 
	 $(document).ready(function(){
  $(".dropdown-toggle").dropdown();
}); 

});

	function show(nr) {
	$(".example").hide(); 
		var x = $("#button"+nr).prop("id");
		//alert(x);
		//document.getElementById("circularTable").style.display="none";
		document.getElementById("image").style.display="none";
		var text = $(".button"+nr).html();
		//alert(text);
		//$(".list-group-item").style.width="350px";
		$("#internal").show();
		$("#internal").html(text);
		//$( "div:last" ).html( x );
	}
