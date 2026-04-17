// ══ CURSOR HEARTS ══
document.addEventListener('click', function(e) {
  const hearts = ['💕','❤️','🌸','✨','💖','🌹'];
  const h = document.createElement('div');
  h.className = 'cursor-heart';
  h.textContent = hearts[Math.floor(Math.random()*hearts.length)];
  h.style.left = (e.clientX - 10) + 'px';
  h.style.top = (e.clientY - 10) + 'px';
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 1000);
});

// ══ PASSWORD ══
const SECRET_PASSWORD = "07072025";

// ══ HINTS — ONE BY ONE ══
const HINT_DATA = [
  { text: 'Our first date as a couple 🗓️ — <em>think about the day everything changed</em>' },
  { text: 'The day I tried something for the very first time 💕 — <em>you were there for it</em>' },
  { text: 'The metro station of Udyan 🚇 — <em>you know this one</em>' },
  { text: 'The final clue awaits you — check your Snap 📱 — <em>it\'s waiting there just for you</em>' },
];
let hintsShown = 0;
let hintsOpen = false;

function toggleHints(btn) {
  const panel = document.getElementById('hints-panel');
  hintsOpen = !hintsOpen;
  panel.classList.toggle('open', hintsOpen);
  if (hintsOpen && hintsShown === 0) {
    showNextHint();
  }
  btn.innerHTML = hintsOpen ? '<span>✕</span> Hide hints' : '<span>🔍</span> Need a hint?';
}

function showNextHint() {
  if (hintsShown >= HINT_DATA.length) return;
  const container = document.getElementById('hints-container');
  const hint = HINT_DATA[hintsShown];
  const item = document.createElement('div');
  item.className = 'hint-item';
  item.innerHTML = `<div class="hint-num-badge">${hintsShown + 1}</div><div class="hint-item-text">${hint.text}</div>`;
  container.appendChild(item);
  hintsShown++;
  const btn = document.getElementById('next-hint-btn');
  if (hintsShown < HINT_DATA.length) {
    btn.style.display = 'block';
    btn.textContent = `Hint ${hintsShown + 1} of ${HINT_DATA.length} 🔍`;
  } else {
    btn.style.display = 'none';
    const note = document.createElement('p');
    note.className = 'all-hints-shown';
    note.textContent = "That's all the hints! You've got this 💕";
    document.getElementById('hints-container').appendChild(note);
  }
}

function checkPassword() {
  const val = document.getElementById('pw-input').value.trim();
  const err = document.getElementById('error-msg');
  if (val === SECRET_PASSWORD) {
    const ls = document.getElementById('lock-screen');
    ls.style.transition = 'opacity 0.8s'; ls.style.opacity = '0';
    setTimeout(() => {
      ls.style.display = 'none';
      document.getElementById('main-page').style.display = 'block';
      spawnPetals(); startTimer(); buildReasons(); showLoginModal(); initPhotoSection();
    }, 800);
  } else {
    err.textContent = '✗ That\'s not quite right, try again 💭';
    const inp = document.getElementById('pw-input');
    inp.classList.remove('shake'); void inp.offsetWidth; inp.classList.add('shake');
    setTimeout(() => err.textContent = '', 2500);
  }
}
document.getElementById('pw-input').addEventListener('keydown', e => { if (e.key === 'Enter') checkPassword(); });

// ══ MODALS ══
function showLoginModal() { updateLoginTimerDisplay(); document.getElementById('login-modal').classList.add('active'); }
function closeLoginModal() { document.getElementById('login-modal').classList.remove('active'); }
function updateLoginTimerDisplay() { const el = document.getElementById('login-timer-display'); if (el) el.textContent = '⏱️ ' + getTimerString(); }
function closeTttModal() { document.getElementById('ttt-modal').classList.remove('active'); }

// ══ TIMER ══
const START_DATE = new Date('2025-04-18T21:15:00');
function getTimerString() {
  const diff = new Date() - START_DATE;
  if (diff < 0) return 'Soon... 💕';
  const d=Math.floor(diff/86400000),h=Math.floor((diff%86400000)/3600000),m=Math.floor((diff%3600000)/60000),s=Math.floor((diff%60000)/1000);
  return `${d}d ${h}h ${m}m ${s}s`;
}
function startTimer() {
  function tick() {
    const diff = new Date() - START_DATE;
    const d=Math.floor(diff/86400000),h=Math.floor((diff%86400000)/3600000),m=Math.floor((diff%3600000)/60000),s=Math.floor((diff%60000)/1000);
    document.getElementById('t-days').textContent=d; document.getElementById('t-hours').textContent=h;
    document.getElementById('t-mins').textContent=m; document.getElementById('t-secs').textContent=s;
  }
  tick(); setInterval(tick, 1000);
}

// ══ REASONS ══
const REASONS = ['Your laugh 💕','The way you call me','Late night calls','Forehead kisses 💋','Your eyes when you smile','Coffee Nation ☕','Linkcode side by side 💻','You make everything better','Your hugs 🤗','Our inside jokes','The way you say my name','Every little moment','Your heart 💕','Being yours','You chose me 🌹','One whole year ✨','Always you','My favourite person','Holding hands 🤝','Our random dates'];
function buildReasons() {
  const track = document.getElementById('reasons-track');
  track.innerHTML = [...REASONS,...REASONS].map(r=>`<span class="reason-item"><span class="reason-dot">♥</span>${r}</span>`).join('');
}

// ══ PETALS ══
function spawnPetals() {
  const c = document.getElementById('petals');
  for (let i = 0; i < 24; i++) {
    const p = document.createElement('div'); p.className = 'petal';
    p.style.left = Math.random()*100+'vw'; p.style.width=(8+Math.random()*10)+'px'; p.style.height=(12+Math.random()*14)+'px';
    p.style.animationDuration=(7+Math.random()*10)+'s'; p.style.animationDelay=(Math.random()*14)+'s';
    c.appendChild(p);
  }
}

