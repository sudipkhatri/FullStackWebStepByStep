
//$("h1").css("color", "red");
$(".btn1").css("color", "blue");

$(".btn1").click(changecolor)

function changecolor(){
    $("h1").css("color", "purple")
}

$("input").keypress(function(event){
    var val = event.key;
    $("h1").html(val);
})
/*
add single class 
$("h1").addClass("bigtitle");

to add multi class
$("h1").addClass("bigtitle bigTitle2");

*/
/*
Two wats to get inside element or change element 
$("h1").html('hello world')
$("h1").text('hello world')

*/
