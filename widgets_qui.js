/* =========================================================
   WIDGETS — QUÍMICA
   ========================================================= */
const PH_COR = ['#e0262d', '#ee4a2a', '#f4762b', '#f9a12a', '#fcc92d', '#e9e136', '#b5d63b', '#5fbf4a', '#2fae6a', '#21a3a0', '#2a7fc0', '#3557b5', '#4b3a9e', '#5e2a8a', '#6a1f7a'];
const ion = (x, y, t, cor, r = 17) => `<g><circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${cor}" stroke="${INK}" stroke-width="2"/><text x="${f1(x)}" y="${f1(y)}" text-anchor="middle" dominant-baseline="central" class="sv-ion">${t}</text></g>`;
const COR = { H: '#ff6b6b', OH: '#4dabf7', Na: '#b197fc', Cl: '#69db7c', H2O: '#d0ebff' };
const bequer = (inner, liq = '#d0ebff') => `<path d="M60,30 L60,190 Q60,210 80,210 L260,210 Q280,210 280,190 L280,30" fill="none" stroke="${INK}" stroke-width="4"/>
  <path d="M62,80 L278,80 L278,190 Q278,208 260,208 L80,208 Q62,208 62,190 Z" fill="${liq}" opacity=".75"/>${inner}`;

