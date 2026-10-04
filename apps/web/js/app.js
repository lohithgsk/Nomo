
const R=[
["Nonna Fornace","Italian","Downtown","$$",4.7,"🍕",[["Margherita Pizza",14],["Cacio e Pepe",16],["Tiramisu",8]]],
["Tiffin Trails","Indian","Glenwood South","$$",4.8,"🍛",[["Butter Chicken Thali",15],["Masala Dosa",11],["Mango Lassi",5]]],
["Casa Marigold","Mexican","Five Points","$",4.5,"🌮",[["Al Pastor Tacos",12],["Mole Poblano",17],["Churros",7]]],
["Ramen Kaze","Japanese","Warehouse District","$$",4.6,"🍜",[["Tonkotsu Ramen",15],["Gyoza",8],["Matcha Mochi",6]]],
["Habesha Feast","Ethiopian","Cameron Village","$$",4.9,"🫓",[["Doro Wat with Injera",16],["Kitfo",18],["Veggie Combo",14]]],
["Bangkok Alley","Thai","North Hills","$$",4.4,"🍲",[["Pad Kra Pao",14],["Green Curry",15],["Mango Sticky Rice",8]]],
["Seoul Kitchen","Korean","Midtown","$$",4.6,"🥘",[["Bibimbap",14],["Korean Fried Chicken",17],["Kimchi Jjigae",13]]],
["Olive & Ember","Mediterranean","Oakwood","$$",4.5,"🥙",[["Lamb Shawarma",16],["Mezze Board",19],["Baklava",6]]],
["Smoke & Sweet","Southern BBQ","Boylan Heights","$$",4.7,"🍖",[["Pulled Pork Plate",15],["Mac & Cheese",6],["Banana Pudding",6]]],
["Dragon Steam","Chinese","Cary Town","$",4.3,"🥟",[["Soup Dumplings",12],["Dan Dan Noodles",13],["Mapo Tofu",14]]]
].map((r,i)=>({id:i,n:r[0],c:r[1],a:r[2],p:r[3],s:r[4],e:r[5],m:r[6]}));
const AD=["212 Fayetteville St","408 Glenwood Ave","1120 Bagwell Ave","301 S Blount St","2010 Clark Ave","4209 Lassiter Mill Rd","1500 Hillsborough St","615 E Davie St","118 S West St","905 Preston Rd"];
/* one visual theme per restaurant menu: bg, ink, card, accent, accent2, button text, heading font, pattern */
/* calm menu palettes: page, ink, soft shape, accent, button text, heading font */
const T=[
{bg:"#f4ede1",ink:"#3a2e26",soft:"#e6d7c0",acc:"#9c5b3f",bt:"#fff",font:"Cormorant Garamond"},
{bg:"#f4e3dc",ink:"#43272a",soft:"#ebcfc6",acc:"#a34a4f",bt:"#fff",font:"DM Serif Display"},
{bg:"#f1efe0",ink:"#2f3b2c",soft:"#dfe3c8",acc:"#c0673a",bt:"#fff",font:"Lora"},
{bg:"#f1f1ee",ink:"#222222",soft:"#e0e0da",acc:"#b23a3a",bt:"#fff",font:"Jost"},
{bg:"#efe3d0",ink:"#3b2a1a",soft:"#ddcbab",acc:"#7d6224",bt:"#fff",font:"Lora"},
{bg:"#e9f0eb",ink:"#1f3a33",soft:"#cfe0d6",acc:"#3f7a68",bt:"#fff",font:"DM Serif Display"},
{bg:"#f5f1ee",ink:"#2b2a2a",soft:"#e6dcd6",acc:"#c2564b",bt:"#fff",font:"Jost"},
{bg:"#eaf1f4",ink:"#1f3444",soft:"#d3e2ea",acc:"#3f7c9b",bt:"#fff",font:"Cormorant Garamond"},
{bg:"#24201d",ink:"#efe3d3",soft:"#3a322c",acc:"#d68a4c",bt:"#24201d",font:"DM Serif Display"},
{bg:"#2a2229",ink:"#f0e4dd",soft:"#3b303a",acc:"#d9a77c",bt:"#2a2229",font:"Cormorant Garamond"}];
const DS=[["San Marzano tomato, buffalo mozzarella and fresh basil","Pecorino Romano, black pepper and hand-cut tonnarelli","Espresso-soaked ladyfingers, mascarpone and cocoa"],
["Slow-cooked chicken in tomato butter gravy with basmati rice","Crisp rice crepe with spiced potato, sambar and chutneys","Chilled yogurt drink blended with ripe mango"],
["Marinated pork, pineapple and cilantro on corn tortillas","Chicken in a dark chile and chocolate sauce with rice","Cinnamon sugar churros with warm chocolate"],
["Rich pork broth, chashu, soft egg and scallion","Pan-seared pork dumplings with ponzu","Soft rice cake filled with sweet matcha cream"],
["Spiced chicken stew with a boiled egg, served with injera","Minced beef with mitmita and spiced butter","Lentils, greens and split peas on injera"],
["Stir-fried basil, chili and garlic with a fried egg","Coconut curry with Thai basil and bamboo shoots","Sweet coconut sticky rice with ripe mango"],
["Rice, seasoned vegetables, egg and gochujang","Twice-fried chicken glazed in sweet chili","Aged kimchi stew with tofu and pork"],
["Spiced lamb, garlic sauce and pickles in warm pita","Hummus, baba ganoush, tabbouleh and olives","Layers of filo, pistachio and honey syrup"],
["Twelve-hour smoked pork with slaw and pickles","Sharp cheddar and toasted breadcrumbs","Vanilla wafers, bananas and custard"],
["Delicate dumplings filled with pork and rich broth","Wheat noodles, chili oil, sesame and minced pork","Silken tofu in a spicy fermented bean sauce"]];
const LV=[["Beginner",1],["Novice",5],["Explorer",10],["Gourmet",15],["Connoisseur",20],["Legend",25]];
const $=id=>document.getElementById(id),esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const ld=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}},sv=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
/* Prototype storage only. Replace with FastAPI auth (hashed passwords, JWT) + MongoDB in production. */
let users=ld("nomo_users",{}),rests=ld("nomo_rests",{}),res=ld("nomo_res",[]),cart=ld("nomo_cart",{rid:null,items:{}}),me=ld("nomo_me",null),rme=ld("nomo_rme",null),cuisine="All",cur=null,mode="in",tt;
let posts=ld("nomo_posts",[
{id:1,u:"Priya S.",r:"Tiffin Trails",d:"Masala Dosa",t:"Crackly edges and the chutneys are unreal.",by:[],b:14,re:[{u:"Marcus",t:"Adding this to my roadmap."}]},
{id:2,u:"Marcus T.",r:"Habesha Feast",d:"Kitfo",t:"Ask for it mild first. Worth the detour.",by:[],b:9,re:[]},
{id:3,u:"Jules A.",r:"Ramen Kaze",d:"Tonkotsu Ramen",t:"Broth tastes like it simmered for days.",by:[],b:21,re:[]}]);
const U=()=>me&&users[me],toast=m=>{const t=$("ts");t.textContent=m;t.classList.add("show");clearTimeout(tt);tt=setTimeout(()=>t.classList.remove("show"),2600)};
const lvl=n=>LV.reduce((a,l,k)=>n>=l[1]?k:a,-1);
async function hash(s){try{const b=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(s));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join("")}catch(e){return btoa(s)}}