// ══ PHOTO SECTION ══
const HIS_CAPTIONS = ['My fav of us 💙','Look at you 😍','Best memory 💙'];
const HER_CAPTIONS = ['Your fav 💕','Your best pick 🌸','Your favourite 💖'];
const HIS_PHOTOS = ['assets/WhatsApp Image 2026-04-17 at 09.49.32.jpeg','assets/WhatsApp Image 2026-04-17 at 09.49.35.jpeg','assets/WhatsApp Image 2026-04-17 at 09.49.34.jpeg'];
let herFrameData = [null, null, null];
let dragSrc = null;

function initPhotoSection() {
  HIS_PHOTOS.forEach((url, i) => { addToPool(url, true, HIS_CAPTIONS[i]); });
  const hisContainer = document.getElementById('his-frames');
  hisContainer.innerHTML = '';
  for (let i = 0; i < 3; i++) {
    const frame = document.createElement('div');
    frame.className = 'photo-frame his-frame has-photo';
    frame.dataset.side = 'his'; frame.dataset.idx = i;
    frame.innerHTML = `<div class="frame-number" style="background:#6a9fcb">${i+1}</div><img src="${HIS_PHOTOS[i]}" alt="My Pick ${i+1}" /><div class="frame-caption">${HIS_CAPTIONS[i]}</div>`;
    hisContainer.appendChild(frame);
  }
  const herContainer = document.getElementById('her-frames');
  herContainer.innerHTML = '';
  for (let i = 0; i < 3; i++) renderHerFrame(i);
  checkFinish();
}

function renderHerFrame(idx) {
  const container = document.getElementById('her-frames');
  let frame = container.children[idx];
  if (!frame) { frame = document.createElement('div'); container.appendChild(frame); }
  const url = herFrameData[idx];
  if (url) {
    frame.className = 'photo-frame has-photo';
    frame.dataset.side = 'hers'; frame.dataset.idx = idx;
    frame.innerHTML = `<div class="frame-number">${idx+1}</div><img src="${url}" alt="Your Pick ${idx+1}" /><div class="frame-caption">${HER_CAPTIONS[idx]}</div><button class="frame-remove" onclick="removeHerFrame(${idx})">✕</button>`;
    const img = frame.querySelector('img');
    img.draggable = true;
    img.addEventListener('dragstart', () => { dragSrc = { url, fromHerFrame: idx }; img.style.opacity='0.4'; });
    img.addEventListener('dragend', () => { img.style.opacity='1'; dragSrc=null; });
    img.addEventListener('touchstart', () => { dragSrc = { url, fromHerFrame: idx }; img.style.opacity='0.5'; }, {passive:true});
  } else {
    frame.className = 'photo-frame';
    frame.dataset.side = 'hers'; frame.dataset.idx = idx;
    frame.innerHTML = `<div class="frame-number">${idx+1}</div><span class="frame-drop-hint">💕</span><span class="frame-drop-text">Drop your photo here</span><div class="frame-caption">${HER_CAPTIONS[idx]}</div>`;
  }
  setupHerFrameDrop(frame, idx);
}

function setupHerFrameDrop(frame, idx) {
  frame.addEventListener('dragover', e => { e.preventDefault(); frame.classList.add('drag-over-frame'); });
  frame.addEventListener('dragleave', () => frame.classList.remove('drag-over-frame'));
  frame.addEventListener('drop', e => {
    e.preventDefault(); frame.classList.remove('drag-over-frame');
    if (!dragSrc) return;
    const url = dragSrc.url;
    if (dragSrc.fromHerFrame !== null && dragSrc.fromHerFrame !== undefined) { herFrameData[dragSrc.fromHerFrame] = null; renderHerFrame(dragSrc.fromHerFrame); }
    herFrameData[idx] = url; renderHerFrame(idx); checkFinish(); dragSrc = null;
  });
  frame.addEventListener('touchend', e => {
    e.preventDefault();
    if (!dragSrc) return;
    const touch = e.changedTouches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    const tf = el ? el.closest('.photo-frame[data-side="hers"]') : null;
    if (tf) {
      const tidx = parseInt(tf.dataset.idx);
      const url = dragSrc.url;
      if (dragSrc.fromHerFrame !== null && dragSrc.fromHerFrame !== undefined) { herFrameData[dragSrc.fromHerFrame] = null; renderHerFrame(dragSrc.fromHerFrame); }
      herFrameData[tidx] = url; renderHerFrame(tidx); checkFinish();
    }
    document.querySelectorAll('.photo-frame').forEach(f=>f.classList.remove('drag-over-frame'));
    dragSrc = null;
  });
}

