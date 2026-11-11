const CACHE='e34-service-book-v15';
const VIDEO_PATH='/media/1988-bmw-5-series-tv-commercial.mp4';
const ASSETS=['./','./index.html','./styles.css','./app.js','./fluids-data.js','./torques.js','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png','./e34-generic.jpg','./media/1988-bmw-5-series-tv-commercial.mp4'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key))))));

async function respondWithVideo(request){
  const cache=await caches.open(CACHE);
  const cached=await cache.match(new Request(request.url));
  if(cached){
    const range=request.headers.get('range');
    if(!range)return cached;
    const match=/^bytes=(\d*)-(\d*)$/.exec(range.trim());
    const blob=await cached.blob();
    const size=blob.size;
    if(!match||(!match[1]&&!match[2]))return new Response(null,{status:416,headers:{'Content-Range':`bytes */${size}`}});
    const start=match[1]?Number(match[1]):Math.max(size-Number(match[2]),0);
    const end=match[1]&&match[2]?Math.min(Number(match[2]),size-1):size-1;
    if(start>end||start>=size)return new Response(null,{status:416,headers:{'Content-Range':`bytes */${size}`}});
    const headers=new Headers(cached.headers);
    headers.set('Accept-Ranges','bytes');
    headers.set('Content-Range',`bytes ${start}-${end}/${size}`);
    headers.set('Content-Length',String(end-start+1));
    headers.delete('Content-Encoding');
    return new Response(blob.slice(start,end+1),{status:206,statusText:'Partial Content',headers});
  }
  return fetch(request);
}

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  if(new URL(event.request.url).pathname.endsWith(VIDEO_PATH)){
    event.respondWith(respondWithVideo(event.request));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{
    if(response.ok&&response.status!==206)caches.open(CACHE).then(cache=>cache.put(event.request,response.clone()));
    return response;
  }).catch(()=>caches.match('./index.html'))));
});
