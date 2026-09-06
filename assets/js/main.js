/* SCROLL PROGRESS */
window.addEventListener('scroll',function(){var h=document.documentElement;document.getElementById('prog').style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';},{passive:true});
/* NAV */
window.addEventListener('scroll',function(){document.getElementById('nav').style.boxShadow=window.scrollY>60?'0 4px 24px rgba(0,0,0,.4)':'none';},{passive:true});
/* DARK MODE */
var dm = localStorage.getItem('dm') || 'dark';
function applyDM(m) {
  document.documentElement.setAttribute('data-theme', m);
  var btn = document.getElementById('dm-btn');
  if (btn) btn.innerHTML = m === 'light' ? '&#x1F319;' : '&#x2600;';
  localStorage.setItem('dm', m);
}
function toggleDM() {
  dm = dm === 'dark' ? 'light' : 'dark';
  applyDM(dm);
}
applyDM(dm);
/* COURSE TABS */
/* ─── COURSE TABS + AUTO-SLIDE (fixed) ─── */
(function(){
  var PANELS = ['c1','c2','c3','c4','c5','c6','c7'];
  var cIdx = 0, slideTimer = null, autoPlay = true;
  var SLIDE_DUR = 4500;

  /* Get all ctab buttons — scoped correctly */
  function getTabs(){ return Array.from(document.querySelectorAll('#ctabs .ctab')); }

  /* Show a specific panel by index */
  function goToIdx(idx, fromAuto){
    var tabs = getTabs();
    if(!tabs.length) return;
    idx = ((idx % PANELS.length) + PANELS.length) % PANELS.length; // safe mod
    cIdx = idx;
    var id  = PANELS[idx];
    var btn = tabs[idx];
    if(!btn || !document.getElementById(id)) return;

    /* Deactivate all */
    document.querySelectorAll('.cpanel').forEach(function(p){ p.classList.remove('active'); });
    tabs.forEach(function(b){
      b.classList.remove('active');
      var pf = b.querySelector('.ctab-progress-fill');
      if(pf){ pf.style.transition = 'none'; pf.style.width = '0%'; }
    });

    /* Activate chosen */
    document.getElementById(id).classList.add('active');
    btn.classList.add('active');

    /* Animate progress bar */
    if(autoPlay){
      var pf = btn.querySelector('.ctab-progress-fill');
      if(pf){
        requestAnimationFrame(function(){
          requestAnimationFrame(function(){
            pf.style.transition = 'width ' + SLIDE_DUR + 'ms linear';
            pf.style.width = '100%';
          });
        });
      }
    }

    /* If user clicked: reset the timer from now */
    if(!fromAuto){
      clearInterval(slideTimer);
      if(autoPlay) startTimer();
    }
  }

  function startTimer(){
    clearInterval(slideTimer);
    slideTimer = setInterval(function(){ goToIdx(cIdx + 1, true); }, SLIDE_DUR);
  }

  function stopTimer(){
    clearInterval(slideTimer);
    slideTimer = null;
    /* Freeze progress bars */
    document.querySelectorAll('.ctab-progress-fill').forEach(function(pf){
      var computed = getComputedStyle(pf).width;
      pf.style.transition = 'none';
      pf.style.width = computed; /* freeze at current position */
    });
  }

  /* Global showC — called by inline onclick="showC('c1',this)" */
  window.showC = function(id, btn, fromAuto){
    var idx = PANELS.indexOf(id);
    if(idx < 0) return;
    goToIdx(idx, !!fromAuto);
  };

  /* Toggle button */
  window.toggleAutoSlide = function(){
    autoPlay = !autoPlay;
    var atsBtn = document.getElementById('ats-btn');
    if(autoPlay){
      if(atsBtn){ atsBtn.classList.remove('paused'); atsBtn.innerHTML = '<span class="ats-dot"></span>Auto-playing'; }
      goToIdx(cIdx, false); /* restart progress bar */
      startTimer();
    } else {
      if(atsBtn){ atsBtn.classList.add('paused'); atsBtn.innerHTML = '<span class="ats-dot"></span>Paused'; }
      stopTimer();
    }
  };

  /* Init — runs immediately (script is at bottom, DOM is ready) */
  function init(){
    var ctabsEl = document.getElementById('ctabs');
    if(!ctabsEl){
      /* DOM not ready yet — rare edge case */
      setTimeout(init, 100);
      return;
    }

    /* Hover: pause / resume */
    var courseSection = ctabsEl.closest('section') || ctabsEl.parentElement;
    courseSection.addEventListener('mouseenter', function(){ if(autoPlay) stopTimer(); });
    courseSection.addEventListener('mouseleave', function(){
      if(autoPlay){
        /* Resume from current tab with fresh progress bar */
        var tabs = getTabs();
        var activePF = tabs[cIdx] && tabs[cIdx].querySelector('.ctab-progress-fill');
        if(activePF){
          activePF.style.transition = 'none';
          activePF.style.width = '0%';
          requestAnimationFrame(function(){
            requestAnimationFrame(function(){
              activePF.style.transition = 'width ' + SLIDE_DUR + 'ms linear';
              activePF.style.width = '100%';
            });
          });
        }
        startTimer();
      }
    });

    /* Kick off: show tab 0 with progress, start timer */
    goToIdx(0, true);
    startTimer();
  }

  /* Script is at bottom of body — DOM is already parsed */
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
/* FAQ */
function tFaq(el){var a=el.nextElementSibling,open=el.parentElement.classList.contains('open');document.querySelectorAll('.faq-i.open').forEach(function(i){i.classList.remove('open');i.querySelector('.faq-ans').classList.remove('open');});if(!open){el.parentElement.classList.add('open');a.classList.add('open');}}
/* FORM */
var cf=document.getElementById('cf');
if(cf){cf.addEventListener('submit',function(e){
  e.preventDefault();

  // Read all fields
  var name   = (document.getElementById('cf-name')  ||{}).value||'';
  var phone  = (document.getElementById('cf-phone') ||{}).value||'';
  var email  = (document.getElementById('cf-email') ||{}).value||'';
  var course = (document.getElementById('cf-course')||{}).value||'Not specified';
  var bg     = (document.getElementById('cf-bg')    ||{}).value||'Not specified';
  var mode   = (document.getElementById('cf-mode')  ||{}).value||'Not specified';
  var msg    = (document.getElementById('cf-msg')   ||{}).value||'';

  // Validate required fields
  if(!name.trim()){alert('Please enter your name.');document.getElementById('cf-name').focus();return;}
  if(!phone.trim()){alert('Please enter your phone number.');document.getElementById('cf-phone').focus();return;}
  if(!document.getElementById('cf-course').value){alert('Please select a course.');document.getElementById('cf-course').focus();return;}

  // Build WhatsApp message
  var wa = '🎓 *New Course Enquiry — AI & Python Training*\n\n'
    + '👤 *Name:* ' + name.trim() + '\n'
    + '📞 *Phone:* ' + phone.trim() + '\n'
    + (email.trim() ? '📧 *Email:* ' + email.trim() + '\n' : '')
    + '📚 *Interested In:* ' + course + '\n'
    + '🧑‍💻 *Background:* ' + bg + '\n'
    + '🏫 *Preferred Mode:* ' + mode + '\n'
    + (msg.trim() ? '💬 *Message:* ' + msg.trim() + '\n' : '')
    + '\n_Sent from pythonforai.in_';

  // Show confirmation
  var btn = this.querySelector('button[type="submit"]');
  btn.innerHTML = '<i class="bi bi-whatsapp"></i> Opening WhatsApp...';
  btn.disabled = true;

  var ok = document.getElementById('f-ok');
  if(ok) ok.style.display='block';

  // Save lead locally as backup
  try {
    var leads = JSON.parse(localStorage.getItem('leads_backup') || '[]');
    leads.push({ name: name.trim(), phone: phone.trim(), email: email.trim(), course: course, date: new Date().toISOString() });
    localStorage.setItem('leads_backup', JSON.stringify(leads));
  } catch(err){}

  // Open WhatsApp directly without timer delay to prevent mobile popup blocking
  var waUrl = 'https://wa.me/917001186689?text=' + encodeURIComponent(wa);
  var waWin = window.open(waUrl, '_blank');
  if (!waWin || waWin.closed || typeof waWin.closed === 'undefined') {
    // Fallback if popup blocked: navigate directly
    window.location.href = waUrl;
  }
  cf.reset();
  setTimeout(function(){
    btn.innerHTML = '<i class="bi bi-whatsapp"></i> Send via WhatsApp';
    btn.disabled = false;
  }, 1000);
});}
/* COUNTDOWN */
/* DYNAMIC BATCH COUNTDOWN */
(function(){
  function getNextBatchDate() {
    var now = new Date();
    var target = new Date(now);
    var day = now.getDay();
    var daysUntilSat = (6 - day + 7) % 7;
    if (daysUntilSat === 0 && now.getHours() >= 10) {
      daysUntilSat = 7;
    }
    target.setDate(now.getDate() + daysUntilSat);
    target.setHours(10, 0, 0, 0);
    return target;
  }
  var target = getNextBatchDate();
  function tick() {
    var now = new Date();
    var diff = target - now;
    if (diff <= 0) {
      target = getNextBatchDate();
      diff = target - now;
    }
    var d = Math.floor(diff / 864e5),
        h = Math.floor((diff % 864e5) / 36e5),
        m = Math.floor((diff % 36e5) / 6e4),
        s = Math.floor((diff % 6e4) / 1e3);
    function f(n) { return String(n).padStart(2, '0'); }
    var ed = document.getElementById('cd-d'),
        eh = document.getElementById('cd-h'),
        em = document.getElementById('cd-m'),
        es = document.getElementById('cd-sc');
    if (ed) ed.textContent = f(d);
    if (eh) eh.textContent = f(h);
    if (em) em.textContent = f(m);
    if (es) es.textContent = f(s);
  }
  tick();
  setInterval(tick, 1000);
})();
/* LIVE COUNTER */
(function(){var n=247,el=document.getElementById('lc-n');if(!el)return;setInterval(function(){if(Math.random()<0.3){n=n+(Math.random()<0.7?1:-1);n=Math.max(240,Math.min(260,n));el.textContent=n;}},9000);})();

// Close cert modal on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    var cm = document.getElementById('cert-modal');
    if (cm) cm.classList.remove('show');
    var ep = document.getElementById('exit-popup');
    if (ep) ep.classList.remove('open');
  }
});

/* EXIT INTENT */
var epSeen=false;
document.addEventListener('mouseleave',function(e){if(e.clientY<5&&!epSeen&&!sessionStorage.getItem('ep')){epSeen=true;setTimeout(function(){var ep=document.getElementById('exit-popup');if(ep)ep.classList.add('open');sessionStorage.setItem('ep','1');},300);}});
var ep=document.getElementById('exit-popup');if(ep){ep.addEventListener('click',function(e){if(e.target===this)this.classList.remove('open');});}
function claimKit(){
  var em=document.getElementById('ep-email');
  if(!em||!em.value.trim()||!em.value.includes('@')){alert('Please enter a valid email address.');return;}
  var email=em.value.trim();
  // Close popup
  var ep=document.getElementById('exit-popup');
  if(ep) ep.classList.remove('open');
  // Directly download the brochure
  var a=document.createElement('a');
  a.href='assets/docs/brochure.pdf';
  a.download='AI-Python-Training-Brochure.pdf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  // Also notify you on WhatsApp with the lead's email
  var msg = 'Hello Biswarup Sir! 📘

'
    + 'I just downloaded the *AI & Python Starter Kit / Brochure* from pythonforai.in.

'
    + '📧 *Email:* ' + email + '

'
    + 'Could you please share the upcoming weekend batch timings and fee details? Thank you!';
  var waUrl = 'https://wa.me/917001186689?text=' + encodeURIComponent(msg);
  var waWin = window.open(waUrl, '_blank');
  if (!waWin || waWin.closed || typeof waWin.closed === 'undefined') {
    window.location.href = waUrl;
  }
}
/* SYLLABUS */
function sendSyllabus(){
  var n=document.getElementById('cm-name'),p=document.getElementById('cm-phone');
  if(!n||!p||!n.value.trim()||!p.value.trim()){alert('Please fill your name and WhatsApp number.');return;}
  var name=n.value.trim(), phone=p.value.trim();
  var cm=document.getElementById('curr-modal');
  if(cm) cm.classList.remove('open');
  // Download brochure PDF directly
  var a=document.createElement('a');
  a.href='assets/docs/brochure.pdf';
  a.download='AI-Python-Training-Brochure.pdf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  // Notify you on WhatsApp with lead details
  var msg = 'Hello Biswarup Sir! 🎓

'
    + 'I just downloaded the *Python & AI Course Brochure* from pythonforai.in.

'
    + '👤 *Name:* ' + name + '
'
    + '📞 *Phone:* ' + phone + '

'
    + 'Could you please share details on the upcoming weekend batch in Durgapur and seat availability? Thank you!';
  var waUrl = 'https://wa.me/917001186689?text=' + encodeURIComponent(msg);
  var waWin = window.open(waUrl, '_blank');
  if (!waWin || waWin.closed || typeof waWin.closed === 'undefined') {
    window.location.href = waUrl;
  }
}
/* TYPING EFFECT */
(function(){var el=document.getElementById('typing-text');if(!el)return;var phrases=['Build Real AI Skills','Deploy Live Projects','Get Industry Ready','Learn by Building','Join 200+ Students'];var pi=0,ci=0,del=false;function type(){var ph=phrases[pi];el.textContent=del?ph.slice(0,ci-1):ph.slice(0,ci+1);if(!del&&el.textContent===ph){setTimeout(function(){del=true;type();},1800);return;}if(del&&el.textContent===''){del=false;pi=(pi+1)%phrases.length;ci=0;setTimeout(type,300);return;}ci=del?ci-1:ci+1;setTimeout(type,del?55:80);}setTimeout(type,800);})();
/* MOBILE BAR */
if(window.innerWidth<=767){var mb=document.getElementById('mbar');if(mb)mb.style.display='flex';}
/* COUNTERS */
(function(){var els=document.querySelectorAll('[data-count]');if(!els.length)return;var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(!e.isIntersecting)return;var el=e.target,t=+el.dataset.count,c=0,step=Math.ceil(t/50);var tm=setInterval(function(){c=Math.min(c+step,t);el.textContent=c+(t>10?'+':'');if(c>=t)clearInterval(tm);},30);obs.unobserve(el);});},{threshold:0.5});els.forEach(function(el){obs.observe(el);});})();
/* ROADMAP */
var rmData=[{title:'L1: Python Fundamentals',color:'#10B981',weeks:'4-6 weeks',level:'Beginner',goal:'Build coding foundation',projects:'Calculator, Student Manager, CSV Reports'},{title:'L2: Data Science',color:'#3B82F6',weeks:'4 weeks',level:'Beginner+',goal:'Work with real-world data',projects:'Sales Dashboard, Performance Tracker'},{title:'L3: Machine Learning',color:'#F59E0B',weeks:'5-6 weeks',level:'Intermediate',goal:'Build prediction models',projects:'Price Predictor, Recommendation System'},{title:'L4: Deep Learning',color:'#EF4444',weeks:'5 weeks',level:'Advanced',goal:'Build advanced AI systems',projects:'Image Classifier, Emotion Detector'},{title:'L5: NLP',color:'#8B5CF6',weeks:'4 weeks',level:'Advanced',goal:'AI that understands language',projects:'Sentiment Analyzer, Chatbot'},{title:'L6 & L7: Auto + Deploy',color:'#06B6D4',weeks:'7 weeks',level:'All Levels',goal:'Automate & go live',projects:'Auto Messaging, Live ML Web App'}];
var rmOpen=-1;
function rmClick(i){var d=document.getElementById('rm-detail');if(!d)return;if(rmOpen===i){d.style.display='none';rmOpen=-1;return;}rmOpen=i;var r=rmData[i];d.innerHTML='<div style="display:flex;align-items:center;gap:12px;margin-bottom:16px"><div style="width:44px;height:44px;border-radius:10px;background:'+r.color+'22;border:1px solid '+r.color+'44;display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0">&#x1F4DA;</div><div><div style="font-family:var(--fh);font-size:1rem;color:#fff;margin-bottom:3px">'+r.title+'</div><span style="background:'+r.color+'22;color:'+r.color+';font-size:.68rem;font-weight:700;padding:3px 9px;border-radius:50px">'+r.level+'</span></div></div><div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:16px"><div style="background:rgba(255,255,255,.04);border-radius:var(--r);padding:10px"><div style="font-size:.67rem;color:var(--dim);text-transform:uppercase;letter-spacing:.08em;margin-bottom:3px">Goal</div><div style="font-size:.82rem;color:var(--txt)">'+r.goal+'</div></div><div style="background:rgba(255,255,255,.04);border-radius:var(--r);padding:10px"><div style="font-size:.67rem;color:var(--dim);text-transform:uppercase;letter-spacing:.08em;margin-bottom:3px">Duration</div><div style="font-size:.82rem;color:var(--txt)">'+r.weeks+'</div></div><div style="background:rgba(255,255,255,.04);border-radius:var(--r);padding:10px"><div style="font-size:.67rem;color:var(--dim);text-transform:uppercase;letter-spacing:.08em;margin-bottom:3px">Projects</div><div style="font-size:.82rem;color:var(--g2)">'+r.projects+'</div></div></div><div style="text-align:center"><a href="#contact" class="btn-p" style="font-size:.8rem;padding:9px 18px">Enroll at this Level</a></div>';d.style.display='block';d.scrollIntoView({behavior:'smooth',block:'nearest'});}
/* BEFORE/AFTER */
var baState='before';
var baSkills=[{name:'Python Programming',emoji:'&#x1F40D;',b:5,a:90},{name:'Data Analysis',emoji:'&#x1F4CA;',b:0,a:85},{name:'Machine Learning',emoji:'&#x1F9E0;',b:0,a:80},{name:'Deep Learning / AI',emoji:'&#x1F916;',b:0,a:70},{name:'Web App Deployment',emoji:'&#x1F310;',b:10,a:85},{name:'Automation (Python)',emoji:'&#x2699;&#xFE0F;',b:5,a:78}];
function renderBA(){var c=document.getElementById('ba-skills');if(!c)return;c.innerHTML='';baSkills.forEach(function(s){var pct=baState==='before'?s.b:s.a;var col=baState==='before'?'rgba(239,68,68,0.7)':'linear-gradient(135deg,#3B82F6,#8B5CF6)';var div=document.createElement('div');div.className='ba-skill';div.innerHTML='<div class="ba-sh"><span class="ba-sn">'+s.emoji+' '+s.name+'</span><span class="ba-sp">'+pct+'%</span></div><div class="ba-track"><div class="ba-fill" style="width:0%;background:'+col+'"></div></div>';c.appendChild(div);var _d=div,_p=pct;requestAnimationFrame(function(){requestAnimationFrame(function(){_d.querySelector('.ba-fill').style.width=_p+'%';});});});}
function baSwitch(mode){baState=mode;var bb=document.getElementById('ba-bef'),ba=document.getElementById('ba-aft');if(bb)bb.classList.toggle('active',mode==='before');if(ba)ba.classList.toggle('active',mode==='after');renderBA();}
if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',function(){renderBA();});
}else{renderBA();}
/* HEATMAP */
(function(){
function buildHeatmap(){
  var g=document.getElementById('hm-grid');
  if(!g){setTimeout(buildHeatmap,100);return;}
  g.innerHTML='';
  var hot=[2,3,6,7,9,10];
  for(var w=0;w<52;w++){
    for(var d=0;d<7;d++){
      var mi=Math.floor((w/52)*12),r=Math.random();
      var lv=r<0.25?0:r<0.45?1:r<0.65?2:r<0.82?3:4;
      if(hot.indexOf(mi)>-1&&lv<2)lv++;
      var el=document.createElement('div');
      el.className='hm-c hm-'+lv;
      el.title='Week '+(w+1)+' — '+(lv===0?'No activity':lv===1?'1 class':lv===2?'2 classes':lv===3?'Project built':'Deployed!');
      g.appendChild(el);
    }
  }
}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',buildHeatmap);}
else{buildHeatmap();}
})();
/* QUIZ */
var qData=[{q:'1/5 \u2014 What is your current coding experience?',opts:['Never written any code','Know a little \u2014 basic logic','Can write Python functions','Built small apps or projects'],s:[0,1,2,3]},{q:'2/5 \u2014 What is your main goal with AI & Python?',opts:['Get a job in data/AI field','Build my own projects','Understand AI for academics','Start a tech business'],s:[1,2,1,3]},{q:'3/5 \u2014 How much time per week can you dedicate?',opts:['1-2 hours (part-time)','3-5 hours','6-10 hours','10+ hours (full commitment)'],s:[0,1,2,3]},{q:'4/5 \u2014 Have you worked with data or spreadsheets?',opts:['Never touched Excel or data','Basic Excel \u2014 sum, filter','I use formulas and pivots','I work with data regularly'],s:[0,1,2,3]},{q:'5/5 \u2014 What excites you most about AI?',opts:['Apps that can predict things','How ChatGPT works','Building automation tools','Image recognition and vision'],s:[2,3,1,3]}];
var qIdx=0,qScore=0,qAns=[];
function initQuiz(){qIdx=0;qScore=0;qAns=[];var qr=document.getElementById('q-result'),qc=document.getElementById('q-container');if(qr)qr.style.display='none';if(qc)qc.style.display='block';var qp=document.getElementById('qprog');if(qp)qp.style.width='0%';renderQ();}
function renderQ(){var d=qData[qIdx],qt=document.getElementById('q-text');if(qt)qt.textContent=d.q;var qp=document.getElementById('qprog');if(qp)qp.style.width=((qIdx/qData.length)*100)+'%';var lt=['A','B','C','D'],html='';d.opts.forEach(function(o,i){html+='<button class="q-opt" onclick="qSel('+i+',this)"><span class="q-let">'+lt[i]+'</span>'+o+'</button>';});var qo=document.getElementById('q-opts');if(qo)qo.innerHTML=html;var qn=document.getElementById('q-next');if(qn)qn.style.display='none';}
function qSel(i,el){document.querySelectorAll('#q-opts .q-opt').forEach(function(b){b.classList.remove('sel');});el.classList.add('sel');qAns[qIdx]=i;qScore+=qData[qIdx].s[i];var qn=document.getElementById('q-next');if(qn)qn.style.display='inline-flex';}
function qNext(){if(qAns[qIdx]===undefined)return;qIdx++;if(qIdx<qData.length){renderQ();}else{showQResult();}}
function showQResult(){var qc=document.getElementById('q-container'),qr=document.getElementById('q-result');if(qc)qc.style.display='none';if(qr)qr.style.display='block';var qp=document.getElementById('qprog');if(qp)qp.style.width='100%';var s=qScore,lv,desc,sal;if(s<=3){lv='L1 \u2014 Python Fundamentals';desc='Perfect starting point. Begin with Python basics and build step by step.';sal='After course: Data trainee roles Rs 3-5 LPA';}else if(s<=7){lv='L2-3 \u2014 Data + ML';desc='You have some foundation. Start with data science, move into ML quickly.';sal='After course: Data Analyst / ML roles Rs 5-8 LPA';}else{lv='L3-7 \u2014 ML to Deployment';desc='Ready for the advanced track. Jump into ML, deep learning and deployment.';sal='After course: AI/ML Engineer roles Rs 8-15 LPA';}var qs=document.getElementById('q-score');if(qs)qs.innerHTML='<span style="background:linear-gradient(135deg,#3B82F6,#8B5CF6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">Score: '+s+'/'+qData.length*3+'</span>';var qrec=document.getElementById('q-rec');if(qrec)qrec.innerHTML='<div style="background:rgba(59,130,246,.1);border:1px solid rgba(59,130,246,.25);border-radius:var(--r2);padding:16px 18px;margin-bottom:12px"><div style="font-family:var(--fh);font-size:.95rem;color:#fff;margin-bottom:5px">&#x1F3AF; Recommended: '+lv+'</div><div style="font-size:.84rem;color:var(--mut);margin-bottom:10px">'+desc+'</div><div style="background:rgba(16,185,129,.1);border-radius:var(--r);padding:10px 12px;font-size:.82rem;color:var(--g2)">&#x1F4B0; '+sal+'</div></div>';}
if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',function(){initQuiz();});
}else{initQuiz();}
/* ASSESSMENT */
var aData=[{q:'Q1: What does this print? x=[1,2,3]; print(x[1])',opts:['1','2','3','Error'],c:1,e:'Python lists are zero-indexed. x[1] is the 2nd element: 2'},{q:'Q2: Which library is used for Machine Learning in Python?',opts:['NumPy','Pandas','Scikit-learn','Matplotlib'],c:2,e:'Scikit-learn (sklearn) is the standard ML library for Python.'},{q:'Q3: What is a neural network?',opts:['A type of database','A programming language','An AI model inspired by the brain','A data tool'],c:2,e:'Neural networks are computing systems modeled on biological neural networks.'},{q:'Q4: What does NLP stand for?',opts:['Network Layer Protocol','Natural Language Processing','Numerical Learning Process','None of above'],c:1,e:'NLP = Natural Language Processing \u2014 teaching machines to understand language.'},{q:'Q5: Where can you deploy a Python ML model as a FREE web app?',opts:['Only AWS (paid)','Streamlit Cloud','Microsoft Word','Notepad++'],c:1,e:'Streamlit Cloud offers free hosting for Python apps \u2014 used in our deployment level!'}];
var aIdx=0,aScore=0,aAns=[];
function initAssess(){aIdx=0;aScore=0;aAns=[];var ar=document.getElementById('a-result'),ac=document.getElementById('a-container');if(ar)ar.style.display='none';if(ac)ac.style.display='block';var ap=document.getElementById('aprog');if(ap)ap.style.width='0%';renderA();}
function renderA(){var d=aData[aIdx],at=document.getElementById('a-text');if(at)at.textContent=d.q;var ap=document.getElementById('aprog');if(ap)ap.style.width=((aIdx/aData.length)*100)+'%';var lt=['A','B','C','D'],html='';d.opts.forEach(function(o,i){html+='<button class="q-opt" onclick="aSel('+i+',this)"><span class="q-let">'+lt[i]+'</span>'+o+'</button>';});var ao=document.getElementById('a-opts');if(ao)ao.innerHTML=html;var an=document.getElementById('a-next');if(an)an.style.display='none';}
function aSel(i,el){var d=aData[aIdx];document.querySelectorAll('#a-opts .q-opt').forEach(function(b,bi){b.classList.remove('sel','ok','ng');if(bi===d.c)b.classList.add('ok');else if(bi===i&&i!==d.c)b.classList.add('ng');});aAns[aIdx]={chosen:i,correct:d.c,e:d.e};if(i===d.c)aScore++;var an=document.getElementById('a-next');if(an)an.style.display='inline-flex';}
function aNext(){if(!aAns[aIdx])return;aIdx++;if(aIdx<aData.length){renderA();}else{showAResult();}}
function showAResult(){var ac=document.getElementById('a-container'),ar=document.getElementById('a-result');if(ac)ac.style.display='none';if(ar)ar.style.display='block';var ap=document.getElementById('aprog');if(ap)ap.style.width='100%';var pct=Math.round((aScore/aData.length)*100),col=pct>=80?'var(--g2)':pct>=60?'var(--org)':'#F87171';var as=document.getElementById('a-score');if(as)as.innerHTML='<span style="color:'+col+'">'+pct+'%</span>';var msg=pct>=80?'Excellent! Consider our ML & AI Track (L3-L7).':pct>=60?'Good foundation! Start from Level 2-3.':'Perfect time to start from Level 1 \u2014 made exactly for you.';var am=document.getElementById('a-msg');if(am)am.textContent=msg;var exp='';aAns.forEach(function(a){exp+='<div style="background:rgba(255,255,255,.04);border-radius:var(--r);padding:10px 13px;margin-bottom:7px;border-left:3px solid '+(a.chosen===a.correct?'var(--g2)':'#EF4444')+'"><div style="font-size:.74rem;color:'+(a.chosen===a.correct?'var(--g2)':'#F87171')+';font-weight:700;margin-bottom:3px">'+(a.chosen===a.correct?'&#x2713; Correct':'&#x2717; Incorrect')+'</div><div style="font-size:.78rem;color:var(--mut)">'+a.e+'</div></div>';});var ae=document.getElementById('a-exp');if(ae)ae.innerHTML=exp;}
if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',function(){initAssess();});
}else{initAssess();}
/* NEURAL CANVAS */
(function(){var cv=document.getElementById('neural-cv');if(!cv)return;var ctx=cv.getContext('2d'),W,H,nodes=[];function resize(){W=cv.width=cv.offsetWidth;H=cv.height=cv.offsetHeight;}resize();window.addEventListener('resize',resize,{passive:true});for(var i=0;i<22;i++){nodes.push({x:Math.random()*100,y:Math.random()*100,vx:(Math.random()-.5)*.1,vy:(Math.random()-.5)*.1});}function draw(){ctx.clearRect(0,0,W,H);nodes.forEach(function(n){n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>100)n.vx*=-1;if(n.y<0||n.y>100)n.vy*=-1;});for(var i=0;i<nodes.length;i++){for(var j=i+1;j<nodes.length;j++){var dx=nodes[i].x-nodes[j].x,dy=nodes[i].y-nodes[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<22){ctx.beginPath();ctx.strokeStyle='rgba(59,130,246,'+(1-d/22)*.3+')';ctx.lineWidth=.6;ctx.moveTo(nodes[i].x/100*W,nodes[i].y/100*H);ctx.lineTo(nodes[j].x/100*W,nodes[j].y/100*H);ctx.stroke();}}}nodes.forEach(function(n){ctx.beginPath();ctx.arc(n.x/100*W,n.y/100*H,2,0,Math.PI*2);ctx.fillStyle='rgba(99,179,255,.6)';ctx.fill();});requestAnimationFrame(draw);}draw();})();

