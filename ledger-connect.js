/* Ledger "Show connections" button.
   Adds a button to every donor card (#cards .card). Nothing is drawn until a reader taps it.
   The drawing shows: this donor -> who it gave to -> other Ledger donors who gave to the same people.
   Data: ledger-links.js (built from tech-data.js, energy-data.js and everythingelse-data.js). */
(function(){
  var L = window.LEDGER_LINKS; if (!L) return;
  var here = (location.pathname.split('/').pop() || 'tech.html');
  var byId = {}; L.donors.forEach(function(d){ byId[d.id] = d; });
  var esc = function(s){ return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); };
  var money = function(n){ n = Number(n)||0; return '$' + n.toLocaleString('en-US',{minimumFractionDigits:n%1?2:0,maximumFractionDigits:2}); };
  var css = document.createElement('style');
  css.textContent =
    '.lc-btn{display:inline-block;margin:10px 0 4px;font:700 16px Inter,system-ui,sans-serif;padding:9px 16px;border-radius:999px;border:2px solid #1d5fbf;background:#fff;color:#1d5fbf;cursor:pointer}' +
    '.lc-btn.on{background:#1d5fbf;color:#fff}' +
    '.lc-panel{margin:10px 0 4px;padding:14px;border:2px solid #1d5fbf;border-radius:10px;background:#f6f9ff}' +
    '.lc-panel h4{margin:0 0 4px;font:700 18px Inter,system-ui,sans-serif}' +
    '.lc-panel .lc-sub{margin:0 0 10px;font:15px/1.45 Inter,system-ui,sans-serif;color:#44506a}' +
    '.lc-panel svg{width:100%;height:auto;display:block}' +
    '.lc-panel svg text{font-family:Inter,system-ui,sans-serif}' +
    '.lc-panel svg .lc-go{cursor:pointer}' +
    '.lc-list{margin:12px 0 0;padding-left:20px;font:16px/1.55 Inter,system-ui,sans-serif}' +
    '.lc-list li{margin:0 0 8px}' +
    '.lc-chk{display:inline-block;font:700 12px Inter,sans-serif;background:#f7e6c2;color:#6e4f0a;border-radius:8px;padding:1px 7px;margin-left:4px}' +
    '#cards .card.lc-wide{grid-column:1/-1}' +
    '.lc-note{font:13px/1.45 Inter,system-ui,sans-serif;color:#5b6475;margin-top:10px}';
  document.head.appendChild(css);

  function giftsOf(did){
    var out = [];
    Object.keys(L.recipients).forEach(function(k){
      var R = L.recipients[k], mine = R.gifts.filter(function(g){ return g.d === did; });
      if (!mine.length) return;
      var others = {};
      R.gifts.forEach(function(g){ if (g.d !== did) others[g.d] = (others[g.d]||0) + (g.a||0); });
      var amt = mine.reduce(function(s,g){ return s + (g.a||0); }, 0);
      if (Object.keys(others).length) out.push({k:k, label:R.label, amount:amt, others:others});
    });
    out.sort(function(a,b){ return b.amount - a.amount; });
    return out;
  }
  function link(did){
    var d = byId[did]; if (!d) return '#';
    return (d.page === here ? '' : d.page) + '#' + d.slug;
  }
  function draw(did){
    var me = byId[did], shared = giftsOf(did);
    if (!shared.length) return '<h4>No shared connections yet</h4><p class="lc-sub">None of the people or committees ' + esc(me.name) + ' gave to show up under another Ledger donor so far.</p>';
    var mid = shared.slice(0, 8);
    var right = {}; mid.forEach(function(r){ Object.keys(r.others).forEach(function(o){ right[o] = (right[o]||0) + 1; }); });
    var rlist = Object.keys(right).sort(function(a,b){ return right[b]-right[a] || (byId[b].total - byId[a].total); });
    var more = Math.max(0, rlist.length - 12); rlist = rlist.slice(0, 12);
    var rowH = 46, H = Math.max(mid.length, rlist.length, 1) * rowH + 30, W = 900;
    var my = H/2, midY = {}, rY = {};
    var svg = '<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Connections for '+esc(me.name)+'">';
    mid.forEach(function(r,i){ midY[r.k] = 20 + i*rowH + rowH/2 + (H - 30 - mid.length*rowH)/2; });
    rlist.forEach(function(o,i){ rY[o] = 20 + i*rowH + rowH/2 + (H - 30 - rlist.length*rowH)/2; });
    mid.forEach(function(r){ svg += '<path d="M200 '+my+' C280 '+my+' 280 '+midY[r.k]+' 340 '+midY[r.k]+'" stroke="#1d5fbf" stroke-width="3" fill="none" opacity=".75"/>';
      Object.keys(r.others).forEach(function(o){ if (rY[o]!=null) svg += '<path d="M570 '+midY[r.k]+' C620 '+midY[r.k]+' 620 '+rY[o]+' 660 '+rY[o]+'" stroke="#e3a008" stroke-width="2.5" fill="none" opacity=".6"'+(byId[o].checking?' stroke-dasharray="7 6"':'')+'/>'; }); });
    svg += '<rect x="10" y="'+(my-24)+'" width="190" height="48" rx="10" fill="#1d5fbf"/><text x="105" y="'+(my+6)+'" text-anchor="middle" font-size="16" font-weight="700" fill="#fff">'+esc(me.name.length>22?me.name.slice(0,21)+'…':me.name)+'</text>';
    mid.forEach(function(r){ var y = midY[r.k]; var lab = r.label.length>27?r.label.slice(0,26)+'…':r.label;
      svg += '<rect x="340" y="'+(y-19)+'" width="230" height="38" rx="8" fill="#fff" stroke="#1d5fbf" stroke-width="2"/><text x="455" y="'+(y+6)+'" text-anchor="middle" font-size="15" font-weight="600" fill="#14213d">'+esc(lab)+'</text>'; });
    rlist.forEach(function(o){ var y = rY[o], d = byId[o]; var lab = d.name.length>24?d.name.slice(0,23)+'…':d.name;
      svg += '<a class="lc-go" href="'+esc(link(o))+'" data-go="'+esc(o)+'"><rect x="660" y="'+(y-19)+'" width="230" height="38" rx="8" fill="#fff8e6" stroke="#e3a008" stroke-width="2"'+(d.checking?' stroke-dasharray="6 4"':'')+'/><text x="775" y="'+(y+6)+'" text-anchor="middle" font-size="15" font-weight="600" fill="#5a3d00">'+esc(lab)+'</text></a>'; });
    svg += '</svg>';
    var list = mid.map(function(r){
      var names = Object.keys(r.others).sort(function(a,b){ return r.others[b]-r.others[a]; }).map(function(o){
        var d = byId[o]; return '<a href="'+esc(link(o))+'" data-go="'+esc(o)+'">'+esc(d.name)+'</a> '+money(r.others[o])+(d.checking?'<span class="lc-chk">being checked</span>':'')+(d.page!==here?' <small>('+esc(d.industry)+')</small>':'');
      });
      return '<li><b>'+esc(r.label)+'</b>: '+esc(me.name)+' gave '+money(r.amount)+'. Also given to by '+names.join('; ')+'.</li>';
    }).join('');
    return '<h4>Who else gave to the same people as '+esc(me.name)+'</h4>' +
      '<p class="lc-sub">Left: this donor. Middle: people and committees it gave to. Right: other Ledger donors who gave to them too. Tap a name on the right to see its connections. Dashed = being checked.</p>' +
      svg + (more ? '<p class="lc-note">'+more+' more donors are listed below.</p>' : '') +
      '<ul class="lc-list">'+list+'</ul>' +
      '<p class="lc-note">Shared recipients mean two donors gave to the same person or committee. It doesn\'t show the donors worked together. Figures are each donor\'s own reported gifts, from the Ledger pages. Matching uses the names as filed, so a recipient filed under very different names may be missed.</p>';
  }
  function open(card, did){
    var btn = card.querySelector('.lc-btn'), panel = card.querySelector('.lc-panel');
    document.querySelectorAll('.lc-panel').forEach(function(p){ if (p !== panel) { p.remove(); } });
    document.querySelectorAll('.lc-btn.on').forEach(function(b){ if (b !== btn) { b.classList.remove('on'); b.textContent = 'Show connections'; } });
    document.querySelectorAll('.card.lc-wide').forEach(function(c){ if (c !== card) c.classList.remove('lc-wide'); });
    if (panel) { panel.remove(); card.classList.remove('lc-wide'); btn.classList.remove('on'); btn.textContent = 'Show connections'; return; }
    panel = document.createElement('div'); panel.className = 'lc-panel'; panel.innerHTML = draw(did);
    btn.insertAdjacentElement('afterend', panel); card.classList.add('lc-wide'); btn.classList.add('on'); btn.textContent = 'Hide connections';
    panel.addEventListener('click', function(e){
      var a = e.target.closest('[data-go]'); if (!a) return;
      var o = a.getAttribute('data-go'), d = byId[o]; if (!d || d.page !== here) return;
      e.preventDefault(); var c = document.getElementById(d.slug); if (!c) return;
      c.scrollIntoView({behavior:'smooth', block:'start'}); setTimeout(function(){ open(c, o); }, 350);
    });
  }
  function init(){
    var cards = document.querySelectorAll('#cards .card'); if (!cards.length) return false;
    cards.forEach(function(card){
      var did = here + '#' + card.id; if (!byId[did] || card.querySelector('.lc-btn')) return;
      var b = document.createElement('button'); b.type = 'button'; b.className = 'lc-btn'; b.textContent = 'Show connections';
      b.addEventListener('click', function(){ open(card, did); });
      var head = card.querySelector('header'); (head || card.firstChild).insertAdjacentElement('afterend', b);
    });
    if (location.hash) { var c = document.getElementById(location.hash.slice(1)); if (c && c.querySelector('.lc-btn')) { open(c, here + '#' + c.id); } }
    return true;
  }
  if (!init()) document.addEventListener('DOMContentLoaded', init);
})();
