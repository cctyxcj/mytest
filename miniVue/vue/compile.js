
class Compile {
    constructor(el,vm){
        
      this.el = typeof el ==='string' ? document.querySelector(el) :el;
      this.vm = vm;
      if(this.el){
          let fragment = this.node2fragment(this.el)
            this.compile(fragment);
            //把数据处理完毕后放回el元素上
            this.el.appendChild(fragment);
      }

    }
    // 核心方法
    //把dom的元素放到fragment上进行处理
    node2fragment (node){
        //fragment是dom上的元素当不在dom树下 在内存中 减少渲染时间 提高效率
        let fragment = document.createDocumentFragment();
        let childNodes= node.childNodes;
        this.toArray(childNodes).forEach(node=>{
            fragment.appendChild(node);
            
        })
        return fragment
    }
    //渲染dom元素中的标签或者{{}}
    compile(node){
        //获取dom元素的所有子类
        let nodeChile = node.childNodes;
        //遍历判断是元素节点还是文本节点
        this.toArray(nodeChile).forEach(node=>{
            //元素节点处理
            if(this.isElement(node)){
                this.compileElement(node)
            }
            //文本节点处理
            if(this.isTextNode(node)){
                this.compileText(node)
            }
            //判断标签里是否有子元素  有的话递归调用
            if(node.childNodes && node.childNodes.length>0){
                this.compile(node)
            }
        })
    }
    //解析元素节点
    compileElement(node){
        // console.log(node);
        //1.获取当前节点的所有属性
        let attributes = node.attributes
        this.toArray(attributes).forEach(attr=>{
            //获取标签上的属性
            let attrName = attr.name;
            //判断是不是指令
            if(this.isDirective(attrName)){
                //截取v-后面的内容
                let type = attrName.slice(2);
                //获取标签上的内容  ===vm.$data上的属性
                let attrValue = attr.value;
                // //解析v-text
                // if(type == "text"){
                //     CompileUtil['text'](node,this.vm,attrValue)
                // }
                // //解析v-html
                // if(type == "html"){
                //     node.innerHTML = this.vm.$data[attrValue];
                // }
                // //解析v-model
                // if(type == "model"){
                //     node.value = this.vm.$data[attrValue];
                // }

                //解析v-on
                if(this.isEventEle(type)){
                    CompileUtil['eventHandler'](node,this.vm,type,attrValue)
                }else{
                    //有指令就处理  没有就短路 自行判断是哪个指令去执行相应的渲染/赋值
                    CompileUtil[type] && CompileUtil[type](node,this.vm,attrValue)
                }
            }
        })
        
        //2.
    }
    // 解析文本节点
    compileText(node){
       // console.log('解析文本节点');
    //    let txt = node.textContent
    //    let reg = /\{\{(.+?)\}\}/g
    //    if(reg.test(txt)){
    //        let expr= RegExp.$1
    //        console.dir(RegExp);
           
    //        console.log(expr);
    //        node.textContent =txt.replace(reg,CompileUtil.getVMValue(this.vm,expr))
    //    }
    CompileUtil.mustache(node,this.vm)
    }
    // 工具方法
    toArray(likeArray){
        return [].slice.call(likeArray);
    }
    isElement(el){
        // nodeType: 节点的类型 1:元素节点 3:文本节点
        return el.nodeType ===1 ;
    }
    isTextNode (el){
        return el.nodeType ===3 ;
    }
    //是否指令
    isDirective(attrName){
        return attrName.startsWith('v-');
    }
    isEventEle(type){
        return type.split(":")[0] === "on";
    }
}

//处理指令
let CompileUtil = {

    //胡子函数 文本类型中{{}}进行替换内容
    mustache(node,vm){
        let txt = node.textContent
        let reg = /\{\{(.+?)\}\}/g
        if(reg.test(txt)){
            let expr= RegExp.$1
            // console.dir(RegExp);
            
            // console.log(expr);
            node.textContent =txt.replace(reg,CompileUtil.getVMValue(vm,expr))

            new Watch(vm,expr,newValue=>{
                node.textContent = txt.replace(reg,newValue);
            })
        }
    },
    text(node,vm,attrValue){
        //node.textContent = vm.$data[attrValue];
        node.textContent = this.getVMValue(vm,attrValue)

        new Watch(vm,attrValue,newValue=>{
            node.textContent = newValue;
        })
    },
    html(node,vm,attrValue){
        //node.innerHTML = vm.$data[attrValue];
        node.innerHTML = this.getVMValue(vm,attrValue)

        new Watch(vm,attrValue,newValue=>{
            node.innerHTML = newValue;
        })
    },
    model(node,vm,attrValue){
        let self =this
        //node.value = vm.$data[attrValue];
        node.value = this.getVMValue(vm,attrValue)
        //双向数据绑定  当input数据发生变话  改变vm.data中的值
        node.addEventListener("input",function(){
            self.setVMValue(vm,attrValue,this.value)
        })
        new Watch(vm,attrValue,newValue=>{
            node.value = newValue;
        })
    },
    eventHandler(node,vm,type,attrValue){
        let eventName = type.split(":")[1];
        let fn = vm.$methed && vm.$methed[attrValue]
        if(eventName && fn){

            node.addEventListener(eventName,vm.$methed[attrValue].bind(vm))
        }
    },
    // 可以把数据中类的属性遍历到值中
    getVMValue(vm,expr){
        let data = vm.$data;
        expr.split(".").forEach(item=>{
            
            data = data[item];
           // console.log(data);
        })
        return data;
    },
    setVMValue(vm,expr,value){
        let data = vm.$data
        let arr = expr.split(".")
        arr.forEach((key,index)=>{
            // console.log(key);
            // console.log(value);
            // console.log(data);
            // debugger
            if(index<arr.length-1){
                data=data[key]
            }else{
                data[key] = value
                
            }
        })
    }
}