/* theme */
function theme(t){document.documentElement.dataset.theme=t;$("th").textContent=t==="dark"?"☀️":"🌙";sv("nomo_theme",t)}
$("th").onclick=()=>theme(document.documentElement.dataset.theme==="dark"?"light":"dark");
theme(ld("nomo_theme",matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light"));

/* account menu */
function menu(){const u=U(),r=rests[rme];$("um").innerHTML=r?`<p><b>${esc(r.n)}</b><br>Code ${esc(r.code)}</p><button data-a="dash">🏪 Dashboard</button><button data-a="out">🚪 Sign out</button>`:u?`<p><b>${esc(u.fn)} ${esc(u.ln)}</b><br>${esc(u.email)}</p><button data-a="set">⚙️ Settings</button><button data-a="out">🚪 Sign out</button>`:`<p>Not signed in</p><button data-a="in">Log in</button><button data-a="up">Sign up</button>`}
$("ub").onclick=e=>{e.stopPropagation();menu();$("um").classList.toggle("open")};
addEventListener("click",()=>$("um").classList.remove("open"));
$("um").onclick=e=>{const a=e.target.dataset.a;if(!a)return;if(a==="set")location.href="profile.html";else if(a==="dash")location.href="dash.html";else if(a==="out"){me=null;rme=null;sv("nomo_me",null);sv("nomo_rme",null);location.reload()}else auth(a,"c")};

/* auth: customer or restaurant */
let role="c";
function auth(m,r){if(r)role=r;mode=m;if(!$("ad"))return;$("ae").textContent="";
 document.querySelectorAll("#rl .chip").forEach(c=>c.classList.toggle("on",c.dataset.role===role));
 document.querySelectorAll("#mt .chip").forEach(c=>c.classList.toggle("on",c.dataset.m===m));
 $("as").textContent=m==="in"?"Log in":"Create account";
 const f=(id,l,t="text",x="")=>`<div class="${x}"><label for="${id}">${l}</label><input id="${id}" type="${t}" autocomplete="off"></div>`,pw=f("pw","Password (6+ characters)","password","full");let h;
 if(role==="c")h=(m==="up"?f("fn","First name")+f("ln","Last name")+f("ag","Age","number")+`<div><label for="gn">Gender</label><select id="gn"><option>Female</option><option>Male</option><option>Non-binary</option><option>Prefer not to say</option></select></div>`+f("co","Country of residence","text","full"):"")+f("em","Email","email","full")+pw;
 else h=m==="up"?f("rn","Restaurant name","text","full")+f("rc","Restaurant code (your unique ID)")+`<div><label for="rcu">Cuisine type</label><select id="rcu">${[...new Set(R.map(r=>r.c))].map(c=>`<option>${c}</option>`).join("")}<option>Other</option></select></div>`+f("ra","Address","text","full")+f("rp","Phone","tel")+f("ro","Owner or manager")+f("em","Business email","email","full")+pw:f("rc","Restaurant code","text","full")+pw;
 $("af").innerHTML=h;if(!$("ad").open)$("ad").showModal()}
document.querySelectorAll("#rl .chip").forEach(c=>c.onclick=()=>auth(mode,c.dataset.role));
document.querySelectorAll("#mt .chip").forEach(c=>c.onclick=()=>auth(c.dataset.m));$("ax").onclick=()=>$("ad").close();
$("as").onclick=async()=>{const v=id=>($(id)?.value||"").trim(),e=$("ae");
 if($("pw").value.length<6)return e.textContent="Password needs at least 6 characters.";
 const h=await hash($("pw").value),ok=/^\S+@\S+\.\S+$/;
 if(role==="r"){const c=v("rc").toUpperCase();if(!c)return e.textContent="Enter your restaurant code.";
  if(mode==="in"){if(!rests[c]||rests[c].h!==h)return e.textContent="Restaurant code or password is incorrect."}
  else{const em=v("em").toLowerCase();if(rests[c])return e.textContent="That restaurant code is already registered.";
   if(!v("rn")||!v("ra")||!v("ro")||!ok.test(em))return e.textContent="Fill in name, address, owner and a valid email.";
   rests[c]={code:c,n:v("rn"),cu:$("rcu").value,ad:v("ra"),ph:v("rp"),ow:v("ro"),email:em,h};sv("nomo_rests",rests)}
  rme=c;me=null;sv("nomo_rme",c);sv("nomo_me",null);sv("nomo_welcome",rests[c].n+"!");location.href="dash.html";return}
 const em=v("em").toLowerCase();if(!ok.test(em))return e.textContent="Enter a valid email address.";
 if(mode==="in"){if(!users[em]||users[em].h!==h)return e.textContent="Email or password is incorrect."}
 else{if(users[em])return e.textContent="That email already has an account. Log in instead.";
  if(!v("fn")||!v("ln")||!v("co")||!(+v("ag")>0))return e.textContent="Fill in your name, age and country.";
  users[em]={fn:v("fn"),ln:v("ln"),ag:+v("ag"),gn:$("gn").value,co:v("co"),email:em,h,st:[],no:"NM"+Math.floor(1e6+Math.random()*9e6),iss:new Date().toLocaleDateString()};sv("nomo_users",users)}
 me=em;rme=null;sv("nomo_me",em);sv("nomo_rme",null);$("ad").close();location.reload()};
$("cta")?.addEventListener("click",()=>U()?location.href="explore.html":auth("up","c"));

/* explore */
function explore(){const cs=["All",...new Set(R.map(r=>r.c))],q=$("q").value.toLowerCase(),seen=new Set((U()?.st||[]).map(s=>s.id)),em=c=>c==="All"?"🍽️":R.find(r=>r.c===c).e;
 $("chips").innerHTML=cs.map(c=>`<button class="chip ${c===cuisine?"on":""}" data-c="${c}">${em(c)} ${c}</button>`).join("");
 const f=R.filter(r=>(cuisine==="All"||r.c===cuisine)&&(r.n+r.c+r.a+r.m.map(m=>m[0]).join()).toLowerCase().includes(q));
 $("rg").innerHTML=f.length?f.map(r=>{const t=T[r.id];return`<button class="card rest" data-id="${r.id}"><div class="rt" style="background:radial-gradient(circle at 70% 30%,${t.soft},${t.bg})">${r.e}</div><h3>${r.n}</h3><p style="margin:0 0 10px;color:var(--mut)">${r.a} · ${r.p} · ★ ${r.s}</p><span class="tag">${r.c}</span>${seen.has(r.id)?'<span class="tag g">Stamped</span>':""}<p style="margin:10px 0 0;font-weight:800;color:var(--red)">View menu</p></button>`}).join(""):'<p class="sub">Nothing matches yet. Try another cuisine or clear the search.</p>'}
$("chips")?.addEventListener("click",e=>{const b=e.target.closest("[data-c]");if(b){cuisine=b.dataset.c;explore()}});if($("q"))$("q").oninput=explore;
$("rg")?.addEventListener("click",e=>{const b=e.target.closest(".rest");if(b)location.href="menu.html?id="+b.dataset.id});

/* menu page: opens as its own page with a theme per restaurant */
let rsv={open:false,d:0,sz:2,t:null};
const days=()=>[0,1,2].map(d=>{const x=new Date();x.setDate(x.getDate()+d);return x.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})});
const slotsFor=(id,d)=>Array.from({length:10},(_,i)=>{const m=1020+i*30,h=Math.floor(m/60);return{t:`${h>12?h-12:h}:${m%60?"30":"00"} PM`,full:(id*7+d*3+i*5)%4===0}});
function menuPage(){const id=+new URLSearchParams(location.search).get("id"),r=R[id],v=$("v-menu");if(!r){location.href="explore.html";return}
 if(cur!==r){cur=r;rsv={open:false,d:0,sz:2,t:null}}
 const t=T[id],it=cart.rid===id?cart.items:{},ds=days(),sl=slotsFor(id,rsv.d),has=Object.keys(cart.items).length;
 v.innerHTML=`<div class="mp" style="--mbg:${t.bg};--mi:${t.ink};--ma:${t.acc};--soft:${t.soft};--bt:${t.bt};--mf:'${t.font}',Georgia,serif;background:radial-gradient(circle at 10% 100%,${t.soft},transparent 42%),${t.bg}">
 <div class="mh"><a class="bk" href="explore.html">← Back to explore</a><div class="mem">${r.e}</div><h1>${r.n}</h1>
 <div class="mm"><span>${AD[id]}, ${r.a}, Raleigh, NC</span><span>${r.c}</span><span>${r.p}</span><span>★ ${r.s}</span></div>
 <button class="mb" id="rb">${rsv.open?"Hide time slots":"Reserve a table"}</button>${has?' <a class="mb o" href="cart.html" style="text-decoration:none;display:inline-block;margin-left:8px">View cart</a>':""}</div>
 ${rsv.open?`<div class="mr"><h2 style="font-size:2rem">Reserve a table</h2><div class="rowc">${ds.map((d,i)=>`<button class="mchip ${i===rsv.d?"on":""}" data-d="${i}">${d}</button>`).join("")}</div>
 <label>Party size <select id="rz">${[1,2,3,4,5,6,8].map(n=>`<option ${n===rsv.sz?"selected":""}>${n}</option>`).join("")}</select></label>
 <h3 style="margin-top:18px;font-size:1.5rem">Available time slots</h3><div class="rowc">${sl.map(s=>`<button class="mchip ${s.t===rsv.t?"on":""}" ${s.full?"disabled":""} data-t="${s.t}">${s.t}${s.full?" (full)":""}</button>`).join("")}</div><button class="mb" id="rc">Confirm reservation</button></div>`:""}
 <div class="mg"><h2 style="font-size:2.6rem">Menu</h2><div class="ml">${r.m.map((m,k)=>{const q=it[m[0]]?.q||0;return`<div class="mi"><h3>${m[0]}</h3><span class="pr">$${m[1]}</span><p>${DS[id][k]}</p><div class="act">${q?`<div class="qs"><button data-q="${k}|-1" aria-label="Remove one">−</button><b>${q}</b><button data-q="${k}|1" aria-label="Add one">+</button></div>`:`<button class="add" data-add="${k}">Add to cart</button>`}</div></div>`}).join("")}</div></div></div>`}