function removeHerFrame(idx) { herFrameData[idx]=null; renderHerFrame(idx); checkFinish(); }
function clearHerFrames() { herFrameData=[null,null,null]; for(let i=0;i<3;i++) renderHerFrame(i); checkFinish(); document.getElementById('gallery-completed').classList.remove('visible'); }
function checkFinish() {
  const filled = herFrameData.filter(Boolean).length;
  document.getElementById('finish-btn').style.display = filled === 3 ? 'inline-block' : 'none';
}
function finishGallery() {
  const gallery = document.getElementById('polaroid-gallery'); gallery.innerHTML = '';
  const hisImgs = document.querySelectorAll('#his-frames img');
  hisImgs.forEach((img, i) => {
    const card = document.createElement('div'); card.className='polaroid-card';
    card.innerHTML = `<img src="${img.src}" alt="My Pick ${i+1}" /><div class="polaroid-caption">${HIS_CAPTIONS[i]}</div>`;
    gallery.appendChild(card);
  });
  herFrameData.forEach((url, i) => {
    if (!url) return;
    const card = document.createElement('div'); card.className='polaroid-card';
    card.innerHTML = `<img src="${url}" alt="Your Pick ${i+1}" /><div class="polaroid-caption">${HER_CAPTIONS[i]}</div>`;
    gallery.appendChild(card);
  });
  document.getElementById('gallery-completed').classList.add('visible');
  document.getElementById('gallery-completed').scrollIntoView({behavior:'smooth',block:'start'});
}
function rearrangeGallery() { document.getElementById('gallery-completed').classList.remove('visible'); }
function addToPool(url, isHis, title) {
  const pool = document.getElementById('upload-pool');
  const img = document.createElement('img');
  img.src = url; img.className = 'pool-photo' + (isHis?' his-pick':''); img.draggable = true;
  img.title = title || 'Drag to a frame';
  img.addEventListener('dragstart', () => { dragSrc={url, fromHerFrame:null}; img.classList.add('dragging'); });
  img.addEventListener('dragend', () => { img.classList.remove('dragging'); dragSrc=null; });
  img.addEventListener('touchstart', () => { dragSrc={url, fromHerFrame:null}; img.style.opacity='0.5'; }, {passive:true});
  img.addEventListener('touchend', () => { img.style.opacity='1'; });
  const addBtn = document.getElementById('pool-add-btn');
  pool.insertBefore(img, addBtn);
}
document.getElementById('photo-file-input').addEventListener('change', function() {
  Array.from(this.files).forEach(file => { addToPool(URL.createObjectURL(file), false); });
  this.value = '';
});
const uploadPool = document.getElementById('upload-pool');
uploadPool.addEventListener('dragover', e=>{e.preventDefault(); uploadPool.classList.add('drag-over');});
uploadPool.addEventListener('dragleave', ()=>uploadPool.classList.remove('drag-over'));
uploadPool.addEventListener('drop', e=>{
  e.preventDefault(); uploadPool.classList.remove('drag-over');
  if (dragSrc && dragSrc.fromHerFrame !== null && dragSrc.fromHerFrame !== undefined) { herFrameData[dragSrc.fromHerFrame]=null; renderHerFrame(dragSrc.fromHerFrame); checkFinish(); dragSrc=null; }
});
document.addEventListener('touchmove', e=>{
  if (!dragSrc) return;
  const touch=e.touches[0];
  document.querySelectorAll('.photo-frame[data-side="hers"]').forEach(f=>{
    const r=f.getBoundingClientRect();
    if(touch.clientX>=r.left&&touch.clientX<=r.right&&touch.clientY>=r.top&&touch.clientY<=r.bottom) f.classList.add('drag-over-frame');
    else f.classList.remove('drag-over-frame');
  });
},{passive:true});

// ══ MEMORY JAR ══
const MEMORIES = [
  {label:'🧇 First Waffle',text:'The first time we had waffles together. Simple, warm, perfect — just like us.'},
  {label:'💻 Linkcode',text:'Those Linkcode days — pretending to work but really just stealing glances at you.'},
  {label:'☕ Coffee Nation',text:'Every single Coffee Nation trip felt like our little ritual. I hope we never stop. ik we only went there 2 times but its ok'},
  {label:'🚇 Metro Moment',text:'That metro rides. I replayed it in my head a hundred times.'},
  {label:'🌙 Late Night Calls',text:'When neither of us wanted to say goodnight. I love that about us.'},
  {label:'💋 Forehead Kiss',text:"I gave you one and you went quiet. just your head on my shoulder."},
  {label:'🌹 April 18',text:'9:15 PM. The moment that changed everything. My favourite date in the whole world.'},
  {label:'😤 No Nickname',text:'You STILL haven\'t given me a nickname. One year, zero nicknames. Unbelievable.'},
  {label:'🤝 Holding Hands',text:'The way you always reach for my hand. Like it\'s the most natural thing in the world. It is.'},
];
function buildJar() {
  const g=document.getElementById('jar-grid');
  MEMORIES.forEach(m=>{
    const btn=document.createElement('button'); btn.className='memory-pill'; btn.textContent=m.label;
    btn.onclick=()=>{const d=document.getElementById('memory-display');d.style.opacity='0';setTimeout(()=>{d.textContent=m.text;d.style.opacity='1';},220);};
    g.appendChild(btn);
  });
}
buildJar();

// ══ SONG ══
let vinylPlaying = false;
function toggleVinyl(btn){
  const audio = document.getElementById('song');
  const vinyl = document.getElementById('vinyl');
  vinylPlaying = !vinylPlaying;
  vinyl.classList.toggle('playing', vinylPlaying);
  if(vinylPlaying){ audio.currentTime = 0; audio.play(); btn.textContent = '⏸ Feeling it…'; }
  else { audio.pause(); btn.textContent = '▶ Play in your heart'; }
  audio.onended = () => { vinylPlaying = false; vinyl.classList.remove('playing'); btn.textContent = '▶ Play in your heart'; };
}

// ══ WORD SEARCH ══
const WORDS=['LOVE','ALWAYS','KISS','HEART','FOREVER','DARLING','DREAM','OURS','SMILE','HAPPY','FOREHEADKISS','BABYYY','STLAB','SATURDAY','WAFFLE','XERODEGREE','COFFEENATION'];
const GRID_SIZE=15;
let grid=[],selectedCells=[],foundWords=new Set(),isSelecting=false;
let wordPositions = {};

