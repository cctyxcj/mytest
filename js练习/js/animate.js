function animate(element, target) {
    //通过判断，保证该属性只有一个动画
    if (element.timerId) {
        clearInterval(element.timerId);
        timerId = null;
    }
    //给属性添加定时任务
    element.timerId = setInterval(function () {
        //步进 每次移动的距离
        var step = 10;
        //盒子当前的位置
        var current = element.offsetLeft;
        //判断如果当前位置>目标位置  此时的step要小于0
        if (current > target) {
            step = -Math.abs(step);
        }
        //保证移动距离超出后返回到目标位置
        if (Math.abs(current - target) < Math.abs(step)) {
            clearInterval(element.timerId);
            element.style.left = target + 'px';
            return;
        }
        //移动
        current +=step;
        element.style.left = current+ "px";
    }, 15)
}