const p=require('puppeteer-core');
const fs=require('fs');
const KEYS={Up:38,Down:40,Left:37,Right:39,Enter:13,Back:27};
exports.run=async function(tour,{dry,outDir,warm}){
 const b=await p.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,defaultViewport:{width:1920,height:1080,deviceScaleFactor:1},userDataDir:'./profile2',args:['--force-device-scale-factor=1','--autoplay-policy=no-user-gesture-required']});
 const pg=await b.newPage(); const c=await pg.createCDPSession();
 await pg.goto('http://localhost:8080/',{waitUntil:'domcontentloaded'});
 await pg.evaluate(l=>{localStorage.setItem('n30.guest','true');localStorage.setItem('n30.lang',JSON.stringify(l));},process.env.UI_LANG||'fa');
 await pg.reload({waitUntil:'domcontentloaded'});
 let n=0, frame=0, FR=1000/30;
 if(outDir){fs.rmSync(outDir,{recursive:true,force:true});fs.mkdirSync(outDir,{recursive:true});}
 const ctx={
  pg, log:(...a)=>console.log(`[f${frame} ${(frame*FR/1000).toFixed(1)}s]`,...a),
  async real(ms){await new Promise(r=>setTimeout(r,ms));},
  async focus(){return pg.evaluate(()=>{const e=N.nav.cur;if(!e)return null;const c=e.closest('.card')||e;return (e.className+' | '+(c._post&&(c._post.title&&(c._post.title.english||c._post.title)))+' | '+(e.textContent||'').slice(0,30)).replace(/\s+/g,' ');});},
  async wait(ms){ // advance virtual time, capturing frames
   const frames=Math.round(ms/FR);
   for(let i=0;i<frames;i++){
    const done=new Promise(r=>c.once('Emulation.virtualTimeBudgetExpired',r));
    await c.send('Emulation.setVirtualTimePolicy',{policy:'pauseIfNetworkFetchesPending',budget:FR});
    await done;
    if(outDir&&!dry&&ctx.rec){
      const s=await c.send('Page.captureScreenshot',{format:'jpeg',quality:96,optimizeForSpeed:true});
      fs.writeFileSync(`${outDir}/f${String(n++).padStart(5,'0')}.jpg`,Buffer.from(s.data,'base64'));
    }
    frame++;
   }
  },
  async key(k,after=700){
   const vk=KEYS[k];
   await c.send('Input.dispatchKeyEvent',{type:'rawKeyDown',windowsVirtualKeyCode:vk,key:k});
   await c.send('Input.dispatchKeyEvent',{type:'keyUp',windowsVirtualKeyCode:vk,key:k});
   await ctx.wait(after);
  },
  async type(s,gap=170){for(const ch of s){await c.send('Input.dispatchKeyEvent',{type:'keyDown',key:ch,text:ch,unmodifiedText:ch,windowsVirtualKeyCode:ch.toUpperCase().charCodeAt(0)});await c.send('Input.dispatchKeyEvent',{type:'keyUp',key:ch,windowsVirtualKeyCode:ch.toUpperCase().charCodeAt(0)});await ctx.wait(gap);}},
  async startVT(){await c.send('Emulation.setVirtualTimePolicy',{policy:'pause'});},
  async reload(){await pg.reload({waitUntil:'domcontentloaded'});},
  get frames(){return n;}
 };
 try{await tour(ctx);}finally{await b.close();}
};
