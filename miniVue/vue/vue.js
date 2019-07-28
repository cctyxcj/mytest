 class Vue {
     constructor(option={}){
        this.$el = option.el;
        this.$data = option.data;
        this.$methed = option.metheds;

        new Observer(this.$data)
        //把vm中的$data和$methed中的属性挂载到vm身上
        this.proxy(this.$data)
        this.proxy(this.$methed)

        if(this.$el){
            //创建一个模版
            new Compile(this.$el,this)
        }
     }
     //代理方法   把vm上的$data属性挂载到vm身上
     proxy(data){
         Object.keys(data).forEach(key=>{
             //defineProperty(1,2,3) 数据劫持 给1对象添加2属性的数据劫持 3为对象
             Object.defineProperty(this,key,{
                 //可枚举
                 enumerable:true,
                 //可配置
                 configurable:true,
                 //获取数据是劫持
                 get(){
                     //$data例子
                     //当vm[key]时 返回vm.$data[key]
                     return data[key]
                 },
                 //设置数据时劫持
                 set(newValue){
                     if( data[key] == newValue){
                         return
                     }
                    data[key] = newValue
                 }
             })
         })
     }
 }