function book(){const u=U();if(!u)return rme?toast("Log in as a customer to reserve a table"):auth("in","c");if(!rsv.t)return toast("Pick a time slot first");
 res.unshift({id:Date.now(),rn:cur.n,user:me,name:u.fn+" "+u.ln,date:days()[rsv.d],t:rsv.t,sz:rsv.sz});sv("nomo_res",res);toast(`Table for ${rsv.sz} at ${cur.n}, ${rsv.t}`);rsv.t=null;menuPage()}

/* cart */
const TAX=.0725,FEE=1.99;let tip=.1,done=null;
const money=n=>"$"+n.toFixed(2);
const bill=()=>{const sub=Object.values(cart.items).reduce((a,x)=>a+x.p*x.q,0),tax=sub*TAX,tp=sub*tip;return{sub,tax,tp,total:sub+tax+FEE+tp}};
const cSave=()=>{sv("nomo_cart",cart);const n=Object.values(cart.items).reduce((a,x)=>a+x.q,0),b=$("cn");b.style.display=n?"grid":"none";b.textContent=n};
function chg(k,d){const m=cur.m[k];if(cart.rid!==cur.id){if(Object.keys(cart.items).length&&!confirm("Your cart has dishes from another restaurant. Start a new cart?"))return;cart={rid:cur.id,items:{}}}
 const x=cart.items[m[0]]||(cart.items[m[0]]={p:m[1],q:0});x.q+=d;if(x.q<=0)delete cart.items[m[0]];cSave();menuPage()}
