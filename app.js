const KEY='e34-service-book-v1';
const initial={vehicle:{model:'BMW 520i E34',year:'1991',engine:'M50B20',power:'150 CV',km:'',photo:''},services:[],reminders:[],favorites:[],language:'es'};
let data=load();
let editingServiceId=null;
const EN={
  appTitle:'BMW E34 Service Book',appDescription:'Personal service log and technical manual for the BMW E34.',brandTitle:'SERVICE BOOK',
  brandSub:'CLASSIC BMW GARAGE',install:'Install app',genericPhotoAlt:'Generic reference photo of a BMW 520i E34',
  garageEyebrow:'YOUR GARAGE / 01',chassis:'CHASSIS',engineLabel:'ENGINE',yearLabel:'YEAR',
  overviewEyebrow:'OVERVIEW / 02',vehicleStatus:'Vehicle status',editVehicle:'Edit vehicle ↗',currentMileage:'CURRENT MILEAGE',recordedKm:'km recorded',interventions:'SERVICE ENTRIES',inHistory:'in the log',nextReminder:'NEXT REMINDER',noReminders:'No reminders',expensesEyebrow:'EXPENSES',expensesTitle:'Vehicle expenses',expenseYear:'Year',expenseHelp:'Add the cost when saving each service entry; the summary updates automatically.',yearTotal:'Total this year',costedEntries:'Entries with a cost',averageCost:'Average per entry',categoryCosts:'Costs by category',noExpenses:'No costs recorded for this year.',unknownCategory:'Uncategorized',
  quickEyebrow:'QUICK ACCESS / 03',serviceBook:'Service book',addService:'Add service entry',recordMaintenance:'Log maintenance',reminders:'Reminders',upcomingOperations:'Upcoming operations',technicalManual:'Technical manual',dataAndSpecs:'Data and specifications',
  disclaimer:'Independent personal project. Not affiliated with BMW AG. Always verify technical data against workshop documentation for your exact version.',
  serviceRecord:'SERVICE RECORD / 04',recordWork:'Log every job carried out on your E34.',operation:'Operation',date:'Date',mileageKm:'Mileage (km)',exampleOil:'e.g. Engine oil change',exampleKm:'e.g. 185000',category:'Category',maintenance:'Maintenance',engineOption:'Engine',transmissionOption:'Transmission',brakes:'Brakes',suspension:'Suspension',electrical:'Electrical',bodywork:'Bodywork',other:'Other',partsReferences:'Parts / references',partsPlaceholder:'OEM reference, brand, viscosity…',notes:'Notes',workNotesPlaceholder:'Work performed, observations, torque values…',costEuros:'Cost (€)',optional:'Optional',saveService:'Save service entry',cancelEdit:'Cancel edit',historyEyebrow:'HISTORY / 05',history:'History',exportCsv:'Export CSV ↓',noServices:'No service entries yet.',
  plannerEyebrow:'MAINTENANCE PLANNER / 06',scheduleOperations:'Schedule jobs by date or mileage.',basePlan:'E34 base plan',basePlanDescription:'Creates indicative reminders by mileage and time, based on the current odometer and date.',createBasePlan:'Create base plan ↗',nextOilChange:'e.g. Next oil change',dueKm:'Due at (km)',deadline:'Due date',specOrReference:'Specification or reference',createReminder:'Create reminder',upcomingEyebrow:'UPCOMING / 07',reminderDisclaimer:'Reminders become due when either the mileage or date is reached, whichever comes first. The base plan follows the Haynes E30/E28/E34 maintenance schedule as a conservative guideline, not an official BMW schedule specific to your M50.',noRemindersPending:'No pending reminders.',
  workshopEyebrow:'WORKSHOP DATA / 08',manualIntro:'Initial BMW E34 library. Data will be expanded and verified by variant.',source:'Source',torqueSourceIntro:'Transcription of the BMW Tightening Torques catalogue (20/10/1997). Each entry retains its page, variant and notes. Always check gearbox code, version and procedure before applying a torque value.',vehicleSheet:'Vehicle details',model:'Model',year:'Year',displacement:'Displacement',power:'Power',timing:'Timing',chain:'Chain',fluidsCapacities:'Fluids and capacities',baseVehicle:'Base vehicle',fluidBaseline:'520i E34 saloon · 1991 · M50B20 without VANOS. Gearbox, differential and hydraulic equipment are not assumed.',
  lubricantCapacity:'Lubricant and capacity',pendingVerification:'Not yet verified',specViscosity:'Specification / viscosity',oemReference:'OEM reference',pendingVin:'To be verified by VIN',gearbox:'Gearbox',identification:'Identification',gearboxCodeMissing:'Gearbox code unavailable',gearboxDependent:'Depends on the gearbox fitted',pendingVinGearbox:'Verify by VIN and gearbox code',differential:'Differential',diffUnknown:'Ratio and limited-slip type to be confirmed',diffDependent:'Depends on the differential fitted',pendingVinMark:'Verify by VIN and casing mark',powerSteering:'Power steering',steeringLabelUnknown:'Check equipment and reservoir label',fluidQuantity:'Fluid and quantity',notDetermined:'Not determined for this vehicle',cooling:'Cooling system',coolantCapacity:'Coolant and capacity',concentrationSpec:'Concentration / specification',oemReferences:'OEM references',pendingVinPlural:'To be verified by VIN',fluidDisclaimer:'No estimated values are shown: the linked manuals are general references and their figures have not been checked against this exact European configuration. Completing this requires the VIN, gearbox code/label, differential casing mark and steering reservoir label, plus applicable BMW documentation. Service refill quantity may differ from total system capacity.',haynesLink:'Open Haynes E30/E28/E34 · secondary reference ↗',bentleyLink:'Open Bentley BMW 5-Series · confirm market and variant ↗',
  torqueTitle:'Torque specifications · BMW 1997',torqueSearchPlaceholder:'Search component, fastener, Nm…',torqueSearchLabel:'Search torque specifications',filterApplicability:'Filter applicability',allEntries:'All entries',m50Specific:'M50-specific',e34Specific:'E34-specific',generalAll:'General application (All)',favorites:'★ Favorites',torqueDisclaimer:'M50/E34 records are identified. “General / All” follows the original table classification and does not replace checking the exact variant. Angle, tolerance, lubrication and thread-locker conditions are retained.',torquePdfLink:'Open full original BMW catalogue · PDF · 136 pages ↗',oemPlaceholder:'OEM references by ETK group, with compatibility and supersession notes, will be added.',workshopProcedures:'Workshop procedures',proceduresPlaceholder:'Step-by-step procedures, required tools and safety notes.',
  settingsEyebrow:'GARAGE SETTINGS / 09',localDataDescription:'Vehicle data is stored locally on this device.',currentMileageKm:'Current mileage (km)',enterCurrentKm:'Enter current mileage',saveVehicle:'Save vehicle details',vehiclePhoto:'Vehicle photo',photoDescription:'The generic photo is for reference; your own photo is stored only on this device.',choosePhoto:'Add your own photo',useGenericPhoto:'Restore generic photo',genericPhotoCredit:'Reference photo: 1992 BMW 520i by Felix Schmidt (Wikimedia Commons), CC BY-SA 3.0; resized.',yourData:'Your data',localStorageDescription:'Records are stored locally in the browser. This version does not yet sync between devices.',downloadBackup:'Download JSON backup ↓',restoreBackup:'Restore JSON backup',languageSettings:'Interface language',chooseLanguage:'Choose a language',languageDataNote:'This changes the interface only; your own record text stays as entered. Mileage remains in km.',mainNavigation:'Main navigation',garage:'Garage',serviceNav:'Service',alertsNav:'Alerts',manualNav:'Manual',
  serviceUpdated:'Service entry updated',serviceSaved:'Service entry saved',serviceEdited:'Save changes',reminderCreated:'Reminder created',vehicleSaved:'Vehicle details saved',languageChanged:'Language updated',basePlanAlready:'The base plan is already added',planConfirm:'Add {count} reminders calculated from {km} and today? Continue?',planAdded:'Plan added: {count} reminders',noTorqueMatches:'No torque entries match your search.',favoriteSaved:'★ Saved',favorite:'☆ Favorite',copyTorque:'Copy torque',torqueSource:'BMW source',torquePage:'PDF p.',torqueRef:'ref.',openPage:'view page',serviceDeleted:'Service entry deleted',reminderDeleted:'Reminder deleted',completed:'COMPLETED',overdue:'OVERDUE',pending:'PENDING',reactivate:'Reactivate',markDone:'Done',edit:'Edit',delete:'Delete',photoUnsupported:'Choose a JPG, PNG or WebP image.',photoTooLarge:'Photo must be 12 MB or smaller.',photoDecodeError:'The image could not be opened.',photoSaved:'Vehicle photo saved',photoReset:'Generic photo restored',photoStoreError:'Could not save the photo. Free up browser storage and try again.',copyFailed:'Could not copy: open the source link instead.',backupRestored:'Backup restored',invalidBackup:'Invalid backup file',planOil:'Engine oil + filter',planHoses:'Inspect hoses, belts and leaks',planInspection:'General E34 inspection',planBrakeFluid:'Replace brake fluid',planCoolant:'Replace coolant',planTransmission:'Transmission and differential service',planFuelFilter:'Fuel filter',planOilNote:'Haynes guideline: 9,600 km / 6 months. Adjust to use and oil.',planHosesNote:'Visual inspection of cooling, intake, fuel and auxiliary belt systems.',planInspectionNote:'Battery, plugs, air/fuel filters, cooling, exhaust, steering, suspension, brakes and driveline.',planBrakeFluidNote:'Time-based 2-year guideline. Use the correct specification and bleed the system.',planCoolantNote:'Time-based 2-year guideline. Check concentration, leaks and system condition.',planTransmissionNote:'Haynes guideline: 38,600 km / 2 years. Confirm gearbox, differential and lubricant before servicing.',planFuelFilterNote:'Haynes guideline: 38,600 km / 2 years; check configuration and references.',noServiceEntries:'No service entries yet.',noTorqueResults:'No torque entries match your search.',noPendingList:'No pending reminders.',customPhotoAlt:'Your vehicle photo',noReminders:'No reminders',mileageNotEntered:'the mileage has not been entered',saveService:'Save service entry',application:'Application'
};
const ES={serviceUpdated:'Intervención actualizada',serviceSaved:'Intervención guardada',serviceEdited:'Guardar cambios',reminderCreated:'Recordatorio creado',vehicleSaved:'Ficha actualizada',languageChanged:'Idioma actualizado',basePlanAlready:'El plan base ya está añadido',planConfirm:'Se añadirán {count} recordatorios calculados desde {km} y hoy. ¿Continuar?',planAdded:'Plan añadido: {count} recordatorios',noTorqueMatches:'No hay pares que coincidan con la búsqueda.',favoriteSaved:'★ Guardado',favorite:'☆ Favorito',copyTorque:'Copiar par',torqueSource:'Fuente BMW',torquePage:'PDF p.',torqueRef:'ref.',openPage:'ver página',serviceDeleted:'Intervención eliminada',reminderDeleted:'Recordatorio eliminado',completed:'COMPLETADO',overdue:'VENCIDO',pending:'PENDIENTE',reactivate:'Reactivar',markDone:'Hecho',edit:'Editar',delete:'Eliminar',photoUnsupported:'Elige una imagen JPG, PNG o WebP.',photoTooLarge:'La foto debe ocupar 12 MB o menos.',photoDecodeError:'No se pudo abrir la imagen.',photoSaved:'Foto del vehículo guardada',photoReset:'Foto genérica restaurada',photoStoreError:'No se pudo guardar la foto. Libera espacio del navegador e inténtalo de nuevo.',copyFailed:'No se pudo copiar: utiliza el enlace a la fuente.',backupRestored:'Copia restaurada',invalidBackup:'Archivo de copia no válido',planOil:'Aceite motor + filtro',planHoses:'Revisión de manguitos, correas y fugas',planInspection:'Inspección general E34',planBrakeFluid:'Renovar líquido de frenos',planCoolant:'Renovar refrigerante',planTransmission:'Servicio de transmisión y diferencial',planFuelFilter:'Filtro de combustible',planOilNote:'Pauta Haynes: aprox. 9.600 km / 6 meses. Ajustar según uso y aceite.',planHosesNote:'Inspección visual de refrigeración, admisión, combustible y correas auxiliares.',planInspectionNote:'Batería, bujías, filtro de aire, combustible, refrigeración, escape, dirección, suspensión, frenos y transmisiones.',planBrakeFluidNote:'Pauta temporal de 2 años. Usar especificación correcta y purgar el circuito.',planCoolantNote:'Pauta temporal de 2 años. Verificar concentración, fugas y estado del circuito.',planTransmissionNote:'Pauta Haynes: aprox. 38.600 km / 2 años. Confirmar tipo de caja, diferencial y lubricante antes de intervenir.',planFuelFilterNote:'Pauta Haynes: aprox. 38.600 km / 2 años; comprobar configuración y referencias.',noServiceEntries:'Todavía no hay intervenciones registradas.',noTorqueResults:'No hay pares que coincidan con la búsqueda.',noPendingList:'No tienes recordatorios pendientes.',customPhotoAlt:'Foto propia de tu vehículo',noReminders:'Sin recordatorios',mileageNotEntered:'el kilometraje aún no indicado',saveService:'Guardar intervención',application:'Aplicación'};
Object.assign(ES,{date:'Fecha',currentMileage:'Kilometraje',operation:'Operación',category:'Categoría',partsReferences:'Piezas / referencias',notes:'Notas',costEuros:'Coste'});
Object.assign(ES,{expensesEyebrow:'GASTOS',expensesTitle:'Gastos del vehículo',expenseYear:'Año',expenseHelp:'Añade el coste al guardar cada intervención; el resumen se actualizará automáticamente.',yearTotal:'Total del año',costedEntries:'Intervenciones con coste',averageCost:'Media por intervención',categoryCosts:'Gastos por categoría',noExpenses:'No hay gastos registrados este año.',unknownCategory:'Sin categoría',other:'Otro'});
Object.assign(EN,{heroModel:'E34 · SALOON · 1991',torqueLanguageNote:'The interface can be switched to English; torque library descriptions remain in Spanish.',torqueCopied:'Torque copied',toPlan:'Not scheduled',photoAttribution:'BMW E34 520i (1992) · Felix Schmidt / Wikimedia Commons · CC BY-SA 3.0 ↗',genericPhotoCredit:'Reference photo: 1992 BMW 520i by Felix Schmidt (Wikimedia Commons), CC BY-SA 3.0; original, unmodified.'});
Object.assign(ES,{appTitle:'Libro de servicio E34',brandTitle:'LIBRO DE SERVICIO',brandSub:'GARAJE BMW CLÁSICO',heroModel:'E34 · BERLINA · 1991',torqueLanguageNote:'La interfaz puede cambiar a inglés; las descripciones de la biblioteca de pares permanecen en español.',torqueCopied:'Par copiado',toPlan:'Por programar',photoAttribution:'BMW E34 520i (1992) · Felix Schmidt / Wikimedia Commons · CC BY-SA 3.0 ↗',genericPhotoCredit:'Foto de referencia: BMW 520i de 1992, de Felix Schmidt (Wikimedia Commons), CC BY-SA 3.0; original sin modificar.',application:'Aplicación',customPhotoAlt:'Foto propia de tu vehículo',mileageNotEntered:'un kilometraje aún no especificado',noPendingList:'No tienes recordatorios pendientes.',noReminders:'Sin recordatorios',noServiceEntries:'Todavía no hay intervenciones registradas.',saveService:'Guardar intervención',planConfirm:'Se añadirán {count} recordatorios usando como referencia {km} y la fecha de hoy. ¿Continuar?'});
Object.assign(EN,{installFallback:'If no prompt appears, open your browser menu and choose Install app or Add to Home screen.',appInstalled:'App installed'});
Object.assign(ES,{installFallback:'Si no aparece el aviso, abre el menú del navegador y elige Instalar aplicación o Añadir a pantalla de inicio.',appInstalled:'Aplicación instalada'});
function t(key){const catalog=data.language==='en'?EN:ES;return catalog[key]||key}
function applyLanguage(){
  const language=data.language==='en'?'en':'es';
  document.documentElement.lang=language;
  document.title=language==='en'?EN.appTitle:ES.appTitle;
  document.querySelector('meta[name="description"]').content=language==='en'?EN.appDescription:'Libro de servicio y manual técnico para BMW E34';
  document.querySelectorAll('[data-i18n]').forEach(el=>{if(!el.dataset.i18nOriginal)el.dataset.i18nOriginal=el.textContent;el.textContent=language==='en'?(EN[el.dataset.i18n]||el.dataset.i18nOriginal):el.dataset.i18nOriginal});
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{if(!el.dataset.i18nOriginalPlaceholder)el.dataset.i18nOriginalPlaceholder=el.placeholder;el.placeholder=language==='en'?(EN[el.dataset.i18nPlaceholder]||el.dataset.i18nOriginalPlaceholder):el.dataset.i18nOriginalPlaceholder});
  document.querySelectorAll('[data-i18n-aria]').forEach(el=>{if(!el.dataset.i18nOriginalAria)el.dataset.i18nOriginalAria=el.getAttribute('aria-label')||'';el.setAttribute('aria-label',language==='en'?(EN[el.dataset.i18nAria]||el.dataset.i18nOriginalAria):el.dataset.i18nOriginalAria)});
  document.querySelectorAll('[data-i18n-title]').forEach(el=>{if(!el.dataset.i18nOriginalTitle)el.dataset.i18nOriginalTitle=el.title;el.title=language==='en'?(EN[el.dataset.i18nTitle]||el.dataset.i18nOriginalTitle):el.dataset.i18nOriginalTitle});
  document.querySelectorAll('[data-i18n-alt]').forEach(el=>{if(!el.dataset.i18nOriginalAlt)el.dataset.i18nOriginalAlt=el.alt;el.alt=language==='en'?(EN[el.dataset.i18nAlt]||el.dataset.i18nOriginalAlt):el.dataset.i18nOriginalAlt});
  document.getElementById('languageSelect').value=language;
  if(typeof renderVehiclePhoto==='function')renderVehiclePhoto();
}
function load(){try{const saved=JSON.parse(localStorage.getItem(KEY)||localStorage.getItem('e34-service-book-v1')||'{}');return {...structuredClone(initial),...saved,vehicle:{...initial.vehicle,...saved.vehicle},language:saved.language==='en'?'en':'es',favorites:Array.isArray(saved.favorites)?saved.favorites:[]}}catch{return structuredClone(initial)}}
function save(){localStorage.setItem(KEY,JSON.stringify(data));render();renderTorques()}
function esc(v=''){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function toast(msg){const el=document.getElementById('toast');el.textContent=msg;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2100)}
function showView(name){document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active',v.id==='view-'+name));document.querySelectorAll('.nav-item').forEach(v=>v.classList.toggle('active',v.dataset.view===name));window.scrollTo({top:0,behavior:'smooth'})}
applyLanguage();
document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>showView(b.dataset.view)));
document.querySelectorAll('[data-action="edit-vehicle"]').forEach(b=>b.addEventListener('click',()=>showView('settings')));
document.getElementById('languageSelect').addEventListener('change',e=>{data.language=e.target.value==='en'?'en':'es';applyLanguage();save();toast(t('languageChanged'))});
function renderVehiclePhoto(){const image=document.getElementById('vehicleHeroImage');const credit=document.getElementById('photoCredit');const reset=document.getElementById('useGenericPhoto');const photo=data.vehicle.photo;image.src=photo||'./e34-generic.jpg';image.alt=photo?t('customPhotoAlt'):(data.language==='en'?EN.genericPhotoAlt:'BMW 520i E34, foto genérica de referencia');credit.hidden=Boolean(photo);reset.disabled=!photo}
function compressPhoto(file){return new Promise((resolve,reject)=>{const url=URL.createObjectURL(file);const image=new Image();image.onload=()=>{URL.revokeObjectURL(url);try{const scale=Math.min(1,1280/Math.max(image.naturalWidth,image.naturalHeight));const canvas=document.createElement('canvas');canvas.width=Math.round(image.naturalWidth*scale);canvas.height=Math.round(image.naturalHeight*scale);const context=canvas.getContext('2d');if(!context)throw new Error('canvas');context.fillStyle='#111417';context.fillRect(0,0,canvas.width,canvas.height);context.drawImage(image,0,0,canvas.width,canvas.height);resolve(canvas.toDataURL('image/jpeg',.78))}catch(error){reject(error)}};image.onerror=()=>{URL.revokeObjectURL(url);reject(new Error('image'))};image.src=url})}
document.getElementById('vehiclePhotoInput').addEventListener('change',async e=>{const file=e.target.files[0];if(!file)return;if(!['image/jpeg','image/png','image/webp'].includes(file.type)){toast(t('photoUnsupported'));e.target.value='';return}if(file.size>12*1024*1024){toast(t('photoTooLarge'));e.target.value='';return}try{const photo=await compressPhoto(file);const previous=data.vehicle.photo;data.vehicle.photo=photo;try{save();toast(t('photoSaved'))}catch{data.vehicle.photo=previous;renderVehiclePhoto();toast(t('photoStoreError'))}}catch{toast(t('photoDecodeError'))}e.target.value=''});
document.getElementById('useGenericPhoto').addEventListener('click',()=>{if(!data.vehicle.photo)return;const previous=data.vehicle.photo;data.vehicle.photo='';try{save();toast(t('photoReset'))}catch{data.vehicle.photo=previous;renderVehiclePhoto();toast(t('photoStoreError'))}});
document.querySelector('#serviceForm [name=date]').value=new Date().toISOString().slice(0,10);
function resetServiceForm(){const form=document.getElementById('serviceForm');form.reset();form.querySelector('[name=date]').value=new Date().toISOString().slice(0,10);editingServiceId=null;document.getElementById('serviceSubmit').innerHTML=`<span>${t('saveService')}</span><span>↗</span>`;document.getElementById('cancelServiceEdit').hidden=true}
document.getElementById('cancelServiceEdit').addEventListener('click',resetServiceForm);
document.getElementById('serviceForm').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.target);const entry={title:f.get('title'),date:f.get('date'),km:Number(f.get('km')),category:f.get('category'),parts:f.get('parts'),notes:f.get('notes'),cost:f.get('cost')};if(editingServiceId){const idx=data.services.findIndex(s=>s.id===editingServiceId);if(idx>=0)data.services[idx]={...data.services[idx],...entry};toast(t('serviceUpdated'))}else{data.services.unshift({id:crypto.randomUUID(),...entry});toast(t('serviceSaved'))}if(Number(f.get('km'))>Number(data.vehicle.km||0))data.vehicle.km=String(f.get('km'));resetServiceForm();save()});
document.getElementById('reminderForm').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.target);data.reminders.push({id:crypto.randomUUID(),title:f.get('title'),km:f.get('km'),date:f.get('date'),notes:f.get('notes'),done:false});e.target.reset();save();toast(t('reminderCreated'))});
document.getElementById('vehicleForm').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.target);data.vehicle={...data.vehicle,model:f.get('model'),year:f.get('year'),engine:f.get('engine'),power:f.get('power'),km:f.get('km')};save();toast(t('vehicleSaved'))});

