const app = document.querySelector('#app');
const toast = document.querySelector('#toast');
const skinTones = [
  {name:'Porcelain', skin:'#f0cbb5', shadow:'#ce9a8b'},
  {name:'Warm sand', skin:'#d9a77f', shadow:'#ad755f'},
  {name:'Golden', skin:'#bd8061', shadow:'#895448'},
  {name:'Umber', skin:'#895746', shadow:'#593a3b'},
  {name:'Deep', skin:'#593b39', shadow:'#362934'}
];
const hairColors = [
  {name:'Espresso', color:'#211b25'}, {name:'Chestnut', color:'#694139'},
  {name:'Midnight', color:'#252d43'}, {name:'Silver', color:'silver'}
];
const hairStyles = ['Soft waves','Slick back','Long curls'];
const outfits = ['Velvet jacket','Open collar','Silk shirt'];
const state = {name:'Alex', skin:0, hair:0, style:0, outfit:0, page:'home', person:null, turn:0, chemistry:0, canBeIntimate:true, dates:0, endings:0, sound:false};
let ambience = null;

const people = {
  rooftop: {
    name:'Julian Vale', age:32, role:'THE POET WITH A PAST', tagline:'A screenwriter who makes even silence feel like a scene.',
    skin:'#d6a084', hair:'#251d26',
    intro:'“You look like you came up here to escape the party, too.” His smile is all mischief, but his eyes are softer.',
    rounds:[
      {line:'He leans on the railing, city lights caught in his glass. <em>“Tell me something true, then. What do you want tonight?”</em>', options:[['A conversation that surprises me.','That’s dangerously close to my own answer. He turns fully toward you. “Good. Let’s see if we can manage both.”',1],['A little beautiful trouble.','His smile tilts. “I write that sort of thing for a living. Living it is much more interesting.”',1],['Honestly? A quiet corner and good company.','He gestures to the quieter end of the terrace. “I can offer both. No plot twists required.”',2]]},
      {line:'Julian studies you for a moment, then the city. <em>“I used to think being wanted was the same as being known.”</em>', options:[['I think being known is the braver part.','“That’s a lovely line,” he says. “And an even lovelier thing to believe.” His hand brushes yours, then waits.',2],['You can be both, you know.','He laughs, a little surprised. “Can I? Then I might need someone to remind me.”',1],['What would you rather be known for?','The question catches him off guard. He answers slowly, and the conversation grows more honest.',2]]},
      {line:'The music from downstairs drifts into the night. <em>“I’d like to keep talking somewhere a little less public. Would you?”</em>', options:[['I would. Show me your favorite place.','“There’s a tiny late-night bookshop around the corner,” he says, delighted. “It’s better than it sounds.”',2],['Stay here a little longer with me.','He nods, happy to linger. “As long as you like.” The city keeps its secrets around you.',2],['I like this, but I’m not ready to leave together.','“Thank you for telling me.” He smiles warmly. “Then let me walk you to the elevator—and ask for your number?”',1]]}
    ],
    intimate:'The bookshop is closed, but Julian knows the owner. Among the quiet shelves and a shared pot of tea, one more chapter becomes a kiss. The rest of the night is yours to write—together, and at your own pace.',
    tender:'You stay on the terrace until the city turns pale. Julian asks for your number; you give it to him, along with a promise to meet again. Some stories are better when they take their time.'
  },
  gallery: {
    name:'Matteo Cruz', age:29, role:'THE GALLERY HEARTBREAKER', tagline:'A magnetic art dealer whose charm hides a very sincere heart.',
    skin:'#bc805f', hair:'#17171b',
    intro:'“That piece is either genius or a practical joke.” The stranger beside you laughs. “I’m Matteo, and I’m hoping it’s genius.”',
    rounds:[
      {line:'He offers you a glass of something sparkling. <em>“What do you see in it?”</em>', options:[['A little bit of longing.','Matteo’s eyebrows lift. “You see it too.” His teasing gives way to something more attentive.',2],['A very expensive practical joke.','He breaks into a grin. “Finally, someone with taste.” The two of you laugh a little too loudly.',1],['The artist wants us to disagree.','“Then they’ve done their job.” He raises his glass. “To having opinions.”',1]]},
      {line:'Matteo tells you about leaving his hometown to build a life that felt like his own. <em>“It’s still a work in progress.”</em>', options:[['The best things are.','His grin softens. “You make that sound like a good thing.”',2],['What part feels most like you?','He thinks, then answers honestly. For once, he doesn’t reach for a punchline.',2],['I love a man with a plan.','“And I love a man who doesn’t ask me to pretend I have one.” He nudges your shoulder.',1]]},
      {line:'The gallery is closing. <em>“I know a place nearby with terrible lighting and perfect tiramisu. Join me?”</em>', options:[['Tiramisu is a persuasive argument.','He offers his arm with theatrical flourish. “Then allow me to make my case.”',2],['Only if you pick the music.','“I accept this responsibility.” He looks delighted you said yes.',2],['I’m going to call it a night, but I’d love to see you again.','“That sounds perfect.” He slips you his card, with a tiny sketch on the back.',1]]}
    ],
    intimate:'Over excellent tiramisu and terrible lighting, Matteo admits he was hoping you’d say yes all along. A slow dance in his apartment turns into a kiss, then a soft fade into the warm, private hours of the night.',
    tender:'You trade numbers beneath a very questionable sculpture. Matteo promises to show you his favorite painting next time; you promise to judge his music choices. He looks forward to both.'
  },
  lounge: {
    name:'Gabriel Laurent', age:35, role:'THE LOUNGE’S LAST CALL', tagline:'A celebrated chef, dressed like a secret he might just share.',
    skin:'#e5bfa2', hair:'#77717b',
    intro:'“The bartender says I have to stop ordering for the whole room.” He glances at you. “Would you help me make a more reasonable decision?”',
    rounds:[
      {line:'Gabriel looks entirely too pleased with himself. <em>“What’s your drink? I promise not to judge.”</em>', options:[['Something bitter, like my taste in men.','His laugh rumbles low. “Then I’ll make sure this one has a sweeter finish.”',2],['Dealer’s choice. Surprise me.','“Bold.” He signals the bartender, then asks what flavors you love before deciding.',2],['Just sparkling water, thanks.','“A person who knows what they want. I respect that.” He orders one for himself, too.',1]]},
      {line:'He talks about the first meal he ever cooked for someone he loved. <em>“It was a disaster. The company was wonderful.”</em>', options:[['That’s the secret ingredient, then.','“You’ve figured out my whole career.” He holds your gaze a beat longer.',2],['Tell me what went wrong.','He gives you every delicious detail. His hands are expressive; his smile, contagious.',1],['I’d like to be invited to dinner sometime.','His expression turns warmly serious. “I’d like that very much.”',2]]},
      {line:'The lights dim for closing. <em>“My place is nearby. I could make you something proper—or we could just take a walk. Your call.”</em>', options:[['Dinner sounds wonderful.','“Then it’s a date.” He offers his hand, leaving the choice entirely yours.',2],['A walk first. No rushing the good part.','“My favorite answer.” He opens the door and lets the cool night meet you both.',2],['Maybe another night. I’m having a lovely time, though.','“That’s enough for tonight.” He smiles. “Let me walk you out?”',1]]}
    ],
    intimate:'Gabriel cooks something simple and impossibly good. You talk until the candles burn low, sharing the sort of kiss that makes the city outside disappear. The door closes softly behind you; what follows is only for the two of you.',
    tender:'A moonlit walk becomes a promise of dinner next week. Gabriel kisses your hand before you part—old-fashioned, a little dramatic, and exactly right.'
  }
};

