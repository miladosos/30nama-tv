const p=require('puppeteer-core');
(async()=>{
const b=await p.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,defaultViewport:{width:1920,height:1080,deviceScaleFactor:1},userDataDir:'./profile2',args:['--force-device-scale-factor=1','--autoplay-policy=no-user-gesture-required']});
const pg=await b.newPage();
const c=await pg.createCDPSession();
await pg.goto('http://localhost:8080/',{waitUntil:'domcontentloaded'});
await pg.evaluate(l=>{localStorage.setItem('n30.guest','true');localStorage.setItem('n30.lang',JSON.stringify(l));},process.env.UI_LANG||'fa');
await pg.reload({waitUntil:'domcontentloaded'});
await new Promise(r=>setTimeout(r,8000));
console.log(await pg.evaluate(()=>document.body.innerText.slice(0,80)));
// virtual time test
await pg.evaluate(()=>{window.__t=[];});
await c.send('Emulation.setVirtualTimePolicy',{policy:'pauseIfNetworkFetchesPending',budget:0});
let t0=Date.now();
for(let i=0;i<10;i++){
 const done=new Promise(r=>c.once('Emulation.virtualTimeBudgetExpired',r));
 await c.send('Emulation.setVirtualTimePolicy',{policy:'pauseIfNetworkFetchesPending',budget:33.333});
 await done;
 const v=await pg.evaluate(()=>[performance.now(),document.timeline.currentTime]);
 console.log(i,v.map(x=>x.toFixed(1)).join(' '));
 await c.send('Page.captureScreenshot',{format:'jpeg',quality:95});
}
console.log('real',Date.now()-t0);
await b.close();})();