Object.assign(WIDGETS, {
  ph(el) {
    const P = [[1.5, '🫃', 'Suco gástrico'], [2, '🍋', 'Limão'], [3, '🍶', 'Vinagre'], [3.5, '🥤', 'Refrigerante'], [5, '☕', 'Café'], [7, '💧', 'Água pura'], [7.4, '🩸', 'Sangue'], [8.5, '🧁', 'Bicarbonato'], [10, '🧼', 'Sabão'], [10.5, '💊', 'Leite de magnésia'], [12.5, '🧴', 'Água sanitária'], [14, '⚠️', 'Soda cáustica']];
    el.innerHTML = `<div class="jogo"><span class="tag">🧪 Papel indicador universal</span>
      <div class="phbar">${PH_COR.map((c, k) => `<span style="background:${c}">${k}</span>`).join('')}</div>
      <input type="range" min="0" max="14" step="0.5" value="2" id="phr"><div class="phitens">${P.map((p, k) => `<button class="chip" data-k="${k}">${p[1]} ${p[2]}</button>`).join('')}</div><div id="pho"></div></div>`;
    const upd = (nome) => {
      const v = +$('#phr', el).value, cor = PH_COR[Math.round(v)], tipo = v < 7 ? ['ÁCIDO', '#e0262d', 'Mais H⁺ que OH⁻.'] : v > 7 ? ['BÁSICO', '#3557b5', 'Mais OH⁻ que H⁺.'] : ['NEUTRO', '#2f9e44', 'H⁺ e OH⁻ em equilíbrio.'];
      $('#pho', el).innerHTML = `<div class="phres"><div class="tira"><span style="background:${cor}"></span></div><div><b style="color:${tipo[1]}">pH ${virg(v)} → ${tipo[0]}</b><p>${nome ? `<b>${nome}</b> · ` : ''}${tipo[2]} ${v < 7 ? 'Quanto <b>menor</b> o pH, mais ácido.' : v > 7 ? 'Quanto <b>maior</b> o pH, mais básico.' : ''}</p></div></div>`;
    };
    $('#phr', el).oninput = () => upd();
    $$('[data-k]', el).forEach(b => b.onclick = () => { const p = P[+b.dataset.k]; $('#phr', el).value = p[0]; upd(p[1] + ' ' + p[2]); });
    upd('🍋 Limão');
  },

  funcQuiz(el) {
    miniQuiz(el, '⚗️ Qual é a função?', [
      ['HCl', 0, 'Libera H⁺.'], ['NaOH', 1, 'Tem OH (hidróxido).'], ['NaCl', 2, 'Íons Na⁺ e Cl⁻.'], ['CO₂', 3, 'C + O: binário com oxigênio.'], ['H₂SO₄', 0], ['Ca(OH)₂', 1],
      ['NaHCO₃', 2, 'Bicarbonato de sódio é sal.'], ['CaO', 3], ['Mg(OH)₂', 1], ['SO₂', 3], ['CaCO₃', 2], ['CH₃COOH', 0, 'Ácido acético (vinagre).']
    ], ['🍋 Ácido', '🧼 Base', '🧂 Sal', '💨 Óxido']);
  },

  ioniza(el) {
    const S = {
      HCl: ['HCl (ácido)', [['H', 'Cl']], (x, y, a) => a ? ion(x - 38, y - 10, 'H⁺', COR.H, 14) + ion(x + 34, y + 12, 'Cl⁻', COR.Cl) : `<g>${ion(x - 12, y, 'H', COR.H, 13)}${ion(x + 14, y, 'Cl', COR.Cl)}</g>`, 'Na água, o HCl <b>libera H⁺</b> → é um <b>ÁCIDO</b>.'],
      NaOH: ['NaOH (base)', [['Na', 'OH']], (x, y, a) => a ? ion(x - 36, y + 10, 'Na⁺', COR.Na) + ion(x + 36, y - 10, 'OH⁻', COR.OH) : `<g>${ion(x - 14, y, 'Na', COR.Na)}${ion(x + 16, y, 'OH', COR.OH)}</g>`, 'Na água, o NaOH <b>libera OH⁻</b> → é uma <b>BASE</b>.'],
      NaCl: ['NaCl (sal)', [['Na', 'Cl']], (x, y, a) => a ? ion(x - 36, y - 8, 'Na⁺', COR.Na) + ion(x + 36, y + 8, 'Cl⁻', COR.Cl) : `<g>${ion(x - 14, y, 'Na', COR.Na)}${ion(x + 16, y, 'Cl', COR.Cl)}</g>`, 'O sal se separa em íons <b>positivos (Na⁺)</b> e <b>negativos (Cl⁻)</b>: é um <b>composto iônico</b>. Não libera nem H⁺ nem OH⁻.']
    };
    let k = 'HCl', agua = false;
    const draw = () => {
      const pos = [[120, 120], [220, 160], [150, 180], [230, 105]];
      el.innerHTML = `<div class="jogo"><span class="tag">💧 Coloque a substância na água</span>
        <div class="row">${Object.keys(S).map(x => `<button class="btn sm ${x === k ? 'on' : 'ghost'}" data-k="${x}">${S[x][0]}</button>`).join('')}</div>
        <svg viewBox="0 0 340 220" class="ilus" role="img" aria-label="Dissociação em água">${bequer(agua ? pos.map(([x, y]) => S[k][2](x, y, true)).join('') : '', agua ? COR.H2O : '#f3f3f3')}
          ${!agua ? pos.slice(0, 2).map(([x], i) => S[k][2](x + 10, 40 + i * 6, false)).join('') : ''}</svg>
        <div class="row"><button class="btn" id="ag">${agua ? '🔄 Tirar da água' : '💧 Colocar na água'}</button></div>
        <p class="msg">${agua ? S[k][3] : 'Ainda fora da água: os átomos estão juntos.'}</p></div>`;
      $$('[data-k]', el).forEach(b => b.onclick = () => { k = b.dataset.k; agua = false; draw(); });
      $('#ag', el).onclick = () => { agua = !agua; draw(); };
    };
    draw();
  },

  neutraliza(el) {
    let a = 0, b = 0, fx = '';
    const draw = () => {
      const pares = Math.min(a, b), sa = a - pares, sb = b - pares;
      const ph = sa > 0 ? Math.max(1, 3 - (sa - 1) * .5) : sb > 0 ? Math.min(13, 11 + (sb - 1) * .5) : 7;
      const cor = a + b === 0 ? '#eef6ff' : PH_COR[Math.round(ph)];
      let inner = '', k = 0;
      const slot = () => { const x = 92 + (k % 6) * 30, y = 104 + Math.floor(k / 6) * 34; k++; return [x, y]; };
      for (let i = 0; i < pares; i++) { const [x, y] = slot(); inner += ion(x, y, 'H₂O', COR.H2O, 13); }
      for (let i = 0; i < pares; i++) { const [x, y] = slot(); inner += ion(x, y, 'NaCl', '#fff3bf', 13); }
      for (let i = 0; i < sa; i++) { const [x, y] = slot(); inner += ion(x, y, 'H⁺', COR.H, 12); }
      for (let i = 0; i < sb; i++) { const [x, y] = slot(); inner += ion(x, y, 'OH⁻', COR.OH, 13); }
      el.innerHTML = `<div class="jogo"><span class="tag">⚖️ Adicione ácido e base ao béquer</span>
        <div class="row"><button class="btn sm" id="na" ${a + b >= 18 ? 'disabled' : ''}>🍋 + 1 HCl (ácido)</button><button class="btn sm" id="nb" ${a + b >= 18 ? 'disabled' : ''}>🧼 + 1 NaOH (base)</button><button class="btn sm ghost" id="nz">🧽 Esvaziar</button></div>
        <div class="neut"><svg viewBox="0 0 340 220" class="ilus" role="img" aria-label="Béquer">${bequer(inner, cor)}</svg>
          <div class="phmeter"><small>pH aproximado</small><b style="color:${a + b ? cor : INK}">${a + b ? virg(ph) : '–'}</b><span>${a + b === 0 ? 'vazio' : ph < 7 ? 'ácido' : ph > 7 ? 'básico' : 'NEUTRO ✔'}</span></div></div>
        <div class="equacao">HCl + NaOH → <b>NaCl</b> (sal) + <b>H₂O</b> (água)</div>
        <p class="msg">${fx || 'Coloque o mesmo número de ácidos e bases para <b>neutralizar</b>.'}</p></div>`;
      const add = t => { if (t === 'a') a++; else b++; const p2 = Math.min(a, b); fx = p2 > pares ? '✨ Um H⁺ encontrou um OH⁻ e formou <b>água</b>; o Na⁺ e o Cl⁻ formaram <b>sal</b>!' : t === 'a' ? 'Sobrou <b>H⁺</b>: a mistura ficou ácida.' : 'Sobrou <b>OH⁻</b>: a mistura ficou básica.'; draw(); };
      $('#na', el).onclick = () => add('a'); $('#nb', el).onclick = () => add('b');
      $('#nz', el).onclick = () => { a = b = 0; fx = ''; draw(); };
    };
    draw();
  },

  cristal(el) {
    let s = '';
    for (let r = 0; r < 5; r++) for (let c = 0; c < 7; c++) { const na = (r + c) % 2 === 0; s += ion(40 + c * 44, 30 + r * 40, na ? 'Na⁺' : 'Cl⁻', na ? COR.Na : COR.Cl, na ? 13 : 18); }
    el.innerHTML = `<div class="jogo"><span class="tag">🧂 Por dentro de um grão de sal</span>
      <svg viewBox="0 0 340 210" class="ilus" role="img" aria-label="Retículo do cloreto de sódio"><rect width="340" height="210" rx="14" fill="#f8f9fa"/>
        ${Array.from({ length: 5 }, (_, r) => `<line x1="40" y1="${30 + r * 40}" x2="304" y2="${30 + r * 40}" stroke="#adb5bd" stroke-width="2"/>`).join('')}${Array.from({ length: 7 }, (_, c) => `<line x1="${40 + c * 44}" y1="30" x2="${40 + c * 44}" y2="190" stroke="#adb5bd" stroke-width="2"/>`).join('')}${s}</svg>
      <p class="msg">Os íons <b style="color:#7048e8">Na⁺</b> (positivos) e <b style="color:#2b8a3e">Cl⁻</b> (negativos) se atraem e se organizam como um "tabuleiro": é um <b>composto iônico</b>.</p></div>`;
  },

  chuvaAcida(el) {
    const P = [['🏭🚗 Emissão', 'Fábricas e carros que queimam combustíveis liberam óxidos: <b>SO₂</b> (enxofre) e <b>NOₓ</b> (nitrogênio).'],
      ['☁️ Reação nas nuvens', 'Esses óxidos <b>reagem com a água</b> das nuvens e formam <b>ácidos</b> (ex.: ácido sulfúrico).'],
      ['🌧️ Chuva ácida', 'A chuva cai <b>ácida</b>: prejudica plantas, rios, peixes, solos e corrói monumentos e construções.']];
    let i = 0;
    const draw = () => {
      const fum = i >= 0, nuv = i >= 1 ? '#8d939b' : '#e9ecef';
      el.innerHTML = `<div class="jogo"><span class="tag">🌧️ Passo ${i + 1} de 3</span>
        <svg viewBox="0 0 400 220" class="ilus" role="img" aria-label="Formação da chuva ácida"><rect width="400" height="220" rx="14" fill="${i === 2 ? '#c9d1d9' : '#d7ecff'}"/><rect y="185" width="400" height="35" fill="#8cb35a"/>
          <rect x="30" y="120" width="60" height="65" fill="#868e96" stroke="${INK}" stroke-width="2"/><rect x="70" y="80" width="14" height="42" fill="#495057"/>${emo(130, 172, '🚗', 26)}
          ${fum ? `<g class="fumaca"><circle cx="78" cy="66" r="12" fill="#adb5bd"/><circle cx="92" cy="50" r="15" fill="#adb5bd"/><circle cx="112" cy="36" r="17" fill="#ced4da"/></g><text x="130" y="108" class="sv-b">SO₂ · NOₓ</text>` : ''}
          <g fill="${nuv}"><ellipse cx="260" cy="44" rx="56" ry="22"/><ellipse cx="300" cy="34" rx="40" ry="20"/><ellipse cx="226" cy="40" rx="30" ry="18"/></g>
          ${i >= 1 ? '<text x="262" y="50" class="sv-b" text-anchor="middle" fill="#fff">+ H₂O → ácidos</text><path d="M140,40 Q180,20 200,36" stroke="#495057" stroke-width="2" stroke-dasharray="4 4" fill="none"/>' : ''}
          ${i === 2 ? Array.from({ length: 14 }, (_, k) => `<line x1="${210 + k * 9}" y1="${70 + (k % 3) * 6}" x2="${204 + k * 9}" y2="${86 + (k % 3) * 6}" stroke="#e8590c" stroke-width="2.5" class="gota" style="animation-delay:${k * 70}ms"/>`).join('') : ''}
          <g>${i === 2 ? '<rect x="236" y="130" width="5" height="56" fill="#6b4a2a"/><circle cx="238" cy="122" r="16" fill="#b5a24a"/>' : '<rect x="236" y="130" width="5" height="56" fill="#6b4a2a"/><circle cx="238" cy="122" r="16" fill="#2f8f46"/>'}</g>
          <g transform="translate(320,120)"><rect x="-12" y="40" width="44" height="26" fill="#ced4da" stroke="${INK}"/><circle cx="10" cy="10" r="10" fill="#dee2e6" stroke="${INK}"/><rect x="0" y="20" width="20" height="22" fill="#dee2e6" stroke="${INK}"/>${i === 2 ? '<path d="M2,6 l6,6 M12,26 l6,8" stroke="#495057" stroke-width="2"/>' : ''}</g>
          <text x="330" y="208" class="sv-t" text-anchor="middle">estátua</text>
        </svg>
        <p class="msg"><b>${P[i][0]}</b>: ${P[i][1]}</p>
        <div class="row"><button class="btn sm ghost" id="ca" ${i ? '' : 'disabled'}>←</button><button class="btn sm" id="cp">${i < 2 ? 'Próximo →' : '🔁 Recomeçar'}</button></div></div>`;
      $('#ca', el).onclick = () => { i--; draw(); }; $('#cp', el).onclick = () => { i = i < 2 ? i + 1 : 0; draw(); };
    };
    draw();
  },

  limpeza(el) {
    const P = { sanit: '🧴 Água sanitária', vinagre: '🍶 Vinagre', amonia: '🪟 Limpa-vidros (amônia)', deterg: '🫧 Detergente', desinf: '🧪 Desinfetante' };
    let sel = [];
    const draw = () => {
      let msg = 'Escolha <b>dois</b> produtos para "misturar"…';
      if (sel.length === 2) {
        const s = sel.slice().sort().join('+');
        msg = s === 'sanit+vinagre' ? '☠️ <b>PERIGO!</b> Água sanitária + vinagre libera <b>gás cloro</b>, que é tóxico.' : s === 'amonia+sanit' ? '☠️ <b>PERIGO!</b> Água sanitária + amônia forma <b>gases tóxicos</b> (cloraminas).' : '⚠️ Mesmo que pareça inofensivo, <b>não misture</b>: sem conhecer a composição, a reação pode liberar gases ou calor.';
        msg += '<br>✅ <b>Regra de ouro</b>: nunca misture produtos de limpeza, leia o <b>rótulo</b>, use em local <b>ventilado</b> e guarde longe de crianças.';
      }
      el.innerHTML = `<div class="jogo"><span class="tag">⚠️ Laboratório da segurança (só no site!)</span>
        <div class="phitens">${Object.keys(P).map(k => `<button class="chip ${sel.includes(k) ? 'on' : ''}" data-k="${k}">${P[k]}</button>`).join('')}</div>
        <div class="balde ${sel.length === 2 ? 'perigo' : ''}">${sel.length === 2 ? '☠️' : '🪣'}</div>
        <p class="msg">${msg}</p>${sel.length ? '<div class="row"><button class="btn sm ghost" id="lz">Limpar</button></div>' : ''}</div>`;
      $$('[data-k]', el).forEach(b => b.onclick = () => { const k = b.dataset.k; if (sel.includes(k)) sel = sel.filter(x => x !== k); else if (sel.length < 2) sel.push(k); else sel = [k]; draw(); });
      $('#lz', el) && ($('#lz', el).onclick = () => { sel = []; draw(); });
    };
    draw();
  }
});
