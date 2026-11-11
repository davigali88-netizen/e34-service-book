(function(){
  const typeGroups=[
    {codes:['HA11','HA12','HA21','HA22'],model:'BMW 518i',engine:'M40',oil:{value:'4.0 L',sources:['https://www.auto-abc.eu/bmw-5-serija/v3149-1989']},coolant:{value:'6.1 L',sources:['https://www.auto-abc.eu/bmw-5-serija/v3149-1989']}},
    {codes:['HA31','HA32','HA41'],model:'BMW 518i',engine:'M43',oil:{value:'4.0 L',sources:['https://www.auto-abc.eu/bmw-5-serija/v3150-1992']},coolant:{value:'6.1 L',sources:['https://www.auto-abc.eu/bmw-5-serija/v3150-1992']}},
    {codes:['HB11','HB12','HB21','HB22','HB31','HB41'],model:'BMW 520i',engine:'M20B20',oil:{value:'4.25 L',sources:['https://bmwguide.net/bmw-e34-engine-oil-change/']},coolant:null},
    {codes:['HB51','HB52','HB61','HB62'],model:'BMW 520i',engine:'M50B20',oil:{value:'5.75 L',sources:['https://www.auto-abc.eu/bmw-5-serija/v3156-1990','https://bmwguide.net/bmw-e34-engine-oil-change/']},coolant:{value:'10.5 L',sources:['https://www.auto-abc.eu/bmw-5-serija/v3156-1990','https://www.scribd.com/doc/268460081/BMW-5-Series-520i-1992-1995']},differential:{value:'1.7 L',sources:['https://www.scribd.com/doc/268460081/BMW-5-Series-520i-1992-1995']}},
    {codes:['HA51','HA61'],model:'BMW 524td',engine:'M21D24',oil:{value:'5.25-5.75 L (sources differ)',sources:['https://bmwguide.net/bmw-e34-engine-oil-change/','https://www.auto-abc.eu/bmw-5-serija/v3158-1988']},coolant:{value:'12.0 L',sources:['https://www.auto-abc.eu/bmw-5-serija/v3158-1988']}},
    {codes:['HC11','HC12','HC21','HC22'],model:'BMW 525i',engine:'M20B25',oil:{value:'4.75 L',sources:['https://www.auto-abc.eu/bmw-5-serija/v3160-1988','https://bmwguide.net/bmw-e34-engine-oil-change/']},coolant:{value:'10.5 L',sources:['https://www.auto-abc.eu/bmw-5-serija/v3160-1988']}},
    {codes:['HD51','HD52','HD61','HD62'],model:'BMW 525i',engine:'M50B25',oil:{value:'5.75 L',sources:['https://www.auto-abc.eu/bmw-5-serija/v3162-1990','https://bmwguide.net/bmw-e34-engine-oil-change/']},coolant:{value:'10.5 L',sources:['https://www.auto-abc.eu/bmw-5-serija/v3162-1990']}},
    {codes:['HD71','HD72','HD81','HD82'],model:'BMW 525iX',engine:'M50B25',oil:{value:'5.75 L',sources:['https://www.auto-abc.eu/bmw-5-serija/v3164-1991']},coolant:{value:'11.0 L',sources:['https://www.auto-abc.eu/bmw-5-serija/v3164-1991']}},
    {codes:['HA71','HA72','HA81','HA82'],model:'BMW 525td',engine:'M51D25',oil:{value:'6.5 L',sources:['https://www.auto-abc.eu/bmw-5-serija/v3166-1993']},coolant:{value:'9.75 L',sources:['https://www.auto-abc.eu/bmw-5-serija/v3166-1993']}},
    {codes:['HA01','HA02','HA91','HA92'],model:'BMW 525tds',engine:'M51D25',oil:{value:'6.5 L',sources:['https://www.auto-abc.eu/bmw-5-serija/v3168-1991']},coolant:null},
    {codes:['HC51','HC52','HC61','HC62'],model:'BMW 530i',engine:'M30B30',oil:{value:'5.75 L',sources:['https://www.auto-abc.eu/bmw-5-serija/v3170-1988','https://bmwguide.net/bmw-e34-engine-oil-change/']},coolant:{value:'12.5 L',sources:['https://www.auto-abc.eu/bmw-5-serija/v3170-1988']}},
    {codes:['HE11','HE12','HE21','HE22'],model:'BMW 530i',engine:'M60B30',oil:{value:'7.5 L',sources:['https://www.auto-abc.eu/bmw-5-serija/v3172-1992','https://bmwguide.net/bmw-e34-engine-oil-change/']},coolant:{value:'12.5 L',sources:['https://www.auto-abc.eu/bmw-5-serija/v3172-1992']}},
    {codes:['HD11','HD12','HD21','HD22'],model:'BMW 535i',engine:'M30B35',oil:{value:'5.75 L',sources:['https://www.auto-abc.eu/bmw-5-serija/v3174-1988','https://bmwguide.net/bmw-e34-engine-oil-change/']},coolant:{value:'12.0 L',sources:['https://www.auto-abc.eu/bmw-5-serija/v3174-1988']}},
    {codes:['HE51','HE52','HE61','HE62'],model:'BMW 540i',engine:'M60B40',oil:{value:'7.5 L',sources:['https://www.auto-abc.eu/bmw-5-serija/v3176-1992','https://bmwguide.net/bmw-e34-engine-oil-change/']},coolant:{value:'12.5 L',sources:['https://www.auto-abc.eu/bmw-5-serija/v3176-1992']}},
    {codes:['HD91','HD92'],model:'BMW M5',engine:'S38B36',oil:{value:'5.75 L',sources:['https://www.m5board.com/threads/b36-engine-oil-capacity.162149/']},coolant:null},
    {codes:['HC91','HC92'],model:'BMW M5',engine:'S38B38',oil:null,coolant:null}
  ];
  const typeCodes={};
  typeGroups.forEach(group=>group.codes.forEach(code=>{typeCodes[code]=group}));
  const validVin=/^[A-HJ-NPR-Z0-9]{17}$/;
  const gearboxes={
    'manual-520i':{name:'Manual (520i reference)',capacity:'1.0 L',source:'https://www.scribd.com/doc/268460081/BMW-5-Series-520i-1992-1995',note:'Gearbox code is not specified in that source; confirm it on the installed gearbox.'},
    'getrag-260-5':{name:'Getrag 260/5',capacity:'1.25 L',source:'https://bmwguide.net/gearbox-oil-change-on-bmw-e34/'},
    'getrag-260-6':{name:'Getrag 260/6',capacity:'1.25 L',source:'https://bmwguide.net/gearbox-oil-change-on-bmw-e34/'},
    'zf-s5d-310z':{name:'ZF S5D 310Z',capacity:'1.2 L',source:'https://bmwguide.net/gearbox-oil-change-on-bmw-e34/'},
    'getrag-s6s-560g':{name:'Getrag S6S 560G',capacity:'2.3 L',source:'https://bmwguide.net/gearbox-oil-change-on-bmw-e34/'}
  };
  window.E34_FLUIDS={
    typeCodes,
    gearboxes,
    decodeVin(value){
      const vin=String(value||'').trim().toUpperCase();
      if(!validVin.test(vin)||!/^WB[AS]/.test(vin))return null;
      const typeCode=vin.slice(3,7);
      return {typeCode,vehicle:typeCodes[typeCode]||null,lastSeven:vin.slice(-7)};
    }
  };
})();
