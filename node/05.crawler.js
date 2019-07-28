var Crawler = require("crawler");
const fs =require('fs')
let root ='firebleam';
let fname ='hero.json'
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
           $('.tablesorter tbody tr').each((index,ele)=>{
                var hname =$(ele).find('td').eq(0).text().trim()
                var himg =$(ele).find('td').eq(0).find('img').attr('src')
               var  hp =$(ele).find('td').eq(2).text().trim()
               var at = $(ele).find('td').eq(3).text().trim()
               var sp = $(ele).find('td').eq(4).text().trim()
               var dp = $(ele).find('td').eq(5).text().trim()
               var dh = $(ele).find('td').eq(6).text().trim()
               var hero ={
                   hname,
                   himg,
                   hp,
                   at,
                   sp,
                   dp,
                   dh
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
c.queue('https://game8.jp/fe-heroes/253181');