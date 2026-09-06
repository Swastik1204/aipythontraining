(function(){
  var NAV_HTML = `
<nav id="site-nav">
  <div class="container">
    <div class="sn-inner">
      <a href="index.html" class="sn-brand">
        <div class="sn-logo">🐍</div>
        <span>AI <span class="sn-amp">&amp;</span> Python</span>
      </a>

      <div class="sn-links">
        <a href="index.html" class="sn-link" data-page="home">Home</a>
        <a href="index.html#courses" class="sn-link">Courses</a>
        <a href="blog.html" class="sn-link" data-page="blog">Blog</a>

        <div class="sn-drop">
          <button class="sn-link sn-drop-btn">Resources <i class="bi bi-chevron-down sn-arrow"></i></button>
          <div class="sn-dropdown">
            <a href="salary.html" class="sn-di" data-page="salary">🧮 Salary Calculator</a>
            <a href="roadmap.html" class="sn-di" data-page="roadmap">🛤️ Learning Roadmap</a>
            <a href="cheatsheet.html" class="sn-di" data-page="cheatsheet">📋 Python Cheat Sheet</a>
            <a href="tools.html" class="sn-di" data-page="tools">🤖 AI Tool Comparison</a>
            <a href="python-vs.html" class="sn-di" data-page="python-vs">⚖️ Python vs Others</a>
          </div>
        </div>

        <div class="sn-drop">
          <button class="sn-link sn-drop-btn">Students <i class="bi bi-chevron-down sn-arrow"></i></button>
          <div class="sn-dropdown">
            <a href="portfolio.html" class="sn-di" data-page="portfolio">🏆 Portfolio Wall</a>
            <a href="demo.html" class="sn-di" data-page="demo">📅 Book Free Demo</a>
            <a href="interview.html" class="sn-di" data-page="interview">⚔️ Interview Arena</a>
            <a href="sandbox.html" class="sn-di" data-page="sandbox">🖥️ Code Sandbox</a>
          </div>
        </div>

        <a href="index.html#contact" class="sn-link">Contact</a>
        <button id="sn-dm-btn" class="sn-dm-btn" onclick="toggleDM()" title="Toggle dark/light mode" aria-label="Toggle theme">&#9728;</button>
        <a href="demo.html" class="sn-cta">Book Free Demo</a>
      </div>
      <div class="sn-mob-right" style="display:flex;align-items:center;gap:8px">
        <button id="sn-dm-btn-mob" class="sn-dm-btn sn-dm-mob" onclick="toggleDM()" title="Toggle dark/light mode" aria-label="Toggle theme">&#9728;</button>
        <button class="sn-tog" id="snTog" aria-label="Menu">
          <i class="bi bi-list"></i>
        </button>
      </div>
    </div>
  </div>
  <!-- Mobile -->
  <div class="sn-mob" id="snMob">
    <div class="sn-mob-top">
      <a href="index.html" class="sn-brand"><div class="sn-logo">🐍</div><span>AI &amp; Python</span></a>
      <div style="display:flex;align-items:center;gap:8px">
        <button onclick="closeMob()" class="sn-mob-close"><i class="bi bi-x-lg"></i></button>
      </div>
    </div>
    <div class="sn-mob-links">
      <a href="index.html" class="sn-ml">🏠 Home</a>
      <a href="index.html#courses" class="sn-ml">📚 Courses</a>
      <a href="blog.html" class="sn-ml">✍️ Blog</a>
      <div class="sn-mob-group">
        <div class="sn-mob-label">Resources</div>
        <a href="salary.html" class="sn-ml">🧮 Salary Calculator</a>
        <a href="roadmap.html" class="sn-ml">🛤️ Learning Roadmap</a>
        <a href="cheatsheet.html" class="sn-ml">📋 Python Cheat Sheet</a>
        <a href="tools.html" class="sn-ml">🤖 AI Tool Comparison</a>
        <a href="python-vs.html" class="sn-ml">⚖️ Python vs Others</a>
      </div>
      <div class="sn-mob-group">
        <div class="sn-mob-label">Students</div>
        <a href="portfolio.html" class="sn-ml">🏆 Portfolio Wall</a>
        <a href="demo.html" class="sn-ml">📅 Book Free Demo</a>
        <a href="interview.html" class="sn-ml">⚔️ Interview Arena</a>
        <a href="sandbox.html" class="sn-ml">🖥️ Code Sandbox</a>
      </div>
      <a href="index.html#contact" class="sn-ml">📞 Contact</a>
      <a href="demo.html" class="sn-cta" style="margin:16px 0;display:block;text-align:center;border-radius:50px;padding:13px">📅 Book Free Demo Class</a>
    </div>
  </div>
</nav>`;

  var NAV_CSS = `
<style>
#site-nav{position:fixed;top:0;left:0;right:0;z-index:1000;background:rgba(6,11,24,.97);backdrop-filter:blur(16px);border-bottom:1px solid rgba(99,179,255,.1);padding:13px 0;transition:box-shadow .3s,background .3s}
#site-nav.scrolled{box-shadow:0 4px 24px rgba(0,0,0,.4)}
.sn-inner{display:flex;align-items:center;justify-content:space-between;gap:16px}
.sn-brand{font-family:'Space Grotesk',sans-serif;font-size:1.15rem;font-weight:700;color:#fff;display:flex;align-items:center;gap:9px;text-decoration:none}
.sn-logo{width:32px;height:32px;background:linear-gradient(135deg,#3B82F6,#8B5CF6);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:.9rem;flex-shrink:0}
.sn-amp{color:#60A5FA}
.sn-links{display:flex;align-items:center;gap:6px}
.sn-link{font-size:.83rem;font-weight:500;color:#94A3B8;padding:7px 12px;border-radius:8px;transition:.2s;text-decoration:none;white-space:nowrap;background:transparent;border:none;cursor:pointer;font-family:'Inter',sans-serif}
.sn-link:hover,.sn-link.active{color:#fff;background:rgba(255,255,255,.06)}
.sn-cta{background:linear-gradient(135deg,#3B82F6,#8B5CF6);color:#fff!important;font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:.82rem;border-radius:50px;padding:8px 18px;text-decoration:none;transition:.2s;white-space:nowrap;margin-left:6px}
.sn-cta:hover{opacity:.9;transform:translateY(-1px)}
.sn-dm-btn{width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.08);border:1px solid rgba(99,179,255,.2);color:#fff;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;font-size:.95rem;transition:all .2s;padding:0}
.sn-dm-btn:hover{background:rgba(59,130,246,.2);border-color:#3B82F6;transform:rotate(15deg)}
/* DROPDOWN */
.sn-drop{position:relative}
.sn-drop-btn{display:flex;align-items:center;gap:4px}
.sn-arrow{font-size:.65rem;transition:transform .25s}
.sn-drop:hover .sn-arrow{transform:rotate(180deg)}
.sn-dropdown{position:absolute;top:calc(100% + 8px);left:50%;transform:translateX(-50%);background:rgba(10,16,32,.98);border:1px solid rgba(99,179,255,.18);border-radius:14px;padding:8px;min-width:220px;opacity:0;pointer-events:none;transform:translateX(-50%) translateY(-8px);transition:opacity .22s,transform .22s;box-shadow:0 16px 48px rgba(0,0,0,.5);backdrop-filter:blur(16px)}
.sn-drop:hover .sn-dropdown{opacity:1;pointer-events:all;transform:translateX(-50%) translateY(0)}
.sn-di{display:flex;align-items:center;gap:9px;padding:10px 14px;border-radius:9px;font-size:.83rem;color:#94A3B8;text-decoration:none;transition:.15s;white-space:nowrap}
.sn-di:hover{background:rgba(59,130,246,.1);color:#fff}
.sn-di.active{color:#60A5FA;background:rgba(59,130,246,.08)}
/* MOBILE TOGGLE */
.sn-tog{background:rgba(255,255,255,.06);border:1px solid rgba(99,179,255,.15);border-radius:8px;padding:7px 9px;color:#fff;cursor:pointer;display:none;align-items:center;font-size:1.3rem}
.sn-dm-mob{display:none}
@media(max-width:991px){
  .sn-links{display:none}
  .sn-tog{display:flex}
  .sn-dm-mob{display:inline-flex}
}
/* MOBILE NAV */
.sn-mob{display:none;position:fixed;inset:0;background:rgba(6,11,24,.99);z-index:999;flex-direction:column;overflow-y:auto}
.sn-mob.open{display:flex}
.sn-mob-top{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid rgba(99,179,255,.1);flex-shrink:0}
.sn-mob-close{background:rgba(255,255,255,.06);border:1px solid rgba(99,179,255,.15);border-radius:8px;padding:7px 9px;color:#fff;cursor:pointer;font-size:1rem}
.sn-mob-links{padding:16px 20px;display:flex;flex-direction:column;gap:2px;flex:1}
.sn-ml{display:block;padding:12px 14px;border-radius:9px;font-size:.92rem;color:#94A3B8;text-decoration:none;transition:.15s;font-family:'Inter',sans-serif}
.sn-ml:hover{background:rgba(59,130,246,.1);color:#fff}
.sn-ml.active{color:#60A5FA}
.sn-mob-group{margin:10px 0 4px}
.sn-mob-label{font-size:.65rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#475569;padding:4px 14px 6px;margin-bottom:2px}
body{padding-top:60px}

/* LIGHT THEME FOR NAV */
[data-theme="light"] #site-nav {
  background: rgba(255, 255, 255, 0.97) !important;
  border-bottom-color: rgba(148, 163, 184, 0.25) !important;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05) !important;
}
[data-theme="light"] .sn-brand { color: #0F172A !important; }
[data-theme="light"] .sn-link { color: #475569 !important; }
[data-theme="light"] .sn-link:hover,
[data-theme="light"] .sn-link.active { color: #0F172A !important; background: rgba(0,0,0,0.05) !important; }
[data-theme="light"] .sn-dm-btn {
  background: #F1F5F9 !important;
  border-color: rgba(148, 163, 184, 0.4) !important;
  color: #0F172A !important;
}
[data-theme="light"] .sn-dm-btn:hover {
  background: #E2E8F0 !important;
  border-color: #2563EB !important;
}
[data-theme="light"] .sn-dropdown {
  background: #FFFFFF !important;
  border-color: rgba(148, 163, 184, 0.28) !important;
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08) !important;
}
[data-theme="light"] .sn-di { color: #334155 !important; }
[data-theme="light"] .sn-di:hover { background: #EFF6FF !important; color: #2563EB !important; }
[data-theme="light"] .sn-di.active { color: #2563EB !important; background: #EFF6FF !important; }
[data-theme="light"] .sn-tog {
  background: #F1F5F9 !important;
  border-color: rgba(148, 163, 184, 0.4) !important;
  color: #0F172A !important;
}
[data-theme="light"] .sn-mob { background: #FFFFFF !important; }
[data-theme="light"] .sn-mob-top { border-bottom-color: rgba(148, 163, 184, 0.2) !important; }
[data-theme="light"] .sn-mob-close { background: #F1F5F9 !important; border-color: rgba(148, 163, 184, 0.4) !important; color: #0F172A !important; }
[data-theme="light"] .sn-ml { color: #1E293B !important; }
[data-theme="light"] .sn-ml:hover { background: #F8FAFC !important; color: #2563EB !important; }
[data-theme="light"] .sn-ml.active { color: #2563EB !important; }
[data-theme="light"] .sn-mob-label { color: #64748B !important; }
</style>`;

  // Inject CSS into head
  document.head.insertAdjacentHTML('beforeend', NAV_CSS);

  // Inject nav as first child of body
  document.body.insertAdjacentHTML('afterbegin', NAV_HTML);

  // Scroll effect
  window.addEventListener('scroll', function(){
    var sn = document.getElementById('site-nav');
    if(sn) sn.classList.toggle('scrolled', window.scrollY > 30);
  }, {passive:true});

  // Mobile toggle
  var snTog = document.getElementById('snTog');
  if(snTog){
    snTog.addEventListener('click', function(){
      var mob = document.getElementById('snMob');
      if(mob) mob.classList.toggle('open');
    });
  }
  window.closeMob = function(){
    var mob = document.getElementById('snMob');
    if(mob) mob.classList.remove('open');
  };

  // Sync and handle theme
  var dm = localStorage.getItem('dm') || 'dark';
  document.documentElement.setAttribute('data-theme', dm);
  function updateDmBtns(m) {
    ['sn-dm-btn', 'sn-dm-btn-mob', 'dm-btn', 'dm-btn-mob'].forEach(function(id){
      var b = document.getElementById(id);
      if(b) b.innerHTML = m === 'light' ? '&#x1F319;' : '&#x2600;';
    });
  }
  updateDmBtns(dm);

  window.toggleDM = function() {
    var cur = document.documentElement.getAttribute('data-theme') || 'dark';
    var next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('dm', next);
    updateDmBtns(next);
  };

  // Mark active page
  var page = document.body.getAttribute('data-page') || '';
  document.querySelectorAll('[data-page="'+page+'"]').forEach(function(el){el.classList.add('active');});
})();
