/* Credential chips and the homepage rating showcase.
   Chips copy SI numbers already printed on the card. The showcase only
   rotates firms passed in window.SHOWCASE (real Google ratings from the page). */
(function(){
  function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
  var cards=document.querySelectorAll("div.card");
  for(var i=0;i<cards.length;i++){
    var node=cards[i];
    if(node.querySelector(".cred"))continue;
    var h=node.querySelector("h3");
    if(!h)continue;
    var ids=[], seen={}, m, re=/SI #(\d+)/g, text=node.textContent;
    while((m=re.exec(text))){if(!seen[m[1]]){seen[m[1]]=1;ids.push(m[1])}}
    if(!ids.length)continue;
    var el=document.createElement("span");
    el.className="cred";
    el.textContent="SI #"+ids[0]+(ids.length>1?" · +"+(ids.length-1)+" more":"");
    el.title="MassDEP System Inspector numbers on this listing: "+ids.map(function(id){return "SI #"+id}).join(", ");
    h.insertAdjacentElement("afterend", el);
  }
  var row, rows=document.querySelectorAll("th");
  for(var r=0;r<rows.length;r++){if(/SI number/i.test(rows[r].textContent)){row=rows[r];break}}
  if(row){
    var td=row.nextElementSibling, h1=document.querySelector("h1");
    if(td&&h1&&!h1.parentNode.querySelector(".cred")){
      var chip=document.createElement("span");
      chip.className="cred";
      chip.textContent="SI "+td.textContent.replace(/\s+/g," ").trim();
      h1.insertAdjacentElement("afterend", chip);
    }
  }

  var root=document.getElementById("showcase");
  var data=window.SHOWCASE||[];
  if(!root||!data.length)return;
  var slots=root.querySelectorAll("[data-slot]");
  if(!slots.length)return;
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  function renderCard(f){
    var more=f.more?(" · +"+(f.more)+" more"):"";
    var pct=Math.round((Number(f.rating)/5)*100);
    var reviews=Number(f.reviews).toLocaleString("en-US");
    var rating=Number(f.rating).toFixed(1);
    return '<a class="pcard" href="'+esc(f.href)+'"><span class="pcard-top"><span class="pname">'+esc(f.name)+'</span><span class="cred">SI #'+esc(f.si)+more+'</span></span><span class="pmeta">Title 5 inspection · '+esc(f.town)+'</span><span class="pmeta"><i class="stars" style="--r:'+pct+'%" aria-hidden="true">★★★★★</i> '+rating+' · '+reviews+' Google reviews</span></a>';
  }
  function pick(n){
    var a=data.slice(), i, j, t;
    for(i=a.length-1;i>0;i--){j=Math.floor(Math.random()*(i+1));t=a[i];a[i]=a[j];a[j]=t}
    return a.slice(0,n);
  }
  function fill(list){
    for(var i=0;i<slots.length;i++){if(list[i])slots[i].innerHTML=renderCard(list[i])}
  }
  fill(pick(slots.length));
  setInterval(function(){fill(pick(slots.length))}, 6000);
})();