function buildWordSearch(){
  grid=Array.from({length:GRID_SIZE},()=>Array(GRID_SIZE).fill(''));
  wordPositions = {};
  foundWords = new Set();
  const dirs=[[0,1],[1,0],[1,1],[1,-1],[-1,0],[0,-1],[-1,-1],[-1,1]];
  WORDS.forEach(word=>{
    for(let t=0;t<200;t++){
      const dir=dirs[Math.floor(Math.random()*dirs.length)];
      let r=Math.floor(Math.random()*GRID_SIZE),c=Math.floor(Math.random()*GRID_SIZE);
      let ok=true;
      for(let i=0;i<word.length;i++){const nr=r+dir[0]*i,nc=c+dir[1]*i;if(nr<0||nr>=GRID_SIZE||nc<0||nc>=GRID_SIZE||(grid[nr][nc]!==''&&grid[nr][nc]!==word[i])){ok=false;break;}}
      if(ok){
        const cells=[];
        for(let i=0;i<word.length;i++){grid[r+dir[0]*i][c+dir[1]*i]=word[i];cells.push([r+dir[0]*i,c+dir[1]*i]);}
        wordPositions[word]=cells;
        break;
      }
    }
  });
  const alpha='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for(let r=0;r<GRID_SIZE;r++)for(let c=0;c<GRID_SIZE;c++)if(!grid[r][c])grid[r][c]=alpha[Math.floor(Math.random()*26)];
  renderGrid(); renderWordList();
  document.getElementById('congrats').style.display='none';
  document.getElementById('game-status').textContent='Select letters by clicking & dragging 💕';
}

function revealAllWords(){
  WORDS.forEach(word=>{
    if(foundWords.has(word))return;
    const positions=wordPositions[word];
    if(!positions)return;
    positions.forEach(([r,c])=>{
      const cell=[...document.querySelectorAll('.ws-cell')].find(el=>+el.dataset.r===r&&+el.dataset.c===c);
      if(cell){cell.classList.remove('selecting');cell.classList.add('found');}
    });
    foundWords.add(word);
    document.querySelectorAll('.word-chip').forEach(chip=>{if(chip.textContent===word)chip.classList.add('found');});
  });
  document.getElementById('game-status').textContent='All words revealed! 💕';
  document.getElementById('congrats').style.display='block';
}

function renderGrid(){
  const cn=document.getElementById('ws-grid');cn.innerHTML='';
  for(let r=0;r<GRID_SIZE;r++)for(let c=0;c<GRID_SIZE;c++){
    const cell=document.createElement('div');cell.className='ws-cell';cell.textContent=grid[r][c];cell.dataset.r=r;cell.dataset.c=c;
    cell.addEventListener('mousedown',e=>{e.preventDefault();startSelect(cell);});
    cell.addEventListener('mouseover',()=>{if(isSelecting)continueSelect(cell);});
    cell.addEventListener('touchstart',e=>{e.preventDefault();startSelect(cell);},{passive:false});
    cell.addEventListener('touchmove',e=>{e.preventDefault();const t=e.touches[0];const el=document.elementFromPoint(t.clientX,t.clientY);if(el&&el.classList.contains('ws-cell'))continueSelect(el);},{passive:false});
    cell.addEventListener('mouseup',endSelect);cell.addEventListener('touchend',endSelect);
    cn.appendChild(cell);
  }
  document.addEventListener('mouseup',endSelect);
}
function getCells(){return document.querySelectorAll('.ws-cell');}
function startSelect(cell){isSelecting=true;selectedCells=[cell];highlightSelecting();}
function continueSelect(cell){
  if(!selectedCells.length)return;
  const first=selectedCells[0],r0=+first.dataset.r,c0=+first.dataset.c,r1=+cell.dataset.r,c1=+cell.dataset.c;
  const dr=r1-r0,dc=c1-c0,len=Math.max(Math.abs(dr),Math.abs(dc));
  if(len===0){selectedCells=[first];highlightSelecting();return;}
  const sr=dr===0?0:dr/Math.abs(dr),sc=dc===0?0:dc/Math.abs(dc);
  if(!(Math.abs(dr)===0||Math.abs(dc)===0||Math.abs(dr)===Math.abs(dc)))return;
  const ns=[];
  for(let i=0;i<=len;i++){const tr=r0+sr*i,tc=c0+sc*i;const f=[...getCells()].find(c=>+c.dataset.r===tr&&+c.dataset.c===tc);if(f)ns.push(f);}
  selectedCells=ns;highlightSelecting();
}
function highlightSelecting(){getCells().forEach(c=>{if(!c.classList.contains('found'))c.classList.remove('selecting');});selectedCells.forEach(c=>{if(!c.classList.contains('found'))c.classList.add('selecting');});}
function endSelect(){
  if(!isSelecting)return;isSelecting=false;
  const word=selectedCells.map(c=>c.textContent).join(''),rev=word.split('').reverse().join('');
  const match=WORDS.find(w=>w===word||w===rev);
  if(match&&!foundWords.has(match)){
    foundWords.add(match);
    selectedCells.forEach(c=>{c.classList.remove('selecting');c.classList.add('found');});
    document.querySelectorAll('.word-chip').forEach(chip=>{if(chip.textContent===match)chip.classList.add('found');});
    document.getElementById('game-status').textContent=`✓ Found "${match}"! ${WORDS.length-foundWords.size} left 💕`;
    if(foundWords.size===WORDS.length){document.getElementById('congrats').style.display='block';document.getElementById('game-status').textContent='';}
  }else{selectedCells.forEach(c=>{if(!c.classList.contains('found'))c.classList.remove('selecting');});}
  selectedCells=[];
}
function renderWordList(){const list=document.getElementById('word-list');list.innerHTML='';WORDS.forEach(w=>{const chip=document.createElement('div');chip.className='word-chip';chip.textContent=w;list.appendChild(chip);});}
buildWordSearch();