function cq(n,d){const x=cart.items[n];if(!x)return;x.q+=d;if(x.q<=0)delete cart.items[n];if(!Object.keys(cart.items).length)cart.rid=null;cSave();cartPage()}
function cartPage(){const v=$("v-cart"),it=Object.entries(cart.items);
 if(done){const d=done;v.innerHTML=`<div class="card done"><div style="font-size:4rem">✅</div><h2 class="t" style="font-size:3rem">Order placed</h2><p class="sub" style="margin:10px auto 20px">Order <b>#${d.no}</b> from <b>${esc(d.r)}</b> is being prepared and will be ready in about 25 minutes.${d.stamped?" A new stamp was added to your passport.":""}</p>
 ${d.items.map(i=>`<div class="sl"><span>${i[1]} × ${esc(i[0])}</span><span>${money(i[1]*i[2])}</span></div>`).join("")}<div class="sl t"><span>Total paid</span><span>${money(d.total)}</span></div>
 <p style="margin-top:22px"><a class="btn" href="passport.html" style="text-decoration:none;display:inline-block">View my passport</a> <a class="btn o" href="explore.html" style="text-decoration:none;display:inline-block">Keep exploring</a></p></div>`;return}
 if(!it.length){v.innerHTML=`<h2 class="t">Your cart</h2><p class="sub">Your cart is empty. Open a restaurant menu and add dishes.</p><a class="btn" href="explore.html" style="text-decoration:none;display:inline-block">Browse restaurants</a>`;return}
 const r=R[cart.rid],b=bill();
 v.innerHTML=`<h2 class="t">Your cart</h2><p class="sub">From <b>${esc(r.n)}</b>, ${AD[r.id]}, ${r.a}</p><div class="cg"><div>
 ${it.map(([n,x])=>`<div class="ci"><div class="cie">${r.e}</div><div><h3>${esc(n)}</h3><small style="color:var(--mut)">${money(x.p)} each</small></div><div class="cq"><button data-cq="${esc(n)}|-1" aria-label="Remove one">−</button><b>${x.q}</b><button data-cq="${esc(n)}|1" aria-label="Add one">+</button></div><b class="lp">${money(x.p*x.q)}</b></div>`).join("")}
 <p style="margin-top:16px"><a href="menu.html?id=${r.id}" style="color:var(--red);font-weight:800">+ Add more from ${esc(r.n)}</a></p></div>
 <aside class="card sum"><h3 style="margin-bottom:12px">Order summary</h3>
 ${it.map(([n,x])=>`<div class="sl"><span>${x.q} × ${esc(n)}</span><span>${money(x.p*x.q)}</span></div>`).join("")}
 <div class="sl" style="border-top:1px solid var(--line);margin-top:8px;padding-top:10px"><span>Subtotal</span><span>${money(b.sub)}</span></div>
 <div class="sl"><span>Sales tax (7.25%)</span><span>${money(b.tax)}</span></div><div class="sl"><span>Service fee</span><span>${money(FEE)}</span></div>
 <div class="sl"><span>Tip</span><span>${money(b.tp)}</span></div>
 <div class="rowc" style="display:flex;gap:6px;flex-wrap:wrap;margin:8px 0">${[0,.1,.15,.2].map(p=>`<button class="chip ${p===tip?"on":""}" data-tip="${p}">${p?p*100+"%":"No tip"}</button>`).join("")}</div>
 <div class="sl t"><span>Total</span><span>${money(b.total)}</span></div>
 <button class="btn" id="po" style="width:100%;margin-top:14px">Place order</button><p style="color:var(--mut);font-size:.8rem;margin:10px 0 0">Demo only: no real payment is taken.</p></aside></div>`}
