const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'public');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.txt':'text/plain; charset=utf-8','.svg':'image/svg+xml','.mp3':'audio/mpeg'};
const server=http.createServer((req,res)=>{
 let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400);res.end();return;}
 const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
 if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
 fs.readFile(file,(err,data)=>{
  if(err){res.writeHead(404);res.end('No encontrado');return;}
  const headers={'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store','Accept-Ranges':'bytes','Content-Length':data.length};
  let start=0,end=data.length-1,status=200;
  if(req.headers.range){
   const range=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
   if(!range||!range[1]&&!range[2]){res.writeHead(416,{'Content-Range':`bytes */${data.length}`});res.end();return;}
   if(range[1]){start=Number(range[1]);if(range[2])end=Math.min(Number(range[2]),end);}else start=Math.max(0,data.length-Number(range[2]));
   if(start>end||start>=data.length){res.writeHead(416,{'Content-Range':`bytes */${data.length}`});res.end();return;}
   status=206;headers['Content-Range']=`bytes ${start}-${end}/${data.length}`;headers['Content-Length']=end-start+1;
  }
  res.writeHead(status,headers);res.end(req.method==='HEAD'?undefined:data.subarray(start,end+1));
 });
});
server.listen(Number(process.env.PORT)||4173,'127.0.0.1',()=>console.log(`Entre palabras: http://127.0.0.1:${server.address().port}`));
