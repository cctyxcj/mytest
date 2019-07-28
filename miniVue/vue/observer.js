
//数据劫持
class Observer {
    constructor(data){
        this.data=data
        this.walk(data)
    }

    walk(data){
        if(!data || typeof data != "object"){
            return
        }
        // console.log(data);
        // console.log(Object.keys(data));
        // //遍历data中的key值
        Object.keys(data).forEach(key=>{
            this.defineReactive(data,key,data[key])
            this.walk(data[key])
        })
    }
    //给元素中的key绑定数据劫持
    defineReactive(obj,key,value){
        let that = this;
        //一个key对应一个订阅者数组
        let dep = new Dep()
        Object.defineProperty(obj,key,{
            enmuerable:true,
            configurable:true,
            get(){
                //console.log("获取了值"+value);
                // 如果Dep.target中有watcher对象,存储到订阅数组中
                Dep.target && dep.addSub(Dep.target)
                return value
            },
            set(newValue){
                if(value === newValue){
                    return
                }
                //console.log("设置了值",newValue);
                value = newValue;
                that.walk(newValue)
                // debugger
                dep.notify();
            }
        })
    }
}