/*
    动态网站开发
*/
const http =require('http');
const fs =require('fs');
const path =require('path');
const scoreData = require('./score.json');
const querystring = require('querystring');

http.createServer((req,res)=>{
    // 查询入口地址 /query
    if(req.url.startsWith('/query')){
        fs.readFile(path.join(__dirname,'view','index.html'),'utf-8',(err,content)=>{
            if(err){
                // res.writeHead(500,{
                //     'Content_Type':'text/plain;charset=utf8'
                // })
                res.end('服务器错误,请与管理员联系')
            }
            res.end(content)
        })
    }else if(req.url.startsWith('/score')){
        // 获取结果 /score
        // let pdata="";
        // req.on('data',(chunk)=>{
        //     pdata += chunk;
        //     console.log(chunk+"1");
            
        // });
        //req.on('end',()=>{
            var s = req.url.split('?')[1];
            let obj = querystring.parse(s);
            let result = scoreData[obj.code];
            // console.log(pdata+"2");
            fs.readFile(path.join(__dirname,'view','result.html'),'utf-8',(err,content)=>{
                if(err){
                    res.writeHead(500,{
                        'Content_Type':'text/plain;charset=utf8'
                    })
                    res.end('服务器错误,请与管理员联系')
                }
                // content = content.replace('$hp$','result.hp');
                //content = content.replace('$at$','result.at');
                // content = content.replace('$sp$',result.sp);
                // content = content.replace('$dp$',result.dp);
                // content = content.replace('$dh$',result.dh);
                
                res.end(content+s)
            })
        //})
    }
}).listen(3001,()=>{
    console.log('running...');
    
})