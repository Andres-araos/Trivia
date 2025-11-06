
    const categoryImages = {
      'Historia': './img/historia.jpeg',
      'Cultura': './img/cultura.jpeg',
      'Tecnología': './img/tecnologia.jpeg',
      'Ciencia': './img/ciencia.jpeg',
      'Deportes': './img/deporte.jpeg'
    };

    const bancoPreguntas = [
      {cat:'Historia', q:'¿En qué año comenzó la Segunda Guerra Mundial?', opts:['1936','1939','1941','1945'], a:1, img:'./img/preguntas/historia/ww2.jpeg'},
      {cat:'Historia', q:'¿Quién fue el primer emperador romano?', opts:['Julio César','Octavio Augusto','Nerón','César Augusto'], a:1, img:'./img/preguntas/historia/imperio romano.jpeg'},
      {cat:'Historia', q:'¿Cuál fue la civilización que construyó Machu Picchu?', opts:['Azteca','Maya','Inca','Olmeca'], a:2, img:'./img/preguntas/historia/machu pichu.jpeg'},
      {cat:'Historia', q:'¿En qué año llegó Cristóbal Colón a América?', opts:['1492','1500','1485','1521'], a:0, img:'./img/preguntas/historia/cristobal.jpeg'},

      {cat:'Cultura', q:'¿Quién pintó La última cena?', opts:['Leonardo da Vinci','Miguel Ángel','Rafael','Donatello'], a:0, img:'./img/preguntas/cultura/ultima cena.jpeg'},
      {cat:'Cultura', q:'¿Qué instrumento musical toca un violinista?', opts:['Guitarra','Violín','Piano','Flauta'], a:1, img:'./img/preguntas/cultura/violinista.jpeg'},
      {cat:'Cultura', q:'¿Dónde se originó el flamenco?', opts:['México','Italia','España','Argentina'], a:2, img:'./img/preguntas/cultura/flamenco.jpeg'},
      {cat:'Cultura', q:'¿Cuál es el idioma más hablado del mundo?', opts:['Inglés','Mandarín','Español','Hindi'], a:1, img:'./img/preguntas/cultura/idioma.jpeg'},

      {cat:'Tecnología', q:'¿Qué significa HTML?', opts:['HyperText Markup Language','HighText Machine Language','Hyperlink Markup Language','Home Tool Markup'], a:0, img:'./img/preguntas/tecnologia/html.jpeg'},
      {cat:'Tecnología', q:'¿Qué empresa desarrolló el sistema operativo Windows?', opts:['Apple','IBM','Microsoft','Intel'], a:2, img:'./img/preguntas/tecnologia/Windows11.jpeg'},
      {cat:'Tecnología', q:'¿Qué dispositivo sirve para almacenar información?', opts:['Monitor','Impresora','Disco duro','Ratón'], a:2, img:'./img/preguntas/tecnologia/hdd.jpeg'},
      {cat:'Tecnología', q:'¿Qué lenguaje se usa para estructurar páginas web?', opts:['Python','HTML','C++','CSS'], a:1, img:'./img/preguntas/tecnologia/web.jpeg'},

      {cat:'Ciencia', q:'¿Cuál es el planeta más grande del sistema solar?', opts:['Tierra','Júpiter','Saturno','Neptuno'], a:1, img:'./img/preguntas/ciencia/solar.jpeg'},
      {cat:'Ciencia', q:'¿Cuál es el gas más abundante en la atmósfera terrestre?', opts:['Oxígeno','Nitrógeno','CO2','Hidrógeno'], a:1, img:'./img/preguntas/ciencia/tierra.jpeg'},
      {cat:'Ciencia', q:'¿Qué órgano bombea la sangre en el cuerpo?', opts:['Cerebro','Pulmones','Corazón','Hígado'], a:2, img:'./img/preguntas/ciencia/cuerpo.jpeg'},
      {cat:'Ciencia', q:'¿Cuál es el símbolo químico del oro?', opts:['Ag','Au','O','Gd'], a:1, img:'./img/preguntas/ciencia/tabla.jpeg'},

      {cat:'Deportes', q:'¿Cuántos jugadores tiene un equipo de fútbol?', opts:['10','11','12','9'], a:1, img:'./img/preguntas/deporte/futbol.jpeg'},
      {cat:'Deportes', q:'¿Dónde se originaron los Juegos Olímpicos?', opts:['Roma','Grecia','China','Inglaterra'], a:1, img:'./img/preguntas/deporte/olimpicos.jpeg'},
      {cat:'Deportes', q:'¿Qué deporte practica Roger Federer?', opts:['Fútbol','Tenis','Golf','Béisbol'], a:1, img:'./img/preguntas/deporte/federer.jpeg'},
      {cat:'Deportes', q:'¿Cuántos puntos vale un triple en baloncesto?', opts:['1','2','3','4'], a:2, img:'./img/preguntas/deporte/curry.jpeg'},
    ];

    let preguntas = [];
    let current = 0;
    let score = 0;
    let selectedCategory = null;
    const bestKey = 'trivia_britannica_best_v1';

    // ---------- DOM ----------
    const startScreen = document.getElementById('startScreen');
    const gameScreen = document.getElementById('gameScreen');
    const resultScreen = document.getElementById('resultScreen');
    const categoryGrid = document.getElementById('categoryGrid');
    const bestScoreStart = document.getElementById('bestScoreStart');

    const catName = document.getElementById('catName');
    const qImage = document.getElementById('qImage');
    const questionText = document.getElementById('questionText');
    const optionsEl = document.getElementById('options');
    const qIndex = document.getElementById('qIndex');
    const qTotal = document.getElementById('qTotal');
    const scoreEl = document.getElementById('score');
    const nextBtn = document.getElementById('nextBtn');
    const quitBtn = document.getElementById('quitBtn');
    const smallProg = document.getElementById('smallProg');
    const qProgressText = document.getElementById('qProgressText');
    const finalScore = document.getElementById('finalScore');
    const finalMsg = document.getElementById('finalMsg');
    const playAgain = document.getElementById('playAgain');
    const backHome = document.getElementById('backHome');
    const startAny = document.getElementById('startAny');

    function showScreen(el){
      [startScreen,gameScreen,resultScreen].forEach(s=>{
        if(s===el){
          s.classList.remove('hidden')
        }
        else
          {
            s.classList.add('hidden')
          }
        }
      )
    }

    function saveBest(s){const prev=Number(localStorage.getItem(bestKey)||0);if(s>prev)localStorage.setItem(bestKey,s);bestScoreStart.textContent=localStorage.getItem(bestKey)||0}

    function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}}

    function renderCategories(){categoryGrid.innerHTML='';
      const cats = Array.from(new Set(bancoPreguntas.map(p=>p.cat)));
      cats.forEach(cat=>{
        const card = document.createElement('div');card.className='card-cat';
        const bg = document.createElement('div');bg.className='card-bg';
        const imgUrl = categoryImages[cat] || '';
        bg.style.backgroundImage = imgUrl? `url('${imgUrl}')` : "linear-gradient(135deg,#e6eef8,#f7f9fb)";
        const overlay = document.createElement('div');overlay.className='card-overlay';
        const content = document.createElement('div');content.className='card-content';
        const name = document.createElement('div');name.className='cat-name';name.textContent=cat;
        const count = document.createElement('div');count.className='cat-count';count.textContent=`${bancoPreguntas.filter(p=>p.cat===cat).length} preguntas`;
        content.appendChild(name);content.appendChild(count);
        card.appendChild(bg);card.appendChild(overlay);card.appendChild(content);
        card.onclick = ()=>{selectedCategory=cat; startSelected();};
        categoryGrid.appendChild(card);
      })}

    function startSelected(){if(!selectedCategory) return; preguntas = bancoPreguntas.filter(p=>p.cat===selectedCategory).map(x=>Object.assign({},x)); shuffle(preguntas);current=0;score=0;updateScore();catName.textContent=selectedCategory; qTotal.textContent=preguntas.length; showScreen(gameScreen); showQuestion();}

    function showQuestion(){if(current>=preguntas.length){showResults();return}
      const p = preguntas[current];
      // image
      if(p.img && p.img.trim()!==''){
        qImage.src = p.img; qImage.style.display='block';
      } else {qImage.style.display='none';}
      questionText.textContent = p.q;
      optionsEl.innerHTML='';
      p.opts.forEach((o,idx)=>{
        const d = document.createElement('div');d.className='opt';d.tabIndex=0;d.textContent=o;d.onclick=()=>handleAnswer(d,idx,p.a);d.onkeydown=(e)=>{if(e.key==='Enter'||e.key===' ') d.click();};optionsEl.appendChild(d);
      });
      qIndex.textContent = current+1; updateProgress(); nextBtn.style.display='none';
    }

    function handleAnswer(el, chosen, correct){Array.from(optionsEl.children).forEach(x=>x.style.pointerEvents='none');
      if(chosen===correct){el.classList.add('correct');score+=10;}
      else{el.classList.add('wrong'); const corr = optionsEl.children[correct]; if(corr) corr.classList.add('correct');}
      updateScore(); nextBtn.style.display='inline-block'; }

    function updateScore(){scoreEl.textContent=score}
    function nextQuestion(){current++; showQuestion();}

    function updateProgress(){const pct = Math.round((current / Math.max(1,preguntas.length)) * 100); smallProg.style.width = pct + '%'; qProgressText.textContent = `Pregunta ${current+1} de ${preguntas.length}`;}

    function showResults(){showScreen(resultScreen); finalScore.textContent = score; const max = preguntas.length*10; const percent = Math.round((score/max)*100); let msg='Buen intento'; if(percent>80) msg='¡Excelente!'; else if(percent>50) msg='Muy bien'; finalMsg.textContent = `${percent}% — ${msg}`; saveBest(score); if(percent>=60) launchConfetti(80); }

    function resetToHome(){selectedCategory=null; showScreen(startScreen);}

    function launchConfetti(amount=40){const colors=['#c79a3b','#ffd88c','#0b2b40','#e6b949']; for(let i=0;i<amount;i++){const el=document.createElement('div');el.style.position='fixed';el.style.left=(Math.random()*80+10)+'vw';el.style.top='-5vh';el.style.width='10px';el.style.height='18px';el.style.background=colors[Math.floor(Math.random()*colors.length)];el.style.transform=`rotate(${Math.random()*360}deg)`;el.style.borderRadius='2px';el.style.opacity='1';el.style.zIndex=9999;document.body.appendChild(el); el.animate([{transform:'translateY(0vh) rotate(0deg)'},{transform:`translateY(${110+Math.random()*60}vh) rotate(${360+Math.random()*360}deg)`}],{duration:1600+Math.random()*1200,easing:'cubic-bezier(.2,.7,.2,1)'}).onfinish=()=>el.remove();}}

    nextBtn.addEventListener('click', ()=>{nextQuestion();});
    quitBtn.addEventListener('click', ()=>{resetToHome();});
    playAgain.addEventListener('click', ()=>{startSelected();});
    backHome.addEventListener('click', ()=>{resetToHome();});
    startAny.addEventListener('click', ()=>{ if(!selectedCategory){ alert('Selecciona una categoría haciendo clic en una tarjeta.'); return } startSelected();});

    renderCategories(); bestScoreStart.textContent = localStorage.getItem(bestKey) || 0; showScreen(startScreen);
