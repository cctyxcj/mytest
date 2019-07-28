//轮播图
var lubo = document.getElementsByClassName('lubo')[0];
var left = document.getElementsByClassName('left')[0]; 
var right = document.getElementsByClassName('right')[0]; 

var ul = lubo.children[0];
var li = ul.children;
var liw = li[0].offsetWidth;
var index = 0;
var oli = lubo.children[3].children;


left.onclick = next;
function next(){   
    index++; 
    if(index == 1){
        index = -6;
        ul.style.left = -7*liw + "px"; 
    }
    animate(ul,liw*index);
    for (let i = 0; i < oli.length; i++) {
        oli[i].classList.remove('cur');
    }
        oli[-index].classList.add('cur');
    
}
right.onclick =  function (){
    index--;
    if(index == -8){
        index = -1;
        ul.style.left = 0; 
    }
    animate(ul,liw*index);  
    for (let i = 0; i < oli.length; i++) {
        oli[i].classList.remove('cur');
    }
    if(-index == 7){
        oli[0].classList.add('cur');
    }else{
        oli[-index].classList.add('cur');
    }
}
var timeI = setInterval(function(){
    right.click();
},4000)

lubo.onmouseover = function (){
    clearInterval(timeI);
}
lubo.onmouseout = function (){
    timeI = setInterval(function(){
        right.click();
    },4000)
}
for(var i = 0;i<oli.length;i++){
    oli[i].setAttribute('i',i);
    oli[i].onclick = function(){
        index =  -this.getAttribute('i');
        animate(ul,index*liw);
        for (let i = 0; i < oli.length; i++) {
            oli[i].classList.remove('cur');
        }
        this.classList.add('cur');
    }
}

//返回头部
var ft = document.getElementsByClassName('flexbar')[0].children[4];
window.onscroll = function() {
    if(window.scrollY > document.body.scrollTop+ window.innerHeight){
        ft.style.display = "block";
    }else{
        ft.style.display = "none";
    }
}

ft.onclick = function (){
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    
}


//变回图片
var houI = document.getElementsByClassName('huo_img')[0];
var hr = document.getElementsByClassName('huo_r')[0].getElementsByTagName('li');
var hl = document.getElementsByClassName('huo_l')[0].getElementsByTagName('li');
var rr =document.getElementsByClassName('rr')[0]
var lr =document.getElementsByClassName('lr')[0]
console.log(hr,hl);
for(var i = 0; i<hr.length;i++){
    hr[i].onmouseover = function(){
        var img= this.getAttribute('img');
        houI.src = img;
        for (let j = 0; j < hl.length; j++) {
            hl[j].classList.remove('posl');
            hr[j].classList.remove('posl');
        }
        this.classList.add('posl');
        lr.style.display = 'none';
        rr.style.display = 'block';
        rr.style.top = this.getAttribute('po');
    }
    hl[i].onmouseover = function(){
        var img= this.getAttribute('img');
        houI.src = img;
        for (let j = 0; j < hl.length; j++) {
            hl[j].classList.remove('posl');
            hr[j].classList.remove('posl');
        }
        this.classList.add('posl');
        lr.style.display = 'block';
        rr.style.display = 'none';
        lr.style.top = this.getAttribute('po');
    }
}

//扩大内容
//parentNode
var jt = document.getElementsByClassName('jt')[0];
var index = 0;
var flag =true;
jt.onclick = function(){
    if(flag){
        flag = false;
        jt.parentNode.style.height = jt.parentNode.offsetHeight +187 +  'px';
        jt.children[0].children[0].src = 'images/salaryup.png';
        jt.parentNode.children[2].style.height = jt.parentNode.children[2].offsetHeight + 187 + 'px';
        console.log(jt.parentNode.children[2].offsetHeight);
        jt.style.top = jt.offsetTop + 187 + 'px';
    }else{
        flag = true;
        jt.parentNode.style.height = jt.parentNode.offsetHeight - 187 +  'px';
        jt.children[0].children[0].src = 'images/salarydown.png';
        index --;
        jt.parentNode.children[2].style.height = jt.parentNode.children[2].offsetHeight - 190 + index + 'px';
        jt.style.top = jt.offsetTop - 187 + 'px';
    }
    
}

//显示内容
var redul = document.getElementsByClassName('redbar')[0];
var redli = document.getElementsByClassName('redbar')[0].getElementsByTagName('li');
var redc = document.getElementsByClassName('redbar_c')[0];
// redul.onmouseover = function(e){
//     redc.style.display = "block";
//     redc.innerHTML = e.target.innerText;
// }
// redul.onmouseout = function(){
//     redc.style.display = "none";
// }
for(var i = 0 ;i< redli.length ; i++){
    redli[i].onmouseover = function(){
        redc.style.display = "block";
        redc.innerHTML = this.innerText;
    }
    redli[i].onmouseout = function(){
        redc.style.display = "none";
    }
}