function render(){
  if(state.page==='home') home();
  if(state.page==='customize') customize();
  if(state.page==='map') map();
  if(state.page==='date') date();
  if(state.page==='ending') ending();
}
function home(){
  app.innerHTML=`<section class="hero"><div class="hero-copy"><div class="eyebrow">A romance game for grown-up hearts</div><h1>Some nights<br>are made for<br><em>chemistry.</em></h1><p>Make yourself the main character. Meet unforgettable men. Follow the sparks wherever they lead—always on your own terms.</p><div class="hero-actions"><button class="button button-primary" data-action="create">CREATE YOUR CHARACTER <span>↗</span></button><span class="hero-note">A playful, story-driven romance · 5–10 min</span></div></div><div class="hero-art" aria-label="Illustration of a stylish man at night"><div class="halo"></div><div class="hero-orb"><div class="hero-hair"></div><div class="hero-neck"></div><div class="hero-eye"></div></div><div class="art-tag tag-top">TONIGHT’S FORECAST <b>· Chemistry</b></div><div class="art-tag tag-bottom">Every story is <b>yours to choose.</b></div></div></section><div class="intro-strip"><span><strong>Three dramatic strangers.</strong> One city after dark.</span><span>Romance at your pace <span class="strip-heart">♥</span></span></div>`;
}
function customize(){
  app.innerHTML=`<div class="section-head"><div><div class="eyebrow">The first impression</div><h2>Make him <em style="color:var(--pink)">you.</em></h2></div><div class="step-label">01 / 02 &nbsp;·&nbsp; YOUR LOOK</div></div><div class="customize-layout"><div class="panel form-panel"><label><span class="field-label">What should we call you?</span><input id="nameInput" class="name-input" maxlength="18" value="${escapeHtml(state.name)}" placeholder="Your name" autocomplete="given-name"></label><div><span class="field-label">Skin tone</span><div class="swatches">${skinTones.map((x,i)=>`<button class="swatch ${i===state.skin?'selected':''}" style="background:${x.skin}" data-skin="${i}" aria-label="${x.name}" title="${x.name}"></button>`).join('')}</div></div><div><span class="field-label">Hair color</span><div class="swatches">${hairColors.map((x,i)=>`<button class="swatch ${i===state.hair?'selected':''}" style="background:${x.color==='silver'?'linear-gradient(135deg,#77717b,#e0d9df)':x.color}" data-hair="${i}" aria-label="${x.name}" title="${x.name}"></button>`).join('')}</div></div><div><span class="field-label">Hair</span><div class="choice-row">${hairStyles.map((x,i)=>`<button class="choice-chip ${i===state.style?'selected':''}" data-style="${i}">${x}</button>`).join('')}</div></div><div><span class="field-label">Tonight’s look</span><div class="choice-row">${outfits.map((x,i)=>`<button class="choice-chip ${i===state.outfit?'selected':''}" data-outfit="${i}">${x}</button>`).join('')}</div></div><div class="form-footer"><span class="hint">All the men you meet are adults, and every moment is mutual.<br>You can change your mind at any time.</span><button class="button button-primary" data-action="go-map">LOOKS GOOD — LET’S GO ↗</button></div></div><div class="custom-preview"><div class="avatar" id="avatarPreview"><div class="body"></div><div class="neck"></div><div class="face"></div><div class="hair ${state.style===2?'long':''} ${state.hair===3?'silver':''}"></div><div class="eyes"></div><div class="mouth"></div></div><div class="preview-caption"><span id="previewName">${escapeHtml(state.name)}</span> · ${outfits[state.outfit]}</div></div></div>`;
  updateAvatar();
}
function updateAvatar(){const av=document.querySelector('#avatarPreview');if(!av)return;av.style.setProperty('--skin',skinTones[state.skin].skin);av.style.setProperty('--skin-shadow',skinTones[state.skin].shadow);av.style.setProperty('--hair',hairColors[state.hair].color);const nm=document.querySelector('#previewName');if(nm)nm.textContent=state.name||'Your name';}
function map(){
  app.innerHTML=`<div class="section-head"><div><div class="eyebrow">The city is yours</div><h2>Where to <em style="color:var(--pink)">tonight?</em></h2></div><div class="step-label">02 / 02 &nbsp;·&nbsp; PICK YOUR SCENE</div></div><div class="choice-grid"><button class="location-card" data-person="rooftop" data-icon="⌁"><span class="location-type">THE HIGH LIFE</span><span class="arrow">↗</span><h3>Rooftop, 11:47 pm</h3><p>Warm breeze, low lights, and a screenwriter who watches the city like it owes him a story.</p></button><button class="location-card" data-person="gallery" data-icon="✳"><span class="location-type">THE OPENING NIGHT</span><span class="arrow">↗</span><h3>Modern gallery, 10:16 pm</h3><p>Champagne, questionable art, and a magnetic dealer with a secret soft side.</p></button><button class="location-card" data-person="lounge" data-icon="♫"><span class="location-type">THE LAST ROUND</span><span class="arrow">↗</span><h3>Hotel lounge, 12:08 am</h3><p>Blue-hour jazz and a silver-haired chef whose smile is worth staying up for.</p></button><button class="love-card" data-action="customize"><div class="eyebrow">A small reminder</div><h3>Your story, your rules.</h3><p>Flirt, take it slow, or call it a night. There’s no wrong way to find a little magic.</p></button></div><p class="location-note">Choose a place to meet someone new. Every character is 21 or older; all romance is consensual and non-explicit.</p>`;
}
function date(){
 const p=state.person;const hearts='♥'.repeat(Math.max(0,Math.min(5,state.chemistry)))+'♡'.repeat(Math.max(0,5-state.chemistry));
 let content='';
 if(state.turn===-1){content=`<div class="scene-meta"><span>FIRST IMPRESSIONS</span><span class="chemistry">CHEMISTRY <span class="heart-meter">${hearts}</span></span></div><div class="dialogue">${p.intro.replaceAll('"', '”')}</div><div class="choices"><button class="dialogue-choice" data-action="begin-chat"><span class="choice-num">01</span> Smile and introduce yourself.</button><button class="dialogue-choice" data-action="begin-chat"><span class="choice-num">02</span> Ask what brought him here tonight.</button><button class="dialogue-choice" data-action="begin-chat"><span class="choice-num">03</span> Be bold: tell him you noticed him.</button></div>`;}
 else if(state.turn>=0&&state.turn<3){const round=p.rounds[state.turn];content=`<div class="scene-meta"><span>THE CONVERSATION &nbsp;·&nbsp; ${state.turn+1} OF 3</span><span class="chemistry">CHEMISTRY <span class="heart-meter">${hearts}</span></span></div><div class="dialogue">${round.line}</div><div class="choices">${round.options.map((o,i)=>`<button class="dialogue-choice" data-choice="${i}"><span class="choice-num">0${i+1}</span> ${o[0]}</button>`).join('')}</div>`;}
 else {const nextChoices=state.canBeIntimate?`<button class="dialogue-choice" data-ending="intimate"><span class="choice-num">01</span> I want to be closer. Let’s take the night somewhere private.</button><button class="dialogue-choice" data-ending="tender"><span class="choice-num">02</span> Keep it sweet. Let’s trade numbers and meet again.</button><button class="dialogue-choice" data-ending="tender"><span class="choice-num">03</span> I’ve had a lovely time; I’m ready to head home.</button>`:`<button class="dialogue-choice" data-ending="tender"><span class="choice-num">01</span> Let’s trade numbers and plan a proper date.</button><button class="dialogue-choice" data-ending="tender"><span class="choice-num">02</span> Stay here a little longer, then call it a night.</button><button class="dialogue-choice" data-ending="tender"><span class="choice-num">03</span> I’ve had a lovely time; I’m ready to head home.</button>`;content=`<div class="scene-meta"><span>THE NIGHT IS STILL YOUNG</span><span class="chemistry">CHEMISTRY <span class="heart-meter">${hearts}</span></span></div><div class="dialogue" style="font-size:21px">${state.lastResponse||'A smile lingers between you.'} <em>What feels right?</em></div><div class="choices">${nextChoices}</div>`;}
 app.innerHTML=`<div class="section-head"><div><div class="eyebrow">${p.role}</div><h2>A chance <em style="color:var(--pink)">encounter.</em></h2></div><button class="soft-button" data-action="back-map">← Back to the city</button></div><div class="date-layout"><div class="date-card" style="--person-skin:${p.skin};--person-hair:${p.hair}"><div class="portrait-bg"></div><div class="portrait-hair"></div><div class="portrait-eyes"></div><div class="portrait-body"></div><div class="person-caption"><div class="person-title">${p.role} · ${p.age}</div><h3>${p.name}</h3><p>${p.tagline}</p></div></div><div class="panel scene-panel">${content}<div class="scene-bottom"><span class="consent-note">💬 &nbsp;Only what you both want. No pressure, ever.</span>${state.turn>=3?'':`<button class="soft-button" data-action="end-date">Call it a night</button>`}</div></div></div>`;
}
function ending(){
 const isIntimate=state.endingType==='intimate';const p=state.person;
 app.innerHTML=`<div class="final-card"><div class="final-heart">${isIntimate?'♥':'✦'}</div><div class="eyebrow">${isIntimate?'A NIGHT TO REMEMBER':'A LOVELY BEGINNING'}</div><h2>${isIntimate?'The rest is yours.':'Not every spark needs to rush.'}</h2><p>${isIntimate?p.intimate:p.tender}</p><p style="font-family:'Playfair Display',serif;color:#e5b875">${isIntimate?'The morning can wait.':'Some stories are better when they take their time.'}</p><div class="ending-stats"><div><b>${p.name}</b>TONIGHT’S COMPANY</div><div><b>${'♥'.repeat(Math.max(1,state.chemistry))}</b>CHEMISTRY</div><div><b>${state.dates}</b>${state.dates===1?'NIGHT OUT':'NIGHTS OUT'}</div></div><div class="restart-row"><button class="button button-primary" data-action="another-date">MEET SOMEONE ELSE ↗</button><button class="button button-quiet" data-action="new-look">CHANGE YOUR LOOK</button></div></div>`;
}
function escapeHtml(text){return String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function notify(msg){toast.textContent=msg;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2100);}