// ══ CROSSWORD ══
const CW_ENTRIES=[
  {num:1,dir:'across',row:0,col:0,answer:'LOVE',clue:'What we have 💕'},
  {num:2,dir:'across',row:2,col:0,answer:'KISS',clue:'What I give you on the forehead'},
  {num:3,dir:'across',row:4,col:0,answer:'SATURDAY',clue:'Our favourite day of the week 💋'},
  {num:4,dir:'across',row:6,col:0,answer:'WAFFLE',clue:'What you like the most and want to quit 🧇'},
  {num:5,dir:'across',row:8,col:0,answer:'SMILE',clue:'What you always give me 😊'},
  {num:1,dir:'down',row:0,col:0,answer:'LAWS',clue:"_ of attraction — that's us"},
  {num:6,dir:'down',row:0,col:2,answer:'VOWS',clue:"Promises we'll make someday"},
  {num:7,dir:'down',row:2,col:4,answer:'STLAB',clue:'Where we both grind 💻'},
  {num:8,dir:'down',row:4,col:7,answer:'DREAM',clue:'What you are to me 💭'},
];
const CW_ROWS=9,CW_COLS=9;
let cwGrid=[],cwActive=null,cwActiveDir='across';
function buildCrossword(){
  cwGrid=Array.from({length:CW_ROWS},()=>Array(CW_COLS).fill(null));
  CW_ENTRIES.forEach(entry=>{
    for(let i=0;i<entry.answer.length;i++){
      const r=entry.dir==='across'?entry.row:entry.row+i,c=entry.dir==='across'?entry.col+i:entry.col;
      if(r<CW_ROWS&&c<CW_COLS){if(!cwGrid[r][c])cwGrid[r][c]={letter:entry.answer[i],num:null,value:'',entries:[]};cwGrid[r][c].letter=entry.answer[i];cwGrid[r][c].entries.push({num:entry.num,dir:entry.dir});}
    }
    if(cwGrid[entry.row][entry.col])cwGrid[entry.row][entry.col].num=entry.num;
  });
  renderCrossword();renderCwClues();
}
function renderCrossword(){
  const cn=document.getElementById('cw-grid');cn.style.gridTemplateColumns=`repeat(${CW_COLS},34px)`;cn.innerHTML='';
  for(let r=0;r<CW_ROWS;r++)for(let c=0;c<CW_COLS;c++){
    const cd=cwGrid[r][c],div=document.createElement('div');
    div.className='cw-cell '+(cd?'white':'black');div.dataset.r=r;div.dataset.c=c;
    if(cd){
      if(cd.num){const n=document.createElement('span');n.className='cw-num';n.textContent=cd.num;div.appendChild(n);}
      const inp=document.createElement('input');inp.className='cw-input';inp.maxLength=1;inp.value=cd.value||'';inp.dataset.r=r;inp.dataset.c=c;
      inp.addEventListener('click',()=>cwCellClick(r,c));inp.addEventListener('keydown',e=>cwKeyDown(e,r,c));inp.addEventListener('input',e=>cwInputHandler(e,r,c));
      div.appendChild(inp);
    }
    cn.appendChild(div);
  }
}
function cwCellClick(r,c){if(!cwGrid[r][c])return;if(cwActive&&cwActive[0]===r&&cwActive[1]===c)cwActiveDir=cwActiveDir==='across'?'down':'across';cwActive=[r,c];highlightCwWord();getCwInput(r,c)?.focus();}
function getCwInput(r,c){return document.querySelector(`.cw-input[data-r="${r}"][data-c="${c}"]`);}
function highlightCwWord(){
  document.querySelectorAll('.cw-cell.white').forEach(el=>el.classList.remove('active','highlighted'));
  if(!cwActive)return;
  const[ar,ac]=cwActive;
  document.querySelector(`.cw-cell[data-r="${ar}"][data-c="${ac}"]`)?.classList.add('active');
  const entry=CW_ENTRIES.find(e=>{if(e.dir!==cwActiveDir)return false;for(let i=0;i<e.answer.length;i++){const r=e.dir==='across'?e.row:e.row+i,c=e.dir==='across'?e.col+i:e.col;if(r===ar&&c===ac)return true;}return false;});
  if(entry){
    for(let i=0;i<entry.answer.length;i++){const r=entry.dir==='across'?entry.row:entry.row+i,c=entry.dir==='across'?entry.col+i:entry.col;const el=document.querySelector(`.cw-cell[data-r="${r}"][data-c="${c}"]`);if(el&&!(r===ar&&c===ac))el.classList.add('highlighted');}
    document.querySelectorAll('.cw-clue').forEach(el=>el.classList.remove('active'));
    document.querySelector(`.cw-clue[data-num="${entry.num}"][data-dir="${entry.dir}"]`)?.classList.add('active');
  }
}
function cwKeyDown(e,r,c){
  if(e.key==='ArrowRight'){e.preventDefault();moveCw(r,c,0,1);}else if(e.key==='ArrowLeft'){e.preventDefault();moveCw(r,c,0,-1);}
  else if(e.key==='ArrowDown'){e.preventDefault();moveCw(r,c,1,0);}else if(e.key==='ArrowUp'){e.preventDefault();moveCw(r,c,-1,0);}
  else if(e.key==='Backspace'){if(cwGrid[r][c]&&!cwGrid[r][c].value){moveCw(r,c,cwActiveDir==='down'?-1:0,cwActiveDir==='across'?-1:0);}}
}
function cwInputHandler(e,r,c){const val=e.target.value.toUpperCase().slice(-1);e.target.value=val;if(cwGrid[r][c])cwGrid[r][c].value=val;if(val)moveCw(r,c,cwActiveDir==='down'?1:0,cwActiveDir==='across'?1:0);}
function moveCw(r,c,dr,dc){const nr=r+dr,nc=c+dc;if(nr>=0&&nr<CW_ROWS&&nc>=0&&nc<CW_COLS&&cwGrid[nr][nc]){cwActive=[nr,nc];highlightCwWord();getCwInput(nr,nc)?.focus();}}
function renderCwClues(){
  const cn=document.getElementById('cw-clues');
  const a=CW_ENTRIES.filter(e=>e.dir==='across'),d=CW_ENTRIES.filter(e=>e.dir==='down');
  cn.innerHTML=`<div class="cw-clue-group"><h3>Across</h3>${a.map(e=>`<div class="cw-clue" data-num="${e.num}" data-dir="across" onclick="cwClueClick(${e.num},'across')">${e.num}. ${e.clue}</div>`).join('')}</div><div class="cw-clue-group"><h3>Down</h3>${d.map(e=>`<div class="cw-clue" data-num="${e.num}" data-dir="down" onclick="cwClueClick(${e.num},'down')">${e.num}. ${e.clue}</div>`).join('')}</div>`;
}
function cwClueClick(num,dir){const e=CW_ENTRIES.find(e=>e.num===num&&e.dir===dir);if(!e)return;cwActiveDir=dir;cwActive=[e.row,e.col];highlightCwWord();getCwInput(e.row,e.col)?.focus();}
function checkCrossword(){
  let allCorrect=true;
  CW_ENTRIES.forEach(entry=>{
    let ok=true;
    for(let i=0;i<entry.answer.length;i++){const r=entry.dir==='across'?entry.row:entry.row+i,c=entry.dir==='across'?entry.col+i:entry.col;if(cwGrid[r]&&cwGrid[r][c]&&(cwGrid[r][c].value||'').toUpperCase()!==entry.answer[i]){ok=false;allCorrect=false;}}
    const el=document.querySelector(`.cw-clue[data-num="${entry.num}"][data-dir="${entry.dir}"]`);if(el)ok?el.classList.add('solved'):el.classList.remove('solved');
  });
  if(allCorrect)alert('🎉 You got every answer! You really do know us! 💕');
}
function revealCrossword(){CW_ENTRIES.forEach(e=>{for(let i=0;i<e.answer.length;i++){const r=e.dir==='across'?e.row:e.row+i,c=e.dir==='across'?e.col+i:e.col;if(cwGrid[r]&&cwGrid[r][c]){cwGrid[r][c].value=e.answer[i];const inp=getCwInput(r,c);if(inp)inp.value=e.answer[i];}}}); document.querySelectorAll('.cw-clue').forEach(el=>el.classList.add('solved'));}
function resetCrossword(){for(let r=0;r<CW_ROWS;r++)for(let c=0;c<CW_COLS;c++)if(cwGrid[r]&&cwGrid[r][c]){cwGrid[r][c].value='';const inp=getCwInput(r,c);if(inp)inp.value='';}document.querySelectorAll('.cw-clue').forEach(el=>el.classList.remove('solved'));}
buildCrossword();

