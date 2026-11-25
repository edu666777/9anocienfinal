/* =========================================================
   WIDGETS — FÍSICA (ondas)
   ========================================================= */
const ONDA = '#1d6fb8';
const caminhoOnda = (x0, x1, y0, A, lam, fase, passo = 3) => {
  let d = '';
  for (let x = x0; x <= x1; x += passo) d += (x === x0 ? 'M' : 'L') + f1(x) + ',' + f1(y0 - A * Math.sin(2 * Math.PI * ((x - x0) / lam) - fase)) + ' ';
  return d;
};
let AUDIO = null;
function pararSom() { if (AUDIO) { try { AUDIO.osc.stop(); } catch (e) { } AUDIO.ctx.close(); AUDIO = null; } }
addEventListener('hashchange', pararSom);

Object.assign(WIDGETS, {
  boia(el) {
    el.innerHTML = `<div class="jogo"><span class="tag">🛟 Observe a boia</span><svg viewBox="0 0 400 170" class="ilus" role="img" aria-label="Onda na água com uma boia"><rect width="400" height="170" rx="14" fill="#e7f5ff"/>
      <path id="bw" fill="#4dabf7" opacity=".8"/><g id="bb">${emo(0, 0, '🛟', 30)}</g><text x="200" y="22" class="sv-b" text-anchor="middle">a onda anda → … a boia só sobe e desce ↕</text>
      <line x1="200" y1="40" x2="200" y2="150" stroke="#e8590c" stroke-dasharray="4 4"/></svg>
      <p class="msg">A <b>energia</b> viaja com a onda, mas a <b>água (matéria) não vai embora</b>: a boia apenas oscila no mesmo lugar.</p></div>`;
    const w = $('#bw', el), b = $('#bb', el);
    anim(el, t => {
      const fase = t * 3, y = x => 100 - 22 * Math.sin(2 * Math.PI * (x / 130) - fase);
      w.setAttribute('d', caminhoOnda(0, 400, 100, 22, 130, fase) + 'L400,170 L0,170 Z');
      b.setAttribute('transform', `translate(200,${f1(y(200) - 8)})`);
    });
  },

  transLong(el) {
    el.innerHTML = `<div class="jogo"><span class="tag">〰️ Duas formas de vibrar</span>
      <svg viewBox="0 0 400 230" class="ilus" role="img" aria-label="Onda transversal e onda longitudinal"><rect width="400" height="230" rx="14" fill="#f8f9fa"/>
        <text x="12" y="22" class="sv-b">TRANSVERSAL (corda): vibra ↕, a onda anda →</text><g id="tc"></g>
        <text x="12" y="135" class="sv-b">LONGITUDINAL (mola / som): vibra ↔, a onda anda →</text><g id="tl"></g>
        <text x="200" y="222" class="sv-t" text-anchor="middle">regiões apertadas = compressões · regiões espaçadas = rarefações</text></svg>
      <p class="msg">🪢 Na corda, cada ponto sobe e desce (<b>perpendicular</b>). 🔊 No som, as partículas do ar vão e voltam <b>na mesma direção</b> em que a onda anda.</p></div>`;
    const tc = $('#tc', el), tl = $('#tl', el);
    anim(el, t => {
      let a = '', b = '';
      for (let k = 0; k < 26; k++) {
        const x = 20 + k * 14.4, f = 2 * Math.PI * (k / 13) - t * 4;
        a += `<circle cx="${f1(x)}" cy="${f1(70 - 26 * Math.sin(f))}" r="${k === 8 ? 7 : 5}" fill="${k === 8 ? '#e8590c' : ONDA}"/>`;
        const xl = x + 6 * Math.sin(f);
        b += `<line x1="${f1(xl)}" y1="160" x2="${f1(xl)}" y2="200" stroke="${k === 8 ? '#e8590c' : ONDA}" stroke-width="${k === 8 ? 5 : 3}"/>`;
      }
      tc.innerHTML = a; tl.innerHTML = b;
    });
  },

  elementos(el) {
    el.innerHTML = `<div class="jogo"><span class="tag">📐 Monte sua onda</span>
      <svg viewBox="0 0 420 220" class="ilus" role="img" aria-label="Elementos de uma onda"><rect width="420" height="220" rx="14" fill="#f8f9fa"/>
        <line x1="10" y1="110" x2="410" y2="110" stroke="#adb5bd" stroke-dasharray="5 4"/><text x="408" y="104" class="sv-t" text-anchor="end">equilíbrio</text>
        <path id="ew" fill="none" stroke="${ONDA}" stroke-width="4"/><g id="el"></g></svg>
      <div class="sliders">
        <label>Amplitude <input type="range" id="eA" min="15" max="75" value="45"></label>
        <label>Comprimento de onda λ (m) <input type="range" id="eL" min="1" max="4" step="0.5" value="2"></label>
        <label>Frequência f (Hz) <input type="range" id="eF" min="0.5" max="4" step="0.5" value="1"></label>
        <label class="pausa"><input type="checkbox" id="eP"> pausar</label>
      </div><div id="eo"></div></div>`;
    const ew = $('#ew', el), lab = $('#el', el);
    let fase = 0, tAnt = 0;
    const info = () => {
      const L = +$('#eL', el).value, F = +$('#eF', el).value;
      $('#eo', el).innerHTML = `<div class="painel"><span>λ = <b>${virg(L)} m</b></span><span>f = <b>${virg(F)} Hz</b> (${virg(F)} oscilações por segundo)</span><span>T = 1/f = <b>${virg(+(1 / F).toFixed(2))} s</b></span><span>v = λ · f = <b>${virg(L)} × ${virg(F)} = ${virg(+(L * F).toFixed(2))} m/s</b></span></div>`;
    };
    $$('input', el).forEach(i => i.oninput = info); info();
    anim(el, t => {
      const dt = t - tAnt; tAnt = t;
      const A = +$('#eA', el).value, L = +$('#eL', el).value, F = +$('#eF', el).value, px = L * 60;
      if (!$('#eP', el).checked) fase += dt * F * 2 * Math.PI * .35;
      ew.setAttribute('d', caminhoOnda(10, 410, 110, A, px, fase));
      /* posição da primeira crista visível à direita de x=40 */
      let xc = 10 + px * (fase / (2 * Math.PI) + .25); while (xc > 40) xc -= px; while (xc < 40) xc += px;
      const xv = xc + px / 2;
      lab.innerHTML = `<circle cx="${f1(xc)}" cy="${110 - A}" r="6" fill="#e03131"/><text x="${f1(xc)}" y="${100 - A}" class="sv-b" text-anchor="middle" fill="#e03131">crista</text>
        ${xv < 410 ? `<circle cx="${f1(xv)}" cy="${110 + A}" r="6" fill="#7048e8"/><text x="${f1(xv)}" y="${128 + A}" class="sv-b" text-anchor="middle" fill="#7048e8">vale</text>` : ''}
        <line x1="${f1(xc)}" y1="110" x2="${f1(xc)}" y2="${110 - A}" stroke="#2f9e44" stroke-width="3"/><text x="${f1(xc + 6)}" y="${f1(110 - A / 2)}" class="sv-t" fill="#2f9e44">amplitude</text>
        ${xc + px < 410 ? `<line x1="${f1(xc)}" y1="${100 - A - 18}" x2="${f1(xc + px)}" y2="${100 - A - 18}" stroke="#e8590c" stroke-width="2.5"/><line x1="${f1(xc)}" y1="${94 - A - 18}" x2="${f1(xc)}" y2="${106 - A - 18}" stroke="#e8590c" stroke-width="2.5"/><line x1="${f1(xc + px)}" y1="${94 - A - 18}" x2="${f1(xc + px)}" y2="${106 - A - 18}" stroke="#e8590c" stroke-width="2.5"/><text x="${f1(xc + px / 2)}" y="${94 - A - 22}" class="sv-b" text-anchor="middle" fill="#e8590c">λ = ${virg(L)} m</text>` : ''}`;
    });
  },

  calc(el) {
    el.innerHTML = `<div class="jogo"><span class="tag">🧮 Calculadora de ondas (confira suas contas)</span>
      <div class="calc"><div><b>v = λ · f</b><label>λ (m) <input type="number" id="cl" value="5" step="any"></label><label>f (Hz) <input type="number" id="cf" value="4" step="any"></label><p id="cv"></p></div>
      <div><b>f = n / Δt e T = 1/f</b><label>n (oscilações) <input type="number" id="cn" value="20" step="any"></label><label>Δt (s) <input type="number" id="ct" value="4" step="any"></label><p id="cr"></p></div></div></div>`;
    const fmt = n => isFinite(n) ? virg(+n.toFixed(4)) : '–';
    const upd = () => {
      const l = +$('#cl', el).value, f = +$('#cf', el).value, n = +$('#cn', el).value, t = +$('#ct', el).value, fr = n / t;
      $('#cv', el).innerHTML = `v = ${fmt(l)} × ${fmt(f)} = <b>${fmt(l * f)} m/s</b>`;
      $('#cr', el).innerHTML = `f = ${fmt(n)} ÷ ${fmt(t)} = <b>${fmt(fr)} Hz</b><br>T = 1 ÷ ${fmt(fr)} = <b>${fmt(1 / fr)} s</b>`;
    };
    $$('input', el).forEach(i => i.oninput = upd); upd();
  },

  som(el) {
    const TIM = { sine: '🪈 Flauta (onda suave)', triangle: '🎹 Teclado', square: '🎷 Clarinete', sawtooth: '🎻 Violino' };
    el.innerHTML = `<div class="jogo"><span class="tag">🎵 Laboratório do som</span>
      <svg viewBox="0 0 420 170" class="ilus" role="img" aria-label="Forma da onda sonora"><rect width="420" height="170" rx="14" fill="#1c2333"/><line x1="10" y1="85" x2="410" y2="85" stroke="#495057" stroke-dasharray="4 4"/><path id="sw" fill="none" stroke="#69db7c" stroke-width="3"/></svg>
      <div class="sliders">
        <label>🎚️ Altura (frequência): <b id="sfv"></b><input type="range" id="sf" min="110" max="880" step="10" value="262"></label>
        <label>🔊 Intensidade (amplitude): <b id="sav"></b><input type="range" id="sa" min="10" max="100" value="50"></label>
      </div>
      <div class="row">${Object.keys(TIM).map(k => `<button class="btn sm ${k === 'sine' ? 'on' : 'ghost'}" data-t="${k}">${TIM[k]}</button>`).join('')}</div>
      <div class="row"><button class="btn" id="sp">▶️ Ouvir</button></div>
      <p class="msg" id="sm"></p><p class="center"><small>🔈 Use volume baixo. O som toca só enquanto você estiver nesta página.</small></p></div>`;
    let tim = 'sine';
    const forma = (tipo, x) => { const p = x - Math.floor(x); return tipo === 'sine' ? Math.sin(2 * Math.PI * x) : tipo === 'square' ? (p < .5 ? 1 : -1) * .85 : tipo === 'triangle' ? 1 - 4 * Math.abs(p - .5) : 2 * p - 1; };
    const upd = () => {
      const f = +$('#sf', el).value, a = +$('#sa', el).value, per = 400 / (f / 55);
      let d = ''; for (let x = 10; x <= 410; x += 2) d += (x === 10 ? 'M' : 'L') + x + ',' + f1(85 - a * .7 * forma(tim, (x - 10) / per)) + ' ';
      $('#sw', el).setAttribute('d', d);
      $('#sfv', el).textContent = `${f} Hz · ${f < 300 ? 'GRAVE' : f > 550 ? 'AGUDO' : 'médio'}`;
      $('#sav', el).textContent = a < 35 ? 'FRACO' : a > 70 ? 'FORTE' : 'médio';
      $('#sm', el).innerHTML = `<b>Altura</b> → frequência (mais ondas na tela = mais agudo). <b>Intensidade</b> → amplitude (onda mais alta = mais forte). <b>Timbre</b> → o <b>formato</b> da onda: ${TIM[tim]}.`;
      if (AUDIO) { AUDIO.osc.frequency.value = f; AUDIO.osc.type = tim; AUDIO.gain.gain.value = a / 100 * .12; }
    };
    $('#sf', el).oninput = upd; $('#sa', el).oninput = upd;
    $$('[data-t]', el).forEach(b => b.onclick = () => { tim = b.dataset.t; $$('[data-t]', el).forEach(x => x.className = 'btn sm ' + (x === b ? 'on' : 'ghost')); upd(); });
    $('#sp', el).onclick = () => {
      if (AUDIO) { pararSom(); $('#sp', el).textContent = '▶️ Ouvir'; return; }
      const Ctx = window.AudioContext || window.webkitAudioContext; if (!Ctx) { $('#sm', el).textContent = 'Seu navegador não toca sons.'; return; }
      const ctx = new Ctx(), osc = ctx.createOscillator(), gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination); AUDIO = { ctx, osc, gain }; upd(); osc.start();
      $('#sp', el).textContent = '⏹️ Parar';
    };
    upd();
  },

  espectro(el) {
    const B = [['📻', 'Rádio e TV', '#868e96', 'Maior comprimento de onda e menor frequência. Rádio, TV, celular e Wi-Fi usam ondas parecidas.'],
      ['🍲', 'Micro-ondas', '#a9a9a9', 'Forno de micro-ondas, radares e comunicação por satélite.'],
      ['🌡️', 'Infravermelho', '#c0392b', '"Calor" que sentimos do Sol e do fogo; controle remoto; câmeras térmicas.'],
      ['🌈', 'Luz visível', 'linear-gradient(90deg,#e03131,#f08c00,#fab005,#40c057,#228be6,#7048e8)', 'A ÚNICA faixa que nossos olhos enxergam: do vermelho ao violeta.'],
      ['🧴', 'Ultravioleta', '#9c36b5', 'Vem do Sol: bronzeia e queima a pele (use protetor!). Usada para esterilizar.'],
      ['🩻', 'Raios X', '#364fc7', 'Atravessam a pele e mostram os ossos em exames médicos.'],
      ['☢️', 'Raios gama', '#212529', 'Altíssima energia. Usados no tratamento de câncer (radioterapia).']];
    let i = 3;
    const draw = () => {
      let d = ''; const n = 400; for (let x = 0; x <= n; x += 1.5) { const lam = 90 * Math.pow(0.12, x / n) + 4; d += (x ? 'L' : 'M') + f1(10 + x) + ',' + f1(40 - 16 * Math.sin(x / lam * 2.2)) + ' '; }
      el.innerHTML = `<div class="jogo"><span class="tag">📡 Espectro eletromagnético</span>
        <svg viewBox="0 0 420 70" class="ilus"><path d="${d}" fill="none" stroke="${ONDA}" stroke-width="2.5"/><text x="10" y="68" class="sv-t">← maior λ · menor frequência</text><text x="410" y="68" class="sv-t" text-anchor="end">maior frequência · mais energia →</text></svg>
        <div class="espectro">${B.map((b, k) => `<button data-k="${k}" class="${k === i ? 'on' : ''}" style="background:${b[2]}"><i>${b[0]}</i><small>${b[1]}</small></button>`).join('')}</div>
        <p class="msg"><b>${B[i][0]} ${B[i][1]}</b>: ${B[i][3]}<br><small>Todas são ondas <b>eletromagnéticas</b> e viajam no vácuo a ≈ 300 000 km/s.</small></p></div>`;
      $$('[data-k]', el).forEach(b => b.onclick = () => { i = +b.dataset.k; draw(); });
    };
    draw();
  },

  fenomenos(el) {
    const F = {
      refl: ['🗣️⛰️ Reflexão', 'A onda bate numa superfície e <b>volta</b> para o meio de origem. Ex.: o <b>eco</b> quando gritamos perto de uma montanha.'],
      refr: ['✏️🥛 Refração', 'A onda <b>muda de meio</b> e muda de <b>velocidade</b> (e geralmente de direção). Ex.: o <b>lápis parece torto</b> no copo d’água.'],
      difr: ['🚪 Difração', 'A onda <b>contorna obstáculos</b> e se espalha ao passar por aberturas. Ex.: ouvir alguém <b>em outro cômodo</b>.'],
      inter: ['〰️+〰️ Interferência', 'Duas ondas se encontram e se <b>somam</b> (ficam maiores: <b>construtiva</b>) ou se <b>anulam</b> (destrutiva). Ex.: fones com cancelamento de ruído.'],
      resso: ['🎯 Ressonância', 'Um sistema recebe estímulos com frequência <b>igual à sua frequência natural</b> e a vibração <b>aumenta muito</b>. Ex.: empurrar o balanço no ritmo certo; cantor que quebra uma taça.']
    };
    let k = 'refl';
    const draw = () => {
      el.innerHTML = `<div class="jogo"><span class="tag">🌊 Fenômenos ondulatórios</span>
        <div class="row">${Object.keys(F).map(x => `<button class="btn sm ${x === k ? 'on' : 'ghost'}" data-k="${x}">${F[x][0]}</button>`).join('')}</div>
        <div id="fz"></div><p class="msg">${F[k][1]}</p></div>`;
      $$('[data-k]', el).forEach(b => b.onclick = () => { k = b.dataset.k; draw(); });
      const z = $('#fz', el);
      if (k === 'refl') {
        z.innerHTML = `<svg viewBox="0 0 420 200" class="ilus"><rect width="420" height="200" rx="14" fill="#e7f5ff"/><path d="M300,200 L370,40 L420,90 L420,200 Z" fill="#8d7b68"/><path d="M340,108 L370,40 L392,62" fill="#f1f3f5"/><rect y="180" width="420" height="20" fill="#8cb35a"/>${emo(50, 150, '🗣️', 40)}<g id="ar"></g><text x="120" y="40" class="sv-b" id="eco"></text></svg>`;
        const g = $('#ar', z), ec = $('#eco', z);
        anim(z, t => { const p = (t % 3) / 3, ida = p < .5, x = ida ? 80 + p * 2 * 230 : 310 - (p - .5) * 2 * 230; let s = ''; for (let j = 0; j < 3; j++) s += `<path d="M${f1(x + (ida ? -j * 12 : j * 12))},${120} q${ida ? 10 : -10},20 0,40" stroke="${ida ? ONDA : '#e8590c'}" stroke-width="3" fill="none" opacity="${1 - j * .3}"/>`; g.innerHTML = s; ec.textContent = ida ? 'Ôôô… →' : '← …ôôô (eco!)'; });
      } else if (k === 'refr') {
        z.innerHTML = `<svg viewBox="0 0 420 220" class="ilus"><rect width="420" height="220" rx="14" fill="#f8f9fa"/>
          <path d="M150,40 L160,200 Q160,210 170,210 L250,210 Q260,210 260,200 L270,40" fill="none" stroke="${INK}" stroke-width="3"/><path d="M155,110 L265,110 L260,200 Q260,208 250,208 L170,208 Q160,208 160,200 Z" fill="#74c0fc" opacity=".55"/>
          <line x1="120" y1="20" x2="210" y2="110" stroke="#f59f00" stroke-width="10" stroke-linecap="round"/><line x1="226" y1="110" x2="270" y2="190" stroke="#f59f00" stroke-width="10" stroke-linecap="round" opacity=".9"/>
          <line x1="210" y1="110" x2="290" y2="190" stroke="#e03131" stroke-width="2" stroke-dasharray="5 5"/><text x="292" y="196" class="sv-t" fill="#e03131">posição real</text>
          <text x="40" y="100" class="sv-t">ar</text><text x="276" y="150" class="sv-t">água</text><text x="210" y="80" class="sv-b">parece "quebrado"!</text></svg>`;
      } else if (k === 'difr') {
        z.innerHTML = `<svg viewBox="0 0 420 220" class="ilus"><rect width="420" height="220" rx="14" fill="#f8f9fa"/><rect x="200" y="0" width="16" height="85" fill="#868e96"/><rect x="200" y="135" width="16" height="85" fill="#868e96"/><text x="208" y="110" class="sv-t" text-anchor="middle" transform="rotate(-90 208 110)">porta</text>${emo(60, 110, '🗣️', 36)}${emo(330, 190, '👂', 30)}<text x="330" y="166" class="sv-t" text-anchor="middle">ouve mesmo atrás da parede</text><g id="dw"></g></svg>`;
        const g = $('#dw', z);
        anim(z, t => { let s = ''; for (let j = 0; j < 5; j++) { const r = ((t * 50 + j * 40) % 200); if (r < 130) s += `<path d="M${90 + r},40 Q${100 + r},110 ${90 + r},180" stroke="${ONDA}" stroke-width="2.5" fill="none" opacity="${1 - r / 160}"/>`; else { const rr = r - 130 + 10; s += `<path d="M${216 + rr * .2},${110 - rr * 1.4} A${rr * 1.4},${rr * 1.4} 0 0,1 ${216 + rr * .2},${110 + rr * 1.4}" stroke="${ONDA}" stroke-width="2.5" fill="none" opacity="${1 - r / 220}"/>`; } } g.innerHTML = s; });
      } else if (k === 'inter') {
        z.innerHTML = `<div class="sliders"><label>Defasagem entre as ondas <input type="range" id="if" min="0" max="1" step="0.05" value="0"></label></div><svg viewBox="0 0 420 240" class="ilus"><rect width="420" height="240" rx="14" fill="#f8f9fa"/><path id="i1" fill="none" stroke="#228be6" stroke-width="2.5"/><path id="i2" fill="none" stroke="#e8590c" stroke-width="2.5"/><path id="i3" fill="none" stroke="#2f9e44" stroke-width="4"/><text x="12" y="20" class="sv-t" fill="#228be6">onda 1</text><text x="12" y="88" class="sv-t" fill="#e8590c">onda 2</text><text x="12" y="150" class="sv-b" fill="#2f9e44" id="it">soma</text></svg>`;
        const s1 = $('#i1', z), s2 = $('#i2', z), s3 = $('#i3', z), tx = $('#it', z);
        anim(z, t => { const df = +$('#if', z).value * Math.PI, fa = t * 3; s1.setAttribute('d', caminhoOnda(10, 410, 45, 18, 100, fa)); s2.setAttribute('d', caminhoOnda(10, 410, 110, 18, 100, fa + df)); let d = ''; for (let x = 10; x <= 410; x += 3) { const v = 18 * Math.sin(2 * Math.PI * (x - 10) / 100 - fa) + 18 * Math.sin(2 * Math.PI * (x - 10) / 100 - fa - df); d += (x === 10 ? 'M' : 'L') + x + ',' + f1(190 - v) + ' '; } s3.setAttribute('d', d); const amp = Math.abs(2 * Math.cos(df / 2)); tx.textContent = amp > 1.6 ? 'soma: CONSTRUTIVA (aumenta!)' : amp < .4 ? 'soma: DESTRUTIVA (se anulam!)' : 'soma: parcial'; });
      } else {
        z.innerHTML = `<div class="sliders"><label>Ritmo dos empurrões: <b id="rv"></b><input type="range" id="rf" min="0.3" max="1.7" step="0.05" value="0.6"></label></div><svg viewBox="0 0 420 220" class="ilus"><rect width="420" height="220" rx="14" fill="#e7f5ff"/><rect x="100" y="14" width="220" height="10" fill="#6b4a2a"/><g id="bal"><line x1="210" y1="20" x2="210" y2="160" stroke="${INK}" stroke-width="3"/><rect x="186" y="158" width="48" height="10" rx="3" fill="#e8590c"/>${emo(210, 140, '🧒', 30)}</g><rect y="200" width="420" height="20" fill="#8cb35a"/><text x="210" y="196" class="sv-t" text-anchor="middle" id="rt"></text></svg>`;
        const g = $('#bal', z), rt = $('#rt', z);
        anim(z, t => { const r = +$('#rf', z).value, amp = Math.min(38, 6 / (Math.abs(r - 1) + .16)); $('#rv', z).textContent = Math.abs(r - 1) < .08 ? 'IGUAL à frequência natural 🎯' : r < 1 ? 'mais lento que o natural' : 'mais rápido que o natural'; g.setAttribute('transform', `rotate(${f1(amp * Math.sin(t * 2.6))} 210 20)`); rt.textContent = `amplitude: ${amp > 30 ? 'ENORME (ressonância!)' : amp > 15 ? 'média' : 'pequena'}`; });
      }
    };
    draw();
  }
});

function initWidgets(root) {
  $$('[data-w]', root).forEach(el => WIDGETS[el.dataset.w] && WIDGETS[el.dataset.w](el));
}
