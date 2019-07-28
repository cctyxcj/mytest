function animate(element,juli){
    clearInterval(element.time);
    var temp = 20;

    if(element.offsetLeft > juli){
        temp = -temp;
    }
    element.time = setInterval (function(){
        if(Math.abs(element.offsetLeft-juli) <= Math.abs(temp)){
            element.style.left = juli + "px";
            clearInterval(element.time);
            return;
        }
        element.style.left = temp + element.offsetLeft +"px";
    },5)
}