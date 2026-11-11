const KEY='e34-service-book-v1';
const initial={vehicle:{model:'BMW 520i E34',year:'1991',engine:'M50B20',power:'150 CV',km:''},services:[],reminders:[],favorites:[]};
let data=load();
let editingServiceId=null;
function load(){try{const saved=JSON.parse(localStorage.getItem(KEY)||localStorage.getItem('e34-service-book-v1')||'{}');return {...structuredClone(initial),...saved,favorites:Array.isArray(saved.favorites)?saved.favorites:[]}}catch{return structuredClone(initial)}}
function save(){localStorage.setItem(KEY,JSON.stringify(data));render()}
function esc(v=''){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function toast(msg){const el=document.getElementById('toast');el.textContent=msg;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2100)}
function showView(name){document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active',v.id==='view-'+name));document.querySelectorAll('.nav-item').forEach(v=>v.classList.toggle('active',v.dataset.view===name));window.scrollTo({top:0,behavior:'smooth'})}
document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>showView(b.dataset.view)));
document.querySelectorAll('[data-action="edit-vehicle"]').forEach(b=>b.addEventListener('click',()=>showView('settings')));
document.querySelector('#serviceForm [name=date]').value=new Date().toISOString().slice(0,10);
function resetServiceForm(){const form=document.getElementById('serviceForm');form.reset();form.querySelector('[name=date]').value=new Date().toISOString().slice(0,10);editingServiceId=null;document.getElementById('serviceSubmit').innerHTML='Guardar intervención <span>↗</span>';document.getElementById('cancelServiceEdit').hidden=true}
document.getElementById('cancelServiceEdit').addEventListener('click',resetServiceForm);
document.getElementById('serviceForm').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.target);const entry={title:f.get('title'),date:f.get('date'),km:Number(f.get('km')),category:f.get('category'),parts:f.get('parts'),notes:f.get('notes'),cost:f.get('cost')};if(editingServiceId){const idx=data.services.findIndex(s=>s.id===editingServiceId);if(idx>=0)data.services[idx]={...data.services[idx],...entry};toast('Intervención actualizada')}else{data.services.unshift({id:crypto.randomUUID(),...entry});toast('Intervención guardada')}if(Number(f.get('km'))>Number(data.vehicle.km||0))data.vehicle.km=String(f.get('km'));resetServiceForm();save()});
document.getElementById('reminderForm').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.target);data.reminders.push({id:crypto.randomUUID(),title:f.get('title'),km:f.get('km'),date:f.get('date'),notes:f.get('notes'),done:false});e.target.reset();save();toast('Recordatorio creado')});
document.getElementById('vehicleForm').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.target);data.vehicle={model:f.get('model'),year:f.get('year'),engine:f.get('engine'),power:f.get('power'),km:f.get('km')};save();toast('Ficha actualizada')});

// Maintenance planner: intervals converted from the Haynes E30/E28/E34 schedule.
function addMonths(date, months){const d=new Date(date);const day=d.getDate();d.setMonth(d.getMonth()+months);if(d.getDate()<day)d.setDate(0);return d.toISOString().slice(0,10)}
document.getElementById('maintenancePlanBtn').addEventListener('click',()=>{
  const currentKm=Number(data.vehicle.km)||0;
  const today=new Date();
  const plan=[
    {title:'Aceite motor + filtro',km:currentKm?currentKm+9600:'',date:addMonths(today,6),notes:'Pauta Haynes: 6.000 mi / 6 meses. Ajustar según uso y aceite.'},
    {title:'Revisión de manguitos, correas y fugas',km:currentKm?currentKm+9600:'',date:addMonths(today,6),notes:'Inspección visual de refrigeración, admisión, combustible y correas auxiliares.'},
    {title:'Inspección general E34',km:currentKm?currentKm+19300:'',date:addMonths(today,12),notes:'Batería, bujías, filtro de aire, combustible, refrigeración, escape, dirección, suspensión, frenos y transmisiones.'},
    {title:'Renovar líquido de frenos',km:'',date:addMonths(today,24),notes:'Pauta temporal de 2 años. Usar especificación correcta y purgar el circuito.'},
    {title:'Renovar refrigerante',km:'',date:addMonths(today,24),notes:'Pauta temporal de 2 años. Verificar concentración, fugas y estado del circuito.'},
    {title:'Servicio de transmisión y diferencial',km:currentKm?currentKm+38600:'',date:addMonths(today,24),notes:'Pauta Haynes: 24.000 mi / 2 años. Confirmar tipo de caja, diferencial y lubricante antes de intervenir.'},
    {title:'Filtro de combustible',km:currentKm?currentKm+38600:'',date:addMonths(today,24),notes:'Pauta Haynes: 24.000 mi / 2 años; comprobar configuración y referencias.'}
  ];
  const existing=new Set(data.reminders.filter(r=>!r.done).map(r=>r.title.toLocaleLowerCase('es')));
  const fresh=plan.filter(r=>!existing.has(r.title.toLocaleLowerCase('es')));
  if(!fresh.length){toast('El plan base ya está añadido');return}
  if(!confirm(`Se añadirán ${fresh.length} recordatorios calculados desde ${currentKm?currentKm.toLocaleString('fr-FR')+' km':'el kilometraje aún no indicado'} y hoy. ¿Continuar?`))return;
  data.reminders.push(...fresh.map(r=>({id:crypto.randomUUID(),...r,done:false,source:'haynes-base'})));
  save();toast(`Plan añadido: ${fresh.length} recordatorios`);
});