// ══ TIC TAC TOE ══
let tttBoard=Array(9).fill(null),tttXScore=0,tttOScore=0,tttTies=0,tttGameNum=0,tttOver=false,tttXTurn=true;
function resetTtt(forceNew){tttBoard=Array(9).fill(null);tttOver=false;tttXTurn=true;if(forceNew)tttGameNum++;document.getElementById('ttt-status').textContent='Your turn! 💕';document.getElementById('ttt-game-count').textContent=`Game ${tttGameNum+1}`;renderTtt();}
function renderTtt(){const b=document.getElementById('ttt-board');b.innerHTML='';tttBoard.forEach((val,i)=>{const cell=document.createElement('div');cell.className='ttt-cell';cell.textContent=val==='X'?'✕':val==='O'?'❤️':'';cell.style.fontSize=val?'2rem':'0';if(!val&&!tttOver)cell.onclick=()=>tttClick(i);b.appendChild(cell);});}
function tttClick(i){if(tttBoard[i]||tttOver||!tttXTurn)return;tttBoard[i]='X';tttXTurn=false;renderTtt();const win=checkWinner(tttBoard);if(win){tttOver=true;if(win==='X'){tttXScore++;document.getElementById('ttt-x-score').textContent=tttXScore;document.getElementById('ttt-status').textContent='You won! 🥹';highlightWin(win);setTimeout(()=>document.getElementById('ttt-modal').classList.add('active'),600);}return;}if(tttBoard.every(v=>v)){tttOver=true;tttTies++;document.getElementById('ttt-tie-score').textContent=tttTies;document.getElementById('ttt-status').textContent="It's a tie! 💕";setTimeout(()=>{tttGameNum++;resetTtt();},1500);return;}setTimeout(()=>aiMove(),500);}
function aiMove(){const move=tttGameNum<2?getBestMove('O'):getDumbMove();if(move===null||move===undefined)return;tttBoard[move]='O';tttXTurn=true;renderTtt();const win=checkWinner(tttBoard);if(win){tttOver=true;if(win==='O'){tttOScore++;document.getElementById('ttt-o-score').textContent=tttOScore;document.getElementById('ttt-status').textContent='I won this one 😏 Try again!';highlightWin(win);setTimeout(()=>{tttGameNum++;resetTtt();},2000);}return;}if(tttBoard.every(v=>v)){tttOver=true;tttTies++;document.getElementById('ttt-tie-score').textContent=tttTies;document.getElementById('ttt-status').textContent="It's a tie! 💕";setTimeout(()=>{tttGameNum++;resetTtt();},1500);return;}document.getElementById('ttt-status').textContent='Your turn! 💕';}
function getDumbMove(){const e=tttBoard.map((v,i)=>v===null?i:-1).filter(i=>i>=0),safe=e.filter(i=>{const b=[...tttBoard];b[i]='O';return checkWinner(b)!=='O';});return safe.length?safe[Math.floor(Math.random()*safe.length)]:e[0];}
function getBestMove(p){const o=p==='O'?'X':'O';for(let i=0;i<9;i++){if(!tttBoard[i]){const b=[...tttBoard];b[i]=p;if(checkWinner(b)===p)return i;}}for(let i=0;i<9;i++){if(!tttBoard[i]){const b=[...tttBoard];b[i]=o;if(checkWinner(b)===o)return i;}}if(!tttBoard[4])return 4;const cr=[0,2,6,8].filter(i=>!tttBoard[i]);if(cr.length)return cr[Math.floor(Math.random()*cr.length)];return[1,3,5,7].find(i=>!tttBoard[i]);}
function checkWinner(b){const lines=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];for(const[a,c,d]of lines){if(b[a]&&b[a]===b[c]&&b[a]===b[d])return b[a];}return null;}
function highlightWin(w){const lines=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],cells=document.querySelectorAll('.ttt-cell');for(const line of lines){if(tttBoard[line[0]]===w&&tttBoard[line[1]]===w&&tttBoard[line[2]]===w)line.forEach(i=>cells[i].classList.add('win'));}}
resetTtt();