/* ─── BLOG STRIP ─── */
(function(){
  var catColors={'Python':'rgba(16,185,129,.85)','Machine Learning':'rgba(59,130,246,.85)','Deep Learning':'rgba(139,92,246,.85)','NLP':'rgba(6,182,212,.85)','Career':'rgba(245,158,11,.85)','Projects':'rgba(16,185,129,.85)','Gen AI':'rgba(236,72,153,.85)'};
  var catEmoji={'Python':'🐍','Machine Learning':'🤖','Deep Learning':'🧠','NLP':'💬','Career':'💼','Projects':'🚀','Gen AI':'✨'};
  var grads=['linear-gradient(135deg,#1D4ED8,#7C3AED)','linear-gradient(135deg,#065F46,#0D9488)','linear-gradient(135deg,#92400E,#B45309)','linear-gradient(135deg,#4C1D95,#6D28D9)','linear-gradient(135deg,#164E63,#0E7490)'];

  // Inline fallback data — works even locally without a server
  var FALLBACK = [
  {
    "id": "1",
    "slug": "python-basics-durgapur",
    "title": "Python Basics: Getting Started with Variables, Lists & Loops",
    "excerpt": "New to coding? This guide walks you through Python's core building blocks with simple examples you can run right now in your browser.",
    "content": "<p>Python is the world's most beginner-friendly programming language — and also one of the most powerful. In this post, we'll cover the three most important concepts every Python beginner must master: <strong>variables, lists, and loops</strong>.</p>\n\n<h2>1. Variables — Storing Information</h2>\n<p>A variable is simply a named container for a value. Think of it like a labelled box.</p>\n<pre><code class=\"code-block\">name = \"Rahul\"\nage = 22\ncity = \"Durgapur\"\n\nprint(f\"Hello! I'm {name}, {age} years old from {city}.\")</code></pre>\n<p>Output: <code>Hello! I'm Rahul, 22 years old from Durgapur.</code></p>\n\n<h2>2. Lists — Storing Multiple Values</h2>\n<p>A list holds multiple values in a single variable. Lists are ordered, changeable, and allow duplicates.</p>\n<pre><code class=\"code-block\">courses = [\"Python\", \"Machine Learning\", \"Deep Learning\", \"NLP\"]\n\nprint(courses[0])    # Python\nprint(courses[-1])   # NLP\nprint(len(courses))  # 4</code></pre>\n\n<h2>3. Loops — Repeating Actions</h2>\n<p>Loops let you repeat a block of code without writing it multiple times.</p>\n<pre><code class=\"code-block\">for course in courses:\n    print(f\"Learning: {course}\")\n\n# Output:\n# Learning: Python\n# Learning: Machine Learning\n# Learning: Deep Learning\n# Learning: NLP</code></pre>\n\n<h2>Practice Exercise</h2>\n<p>Try this at home: create a list of 5 cities in West Bengal and print each one using a loop. This single exercise will cement your understanding of both lists and loops together.</p>\n\n<p>Ready to go deeper? Join our <strong>Python Fundamentals batch in Durgapur</strong> — we cover all of this and much more with live projects you actually build.</p>",
    "category": "Python",
    "tags": [
      "Python",
      "Beginners",
      "Variables",
      "Loops"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80&auto=format&fit=crop",
    "author": "Biswarup Mukherjee",
    "date": "2025-12-01",
    "read_time": "5 min read",
    "featured": true
  },
  {
    "id": "2",
    "slug": "machine-learning-diabetes-prediction",
    "title": "How We Built a Live Diabetes Prediction App Using Machine Learning",
    "excerpt": "A step-by-step breakdown of one of our most popular student projects — a real ML model trained on medical data, deployed live on Streamlit Cloud.",
    "content": "<p>One of the first real projects our students build is a <strong>diabetes prediction application</strong>. It uses actual medical data, a trained machine learning model, and is deployed live on the internet for anyone to use. Here's how it works.</p>\n\n<h2>The Dataset</h2>\n<p>We use the Pima Indians Diabetes Dataset — a classic ML dataset with 768 samples and 8 features including glucose level, BMI, age, and insulin levels. The target is binary: diabetic or not.</p>\n\n<h2>The ML Pipeline</h2>\n<pre><code class=\"code-block\">import pandas as pd\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import accuracy_score\n\n# Load data\ndf = pd.read_csv('diabetes.csv')\nX = df.drop('Outcome', axis=1)\ny = df['Outcome']\n\n# Split and train\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\nmodel = RandomForestClassifier(n_estimators=100, random_state=42)\nmodel.fit(X_train, y_train)\n\n# Evaluate\nprint(f\"Accuracy: {accuracy_score(y_test, model.predict(X_test))*100:.1f}%\")</code></pre>\n\n<h2>Deploying with Streamlit</h2>\n<p>Once the model is trained, we wrap it in a Streamlit interface — sliders for each health parameter, a predict button, and an instant result. The whole UI takes about 30 lines of Python code.</p>\n\n<h2>See It Live</h2>\n<p>You can try our student's live app at <a href=\"https://diabetespredictor2026.streamlit.app\" target=\"_blank\">diabetespredictor2026.streamlit.app</a>. This is exactly the kind of project you build in our Full Program.</p>",
    "category": "Machine Learning",
    "tags": [
      "ML",
      "Scikit-learn",
      "Streamlit",
      "Projects"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80&auto=format&fit=crop",
    "author": "Biswarup Mukherjee",
    "date": "2025-12-10",
    "read_time": "7 min read",
    "featured": true
  },
  {
    "id": "3",
    "slug": "why-learn-python-durgapur",
    "title": "Why Python Is the #1 Skill to Learn in Durgapur in 2026",
    "excerpt": "The job market has shifted. Here's exactly why Python — specifically AI and ML skills — is the highest-ROI skill you can learn in the Asansol-Durgapur belt right now.",
    "content": "<p>If you're a student or working professional in Durgapur or Asansol asking yourself <em>\"what skill should I learn in 2026?\"</em> — the answer is Python. Specifically Python for AI and data science. Here's why.</p>\n\n<h2>The Demand is Real and Local</h2>\n<p>Companies in Kolkata and beyond are actively hiring Python developers with AI skills. Many students from our Durgapur batches have secured data analyst and ML engineer roles within months of completing the course.</p>\n\n<h2>Python is Beginner Friendly</h2>\n<p>Unlike Java or C++, Python reads almost like English. Compare these two ways to print \"Hello World\":</p>\n<pre><code class=\"code-block\"># Java\nSystem.out.println(\"Hello World\");\n\n# Python\nprint(\"Hello World\")</code></pre>\n<p>Python's simplicity means you spend less time fighting syntax and more time solving real problems.</p>\n\n<h2>The AI Revolution is Here</h2>\n<p>ChatGPT, Gemini, image recognition systems, recommendation engines — all built with Python. Learning Python today means you're positioned to work with the technologies that are reshaping every industry.</p>\n\n<h2>The Salary Picture</h2>\n<p>Entry-level data analysts in India earn ₹3.5–6 LPA. ML engineers with deployment skills command ₹8–15 LPA within 2–3 years. That's the career trajectory our Full Program is designed to put you on.</p>\n\n<p><strong>Ready to start?</strong> Our next batch in Durgapur begins January 15. <a href=\"#contact\">Call us at +91 7001186689</a> to reserve your seat.</p>",
    "category": "Career",
    "tags": [
      "Career",
      "Python",
      "Durgapur",
      "Jobs"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80&auto=format&fit=crop",
    "author": "Biswarup Mukherjee",
    "date": "2025-12-18",
    "read_time": "4 min read",
    "featured": false
  }
];

  function formatDate(d){return new Date(d).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});}

  function renderStrip(data){
    var posts=data.sort(function(a,b){return new Date(b.date)-new Date(a.date);}).slice(0,8);
    var scroll=document.getElementById('bs-scroll');
    if(!scroll)return;
    scroll.innerHTML=posts.map(function(p,i){
      var bg=grads[i%grads.length];

      return '<div class="bs-card" data-slug="'+p.slug+'" style="cursor:pointer">'
        +'<div class="bs-thumb" style="background:'+bg+';">'+(p.thumbnail?'<img src="'+p.thumbnail+'" alt="'+p.title+'" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"/>':'')
        +'<span class="bs-cat" style="background:'+(catColors[p.category]||'rgba(99,102,241,.85)')+'">'+p.category+'</span>'
        +(p.featured?'<span style="position:absolute;top:10px;right:10px;background:rgba(245,158,11,.9);color:#fff;font-size:.6rem;font-weight:700;padding:3px 8px;border-radius:50px">⭐ Featured</span>':'')
        +'</div>'
        +'<div class="bs-body">'
        +'<div class="bs-title">'+p.title+'</div>'
        +'<div class="bs-excerpt">'+p.excerpt+'</div>'
        +'<div class="bs-meta"><i class="bi bi-calendar3"></i>'+formatDate(p.date)+'&nbsp;&nbsp;<i class="bi bi-clock"></i>'+p.read_time+'</div>'
        +'</div></div>';
    }).join('');

    // Attach click handlers
    scroll.querySelectorAll('.bs-card').forEach(function(card){
      card.addEventListener('click',function(){
        window.location.href='post.html?slug='+card.getAttribute('data-slug');
      });
    });

    // Drag to scroll
    var isDown=false,startX,scrollLeft,moved=false;
    scroll.addEventListener('mousedown',function(e){isDown=true;moved=false;startX=e.pageX-scroll.offsetLeft;scrollLeft=scroll.scrollLeft;});
    scroll.addEventListener('mouseleave',function(){isDown=false;});
    scroll.addEventListener('mouseup',function(){isDown=false;});
    scroll.addEventListener('mousemove',function(e){
      if(!isDown)return;
      e.preventDefault();moved=true;
      var x=e.pageX-scroll.offsetLeft;
      scroll.scrollLeft=scrollLeft-(x-startX)*1.5;
    });
    // Prevent click when dragging
    scroll.querySelectorAll('.bs-card').forEach(function(card){
      card.addEventListener('click',function(e){if(moved)e.stopImmediatePropagation();},true);
    });
  }

  // Try fetch first, fall back to inline data
  fetch('blogs.json?v='+Date.now())
    .then(function(r){
      if(!r.ok) throw new Error('HTTP '+r.status);
      return r.json();
    })
    .then(renderStrip)
    .catch(function(){
      // Use inline fallback — works locally and on server
      renderStrip(FALLBACK);
    });

  window.bsScroll=function(dir){
    var scroll=document.getElementById('bs-scroll');
    if(scroll) scroll.scrollBy({left:dir*300,behavior:'smooth'});
  };
})();