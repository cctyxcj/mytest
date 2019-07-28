 //在模版渲染和数据劫持中添加联系
 class Watch {
     //expr:对象属性名
     //cb:一旦发生数据变化,就调用cb
     constructor(vm,expr,cb){
         //当前vm实例
        this.vm=vm;
        //类的属性
        this.expr=expr
        //回调函数
        this.cb=cb;
        //在绑定数据时 把watch传过去  
        Dep.target = this
        //在取值时会通过数据劫持 再把对应的key watch添加到订阅者数组中
        this.oldValue = this.getVMValue(vm,expr);

        Dep.target = null;
     }
     //更新新数据
     update(){
         let oldValue=this.oldValue;
         let newValue = this.getVMValue(this.vm,this.expr)
         if(oldValue!=newValue){
             this.cb(newValue,oldValue)
         }
     }

     //获取复杂类型数据
     getVMValue(vm,expr){
        let data = vm.$data;
        expr.split(".").forEach(item=>{
            
            data = data[item];
           // console.log(data);
        })
        return data;
    }
 }
//依赖  订阅者模式
 class Dep{
     constructor(){
         //存放Watch对象  方便发布
         this.subs=[]
     }
     //添加订阅者
     addSub(watcher){
        this.subs.push(watcher)
     }
     //通知
     notify(){
        this.subs.forEach(sub=>{
            sub.update();
        }) 
     }
 }