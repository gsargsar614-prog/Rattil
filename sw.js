self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('push',e=>{
  let d={};try{d=e.data.json()}catch(x){d={title:'أكاديمية رتل',body:e.data?e.data.text():''}}
  e.waitUntil(self.registration.showNotification(d.title||'أكاديمية رتل',{body:d.body||'',tag:d.tag,dir:'rtl',lang:'ar',data:{url:d.url||'./'}}))});
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  const url=new URL((e.notification.data&&e.notification.data.url)||'./',self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{for(const c of l){if('focus' in c)return c.focus()}return self.clients.openWindow(url)}))});