const torqueSearch=document.getElementById('torqueSearch');
const torqueScope=document.getElementById('torqueScope');
function renderTorques(){
  const list=window.E34_TORQUES||[];
  const q=(torqueSearch?.value||'').trim().toLocaleLowerCase('es');
  const scope=torqueScope?.value||'all';
  const filtered=list.filter(t=>{
    if(scope==='favorites'&&!data.favorites.includes(t.id))return false;if(scope!=='all'&&scope!=='favorites'&&t.scope!==scope)return false;
    const hay=[t.part,t.section,t.fastener,t.fit,t.note,t.nm,t.angle,t.tolerance,t.page].join(' ').toLocaleLowerCase('es');
    return !q||hay.includes(q);
  });
  document.getElementById('torqueCount').textContent=`${filtered.length} / ${list.length}`;
  const host=document.getElementById('torqueResults');
  if(!filtered.length){host.innerHTML='<div class="empty-state">No hay pares que coincidan con la búsqueda.</div>';return}
  host.innerHTML=filtered.map(t=>{
    const tag=t.scope==='M50'?'M50':t.scope==='E34'?'E34':'GENERAL';
    const torque=`${t.nm} Nm${t.tolerance?' '+t.tolerance:''}${t.angle?' + '+esc(t.angle):''}`;
    return `<article class="torque-card"><div class="torque-card-top"><span class="torque-section">${esc(t.section)}</span><span class="torque-tag ${t.scope==='M50'?'tag-m50':t.scope==='E34'?'tag-e34':'tag-general'}">${tag}</span></div><div class="torque-main"><div><h3>${esc(t.part)}</h3><p>${esc(t.fastener||'')} · ${esc(t.fit||'')}</p></div><strong>${torque}</strong></div>${t.note?`<p class="torque-note">${esc(t.note)}</p>`:''}<div class="torque-actions"><button class="small-action" data-favorite-torque="${esc(t.id)}">${data.favorites.includes(t.id)?'★ Guardado':'☆ Favorito'}</button><button class="small-action" data-copy-torque="${esc(t.id)}">Copiar par</button></div><div class="torque-foot">Fuente BMW · PDF p. ${t.page+1} · <a href="${window.E34_TORQUE_SOURCE.url}#page=${t.page+1}" target="_blank" rel="noopener">ver página ↗</a> · ref. ${esc(t.id)}</div></article>`;
  }).join('');
}
torqueSearch?.addEventListener('input',renderTorques);
torqueScope?.addEventListener('change',renderTorques);

