function animate(element , target){

        clearInterval(element.timeId);
    
    element.timeId = setInterval(function (){
        var temp = 10;

        var x = element.offsetLeft ;

        if(x > target){
            temp = -temp;
        }
        if(Math.abs(x-target) < Math.abs(temp)){
            element.style.left = target+"px";
            clearInterval(element.timeId);
            return;
        }
        x += temp;
        element.style.left = x + "px";
    },10)
}