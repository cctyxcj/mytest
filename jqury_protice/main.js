const $ = require('jquery');

$(function(){
    $("#run").click(function(){
$("div:not(:animated)").stop(2000).animate({ left: "+=20" }, 1000);
});
});