// ══ DOTS & BOXES — 7×7 grid ══
const DAB_N = 7;
const DAB_CANVAS_SIZE = 420;
const DAB_PAD = 36;
const DAB_STEP = (DAB_CANVAS_SIZE - 2 * DAB_PAD) / (DAB_N - 1);
const DAB_DOT_R = 5;
const DAB_LINE_HIT = 12;

const dabCanvas = document.getElementById('dab-canvas');
dabCanvas.width = DAB_CANVAS_SIZE;
dabCanvas.height = DAB_CANVAS_SIZE;
const dabCtx = dabCanvas.getContext('2d');

let dabHLines = [], dabVLines = [], dabBoxes = [];
let dabHerTurn = true, dabHerScore = 0, dabHisScore = 0, dabGameOver = false;

function dabReset() {
  dabHLines = Array.from({length: DAB_N}, () => Array(DAB_N - 1).fill(null));
  dabVLines = Array.from({length: DAB_N - 1}, () => Array(DAB_N).fill(null));
  dabBoxes = Array.from({length: DAB_N - 1}, () => Array(DAB_N - 1).fill(null));
  dabHerTurn = true; dabHerScore = 0; dabHisScore = 0; dabGameOver = false;
  document.getElementById('dab-her-score').textContent = 0;
  document.getElementById('dab-his-score').textContent = 0;
  document.getElementById('dab-status').textContent = 'Your turn 💕 — tap a line between two dots!';
  dabDraw();
}

function dabDot(r, c) {
  return { x: DAB_PAD + c * DAB_STEP, y: DAB_PAD + r * DAB_STEP };
}

function dabDraw() {
  const ctx = dabCtx;
  const W = dabCanvas.width, H = dabCanvas.height;
  ctx.clearRect(0, 0, W, H);
  for (let r = 0; r < DAB_N - 1; r++) {
    for (let c = 0; c < DAB_N - 1; c++) {
      if (dabBoxes[r][c]) {
        const tl = dabDot(r, c);
        ctx.fillStyle = dabBoxes[r][c] === 'her' ? 'rgba(232,160,160,0.35)' : 'rgba(160,196,232,0.35)';
        ctx.fillRect(tl.x, tl.y, DAB_STEP, DAB_STEP);
        ctx.font = Math.round(DAB_STEP * 0.4) + 'px serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(dabBoxes[r][c] === 'her' ? '💕' : '💙', tl.x + DAB_STEP/2, tl.y + DAB_STEP/2);
      }
    }
  }
  for (let r = 0; r < DAB_N; r++) {
    for (let c = 0; c < DAB_N - 1; c++) {
      const a = dabDot(r, c), b = dabDot(r, c + 1);
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
      if (dabHLines[r][c] !== null) { ctx.strokeStyle = dabHLines[r][c] === 'her' ? '#e8a0a0' : '#a0c4e8'; ctx.lineWidth = 3; }
      else { ctx.strokeStyle = '#f0d5d5'; ctx.lineWidth = 2; }
      ctx.stroke();
    }
  }
  for (let r = 0; r < DAB_N - 1; r++) {
    for (let c = 0; c < DAB_N; c++) {
      const a = dabDot(r, c), b = dabDot(r + 1, c);
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
      if (dabVLines[r][c] !== null) { ctx.strokeStyle = dabVLines[r][c] === 'her' ? '#e8a0a0' : '#a0c4e8'; ctx.lineWidth = 3; }
      else { ctx.strokeStyle = '#f0d5d5'; ctx.lineWidth = 2; }
      ctx.stroke();
    }
  }
  for (let r = 0; r < DAB_N; r++) {
    for (let c = 0; c < DAB_N; c++) {
      const d = dabDot(r, c);
      ctx.beginPath(); ctx.arc(d.x, d.y, DAB_DOT_R, 0, Math.PI * 2);
      ctx.fillStyle = '#c0636b'; ctx.fill();
    }
  }
}

function dabGetLine(px, py) {
  for (let r = 0; r < DAB_N; r++) {
    for (let c = 0; c < DAB_N - 1; c++) {
      if (dabHLines[r][c] !== null) continue;
      const a = dabDot(r, c), b = dabDot(r, c + 1);
      const mx = (a.x + b.x) / 2, my = a.y;
      if (Math.abs(px - mx) < DAB_STEP / 2 && Math.abs(py - my) < DAB_LINE_HIT) return { type: 'h', r, c };
    }
  }
  for (let r = 0; r < DAB_N - 1; r++) {
    for (let c = 0; c < DAB_N; c++) {
      if (dabVLines[r][c] !== null) continue;
      const a = dabDot(r, c), b = dabDot(r + 1, c);
      const mx = a.x, my = (a.y + b.y) / 2;
      if (Math.abs(px - mx) < DAB_LINE_HIT && Math.abs(py - my) < DAB_STEP / 2) return { type: 'v', r, c };
    }
  }
  return null;
}