function order(){const u=U();if(!u)return rme?toast("Log in as a customer to order"):auth("in","c");
 const r=R[cart.rid],b=bill(),stamped=u.st.length<25,bf=lvl(u.st.length);
 done={no:"NM-"+Math.floor(1e4+Math.random()*9e4),r:r.n,items:Object.entries(cart.items).map(([n,x])=>[n,x.q,x.p]),total:b.total,stamped};
 if(stamped){u.st.push({id:r.id,n:r.n,e:r.e,d:new Date().toLocaleDateString(),ts:Date.now()});sv("nomo_users",users);const a=lvl(u.st.length);if(a>bf)toast("Level up: "+LV[a][0]+"!")}
 cart={rid:null,items:{}};cSave();cartPage();scrollTo(0,0)}
document.addEventListener("click",e=>{const t=e.target.closest("button");if(!t)return;
 if(t.id==="rb"){rsv.open=!rsv.open;menuPage()}
 else if(t.dataset.d!==undefined){rsv.d=+t.dataset.d;rsv.t=null;menuPage()}
 else if(t.dataset.t){rsv.t=t.dataset.t;menuPage()}
 else if(t.id==="rc")book();
 else if(t.dataset.add!==undefined)chg(+t.dataset.add,1);
 else if(t.dataset.q){const[k,d]=t.dataset.q.split("|");chg(+k,+d)}
 else if(t.dataset.cq){const i=t.dataset.cq.lastIndexOf("|");cq(t.dataset.cq.slice(0,i),+t.dataset.cq.slice(i+1))}
 else if(t.dataset.tip!==undefined){tip=+t.dataset.tip;cartPage()}
 else if(t.id==="po")order();
 else if(t.dataset.bk)flipBook(+t.dataset.bk);
 else if(t.dataset.f)t.dataset.f==="rest"?auth("up","r"):auth("in","c")});
document.addEventListener("change",e=>{if(e.target.id==="rz")rsv.sz=+e.target.value});

/* restaurant dashboard */
function dash(){const r=rests[rme],v=$("v-dash");
 if(!r){v.innerHTML=`<h2 class="t">Restaurant dashboard</h2><p class="sub">Log in with your restaurant code to see your details and reservations.</p><button class="btn" onclick="auth('in','r')">Restaurant log in</button>`;return}
 const f=(id,l,val)=>`<div><label for="d${id}">${l}</label><input id="d${id}" value="${esc(val)}"></div>`,rs=res.filter(x=>x.rn.toLowerCase()===r.n.toLowerCase());
 v.innerHTML=`<h2 class="t">${esc(r.n)}</h2><p class="sub">Restaurant code ${esc(r.code)} · ${esc(r.email)}. Menu management is coming in a future update.</p>
 <div class="card"><div class="f2">${f("n","Restaurant name",r.n)}${f("cu","Cuisine type",r.cu)}${f("ad","Address",r.ad)}${f("ph","Phone",r.ph)}${f("ow","Owner or manager",r.ow)}</div><p style="margin:16px 0 0"><button class="btn" id="ds">Save changes</button></p></div>
 <h2 class="t" style="font-size:2.2rem;margin-top:40px">Reservations</h2>${rs.length?rs.map(x=>`<div class="rv"><b>${esc(x.name)}</b><span>${esc(x.date)}, ${esc(x.t)} · party of ${x.sz}</span></div>`).join(""):'<p class="sub">No reservations yet. Bookings made under your restaurant name appear here.</p>'}`;
 $("ds").onclick=()=>{const g=id=>$("d"+id).value.trim();if(!g("n")||!g("ad"))return toast("Name and address are required");Object.assign(r,{n:g("n"),cu:g("cu"),ad:g("ad"),ph:g("ph"),ow:g("ow")});sv("nomo_rests",rests);toast("Changes saved");dash()}}