document.addEventListener('input',e=>{if(e.target.id==='nameInput'){state.name=e.target.value.slice(0,18);const n=document.querySelector('#previewName');if(n)n.textContent=state.name||'Your name';}});
document.addEventListener('click',e=>{
 const t=e.target.closest('button');if(!t)return;
 if(t.dataset.skin!==undefined){state.skin=Number(t.dataset.skin);document.querySelectorAll('[data-skin]').forEach(x=>x.classList.toggle('selected',x===t));updateAvatar();return;}
 if(t.dataset.hair!==undefined){state.hair=Number(t.dataset.hair);document.querySelectorAll('[data-hair]').forEach(x=>x.classList.toggle('selected',x===t));updateAvatar();return;}
 if(t.dataset.style!==undefined){state.style=Number(t.dataset.style);document.querySelectorAll('[data-style]').forEach(x=>x.classList.toggle('selected',x===t));const h=document.querySelector('.avatar .hair');h.classList.toggle('long',state.style===2);return;}
 if(t.dataset.outfit!==undefined){state.outfit=Number(t.dataset.outfit);document.querySelectorAll('[data-outfit]').forEach(x=>x.classList.toggle('selected',x===t));const cap=document.querySelector('.preview-caption');if(cap)cap.textContent=`${state.name||'Your name'} · ${outfits[state.outfit]}`;return;}
 if(t.dataset.person){state.person=people[t.dataset.person];state.turn=-1;state.chemistry=0;state.canBeIntimate=true;state.page='date';render();return;}
 if(t.dataset.choice!==undefined){const choiceIndex=Number(t.dataset.choice);const o=state.person.rounds[state.turn].options[choiceIndex];state.chemistry=Math.min(5,state.chemistry+o[2]);state.lastResponse=o[1];if(state.turn===2&&choiceIndex===2)state.canBeIntimate=false;state.turn++;if(state.turn===3){state.lastResponse=o[1];}render();return;}
 if(t.dataset.ending){state.endingType=t.dataset.ending;state.page='ending';state.dates++;render();return;}
 switch(t.dataset.action){
  case'create': state.page='customize';render();break;
  case'go-map':{const input=document.querySelector('#nameInput');state.name=(input?.value||'').trim().slice(0,18)||'Alex';state.page='map';render();break;}
  case'customize':state.page='customize';render();break;
  case'begin-chat':state.turn=0;render();break;
  case'back-map':state.page='map';render();break;
  case'end-date':state.endingType='tender';state.page='ending';state.dates++;render();break;
  case'another-date':state.page='map';render();break;
  case'new-look':state.page='customize';render();break;
 }
});
document.querySelector('#soundToggle').addEventListener('click',async e=>{
  const button=e.currentTarget;
  if(!ambience){
    const AudioContext=window.AudioContext||window.webkitAudioContext;
    if(!AudioContext){notify('Ambient sound is not supported in this browser.');return;}
    const context=new AudioContext();const gain=context.createGain();gain.gain.value=0;gain.connect(context.destination);
    [110,164.81,220].forEach((frequency,index)=>{const oscillator=context.createOscillator();const voice=context.createGain();oscillator.type='sine';oscillator.frequency.value=frequency;voice.gain.value=index===0?.34:.17;oscillator.connect(voice);voice.connect(gain);oscillator.start();});
    ambience={context,gain};
  }
  await ambience.context.resume();state.sound=!state.sound;
  ambience.gain.gain.setTargetAtTime(state.sound ? 0.025 : 0,ambience.context.currentTime,.35);
  button.title=state.sound?'Turn ambient sound off':'Turn ambient sound on';button.setAttribute('aria-label',button.title);
  notify(state.sound?'Soft ambient tone on.':'Ambient sound off.');
});
render();