// Maintenance planner: intervals converted from the Haynes E30/E28/E34 schedule.
function addMonths(date, months){const d=new Date(date);const day=d.getDate();d.setMonth(d.getMonth()+months);if(d.getDate()<day)d.setDate(0);return d.toISOString().slice(0,10)}
function formatKm(value){return Number(value).toLocaleString(data.language==='en'?'en-GB':'es-ES')}
function formatCurrency(value){return new Intl.NumberFormat(data.language==='en'?'en-GB':'es-ES',{style:'currency',currency:'EUR'}).format(value)}
function serviceCost(service){if(service.cost==null||String(service.cost).trim()==='')return null;const amount=Number(service.cost);return Number.isFinite(amount)&&amount>=0?amount:null}
function renderExpenses(){
  const selector=document.getElementById('expenseYear');
  const previousYear=selector.value;
  const years=new Set([String(new Date().getFullYear())]);
  data.services.forEach(service=>{const year=String(service.date||'').slice(0,4);if(/^\d{4}$/.test(year))years.add(year)});
  const availableYears=[...years].sort((a,b)=>Number(b)-Number(a));
  selector.innerHTML=availableYears.map(year=>`<option value="${year}">${year}</option>`).join('');
  selector.value=availableYears.includes(previousYear)?previousYear:availableYears[0];
  const selectedYear=selector.value;
  const expenses=data.services.map(service=>({service,cost:serviceCost(service)})).filter(entry=>entry.cost!==null&&String(entry.service.date||'').slice(0,4)===selectedYear);
  const total=expenses.reduce((sum,entry)=>sum+entry.cost,0);
  document.getElementById('expenseTotal').textContent=formatCurrency(total);
  document.getElementById('expenseCount').textContent=String(expenses.length);
  document.getElementById('expenseAverage').textContent=expenses.length?formatCurrency(total/expenses.length):'—';
  const categories=new Map();
  expenses.forEach(({service,cost})=>{const category=String(service.category||t('unknownCategory'));categories.set(category,(categories.get(category)||0)+cost)});
  const breakdown=[...categories].sort((a,b)=>b[1]-a[1]);
  document.getElementById('expenseBreakdown').innerHTML=breakdown.length?breakdown.map(([category,amount])=>{const percent=total?amount/total*100:0;return `<div class="expense-category"><div class="expense-category-header"><span>${esc(category)}</span><strong>${formatCurrency(amount)}</strong></div><div class="expense-meter" role="meter" aria-label="${esc(category)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(percent)}"><i style="width:${percent}%"></i></div></div>`}).join(''):`<p class="expense-empty">${t('noExpenses')}</p>`;
}
document.getElementById('expenseYear').addEventListener('change',renderExpenses);
document.getElementById('maintenancePlanBtn').addEventListener('click',()=>{
  const currentKm=Number(data.vehicle.km)||0;
  const today=new Date();
  const plan=[
    {key:'planOil',title:t('planOil'),spanishTitle:ES.planOil,km:currentKm?currentKm+9600:'',date:addMonths(today,6),notes:t('planOilNote')},
    {key:'planHoses',title:t('planHoses'),spanishTitle:ES.planHoses,km:currentKm?currentKm+9600:'',date:addMonths(today,6),notes:t('planHosesNote')},
    {key:'planInspection',title:t('planInspection'),spanishTitle:ES.planInspection,km:currentKm?currentKm+19300:'',date:addMonths(today,12),notes:t('planInspectionNote')},
    {key:'planBrakeFluid',title:t('planBrakeFluid'),spanishTitle:ES.planBrakeFluid,km:'',date:addMonths(today,24),notes:t('planBrakeFluidNote')},
    {key:'planCoolant',title:t('planCoolant'),spanishTitle:ES.planCoolant,km:'',date:addMonths(today,24),notes:t('planCoolantNote')},
    {key:'planTransmission',title:t('planTransmission'),spanishTitle:ES.planTransmission,km:currentKm?currentKm+38600:'',date:addMonths(today,24),notes:t('planTransmissionNote')},
    {key:'planFuelFilter',title:t('planFuelFilter'),spanishTitle:ES.planFuelFilter,km:currentKm?currentKm+38600:'',date:addMonths(today,24),notes:t('planFuelFilterNote')}
  ];
  const pendingReminders=data.reminders.filter(r=>!r.done);
  const existingTitles=new Set(pendingReminders.map(r=>(r.title||'').toLocaleLowerCase()));
  const existingKeys=new Set(pendingReminders.map(r=>r.planKey).filter(Boolean));
  const fresh=plan.filter(r=>!existingKeys.has(r.key)&&!existingTitles.has(r.title.toLocaleLowerCase())&&!existingTitles.has(r.spanishTitle.toLocaleLowerCase()));
  if(!fresh.length){toast(t('basePlanAlready'));return}
  const mileage=currentKm?`${formatKm(currentKm)} km`:t('mileageNotEntered');
  const confirmation=t('planConfirm').replace('{count}',fresh.length).replace('{km}',mileage);
  if(!confirm(confirmation))return;
  data.reminders.push(...fresh.map(({key,...r})=>({id:crypto.randomUUID(),...r,planKey:key,done:false,source:'haynes-base'})));
  save();toast(t('planAdded').replace('{count}',fresh.length));
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
  if(!filtered.length){host.innerHTML=`<div class="empty-state">${t('noTorqueMatches')}</div>`;return}
  host.innerHTML=filtered.map(entry=>{
    const tag=entry.scope==='M50'?'M50':entry.scope==='E34'?'E34':'GENERAL';
    const torque=`${entry.nm} Nm${entry.tolerance?' '+entry.tolerance:''}${entry.angle?' + '+esc(entry.angle):''}`;
    return `<article class="torque-card"><div class="torque-card-top"><span class="torque-section">${esc(entry.section)}</span><span class="torque-tag ${entry.scope==='M50'?'tag-m50':entry.scope==='E34'?'tag-e34':'tag-general'}">${tag}</span></div><div class="torque-main"><div><h3>${esc(entry.part)}</h3><p>${esc(entry.fastener||'')} · ${esc(entry.fit||'')}</p></div><strong>${torque}</strong></div>${entry.note?`<p class="torque-note">${esc(entry.note)}</p>`:''}<div class="torque-actions"><button class="small-action" data-favorite-torque="${esc(entry.id)}">${data.favorites.includes(entry.id)?t('favoriteSaved'):t('favorite')}</button><button class="small-action" data-copy-torque="${esc(entry.id)}">${t('copyTorque')}</button></div><div class="torque-foot">${t('torqueSource')} · ${t('torquePage')} ${entry.page+1} · <a href="${window.E34_TORQUE_SOURCE.url}#page=${entry.page+1}" target="_blank" rel="noopener">${t('openPage')} ↗</a> · ${t('torqueRef')} ${esc(entry.id)}</div></article>`;
  }).join('');
}
torqueSearch?.addEventListener('input',renderTorques);
torqueScope?.addEventListener('change',renderTorques);

function render(){
  const v=data.vehicle;
  document.getElementById('currentKm').textContent=v.km?formatKm(v.km):'—';
  document.getElementById('serviceCount').textContent=data.services.length;
  const pending=data.reminders.filter(r=>!r.done).sort((a,b)=>(Number(a.km)||Infinity)-(Number(b.km)||Infinity));
  document.getElementById('nextDue').textContent=pending.length?(pending[0].km?formatKm(pending[0].km)+' km':pending[0].date||t('toPlan')):'—';
  document.getElementById('nextDueLabel').textContent=pending.length?pending[0].title:t('noReminders');
  renderExpenses();
  const hist=document.getElementById('historyList');
  hist.className='record-list'+(data.services.length?'':' empty-state');
  hist.innerHTML=data.services.length?data.services.map(s=>{const cost=serviceCost(s);return `<article class="record"><div><h3>${esc(s.title)}</h3><p>${esc(s.category)} · ${esc(s.date)} · ${s.km?formatKm(s.km)+' km':''}<br>${esc(s.parts||'')}${s.notes?'<br>'+esc(s.notes):''}</p></div><div class="record-meta">${cost===null?'—':formatCurrency(cost)}<div class="record-actions"><button class="small-action" data-edit-service="${s.id}">${t('edit')}</button><button class="small-action" data-delete-service="${s.id}">${t('delete')}</button></div></div></article>`}).join(''):t('noServiceEntries');
  const rem=document.getElementById('reminderList');
  const today=new Date().toISOString().slice(0,10);
  const currentKm=Number(v.km)||0;
  const reminderStatus=r=>r.done?'done':((r.km&&currentKm>=Number(r.km))||(r.date&&r.date<=today))?'overdue':'upcoming';
  const ordered=[...data.reminders].sort((a,b)=>({overdue:0,upcoming:1,done:2}[reminderStatus(a)]-{overdue:0,upcoming:1,done:2}[reminderStatus(b)]));
  rem.className='record-list'+(data.reminders.length?'':' empty-state');
  rem.innerHTML=ordered.length?ordered.map(r=>{const status=reminderStatus(r);const label=t(status==='done'?'completed':status==='overdue'?'overdue':'pending');return `<article class="record"><div><h3>${esc(r.title)} <span class="reminder-status status-${status}">${label}</span></h3><p>${r.km?formatKm(r.km)+' km':''}${r.date?' · '+esc(r.date):''}<br>${esc(r.notes||'')}</p></div><div class="record-actions"><button class="small-action" data-done-reminder="${r.id}">${r.done?t('reactivate'):t('markDone')}</button><button class="small-action" data-delete-reminder="${r.id}" aria-label="${t('delete')}">×</button></div></article>`}).join(''):t('noPendingList');
  const form=document.getElementById('vehicleForm');
  if(document.activeElement!==form.querySelector('[name=km]'))Object.entries(v).forEach(([k,val])=>{const el=form.elements[k];if(el&&document.activeElement!==el)el.value=val});
  renderVehiclePhoto();
}
document.addEventListener('click',async e=>{
  const button=e.target.closest('button');
  if(!button)return;
  const ds=button.dataset;
  if(ds.editService){
    const service=data.services.find(item=>item.id===ds.editService);
    if(!service)return;
    const form=document.getElementById('serviceForm');
    Object.entries(service).forEach(([key,value])=>{if(form.elements[key])form.elements[key].value=value??''});
    editingServiceId=service.id;
    document.getElementById('serviceSubmit').innerHTML=`<span>${t('serviceEdited')}</span><span>↗</span>`;
    document.getElementById('cancelServiceEdit').hidden=false;
    showView('service');
    form.scrollIntoView({behavior:'smooth'});
    return;
  }
  if(ds.deleteService){data.services=data.services.filter(service=>service.id!==ds.deleteService);save();toast(t('serviceDeleted'))}
  if(ds.doneReminder){const reminder=data.reminders.find(item=>item.id===ds.doneReminder);if(reminder)reminder.done=!reminder.done;save()}
  if(ds.deleteReminder){data.reminders=data.reminders.filter(reminder=>reminder.id!==ds.deleteReminder);save();toast(t('reminderDeleted'))}
  if(ds.favoriteTorque){const id=ds.favoriteTorque;data.favorites=data.favorites.includes(id)?data.favorites.filter(value=>value!==id):[...data.favorites,id];save()}
  if(ds.copyTorque){
    const torque=(window.E34_TORQUES||[]).find(item=>item.id===ds.copyTorque);
    if(torque){const value=`${torque.part}: ${torque.nm} Nm${torque.angle?' + '+torque.angle:''}. ${torque.fastener||''}. ${t('application')}: ${torque.fit||''}. ${t('torqueSource')} Tightening Torques, p. ${torque.page+1}.`;try{await navigator.clipboard.writeText(value);toast(t('torqueCopied'))}catch{toast(t('copyFailed'))}}
  }
});
function download(name,content,type){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([content],{type}));a.download=name;a.click();URL.revokeObjectURL(a.href)}
document.getElementById('backupBtn').addEventListener('click',()=>download('e34-service-book-backup.json',JSON.stringify(data,null,2),'application/json'));
document.getElementById('exportBtn').addEventListener('click',()=>{const rows=[[t('date'),t('currentMileage'),t('operation'),t('category'),t('partsReferences'),t('notes'),t('costEuros')],...data.services.map(service=>[service.date,service.km,service.title,service.category,service.parts,service.notes,service.cost])];const csv=rows.map(row=>row.map(value=>'"'+String(value??'').replace(/"/g,'""')+'"').join(';')).join('\r\n');download('e34-service-history.csv','\ufeff'+csv,'text/csv;charset=utf-8')});
document.getElementById('importFile').addEventListener('change',async e=>{const file=e.target.files[0];if(!file)return;try{const imported=JSON.parse(await file.text());if(!imported.vehicle||!Array.isArray(imported.services)||!Array.isArray(imported.reminders))throw Error('format');data={...structuredClone(initial),...imported,vehicle:{...initial.vehicle,...imported.vehicle},language:imported.language==='en'?'en':'es',favorites:Array.isArray(imported.favorites)?imported.favorites:[]};applyLanguage();save();toast(t('backupRestored'))}catch{toast(t('invalidBackup'))}e.target.value=''});
const installButton=document.getElementById('installBtn');
let installPrompt=null;
installButton.hidden=window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone===true;
installButton.addEventListener('click',async()=>{
  if(!installPrompt){toast(t('installFallback'));return}
  installPrompt.prompt();
  const choice=await installPrompt.userChoice;
  installPrompt=null;
  if(choice.outcome==='accepted')installButton.hidden=true;
});
window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;installButton.hidden=false});
window.addEventListener('appinstalled',()=>{installPrompt=null;installButton.hidden=true;toast(t('appInstalled'))});
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
render();
renderTorques();