/* passport stamps: one hand-inked design per restaurant */
const MON=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
const fd=s=>{const d=new Date(s.ts||s.d);return isNaN(d)?"2026":String(d.getDate()).padStart(2,"0")+" "+MON[d.getMonth()]+" "+d.getFullYear()};
const INK=["#1d3d9c","#c62828","#1f8a4c","#c62828","#6a2fa0","#1f8a4c","#1d3d9c","#0f7b8c","#8b2a14","#c62828"];
const KIND=["c","c","n","q","o","h","c","a","r","c"],VAR=["double","dash","","","","","band","","","coin"];
const EMB=['<path d="M-22-18Q0-30 22-18L0 26Z"/><circle cx="-6" cy="-8" r="3.5" fill="currentColor"/><circle cx="8" cy="-3" r="3.5" fill="currentColor"/><circle cy="10" r="3" fill="currentColor"/>',
'<path d="M0 22C-14 10-14-8 0-22C14-8 14 10 0 22Z"/><path d="M-4 22C-26 16-30-6-20-16C-14-6-10 8-4 22ZM4 22C26 16 30-6 20-16C14-6 10 8 4 22Z"/>',
'<circle r="9"/>'+[...Array(8)].map((_,i)=>`<path d="M0-15V-24" transform="rotate(${i*45})"/>`).join(""),
'<circle cy="-6" r="13" fill="currentColor"/><path d="M-26 18q6.5-8 13 0t13 0t13 0"/><path d="M-26 27q6.5-8 13 0t13 0t13 0"/>',
'<circle r="24"/><circle r="15"/><circle r="6" fill="currentColor"/><path d="M-24 0H-15M15 0H24M0-24V-15M0 15V24"/>',
'<path d="M0-26L9-8H-9ZM-14-6H14L19 8H-19ZM-22 10H22V24H-22Z"/>',
'<circle r="22"/><path d="M0-22A11 11 0 0 1 0 0A11 11 0 0 0 0 22"/><circle cy="-11" r="3" fill="currentColor"/>',
'<path d="M-20 24V-4A20 20 0 0 1 20-4V24Z"/><path d="M-10 24V0A10 10 0 0 1 10 0V24"/>',
'<path d="M0-26C10-10 22-4 18 10C14 24-14 24-18 10C-20 0-8-6 0-26Z"/><path d="M0 22C-6 16-4 8 0 4C4 8 6 16 0 22Z"/>',
'<path d="M-24 8Q0-30 24 8Q0 24-24 8Z"/><path d="M-12 0l4 8M0-4v12M12 0l-4 8"/>'];
function stamp(id,ds,u){const r=R[id],c=INK[id],k=KIND[id],v=VAR[id],x=t=>t.replace(/&/g,"&amp;"),nm=x(r.n.toUpperCase()),cu=x(r.c.toUpperCase()),ar=cu+" · RALEIGH",
 em=(a,b,s)=>`<g transform="translate(${a} ${b}) scale(${s})" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${EMB[id]}</g>`,
 tx=(a,b,fs,t,w=700)=>`<text x="${a}" y="${b}" text-anchor="middle" font-size="${fs}" font-weight="${w}" letter-spacing="1">${t}</text>`,
 dt=(b,fs,a=100)=>`<text x="${a}" y="${b}" text-anchor="middle" font-family="'Courier New',monospace" font-size="${fs}" font-weight="700">${ds}</text>`,
 ln=(w,extra="")=>`fill="none" stroke="currentColor" stroke-width="${w}" ${extra}`;let b="";
 if(k==="c")b=`<circle cx="100" cy="100" r="92" ${ln(v==="coin"?7:4,v==="dash"?'stroke-dasharray="3 5"':v==="coin"?'stroke-dasharray="9 5"':"")}/><circle cx="100" cy="100" r="84" ${ln(1.5)}/><circle cx="100" cy="100" r="55" ${ln(1.5,v==="dash"?'stroke-dasharray="2 4"':"")}/>
 <path id="${u}t" d="M38 100A62 62 0 0 1 162 100" fill="none"/><path id="${u}b" d="M22 100A78 78 0 0 0 178 100" fill="none"/>
 <text font-size="14" font-weight="800" letter-spacing="1.5" text-anchor="middle"><textPath href="#${u}t" startOffset="50%">${nm}</textPath></text><text font-size="10.5" font-weight="700" letter-spacing="1" text-anchor="middle"><textPath href="#${u}b" startOffset="50%">${ar}</textPath></text>
 ${v==="band"?`${em(100,74,.55)}<rect x="46" y="94" width="108" height="26" ${ln(2.5)}/>${dt(112,14)}`:`${em(100,82,.8)}${dt(126,13)}`}`;
 else if(k==="o")b=`<ellipse cx="100" cy="100" rx="94" ry="70" ${ln(4)}/><ellipse cx="100" cy="100" rx="86" ry="62" ${ln(1.5)}/>${tx(100,58,12,nm,800)}${em(100,88,.5)}${dt(122,15)}${tx(100,146,10,cu)}`;
 else if(k==="n")b=`<path d="M24 40H176A10 10 0 0 0 186 50V150A10 10 0 0 0 176 160H24A10 10 0 0 0 14 150V50A10 10 0 0 0 24 40Z" ${ln(4)}/>${tx(100,66,15,nm,800)}<path d="M28 76H172" ${ln(1.5,'stroke-dasharray="3 3"')}/>${em(52,110,.6)}${dt(108,14,122)}${tx(58,148,10,cu)}<rect x="128" y="133" width="46" height="18" ${ln(2,'stroke-dasharray="3 2"')}/>${tx(151,146,10,"N° "+String(id+1).padStart(3,"0"))}`;
 else if(k==="q")b=`<rect x="16" y="16" width="168" height="168" rx="8" ${ln(5)}/><rect x="26" y="26" width="148" height="148" ${ln(1.5)}/>${tx(100,56,16,nm,800)}${em(100,100,.85)}${dt(146,14)}${tx(100,166,10,"RALEIGH · N.C.")}`;
 else if(k==="h")b=`<polygon points="60,8 140,8 192,60 192,140 140,192 60,192 8,140 8,60" ${ln(4)}/><polygon points="66,21 134,21 179,66 179,134 134,179 66,179 21,134 21,66" ${ln(1.5)}/>${tx(100,56,13,nm,800)}${em(100,97,.65)}${dt(140,14)}${tx(100,160,10,cu)}`;
 else if(k==="a")b=`<path d="M22 190V92A78 78 0 0 1 178 92V190Z" ${ln(4)}/><path d="M32 180V92A68 68 0 0 1 168 92V180Z" ${ln(1.5)}/>${em(100,80,.6)}${tx(100,124,13,nm,800)}${dt(148,14)}${tx(100,168,10,cu)}`;
 else b=`<rect x="8" y="46" width="184" height="108" rx="8" ${ln(6)}/><rect x="17" y="55" width="166" height="90" rx="4" ${ln(1.5)}/>${tx(100,82,17,nm,800)}<text x="100" y="99" text-anchor="middle" font-size="10">★ ★ ★ ★ ★</text>${em(42,124,.4)}${dt(129,14,122)}`;
 return `<svg class="stm" viewBox="0 0 200 200" style="color:${c}" role="img" aria-label="${r.n} stamp, ${ds}"><g filter="url(#ink)" fill="currentColor" font-family="Nunito,system-ui,sans-serif">${b}</g></svg>`}