function render(){const v=data.vehicle;document.getElementById('currentKm').textContent=v.km?Number(v.km).toLocaleString('fr-FR'):'—';document.getElementById('serviceCount').textContent=data.services.length;const pending=data.reminders.filter(r=>!r.done).sort((a,b)=>(Number(a.km)||Infinity)-(Number(b.km)||Infinity));document.getElementById('nextDue').textContent=pending.length?(pending[0].km?Number(pending[0].km).toLocaleString('fr-FR')+' km':pending[0].date||'À prévoir'):'—';document.getElementById('nextDueLabel').textContent=pending.length?pending[0].title:'sin recordatorios';
const hist=document.getElementById('historyList');hist.className='record-list'+(data.services.length?'':' empty-state');hist.innerHTML=data.services.length?data.services.map(s=>`<article class="record"><div><h3>${esc(s.title)}</h3><p>${esc(s.category)} · ${esc(s.date)} · ${s.km?Number(s.km).toLocaleString('fr-FR')+' km':''}<br>${esc(s.parts||'')}${s.notes?'<br>'+esc(s.notes):''}</p></div><div class="record-meta">${s.cost?esc(s.cost)+' €':'—'}<div class="record-actions"><button class="small-action" data-edit-service="${s.id}">Editar</button><button class="small-action" data-delete-service="${s.id}">Eliminar</button></div></div></article>`).join(''):'Todavía no hay intervenciones registradas.';
const rem=document.getElementById('reminderList');const today=new Date().toISOString().slice(0,10);const currentKm=Number(v.km)||0;const reminderStatus=r=>r.done?'done':((r.km&&currentKm>=Number(r.km))||(r.date&&r.date<=today))?'overdue':'upcoming';const ordered=[...data.reminders].sort((a,b)=>({overdue:0,upcoming:1,done:2}[reminderStatus(a)]-{overdue:0,upcoming:1,done:2}[reminderStatus(b)]));rem.className='record-list'+(data.reminders.length?'':' empty-state');rem.innerHTML=ordered.length?ordered.map(r=>{const status=reminderStatus(r);const label=status==='done'?'COMPLETADO':status==='overdue'?'VENCIDO':'PENDIENTE';return `<article class="record"><div><h3>${esc(r.title)} <span class="reminder-status status-${status}">${label}</span></h3><p>${r.km?Number(r.km).toLocaleString('fr-FR')+' km':''}${r.date?' · '+esc(r.date):''}<br>${esc(r.notes||'')}</p></div><div class="record-actions"><button class="small-action" data-done-reminder="${r.id}">${r.done?'Reactivar':'Hecho'}</button><button class="small-action" data-delete-reminder="${r.id}">×</button></div></article>`}).join(''):'No tienes recordatorios pendientes.';
const form=document.getElementById('vehicleForm');if(document.activeElement!==form.querySelector('[name=km]'))Object.entries(v).forEach(([k,val])=>{const el=form.elements[k];if(el&&document.activeElement!==el)el.value=val});
}
document.addEventListener('click',async e=>{const ds=e.target.dataset;if(ds.editService){const s=data.services.find(x=>x.id===ds.editService);if(!s)return;const form=document.getElementById('serviceForm');Object.entries(s).forEach(([k,val])=>{if(form.elements[k])form.elements[k].value=val??''});editingServiceId=s.id;document.getElementById('serviceSubmit').textContent='Guardar cambios';document.getElementById('cancelServiceEdit').hidden=false;showView('service');form.scrollIntoView({behavior:'smooth'});return}if(ds.deleteService){data.services=data.services.filter(s=>s.id!==ds.deleteService);save();toast('Intervención eliminada')}if(ds.doneReminder){const r=data.reminders.find(x=>x.id===ds.doneReminder);if(r)r.done=!r.done;save()}if(ds.deleteReminder){data.reminders=data.reminders.filter(r=>r.id!==ds.deleteReminder);save();toast('Recordatorio eliminado')}if(ds.favoriteTorque){const id=ds.favoriteTorque;data.favorites=data.favorites.includes(id)?data.favorites.filter(x=>x!==id):[...data.favorites,id];save();renderTorques()}if(ds.copyTorque){const t=(window.E34_TORQUES||[]).find(x=>x.id===ds.copyTorque);if(t){const value=`${t.part}: ${t.nm} Nm${t.angle?' + '+t.angle:''}. ${t.fastener||''}. Aplicación: ${t.fit||''}. Fuente BMW Tightening Torques, p. ${t.page+1}.`;try{await navigator.clipboard.writeText(value);toast('Par copiado')}catch{toast('No se pudo copiar: utiliza el enlace a la fuente')}}}});
function download(name,content,type){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([content],{type}));a.download=name;a.click();URL.revokeObjectURL(a.href)}
document.getElementById('backupBtn').addEventListener('click',()=>download('e34-service-book-backup.json',JSON.stringify(data,null,2),'application/json'));
document.getElementById('exportBtn').addEventListener('click',()=>{const rows=[['Fecha','Kilometraje','Operación','Categoría','Piezas','Notas','Coste'],...data.services.map(s=>[s.date,s.km,s.title,s.category,s.parts,s.notes,s.cost])];const csv=rows.map(r=>r.map(x=>'"'+String(x??'').replace(/"/g,'""')+'"').join(';')).join('\r\n');download('e34-service-history.csv','\ufeff'+csv,'text/csv;charset=utf-8')});
document.getElementById('importFile').addEventListener('change',async e=>{const file=e.target.files[0];if(!file)return;try{const imported=JSON.parse(await file.text());if(!imported.vehicle||!Array.isArray(imported.services)||!Array.isArray(imported.reminders))throw Error('format');data=imported;save();toast('Copia restaurada')}catch{toast('Archivo de copia no válido')}e.target.value=''});
let installPrompt;window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;const b=document.getElementById('installBtn');b.hidden=false;b.onclick=async()=>{installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;b.hidden=true}});
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
render();
renderTorques();
