var Crawler = require("crawler");
const fs =require('fs')
let root ='firebleam';
let fname ='leibie.json'
const path = require('path')

var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
           //console.log($("img").length);
           const harr=[];
           $('.archive-style-wrapper tr td').each((index,ele)=>{
                var hname =$(ele).text().trim()
                var himg =$(ele).find('img').attr('src')
               var hero ={
                   hname,
                   himg
               }
               harr.push(hero);
            
           })
           //console.log(harr);
           fs.writeFileSync(path.join(__dirname,root,fname),(err)=>{})
           fs.writeFile(path.join(__dirname,root,fname),JSON.stringify(harr),(err)=>{
               if(err){
                   console.log(err);
                   
               }else{
                   console.log('写入成功');
                   
               }
           })
           
        }
        done();
    }
});
 
// Queue just one URL, with default callback
c.queue('https://game8.jp/fe-heroes/120894');