/* passport book with page flip */
let bs=0,flipping=false;const PER=4,POS=[[5,12,44],[51,8,42],[7,52,42],[50,50,45]];
function pageHtml(u,p){const st=u.st.slice(p*PER,p*PER+PER);
 return `<div class="pgc"><small class="pgh">VISAS</small>${st.map((s,i)=>{const k=p*PER+i,q=POS[i];return`<div class="bs" style="left:${q[0]}%;top:${q[1]}%;width:${q[2]}%;transform:rotate(${k*47%36-18}deg)">${stamp(s.id,fd(s),"b"+k)}</div>`}).join("")}${!u.st.length&&p===0?'<p class="pge">Your first stamp will land here. Place an order to get started.</p>':""}<small class="pgn">${p+1}</small></div>`}
const pgs=u=>{const P=Math.max(2,Math.ceil(u.st.length/PER));return Math.ceil(P/2)};
function bookHtml(u,first){const S=pgs(u);bs=Math.min(bs,S-1);
 return `<div class="bkw ${first?"in":""}"><div class="spread"><div class="pg l">${pageHtml(u,bs*2)}</div><div class="pg r">${pageHtml(u,bs*2+1)}</div></div>
 <div class="bkc"><button class="btn o" data-bk="-1" ${bs===0?"disabled":""}>← Previous</button><span>Pages ${bs*2+1}–${bs*2+2} of ${S*2}</span><button class="btn o" data-bk="1" ${bs>=S-1?"disabled":""}>Next →</button></div></div>`}
const renderBook=first=>{const u=U();if(u&&$("bkroot"))$("bkroot").innerHTML=bookHtml(u,first)};
function flipBook(d){const u=U();if(!u||flipping)return;const ns=bs+d;if(ns<0||ns>=pgs(u))return;
 if(matchMedia("(prefers-reduced-motion:reduce)").matches){bs=ns;renderBook();return}
 flipping=true;const sp=document.querySelector(".spread");
 sp.innerHTML=d>0?`<div class="pg l">${pageHtml(u,bs*2)}</div><div class="pg r">${pageHtml(u,ns*2+1)}</div><div class="leaf next"><div class="pg front r">${pageHtml(u,bs*2+1)}</div><div class="pg back l">${pageHtml(u,ns*2)}</div></div>`
 :`<div class="pg l">${pageHtml(u,ns*2)}</div><div class="pg r">${pageHtml(u,bs*2+1)}</div><div class="leaf prev"><div class="pg front l">${pageHtml(u,bs*2)}</div><div class="pg back r">${pageHtml(u,ns*2+1)}</div></div>`;
 const lf=sp.querySelector(".leaf");lf.getBoundingClientRect();lf.classList.add("go");
 setTimeout(()=>{bs=ns;flipping=false;renderBook()},980)}

/* passport */
function passport(){const u=U(),v=$("v-passport");
 if(!u){v.innerHTML=`<h2 class="t">Your Food Passport</h2><p class="sub">Log in or sign up as a customer to receive your passport and start collecting stamps.</p><button class="btn" onclick="auth('up','c')">Get my passport</button>`;return}
 const n=u.st.length,tried=new Set(u.st.map(s=>s.id)).size,i=lvl(n),nx=LV[i+1],nm=s=>s.toUpperCase().replace(/[^A-Z]/g,""),my=res.filter(x=>x.user===me);
 v.innerHTML=`<h2 class="t">Your Food Passport</h2><p class="sub">Your identity as a food explorer.</p>
 <div class="book"><div class="cover"><div><span class="cm">🍴</span><br><small>NOMO</small><h3>WORLD<br>FOOD<br>PASSPORT</h3><small>✦ ✦ ✦</small></div></div>
 <div class="page"><div class="ph2"><b>NOMO WORLD PASSPORT</b><span>Type P · Code NMO</span></div>
 <div class="pb"><div class="pic">${esc(u.fn[0])}${esc(u.ln[0])}</div><div class="pf">
 <div><small>SURNAME</small><b>${esc(u.ln)}</b></div><div><small>GIVEN NAMES</small><b>${esc(u.fn)}</b></div><div><small>AGE</small><b>${u.ag}</b></div><div><small>SEX</small><b>${esc(u.gn)}</b></div>
 <div><small>COUNTRY OF RESIDENCE</small><b>${esc(u.co)}</b></div><div><small>RESTAURANTS TRIED</small><b>${tried}</b></div><div><small>PASSPORT NO.</small><b>${u.no}</b></div><div><small>DATE OF ISSUE</small><b>${esc(u.iss||"2026")}</b></div><div><small>LEVEL</small><b>${i<0?"Newcomer":LV[i][0]}</b></div></div></div>
 <div class="mrz2">P&lt;NMO${nm(u.ln)}&lt;&lt;${nm(u.fn)}&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;<br>${u.no}&lt;NMO${String(u.ag).padStart(3,"0")}&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</div><div class="seal">VALID</div></div></div>
 <h2 class="t" style="margin-top:50px;font-size:2.4rem">Stamps collected</h2><p class="sub">Every order earns an ink stamp with the date you visited. Each restaurant has its own.</p>
 <div class="visa"><div class="stamps">${Array.from({length:25},(_,k)=>{const s=u.st[k];return s?`<div class="sst ${k===n-1?"new":""}" title="${esc(s.n)}, ${fd(s)}" style="transform:rotate(${k*53%30-15}deg)">${stamp(s.id,fd(s),"g"+k)}</div>`:`<div class="slot">${k+1}</div>`}).join("")}</div></div>
 <h2 class="t" style="margin-top:50px;font-size:2.4rem">Your passport book</h2><p class="sub">Flip through the pages to see your stamps the way they would look in a real passport.</p>
 <div id="bkroot">${bookHtml(u,true)}</div>
 <h2 class="t" style="margin-top:50px;font-size:2.4rem">Food Roadmap</h2><p class="sub">${nx?`${nx[1]-n} more stamp${nx[1]-n>1?"s":""} to reach ${nx[0]}.`:"You completed the expedition."}</p>
 <div class="prog"><i style="width:${n/25*100}%"></i></div><div class="lv">${LV.map((l,k)=>`<div class="${k<i?"done":k===i?"now":""}"><b>${l[0]}</b><br><small>${l[1]} stamps</small></div>`).join("")}</div>
 <h2 class="t" style="margin-top:50px;font-size:2.4rem">Table reservations</h2>${my.length?my.map(x=>`<div class="rv"><b>${esc(x.rn)}</b><span>${esc(x.date)}, ${esc(x.t)} · party of ${x.sz}</span></div>`).join(""):'<p class="sub">No reservations yet. Open a restaurant menu and tap Reserve a table.</p>'}`}

