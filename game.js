const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const today=()=>new Date().toLocaleDateString('en-CA');
const questPool=[
 ["💪","Complete a workout","Train with focus for at least 30 minutes",35,20],
 ["📚","Learn something new","Read or study for 20 focused minutes",25,15],
 ["💧","Hydration mission","Drink your planned amount of water today",20,10],
 ["🧹","Reset your environment","Clean or organize one area for 15 minutes",20,10],
 ["💰","Money discipline","Review spending or move money into savings",30,20],
 ["🥗","Fuel your body","Eat a protein-focused balanced meal",20,10],
 ["🧠","Mindset training","Journal, reflect, or practice mindfulness for 10 minutes",25,15],
 ["🚶","Get moving","Take a 20-minute walk",20,10],
 ["🎯","Personal development","Make meaningful progress on one personal goal",30,15],
 ["😴","Recovery protocol","Set up a consistent bedtime routine",20,10],
 ["🤝","Social confidence","Start a positive conversation or reach out to someone",25,15],
 ["🏠","Life admin","Finish one task you've been putting off",25,15]
];
const defaultState={name:"CARDOSA",level:1,xp:0,totalXp:0,coins:0,earnedCoins:0,points:0,completed:0,streak:0,lastCompletedDate:"",stats:{Strength:5,Discipline:5,Confidence:5,Intelligence:5,Health:5,Wealth:5},look:{hair:"spike",hairColor:"#161b2c",outfitColor:"#243e78",accessory:"none",outfit:"hunter",aura:"blue",eyes:"blue",skin:"medium",weapon:"katana"},owned:[],equipped:"Starter outfit",questDate:"",quests:[]};
let state;try{state={...defaultState,...JSON.parse(localStorage.getItem("levelingUpSave")||"{}")};state.stats={...defaultState.stats,...(state.stats||{})};state.look={...defaultState.look,...(state.look||{})};}catch(e){state={...defaultState};}
function save(){localStorage.setItem("levelingUpSave",JSON.stringify(state));render();}
function rank(){return state.level>=50?"SSS-RANK":state.level>=35?"SS-RANK":state.level>=25?"S-RANK":state.level>=20?"A-RANK":state.level>=15?"B-RANK":state.level>=10?"C-RANK":state.level>=5?"D-RANK":"E-RANK";}
function need(){return 100+(state.level-1)*25;}
function toast(msg){let t=$("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200);}
function makeQuests(){let seed=Number(today().replaceAll("-",""));let pool=[...questPool];let chosen=[];for(let i=0;i<5;i++){seed=(seed*9301+49297)%233280;let idx=seed%pool.length;chosen.push(pool.splice(idx,1)[0]);}return chosen.map((q,i)=>({id:today()+"-"+i,title:q[1],desc:q[2],icon:q[0],xp:q[3],coins:q[4],done:false}));}
function ensureQuests(){if(state.questDate!==today()){state.questDate=today();state.quests=makeQuests();save();}}
function gain(xp,coins){state.xp+=xp;state.totalXp+=xp;state.coins+=coins;state.earnedCoins+=coins;while(state.xp>=need()){state.xp-=need();state.level++;state.points++;toast("LEVEL UP! You reached level "+state.level+" · +1 attribute point");}}
function avatar(el){
  if(!el)return;
  const art=el.querySelector("img.avatar-art");
  const hairMap={spike:"hunter-form-1.webp",sweep:"hunter-form-2.webp",long:"hunter-form-3.webp",fringe:"hunter-form-1.webp",tied:"hunter-form-2.webp"};
  if(art)art.src=""+(hairMap[state.look.hair]||"hunter-form-1.webp");
  el.dataset.hair=state.look.hair;el.dataset.accessory=state.look.accessory;
  el.dataset.outfit=state.look.outfit||"hunter";el.dataset.aura=state.look.aura||"blue";
}
function setPortraitArt(){
  const art=$("#mainAvatarArt");if(!art)return;
  const map={spike:"hunter-form-1.webp",sweep:"hunter-form-2.webp",long:"hunter-form-3.webp",fringe:"hunter-form-1.webp",tied:"hunter-form-2.webp"};
  art.src=""+(map[state.look.hair]||"hunter-form-1.webp");
  art.dataset.outfit=state.look.outfit||"hunter";art.dataset.hairColor=String(state.look.hairColor||"#161b2c").replace("#","");
  art.dataset.eyes=state.look.eyes||"blue";art.dataset.skin=state.look.skin||"medium";art.dataset.weapon=state.look.weapon||"katana";
}
function render(){ensureQuestsNoSave();$("#headerLevel").textContent="LVL "+state.level;$("#headerCoins").textContent=state.coins;$("#headerXpText").textContent=state.xp+" / "+need()+" XP";$("#headerXpFill").style.width=(state.xp/need()*100)+"%";$("#shopCoins").textContent=state.coins;$("#rankLabel").textContent=rank();$("#rankChip").textContent=rank();$("#rankChipInline").textContent=rank();$$(".rank-card").forEach(el=>el.classList.toggle("current",el.classList.contains("rank-"+rank().toLowerCase().replace("-rank",""))));$("#levelText").textContent="LEVEL "+state.level;$("#xpText").textContent=state.xp+" / "+need()+" XP";$("#xpFill").style.width=(state.xp/need()*100)+"%";$("#displayName").textContent=state.name.toUpperCase();$("#equippedLabel").textContent=state.equipped;$("#totalXp").textContent=state.totalXp;$("#completedCount").textContent=state.completed;$("#earnedCoins").textContent=state.earnedCoins;$("#streak").textContent=state.streak+" days";$("#pointsSummary").textContent=state.points+" attribute points available";$("#availablePoints").textContent=state.points;$("#nameInput").value=state.name;$("#hairSelect").value=state.look.hair;$("#hairColor").value=state.look.hairColor;$("#accessorySelect").value=state.look.accessory;
  $("#outfitSelect").value=state.look.outfit||"hunter";$("#auraSelect").value=state.look.aura||"blue";$("#eyeSelect").value=state.look.eyes||"blue";$("#skinSelect").value=state.look.skin||"medium";$("#weaponSelect").value=state.look.weapon||"katana";
  $("#characterRank").textContent=rank()+" HUNTER";$("#portraitTitle").textContent=rank()+" HUNTER";$("#formTag").textContent=(state.look.aura||"blue").toUpperCase()+" AWAKENING";
  avatar($("#mainAvatar"));avatar($("#dashAvatar"));setPortraitArt();
  const scene=$("#portraitScene");if(scene){scene.dataset.aura=state.look.aura||"blue";scene.dataset.eyes=state.look.eyes||"blue";scene.dataset.skin=state.look.skin||"medium";}
  const art=$("#mainAvatarArt");if(art){art.dataset.outfit=state.look.outfit||"hunter";art.dataset.hairColor=state.look.hairColor;art.dataset.eyes=state.look.eyes||"blue";art.dataset.skin=state.look.skin||"medium";art.dataset.weapon=state.look.weapon||"katana";}
  $$("[data-outfit-choice]").forEach(b=>b.classList.toggle("selected",b.dataset.outfitChoice===(state.look.outfit||"hunter")));
  $$("[data-aura-choice]").forEach(b=>b.classList.toggle("selected",b.dataset.auraChoice===(state.look.aura||"blue")));$$("[data-hair-choice]").forEach(b=>b.classList.toggle("selected",b.dataset.hairChoice===(state.look.hair||"spike")));$$("[data-color-choice]").forEach(b=>b.classList.toggle("selected",b.dataset.colorChoice===(state.look.hairColor||"#161b2c")));renderStats();renderQuests();renderShop();}
function ensureQuestsNoSave(){if(state.questDate!==today()){state.questDate=today();state.quests=makeQuests();localStorage.setItem("levelingUpSave",JSON.stringify(state));}}
function renderStats(){let keys=Object.keys(state.stats);$("#miniStats").innerHTML=keys.slice(0,4).map(k=>`<div class="stat-row"><span>${k}</span><div class="stat-track"><i style="width:${Math.min(100,state.stats[k]*3)}%"></i></div><b>${state.stats[k]}</b></div>`).join("");$("#attributeList").innerHTML=keys.map(k=>`<div class="attribute-row"><div><b>${k}</b><small>${({Strength:"Physical training and resilience",Discipline:"Consistency and follow-through",Confidence:"Courage and social growth",Intelligence:"Learning and problem solving",Health:"Recovery and healthy habits",Wealth:"Saving and financial habits"})[k]}</small></div><span class="attribute-value">${state.stats[k]}</span><button class="upgrade" data-stat="${k}" ${state.points<1?"disabled":""}>+ Upgrade</button></div>`).join("");}
function renderQuests(){let done=state.quests.filter(q=>q.done).length;$("#todaySummary").innerHTML=state.quests.slice(0,3).map(q=>`<div class="summary-quest"><span>${q.icon} ${q.title}</span><b>${q.done?"DONE":"+"+q.xp+" XP"}</b></div>`).join("")+`<p class="muted small">${done}/${state.quests.length} quests complete today</p>`;$("#questList").innerHTML=state.quests.map(q=>`<div class="quest ${q.done?"done":""}"><div class="quest-icon">${q.icon}</div><div class="quest-info"><b>${q.title}</b><small>${q.desc}</small></div><div class="reward">+${q.xp} XP<br>+${q.coins} ◈</div><button class="claim" data-quest="${q.id}" ${q.done?"disabled":""}>${q.done?"CLAIMED":"COMPLETE"}</button></div>`).join("");}
const items=[{id:"shadow",name:"Shadow cloak",desc:"A dark, clean battle-ready outfit.",icon:"🧥",cost:100,color:"#252c40"},{id:"azure",name:"Azure aura",desc:"A bright energy effect for your avatar.",icon:"💠",cost:150,color:"#243e78"},{id:"crimson",name:"Crimson style",desc:"A bold crimson outfit color.",icon:"🟥",cost:125,color:"#7c2638"},{id:"silver",name:"Silver hair",desc:"A silver hair color option.",icon:"⚔️",cost:90,color:"#d7d9e4"},{id:"headband",name:"Warrior headband",desc:"A classic headband accessory.",icon:"🥷",cost:80,color:"#243e78"},{id:"emerald",name:"Emerald style",desc:"An emerald outfit color.",icon:"🟩",cost:125,color:"#28745f"}];
function renderShop(){$("#shopGrid").innerHTML=items.map(it=>{let owned=state.owned.includes(it.id);return `<article class="shop-item"><div class="item-art">${it.icon}</div><h3>${it.name}</h3><p>${it.desc}</p><div class="reward">${it.cost} COINS</div><button class="claim" data-buy="${it.id}" ${owned||state.coins<it.cost?"disabled":""}>${owned?"OWNED":state.coins<it.cost?"NOT ENOUGH COINS":"PURCHASE"}</button></article>`}).join("");}
function tab(id){$$(".view").forEach(v=>v.classList.toggle("active",v.id===id));$$(".tab").forEach(b=>b.classList.toggle("active",b.dataset.tab===id));}
document.addEventListener("click",e=>{let t=e.target.closest("[data-tab]");if(t)tab(t.dataset.tab);let g=e.target.closest("[data-goto]");if(g)tab(g.dataset.goto);let q=e.target.closest("[data-quest]");if(q){let quest=state.quests.find(x=>x.id===q.dataset.quest);if(quest&&!quest.done){quest.done=true;gain(quest.xp,quest.coins);state.completed++;let d=today();if(state.lastCompletedDate!==d){let y=new Date();y.setDate(y.getDate()-1);state.streak=state.lastCompletedDate===y.toLocaleDateString("en-CA")?state.streak+1:1;state.lastCompletedDate=d;}save();toast("Quest complete! Rewards claimed.");}}let up=e.target.closest("[data-stat]");if(up&&state.points>0){state.stats[up.dataset.stat]++;state.points--;save();toast(up.dataset.stat+" upgraded!");}let buy=e.target.closest("[data-buy]");if(buy){let it=items.find(x=>x.id===buy.dataset.buy);if(it&&!state.owned.includes(it.id)&&state.coins>=it.cost){state.coins-=it.cost;state.owned.push(it.id);if(it.id==="shadow"){state.look.outfitColor=it.color;state.equipped=it.name;}if(it.id==="azure"){state.look.accessory="glow";state.equipped=it.name;}if(it.id==="crimson"||it.id==="emerald"){state.look.outfitColor=it.color;state.equipped=it.name;}if(it.id==="silver")state.look.hairColor=it.color;if(it.id==="headband")state.look.accessory="headband";save();toast(it.name+" purchased and equipped!");}}});
function readLookControls(){
  state.look={...state.look,hair:$("#hairSelect").value,hairColor:$("#hairColor").value,accessory:$("#accessorySelect").value,
    outfit:$("#outfitSelect").value,aura:$("#auraSelect").value,eyes:$("#eyeSelect").value,skin:$("#skinSelect").value,weapon:$("#weaponSelect").value};
  avatar($("#mainAvatar"));avatar($("#dashAvatar"));setPortraitArt();
  const scene=$("#portraitScene");if(scene){scene.dataset.aura=state.look.aura;scene.dataset.eyes=state.look.eyes;scene.dataset.skin=state.look.skin;}
  const art=$("#mainAvatarArt");if(art){art.dataset.outfit=state.look.outfit;art.dataset.hairColor=state.look.hairColor;art.dataset.eyes=state.look.eyes;art.dataset.skin=state.look.skin;art.dataset.weapon=state.look.weapon;}
  $("#formTag").textContent=state.look.aura.toUpperCase()+" AWAKENING";
  $("#portraitTitle").textContent=rank()+" HUNTER";
  $$("[data-outfit-choice]").forEach(b=>b.classList.toggle("selected",b.dataset.outfitChoice===state.look.outfit));
  $$("[data-aura-choice]").forEach(b=>b.classList.toggle("selected",b.dataset.auraChoice===state.look.aura));
  localStorage.setItem("levelingUpSave",JSON.stringify(state));
}
["hairSelect","hairColor","accessorySelect","outfitSelect","auraSelect","eyeSelect","skinSelect","weaponSelect"].forEach(id=>$("#"+id).addEventListener("change",readLookControls));
document.addEventListener("click",e=>{
  const outfit=e.target.closest("[data-outfit-choice]");if(outfit){$("#outfitSelect").value=outfit.dataset.outfitChoice;readLookControls();}
  const aura=e.target.closest("[data-aura-choice]");if(aura){$("#auraSelect").value=aura.dataset.auraChoice;readLookControls();}
});
$("#nameInput").addEventListener("input",e=>{state.name=e.target.value||"PLAYER";$("#displayName").textContent=state.name.toUpperCase();localStorage.setItem("levelingUpSave",JSON.stringify(state));});
$("#saveLook").addEventListener("click",()=>{state.name=$("#nameInput").value.trim()||"PLAYER";readLookControls();save();toast("Hunter appearance saved.");});
$("#refreshQuests").addEventListener("click",()=>{if(state.questDate===today()){toast("Your daily quests are already active. New quests arrive tomorrow.");return;}ensureQuests();render();});
$("#resetGame").addEventListener("click",()=>{if(confirm("Reset all RPG progress, character settings, coins and quests? This cannot be undone.")){localStorage.removeItem("levelingUpSave");state={...defaultState,stats:{...defaultState.stats},look:{...defaultState.look},owned:[],quests:[]};ensureQuests();save();tab("dashboard");toast("Game data reset.");}});
ensureQuests();render();tab("character");
// Preview-style gallery controls: reuse the existing saved appearance model.
document.addEventListener("click",e=>{
  const h=e.target.closest("[data-hair-choice]");
  if(h){$("#hairSelect").value=h.dataset.hairChoice;readLookControls();$$("[data-hair-choice]").forEach(x=>x.classList.toggle("selected",x===h));}
  const c=e.target.closest("[data-color-choice]");
  if(c){$("#hairColor").value=c.dataset.colorChoice;readLookControls();$$("[data-color-choice]").forEach(x=>x.classList.toggle("selected",x===c));}
});