function dabClaimBoxes(player) {
  let claimed = 0;
  for (let r = 0; r < DAB_N - 1; r++) {
    for (let c = 0; c < DAB_N - 1; c++) {
      if (dabBoxes[r][c]) continue;
      if (dabHLines[r][c] !== null && dabHLines[r+1][c] !== null && dabVLines[r][c] !== null && dabVLines[r][c+1] !== null) {
        dabBoxes[r][c] = player; claimed++;
      }
    }
  }
  return claimed;
}

function dabAllFilled() {
  for (let r = 0; r < DAB_N; r++) for (let c = 0; c < DAB_N - 1; c++) if (dabHLines[r][c] === null) return false;
  for (let r = 0; r < DAB_N - 1; r++) for (let c = 0; c < DAB_N; c++) if (dabVLines[r][c] === null) return false;
  return true;
}

function dabGetAllEmptyLines() {
  const lines = [];
  for (let r = 0; r < DAB_N; r++) for (let c = 0; c < DAB_N - 1; c++) if (dabHLines[r][c] === null) lines.push({type:'h',r,c});
  for (let r = 0; r < DAB_N - 1; r++) for (let c = 0; c < DAB_N; c++) if (dabVLines[r][c] === null) lines.push({type:'v',r,c});
  return lines;
}

function dabSimulateClaim(line) {
  let count = 0;
  const tempH = dabHLines.map(r=>[...r]);
  const tempV = dabVLines.map(r=>[...r]);
  if (line.type === 'h') tempH[line.r][line.c] = 'his'; else tempV[line.r][line.c] = 'his';
  for (let r = 0; r < DAB_N - 1; r++) for (let c = 0; c < DAB_N - 1; c++) {
    if (!dabBoxes[r][c] && tempH[r][c] !== null && tempH[r+1][c] !== null && tempV[r][c] !== null && tempV[r][c+1] !== null) count++;
  }
  return count;
}

function dabMakeMove(line, player) {
  if (line.type === 'h') dabHLines[line.r][line.c] = player;
  else dabVLines[line.r][line.c] = player;
  const claimed = dabClaimBoxes(player);
  if (player === 'her') { dabHerScore += claimed; document.getElementById('dab-her-score').textContent = dabHerScore; }
  else { dabHisScore += claimed; document.getElementById('dab-his-score').textContent = dabHisScore; }
  return claimed;
}

function dabAiMove() {
  const empty = dabGetAllEmptyLines();
  if (!empty.length) return;
  let best = empty.find(l => dabSimulateClaim(l) > 0);
  if (!best) {
    best = empty.find(l => {
      if (l.type==='h') dabHLines[l.r][l.c]='his'; else dabVLines[l.r][l.c]='his';
      const safe = dabGetAllEmptyLines().every(nl => dabSimulateClaim(nl) === 0);
      if (l.type==='h') dabHLines[l.r][l.c]=null; else dabVLines[l.r][l.c]=null;
      return safe;
    });
  }
  if (!best) best = empty[Math.floor(Math.random() * empty.length)];
  const claimed = dabMakeMove(best, 'his');
  dabDraw();
  if (dabAllFilled()) { dabEndGame(); return; }
  if (claimed > 0) { document.getElementById('dab-status').textContent = 'I claimed a box! 😏 Going again…'; setTimeout(dabAiMove, 700); }
  else { dabHerTurn = true; document.getElementById('dab-status').textContent = 'Your turn 💕 — tap a line!'; }
}

function dabPlayerMove(px, py) {
  if (!dabHerTurn || dabGameOver) return;
  const line = dabGetLine(px, py);
  if (!line) return;
  const claimed = dabMakeMove(line, 'her');
  dabDraw();
  if (dabAllFilled()) { dabEndGame(); return; }
  if (claimed > 0) { document.getElementById('dab-status').textContent = `You claimed ${claimed} box${claimed>1?'es':''}! 🎉 Go again!`; }
  else { dabHerTurn = false; document.getElementById('dab-status').textContent = 'My turn… 💙'; setTimeout(dabAiMove, 600); }
}

function dabEndGame() {
  dabGameOver = true;
  if (dabHerScore > dabHisScore) {
    document.getElementById('dab-modal-emoji').textContent = '🎉💕';
    document.getElementById('dab-modal-title').textContent = 'You Won!';
    document.getElementById('dab-modal-body').textContent = `${dabHerScore} boxes vs my ${dabHisScore}. You always win with me 💕`;
  } else if (dabHisScore > dabHerScore) {
    document.getElementById('dab-modal-emoji').textContent = '😏💙';
    document.getElementById('dab-modal-title').textContent = 'I Won This One!';
    document.getElementById('dab-modal-body').textContent = `${dabHisScore} boxes vs your ${dabHerScore}. But you still win my heart every day 💕`;
  } else {
    document.getElementById('dab-modal-emoji').textContent = '💕💙';
    document.getElementById('dab-modal-title').textContent = "It's a Tie!";
    document.getElementById('dab-modal-body').textContent = `${dabHerScore} boxes each — perfectly balanced, just like us 💕`;
  }
  document.getElementById('dab-modal').classList.add('active');
}

function dabGetPos(e) {
  const rect = dabCanvas.getBoundingClientRect();
  const scaleX = dabCanvas.width / rect.width;
  const scaleY = dabCanvas.height / rect.height;
  if (e.touches) { return { x: (e.touches[0].clientX - rect.left) * scaleX, y: (e.touches[0].clientY - rect.top) * scaleY }; }
  return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
}
dabCanvas.addEventListener('click', e => { const p=dabGetPos(e); dabPlayerMove(p.x, p.y); });
dabCanvas.addEventListener('touchstart', e => { e.preventDefault(); const p=dabGetPos(e); dabPlayerMove(p.x, p.y); }, {passive:false});
dabReset();
