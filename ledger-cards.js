// The Weber County Hive — industry donor pages (shared renderer)
// Each industry page loads its own data file (e.g. energy-data.js), which sets
// window.LEDGER_PAGE = { industry, donors:[...], passThroughNote? }.
// This file draws the stats, the sortable table and the donor cards.
// To update a donor, edit its object in the data file — never this file.
(function(){
  var P = window.LEDGER_PAGE || {donors:[]};
  var D = P.donors;
  var money = function(n, cents){
    if (n === null || n === undefined) return '—';
    var c = cents && Math.round(n*100) % 100 !== 0;
    return '$' + n.toLocaleString('en-US', {minimumFractionDigits: c?2:0, maximumFractionDigits: c?2:0});
  };
  var esc = function(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  var slug = function(s){ return String(s).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''); };

  // ---- stats
  var total = D.reduce(function(a,d){ return a + (d.total||0); }, 0);
  var cox = D.reduce(function(a,d){ return a + (d.cox||0); }, 0);
  var done = D.filter(function(d){ return d.complete; }).length;
  var st = document.getElementById('stats');
  if (st) st.innerHTML =
    '<div class="stat"><b>' + D.length + '</b><span>donors on this page</span></div>' +
    '<div class="stat"><b>' + money(Math.round(total)) + '</b><span>documented, all donors combined' + (P.passThroughNote ? '*' : '') + '</span></div>' +
    '<div class="stat"><b>' + money(Math.round(cox)) + '</b><span>of it to Spencer Cox</span></div>' +
    '<div class="stat"><b>' + done + ' of ' + D.length + '</b><span>with every year pulled</span></div>';
  var pt = document.getElementById('passthrough');
  if (pt) { if (P.passThroughNote) { pt.innerHTML = '<strong>* Counting note.</strong> ' + esc(P.passThroughNote); } else { pt.style.display='none'; } }

  // ---- table
  var sk = 'total', dir = -1;
  function drawTable(){
    var r = D.slice().sort(function(a,b){
      var x = a[sk], y = b[sk];
      if (typeof x === 'number' || typeof y === 'number') return ((x||0) - (y||0)) * dir;
      return String(x||'').localeCompare(String(y||'')) * dir;
    });
    document.getElementById('tbody').innerHTML = r.map(function(d){
      return '<tr><td><a href="#' + slug(d.id||d.name) + '">' + esc(d.name) + '</a></td>' +
        '<td class="k">' + esc(d.kind) + '</td>' +
        '<td class="n">' + money(d.total, true) + (d.complete ? '' : ' <span class="floor" title="Not every year pulled">+</span>') + '</td>' +
        '<td class="n">' + (d.cox ? money(d.cox, true) : '—') + '</td>' +
        '<td>' + esc(d.yearsChecked||'') + '</td></tr>';
    }).join('');
    document.querySelectorAll('th[data-k]').forEach(function(th){
      th.classList.toggle('on', th.dataset.k === sk);
      th.setAttribute('aria-sort', th.dataset.k === sk ? (dir<0?'descending':'ascending') : 'none');
    });
  }
  document.querySelectorAll('th[data-k]').forEach(function(th){
    th.addEventListener('click', function(){
      if (sk === th.dataset.k) dir = -dir; else { sk = th.dataset.k; dir = (sk==='name'||sk==='kind'||sk==='yearsChecked') ? 1 : -1; }
      drawTable();
    });
  });
  drawTable();

  // ---- cards
  var allYears = [];
  D.forEach(function(d){ Object.keys(d.years||{}).forEach(function(y){ if (allYears.indexOf(+y) < 0) allYears.push(+y); }); });
  var y0 = Math.min.apply(null, allYears.concat([2018])), y1 = Math.max.apply(null, allYears.concat([2026]));

  function bars(d){
    var ys = d.years || {}, keys = Object.keys(ys);
    if (!keys.length) return '<p class="nobars">Year-by-year totals aren\'t compiled for this donor yet. ' + esc(d.totalBasis||'') + '</p>';
    var mx = Math.max.apply(null, keys.map(function(k){ return ys[k]; })) || 1;
    var zero = (d.yearsZero||[]).map(String);
    var out = '';
    for (var y = y0; y <= y1; y++){
      var v = ys[y], k = String(y);
      if (v === undefined && zero.indexOf(k) < 0) { out += '<div class="yr"><span>'+y+'</span><i class="trk"></i><em class="na">not pulled</em></div>'; continue; }
      v = v || 0;
      var allCox = d.allCox || (d.cox && Math.abs(d.cox - d.total) < 0.01);
      out += '<div class="yr"><span>'+y+'</span><i class="trk"><b class="'+(allCox&&v?'cox':'')+'" style="width:'+(v? Math.max(1.5, v/mx*100):0)+'%"></b></i><em>'+(v? money(v, true) : 'none')+'</em></div>';
    }
    return '<div class="bars" aria-label="Giving by year">' + out + '</div>';
  }
  function list(arr, n){
    if (!arr || !arr.length) return '';
    var top = arr.slice(0, n), rest = arr.slice(n);
    var li = function(r){ return '<li><span class="rn">' + esc(r.name) + '</span><span class="ra">' + money(r.amount, true) + '</span>' + (r.note ? '<span class="rx">' + esc(r.note) + '</span>' : '') + '</li>'; };
    return '<ul class="recips">' + top.map(li).join('') + '</ul>' +
      (rest.length ? '<details class="more"><summary>' + rest.length + ' more</summary><ul class="recips">' + rest.map(li).join('') + '</ul></details>' : '');
  }
  function runBy(d){
    if (!d.runBy || !d.runBy.length) {
      if (d.kind === 'individual') return '';
      return '<div class="who"><h4>Who runs it</h4><p class="muted">Officers aren\'t on file in this research yet.</p></div>';
    }
    return '<div class="who"><h4>Who runs it</h4><ul>' + d.runBy.map(function(r){
      return '<li><b>' + esc(r.name) + '</b> — ' + esc(r.role) + '<span class="src">' + esc(r.source) + '</span></li>';
    }).join('') + '</ul></div>';
  }
  document.getElementById('cards').innerHTML = D.map(function(d){
    return '<article class="card" id="' + slug(d.id||d.name) + '">' +
      '<header><h3>' + esc(d.name) + '</h3><span class="chip">' + esc(d.kind) + '</span>' +
      (d.complete ? '<span class="chip ok">every year pulled</span>' : '<span class="chip part">still being pulled</span>') + '</header>' +
      '<p class="big">' + money(d.total, true) + (d.cox ? ' <small>' + money(d.cox, true) + ' to Gov. Cox</small>' : '') + '</p>' +
      '<p class="basis">' + esc(d.totalBasis||'') + '</p>' +
      bars(d) +
      runBy(d) +
      (d.fundedBy && d.fundedBy.length ? '<h4>Where its money came from</h4>' + list(d.fundedBy, 5) : '') +
      (d.recipients && d.recipients.length ? '<h4>Largest recipients</h4>' + list(d.recipients, 5) : '') +
      (d.note ? '<p class="note">' + esc(d.note) + '</p>' : '') +
      (d.gaps ? '<p class="gaps"><b>Still to pull:</b> ' + esc(d.gaps) + '</p>' : '') +
      (d.filedAs && d.filedAs.length > 1 ? '<p class="filed"><b>Filed as:</b> ' + d.filedAs.map(esc).join('; ') + '</p>' : '') +
      (d.sources && d.sources.length ? '<details class="srcs"><summary>Sources</summary><ul>' + d.sources.map(function(s){ return '<li>' + esc(s) + '</li>'; }).join('') + '</ul></details>' : '') +
      '</article>';
  }).join('');

  // ---- flip tiles
  var tmax = Math.max.apply(null, D.map(function(d){ return d.total||0; })) || 1;
  var tilesEl = document.getElementById('tiles');
  if (tilesEl) {
    tilesEl.innerHTML = D.map(function(d, i){
      var top = (d.recipients||[])[0];
      return '<div class="tile' + (i<3?' top3':'') + '"><div class="tile-inner">' +
        '<div class="face front"><div class="rank">No. ' + (i+1) + '</div><div class="ename">' + esc(d.name) + '</div>' +
        '<div class="tamt">' + money(d.total) + (d.complete?'':'<span class="floor">+</span>') + '</div>' +
        '<div class="tbar"><b style="width:' + Math.max(4, (d.total||0)/tmax*100) + '%"></b></div><div class="hint">tap for top recipient →</div></div>' +
        '<div class="face back"><div class="lbl">GAVE THE MOST TO</div>' +
        (top ? '<div class="rn">' + esc(top.name) + '</div><div class="ra">' + money(top.amount, true) + '</div><div class="rx">' + esc(top.note||'') + '</div>' : '<div class="bx">No recipients itemized yet.</div>') +
        '</div></div></div>';
    }).join('');
    tilesEl.querySelectorAll('.tile').forEach(function(t){ t.addEventListener('click', function(){ t.classList.toggle('flipped'); }); });
  }

  // ---- flow charts with connecting lines
  function flowRow(source, rows, reverse){
    var maxR = Math.max.apply(null, rows.map(function(r){ return r.amount; })) || 1;
    var rowH = 64, H = rows.length * rowH, curves = '';
    rows.forEach(function(r, i){
      var y1 = H/2, y2 = i*rowH + rowH/2, w = 0.75 + 3.5*(r.amount/maxR);
      var dd = reverse ? 'M 100,'+y1+' C 60,'+y1+' 40,'+y2+' 0,'+y2 : 'M 0,'+y1+' C 40,'+y1+' 60,'+y2+' 100,'+y2;
      curves += '<path d="'+dd+'" style="stroke:var(--bar)" stroke-width="'+w+'" fill="none" opacity="0.5" vector-effect="non-scaling-stroke"/>';
    });
    var src = '<div class="flow-source" style="min-height:'+H+'px;justify-content:'+(reverse?'flex-start':'flex-end')+';text-align:'+(reverse?'left':'right')+'">'+esc(source)+'</div>';
    var svg = '<div class="flow-svg-col"><svg viewBox="0 0 100 '+H+'" preserveAspectRatio="none" height="'+H+'">'+curves+'</svg></div>';
    var list = '<div class="flow-recipients">' + rows.map(function(r, i){
      return '<div class="flow-recipient"><span class="n">'+(i+1)+'. '+esc(r.name)+'</span>'+(r.note?'<span class="m">'+esc(r.note)+'</span>':'')+'<span class="a">'+money(r.amount, true)+'</span></div>';
    }).join('') + '</div>';
    return reverse ? '<div class="flow-row">'+list+svg+src+'</div>' : '<div class="flow-row">'+src+svg+list+'</div>';
  }
  var flowsEl = document.getElementById('flows');
  if (flowsEl) {
    flowsEl.innerHTML = D.map(function(d){
      var rows = (d.recipients||[]).slice(0, 15), fb = (d.fundedBy||[]).slice(0, 15);
      return '<div class="flow-card"><div class="flow-head"><h3><a href="#'+slug(d.id||d.name)+'">'+esc(d.name)+'</a></h3><span class="flow-total">'+money(d.total, true)+' documented</span></div>' +
        (fb.length ? '<p class="flow-label">Where its money came from</p>' + flowRow(d.name, fb, true) : '') +
        (rows.length ? '<p class="flow-label">Gave to</p>' + flowRow(d.name, rows, false) : '<p class="sub">Recipients not itemized yet.</p>') +
        '</div>';
    }).join('');
  }
})();
