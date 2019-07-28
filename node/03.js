/*
    目录操作
    1、创建目录
    fs.mkdir(path[,mode],callback) 异步
    fs.mkdirSync(path[,mode])   同步
    2、读取目录
    fs.readdir(path[,options],callback)
    fs.readdirSync(path[,options])
    3、删除目录
    fs.rmdir(path[,options],callback)
*/
//路径
const path = require('path');
//文件
const fs = require('fs');


//创建目录 __dirname=当前路径 ..上一级
// fs.mkdir(path.join(__dirname,'adb'),(err)=>{
//     console.log(err);
// });
//fs.mkdirSync(path.join(__dirname,'hellow'))



//////读取文件
//推荐
fs.readdir(path.join(__dirname),(err,files)=>{
    files.forEach((item,index)=>{
        fs.stat(path.join(__dirname,item),(err,stat)=>{
            if(stat.isFile()){
                console.log(item,'文件');
                if(item =='score.json'){
                    fs.readFile(item,'utf-8',(err,data)=>{
                        console.log(data);
                    })
                }
                
            }else if(stat.isDirectory()){
                console.log(item,'目录');
                
            }
        })
    })
})

// let file = fs.readdirSync(path.join(__dirname));
// files.forEach((item,index)=>{
//     fs.stat(path.join(__dirname,item),(err,stat)=>{
//         if(stat.isFile()){
//             console.log(item,'文件',content);
//         }else if(stat.isDirectory()){
//             console.log(item,'目录');
            
//         }
//     })
// })



///////删除文件
// fs.rmdir(path.join(__dirname,'hellow'),(err)=>{
//     console.log(err);
    
// })
// fs.rmdirSync(path.join(__dirname,'adb'))