/* community */
function community(){const u=U();
 $("comp").innerHTML=u?`<h3 style="margin-bottom:12px">Start a conversation</h3><div class="f2"><div><label for="pr">Restaurant</label><select id="pr">${R.map(r=>`<option>${r.n}</option>`).join("")}</select></div><div><label for="pd">Dish you loved</label><input id="pd"></div><div class="full"><label for="pt">Why should people try it?</label><textarea id="pt" rows="2"></textarea></div></div><p style="margin:12px 0 0"><button class="btn" id="pb">Share</button></p>`:`<h3>Join the conversation</h3><p class="sub" style="margin:8px 0 14px">Log in to post, reply and like.</p><button class="btn" onclick="auth('in')">Log in</button>`;
 $("pg").innerHTML=posts.map(p=>{const on=me&&p.by.includes(me);return`<article class="card post"><small style="color:var(--red);font-weight:800">${esc(p.u)} recommends</small><h3>${esc(p.d)}</h3><small style="color:var(--mut)">at ${esc(p.r)}</small><p>${esc(p.t)}</p>${p.re.map(r=>`<div class="rep"><b>${esc(r.u)}:</b> ${esc(r.t)}</div>`).join("")}<div class="acts"><button class="sm ${on?"on":""}" data-l="${p.id}" aria-pressed="${!!on}">♥ ${p.b+p.by.length}</button><button class="sm" data-r="${p.id}">💬 Reply</button></div></article>`}).join("")}
document.addEventListener("click",e=>{const t=e.target;
 if(t.id==="pb"){const d=$("pd").value.trim(),x=$("pt").value.trim();if(!d||!x)return toast("Add a dish and a short reason");const u=U();posts.unshift({id:Date.now(),u:u.fn+" "+u.ln[0]+".",r:$("pr").value,d,t:x,by:[],b:0,re:[]});sv("nomo_posts",posts);community();toast("Posted")}
 if(t.dataset.l){if(!me)return auth("in");const p=posts.find(p=>p.id==t.dataset.l),i=p.by.indexOf(me);i<0?p.by.push(me):p.by.splice(i,1);sv("nomo_posts",posts);community()}
 if(t.dataset.r){if(!me)return auth("in");const x=prompt("Your reply");if(x&&x.trim()){posts.find(p=>p.id==t.dataset.r).re.push({u:U().fn,t:x.trim()});sv("nomo_posts",posts);community()}}});

/* settings */
function settings(){const u=U(),v=$("v-settings");if(!u){v.innerHTML=`<h2 class="t">Settings</h2><p class="sub">Log in to see and edit your details.</p><button class="btn" onclick="auth('in')">Log in</button>`;return}
 const f=(id,l,val,t="text")=>`<div><label for="s${id}">${l}</label><input id="s${id}" type="${t}" value="${esc(val)}"></div>`;
 v.innerHTML=`<h2 class="t">Settings</h2><p class="sub">Update the details shown on your passport.</p><div class="card"><div class="f2">${f("fn","First name",u.fn)}${f("ln","Last name",u.ln)}${f("ag","Age",u.ag,"number")}<div><label for="sgn">Gender</label><select id="sgn">${["Female","Male","Non-binary","Prefer not to say"].map(g=>`<option ${g===u.gn?"selected":""}>${g}</option>`).join("")}</select></div>${f("co","Country of residence",u.co)}<div><label for="sem">Email used to sign up</label><input id="sem" value="${esc(u.email)}" readonly></div></div><p style="margin:16px 0 0"><button class="btn" id="ss">Save changes</button></p></div>`;
 $("ss").onclick=()=>{const g=id=>$("s"+id).value.trim();if(!g("fn")||!g("ln")||!g("co")||!(+g("ag")>0))return toast("Fill in every field");Object.assign(u,{fn:g("fn"),ln:g("ln"),ag:+g("ag"),gn:$("sgn").value,co:g("co")});sv("nomo_users",users);toast("Changes saved")}}

/* scroll-driven food ring */
const ring=$("ring");
if(ring){
 "🍕🍣🥑🌮🍜🥐🍩🍓🥗🍔".split(/(?=\S)/u).forEach((e,i,a)=>{const s=document.createElement("span");s.textContent=e;s.style.transform=`rotate(${i*360/a.length}deg) translateY(-${window.innerWidth<500?130:190}px)`;ring.appendChild(s)});
 let k=0;addEventListener("scroll",()=>{if(!k){k=1;requestAnimationFrame(()=>{ring.style.transform=`rotate(${scrollY*.25}deg)`;k=0})}},{passive:true});
}

/* cart badge on load + a one-time welcome toast after a redirecting login */
cSave();
const _w=ld("nomo_welcome",null);
if(_w){sv("nomo_welcome",null);setTimeout(()=>toast("Welcome, "+_w),250)}
