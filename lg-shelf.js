/* Hive library standard: call-number block at the bottom of every page, page tools
   (call number, jump menu, copy link, share) and a Top button.
   Add a page to "pages" and every page's list and next/previous update.
   Reads the one shared shelf list in the Hive library (hive-shelves.js),
   so a call number from any Hive repo works in this page's search. */
var HBX = {
  "prefix": "LG",
  "repoName": "The Ledger",
  "pages": [
    {
      "callNumber": "LG 000.01",
      "slug": "index",
      "name": "The Ledger: every case"
    },
    {
      "callNumber": "LG 000.02",
      "slug": "ledger",
      "name": "Case 01: The Ledger, Utah PAC Money Flow"
    },
    {
      "callNumber": "LG 100.01",
      "slug": "follow-the-money-uwha",
      "name": "Case 02: Follow the Money (UWHA and Election Hive)"
    },
    {
      "callNumber": "LG 100.02",
      "slug": "west-weber-pac-chain",
      "name": "Case 03: The Roybal Chain"
    },
    {
      "callNumber": "LG 100.03",
      "slug": "weber-housing-authority",
      "name": "Case 04: The Housing Authority Loop"
    },
    {
      "callNumber": "LG 100.04",
      "slug": "the-payment-that-disappeared",
      "name": "Case 05: The Payment That Disappeared"
    },
    {
      "callNumber": "LG 100.05",
      "slug": "ledger-energy-overlap-pac-officers",
      "name": "Case 14: Energy Overlap, PAC Officers and Confirmed Oil Money"
    },
    {
      "callNumber": "LG 100.06",
      "slug": "taxpayers-pac-ogden-2025",
      "name": "Case 15: Taxpayers PAC and the 2025 Ogden Council Races"
    },
    {
      "callNumber": "LG 100.07",
      "slug": "clyde-companies-giving",
      "name": "Case 16: Clyde Companies Political Giving, 2018–2026"
    },
    {
      "callNumber": "LG 100.08",
      "slug": "gambling-money-utah",
      "name": "Case 17: Gambling Money in Utah, 2018–2026"
    },
    {
      "callNumber": "LG 100.09",
      "slug": "gambling-money-utah-plain",
      "name": "Case 17 (easy version): Gambling Money in Utah"
    },
    {
      "callNumber": "LG 200.01",
      "slug": "biggest-donors-flip",
      "name": "Case 06: The Biggest Donors, So Far"
    },
    {
      "callNumber": "LG 200.02",
      "slug": "energy",
      "name": "Case 07: Energy Money"
    },
    {
      "callNumber": "LG 200.03",
      "slug": "realestate",
      "name": "Case 08: Real Estate Money"
    },
    {
      "callNumber": "LG 200.04",
      "slug": "everythingelse",
      "name": "Case 09: Everything Else"
    },
    {
      "callNumber": "LG 200.05",
      "slug": "tech",
      "name": "Case 10: Tech Money"
    },
    {
      "callNumber": "LG 200.06",
      "slug": "industries",
      "name": "Case 11: Money By Industry"
    },
    {
      "callNumber": "LG 200.07",
      "slug": "deidre-henderson",
      "name": "Case 12: Deidre Henderson, Money In and Money Out"
    },
    {
      "callNumber": "LG 200.08",
      "slug": "money-shift",
      "name": "Case 13: How the Money Shifted, 2018–2026"
    }
  ],
  "shelves": {
    "000": "Start here",
    "100": "Follow the money: case files",
    "200": "The donor ledger"
  },
  "toolsAfter": [
    "div.header-band",
    "header.mast",
    "header.band",
    "header.masthead",
    "header"
  ],
  "headings": "section h2, .wrap > h2, main h2, body > h2, .beat h2, .profiles h2, .wrap h2",
  "searchBox": "#search-input"
};
(function () {
  var C = HBX, P = C.prefix;
  var LIST_URL = "https://weber-county-hive.github.io/-weber-county-hive-index/hive-shelves.js";
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var list = C.pages.slice().sort(function (a, b) { return a.callNumber.localeCompare(b.callNumber, undefined, { numeric: true }); });
  var file = (location.pathname.split("/").pop() || "index.html").replace(/\.html$/, "") || "index";
  var i = list.findIndex(function (p) { return p.slug === file; }); if (i < 0) i = 0;
  var me = list[i], prev = list[i - 1], next = list[i + 1];
  var shelfOf = function (p) { return p.callNumber.split(" ")[1].split(".")[0]; };
  function ready(fn) {
    if (window.HIVE_SHELVES) return fn();
    var s = document.createElement("script"); s.src = LIST_URL + "?v=1"; s.onload = fn; s.onerror = fn; document.head.appendChild(s);
  }
  function localSearch(v) {
    var box = document.querySelector(C.searchBox || "#__none");
    if (box) { box.value = v; box.dispatchEvent(new Event("input", { bubbles: true })); box.scrollIntoView({ behavior: "smooth", block: "center" }); return "Showing matches in the list above."; }
    if (window.find && window.find(v, false, false, true)) { return "Found <b>" + esc(v) + "</b> on this page; it's highlighted above."; }
    var hit = list.filter(function (p) { return p.name.toLowerCase().indexOf(String(v).toLowerCase()) > -1; })[0];
    if (hit) { location.href = hit.slug + ".html"; return ""; }
    return "Nothing on this page matches <b>" + esc(v) + "</b>. Try another word.";
  }
  var box = document.getElementById("hbx-shelf");
  if (box) {
    var link = function (p, dir) {
      if (!p) return dir === "prev"
        ? '<a class="hbx-nav-btn" href="https://weber-county-hive.github.io/-weber-county-hive-index/index.html">← <b>HL 000.00</b> The Hive library (every repo)</a>'
        : '<span class="hbx-nav-btn hbx-off">End of shelf →</span>';
      return '<a class="hbx-nav-btn" href="' + p.slug + '.html">' + (dir === "prev" ? "← " : "") + "<b>" + p.callNumber + "</b> " + esc(p.name) + (dir === "next" ? " →" : "") + "</a>";
    };
    var rows = "";
    Object.keys(C.shelves).forEach(function (no) {
      var items = list.filter(function (p) { return shelfOf(p) === no; });
      if (!items.length) return;
      rows += '<li class="hbx-shelf-head">' + P + " " + no + " · " + esc(C.shelves[no]) + "</li>";
      items.forEach(function (p) {
        rows += '<li><a href="' + p.slug + '.html"><span class="hbx-cn">' + p.callNumber + "</span> " + esc(p.name) + (p === me ? " <em>(you are here)</em>" : "") + "</a></li>";
      });
    });
    box.innerHTML =
      '<div class="hbx-cn-big">Call number <b>' + me.callNumber + "</b> · Shelf " + P + " " + shelfOf(me) + " · " + esc(C.shelves[shelfOf(me)]) + "</div>" +
      '<div class="hbx-nav">' + link(prev, "prev") + link(next, "next") + "</div>" +
      '<details class="hbx-list"><summary>See every page on this shelf, by call number</summary><ol>' + rows + "</ol></details>" +
      '<form class="hbx-find" id="hbx-find" role="search"><label for="hbx-q">Look up a call number, name or topic</label>' +
      '<div><input id="hbx-q" type="search" placeholder="e.g. ' + esc(me.callNumber) + ', GV 100.01 or a name"><button type="submit">Search</button></div></form>' +
      '<div class="hbx-search" id="hbx-find-out">Names and topics search this page.</div>';
    ready(function () {
      if (!window.HIVE_SHELVES) return;
      document.getElementById("hbx-find-out").innerHTML = "Names and topics search this page. Call numbers from every shelf work here: " +
        window.HIVE_SHELVES.map(function (s) { return '<a href="' + s.url + '"><b>' + s.prefix + "</b> = " + esc(s.name) + "</a>"; }).join(" · ") + ".";
    });
    var go = function (v) {
      var out = document.getElementById("hbx-find-out");
      var m = String(v).trim().toUpperCase().match(/^([A-Z]{1,5})\s*(\d{3}(?:\.\d{1,2})?)$/);
      if (m && m[1] === P) {
        var hit = list.filter(function (p) { return p.callNumber.indexOf(m[1] + " " + m[2]) === 0; })[0];
        if (hit) { if (hit !== me) location.href = hit.slug + ".html"; else window.scrollTo({ top: 0, behavior: "smooth" }); return; }
        out.innerHTML = "No " + esc(C.repoName) + " page has call number <b>" + esc(m[1] + " " + m[2]) + "</b>."; return;
      }
      if (m) {
        var sh = (window.HIVE_SHELVES || []).filter(function (s) { return s.prefix === m[1]; })[0];
        if (sh) { location.href = sh.url + "?q=" + encodeURIComponent(m[1] + " " + m[2]); return; }
        out.innerHTML = "Call number <b>" + esc(m[1] + " " + m[2]) + "</b>: that shelf doesn't have call numbers yet. Try a name or topic instead."; return;
      }
      var r = localSearch(v); if (r) out.innerHTML = r;
    };
    document.getElementById("hbx-find").addEventListener("submit", function (e) { e.preventDefault(); go(document.getElementById("hbx-q").value); });
    var qp = new URLSearchParams(location.search).get("q");
    if (qp) { document.getElementById("hbx-q").value = qp; ready(function () { go(qp); }); }
  }
  /* Page tools under the page's header */
  var anchor = null; [].concat(C.toolsAfter).some(function (sel) { anchor = document.querySelector(sel); return !!anchor; });
  if (anchor) {
    var heads = [].slice.call(document.querySelectorAll(C.headings || "main h2")).filter(function (h) { return h.textContent.trim(); });
    var used = {};
    var jl = heads.map(function (h) {
      if (!h.id) {
        var id = "s-" + h.textContent.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
        while (used[id] || document.getElementById(id)) id += "-x";
        h.id = id;
      }
      used[h.id] = 1;
      return '<li><a href="#' + h.id + '">' + esc(h.textContent.trim().replace(/\s+/g, " ")) + "</a></li>";
    }).join("");
    var url = location.href.split("#")[0].split("?")[0];
    var tools = document.createElement("div");
    tools.className = "hbx-tools";
    tools.innerHTML =
      '<a class="hbx-tool hbx-cnchip" href="#hbx-shelf" title="Jump to the call number and search">Call number <b>' + me.callNumber + "</b> ↓</a>" +
      (jl ? '<details class="hbx-jump"><summary>Jump to a section</summary><ol>' + jl + "</ol></details>" : "") +
      '<button type="button" class="hbx-tool" id="hbx-copy">Copy link</button>' +
      '<a class="hbx-tool" target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) + '">Share on Facebook</a>';
    anchor.parentNode.insertBefore(tools, anchor.nextSibling);
    var cb = document.getElementById("hbx-copy");
    cb.addEventListener("click", function () {
      var done = function () { cb.textContent = "Link copied ✓"; setTimeout(function () { cb.textContent = "Copy link"; }, 2500); };
      try { navigator.clipboard.writeText(url).then(done, function () { window.prompt("Copy this link:", url); }); }
      catch (e) { window.prompt("Copy this link:", url); }
    });
    tools.querySelectorAll(".hbx-jump a").forEach(function (a) { a.addEventListener("click", function () { tools.querySelector(".hbx-jump").open = false; }); });
  }
  var top = document.createElement("a");
  top.href = "#"; top.className = "hbx-totop"; top.textContent = "↑ Top"; top.setAttribute("aria-label", "Back to top of page");
  top.addEventListener("click", function (e) { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); });
  document.body.appendChild(top);
  var showTop = function () { top.style.display = window.scrollY > 900 ? "block" : "none"; };
  window.addEventListener("scroll", showTop, { passive: true }); showTop();
})();
