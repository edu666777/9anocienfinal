/* =========================================================
   WIDGETS — base comum + BIOLOGIA
   ========================================================= */
const INK = '#1f2a44';
const WIDGETS = {};
const f1 = n => (+n).toFixed(1);
const virg = n => String(n).replace('.', ',');
/* laço de animação que para sozinho quando o widget sai da tela */
function anim(el, fn) {
  const t0 = performance.now();
  const loop = t => { if (!el.isConnected) return; fn((t - t0) / 1000); requestAnimationFrame(loop); };
  requestAnimationFrame(loop);
}
const emo = (x, y, e, s = 22, extra = '') => `<text x="${x}" y="${y}" font-size="${s}" text-anchor="middle" dominant-baseline="central" ${extra}>${e}</text>`;

Object.assign(WIDGETS, {
  niveis(el) {
    const N = {
      gen: ['🧬 Genética', 'Diferenças entre indivíduos da <b>MESMA espécie</b>: todos estes grãos são <b>feijão</b>, mas variam na cor, no tamanho e na resistência à seca.', () => {
        const F = [['#7a3b1f', 30, 'resiste à seca'], ['#e8d9b0', 24, ''], ['#2b1b12', 22, ''], ['#c0392b', 28, 'maior'], ['#f2efe6', 20, ''], ['#8e5a3c', 26, ''], ['#5a3a6b', 23, '']];
        return F.map(([c, r, t], k) => { const x = 50 + k * 50, y = 110 + (k % 2) * 22; return `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * .62}" fill="${c}" stroke="${INK}" stroke-width="2"/><path d="M${x - r * .5},${y - r * .25} Q${x},${y - r * .05} ${x + r * .5},${y - r * .25}" stroke="#fff" stroke-opacity=".5" stroke-width="2" fill="none"/>${t ? `<text x="${x}" y="${y + r * .62 + 16}" class="sv-t" text-anchor="middle">${t}</text>` : ''}`; }).join('') + `<text x="200" y="40" class="sv-b" text-anchor="middle">Todos são da espécie Phaseolus vulgaris (feijão)</text>`;
      }],
      esp: ['🦀 De espécies', 'A variedade de <b>espécies diferentes</b> vivendo num lugar. Neste <b>manguezal</b>: árvores, caranguejos, peixes, aves, camarões…', () => `
        <rect y="120" width="400" height="80" fill="#6a8fa8"/><rect y="170" width="400" height="30" fill="#6b5a40"/>
        ${[60, 160, 270, 350].map(x => `<path d="M${x},120 l-14,50 M${x},120 l14,50 M${x},120 l-4,50 M${x},120 l4,50" stroke="#5a3a1f" stroke-width="3"/><rect x="${x - 3}" y="70" width="6" height="52" fill="#5a3a1f"/><ellipse cx="${x}" cy="62" rx="30" ry="20" fill="#3d8b3a"/>`).join('')}
        ${emo(120, 182, '🦀', 22)}${emo(210, 150, '🐟', 22)}${emo(300, 140, '🐠', 20)}${emo(110, 40, '🦩', 26)}${emo(220, 30, '🐦', 22)}${emo(330, 178, '🦐', 20)}${emo(30, 150, '🐊', 22)}`],
      eco: ['🏞️ De ecossistemas', 'A variedade de <b>ambientes</b>: floresta, rio, lagoa, campo, área alagada, manguezal, Caatinga…', () => `
        <rect width="400" height="200" fill="#bfe0f7"/><path d="M0,90 L400,90 L400,200 L0,200 Z" fill="#a9d36b"/>
        <g>${[20, 45, 70, 95, 120].map(x => `<rect x="${x - 3}" y="70" width="6" height="22" fill="#5a3a1f"/><circle cx="${x}" cy="62" r="16" fill="#2f8f46"/>`).join('')}</g>
        <path d="M150,90 C170,120 130,150 170,200 L210,200 C175,150 215,120 190,90 Z" fill="#4fa3dc"/>
        <ellipse cx="300" cy="150" rx="60" ry="22" fill="#4fa3dc"/><ellipse cx="300" cy="150" rx="60" ry="22" fill="none" stroke="#2b7bb9" stroke-width="2"/>
        <g fill="#7aa844">${[250, 270, 330, 350].map(x => `<path d="M${x},120 l3,-14 l3,14"/>`).join('')}</g>
        ${[350, 375].map(x => `<rect x="${x}" y="70" width="5" height="20" fill="#7a6a3a"/><path d="M${x + 2},70 l-8,-6 M${x + 2},70 l8,-6 M${x + 2},76 l-6,-4" stroke="#7a6a3a" stroke-width="2"/>`).join('')}
        <text x="70" y="115" class="sv-b" text-anchor="middle">floresta</text><text x="185" y="80" class="sv-b" text-anchor="middle">rio</text><text x="300" y="185" class="sv-b" text-anchor="middle">lagoa</text><text x="80" y="170" class="sv-b" text-anchor="middle">campo</text><text x="365" y="62" class="sv-t" text-anchor="middle">Caatinga</text>`]
    };
    let k = 'gen';
    const draw = () => {
      el.innerHTML = `<div class="jogo"><span class="tag">🔍 Escolha o nível</span>
        <div class="row">${Object.keys(N).map(x => `<button class="btn sm ${x === k ? 'on' : 'ghost'}" data-k="${x}">${N[x][0]}</button>`).join('')}</div>
        <svg viewBox="0 0 400 200" class="ilus" role="img" aria-label="${N[k][0]}"><rect width="400" height="200" rx="14" fill="#f3f7ee"/>${N[k][2]()}</svg>
        <p class="msg">${N[k][1]}</p></div>`;
      $$('[data-k]', el).forEach(b => b.onclick = () => { k = b.dataset.k; draw(); });
    };
    draw();
  },

  polinizacao(el) {
    const P = [['🐝 A abelha visita a flor A', 'Ela vem buscar <b>néctar</b> (alimento). Sem querer, o <b>pólen</b> (amarelo) gruda no corpo dela.'],
      ['✈️ Voa até a flor B', 'Levando o pólen no corpo, a abelha visita <b>outra flor da mesma espécie</b>.'],
      ['🌸 O pólen chega à flor B', 'O pólen cai na parte feminina da flor: é a <b>polinização</b>!'],
      ['🍎 Fruto e sementes', 'A flor é fecundada e forma <b>fruto e sementes</b>: a planta se <b>reproduz</b>. Muitas frutas que comemos dependem disso!']];
    let i = 0;
    const flor = (x, fruto) => fruto ? `<line x1="${x}" y1="100" x2="${x}" y2="180" stroke="#3d8b2a" stroke-width="5"/><circle cx="${x}" cy="92" r="24" fill="#e63946" stroke="${INK}" stroke-width="2"/><path d="M${x},68 q4,-10 12,-12" stroke="#5a3a1a" stroke-width="3" fill="none"/>${[[-6, 90], [6, 96], [0, 104]].map(([dx, dy]) => `<ellipse cx="${x + dx}" cy="${dy}" rx="2.5" ry="4" fill="#fff3c4"/>`).join('')}`
      : `<line x1="${x}" y1="100" x2="${x}" y2="180" stroke="#3d8b2a" stroke-width="5"/><ellipse cx="${x - 16}" cy="150" rx="14" ry="6" fill="#5fbf3a" transform="rotate(-30 ${x - 16} 150)"/>${[0, 72, 144, 216, 288].map(a => `<ellipse cx="${x}" cy="78" rx="11" ry="20" fill="#ff8fab" stroke="${INK}" stroke-width="1.5" transform="rotate(${a} ${x} 96)"/>`).join('')}<circle cx="${x}" cy="96" r="10" fill="#ffd23f" stroke="${INK}" stroke-width="1.5"/>`;
    const draw = () => {
      const bx = [90, 200, 300, 300][i], by = [60, 30, 62, 40][i];
      el.innerHTML = `<div class="jogo"><span class="tag">🐝 Passo ${i + 1} de ${P.length}</span>
        <svg viewBox="0 0 400 200" class="ilus" role="img" aria-label="Polinização"><rect width="400" height="200" rx="14" fill="#eaf6ff"/><rect y="180" width="400" height="20" fill="#9bc46a"/>
          ${flor(90, false)}${flor(300, i === 3)}
          <text x="90" y="196" class="sv-b" text-anchor="middle">flor A</text><text x="300" y="196" class="sv-b" text-anchor="middle">flor B</text>
          ${i === 1 ? '<path d="M100,55 Q200,-5 290,50" stroke="#8a6400" stroke-width="2" stroke-dasharray="5 5" fill="none"/>' : ''}
          ${i < 3 ? `<g class="voo">${emo(bx, by, '🐝', 32)}${i >= 0 && i < 3 ? `<circle cx="${bx - 8}" cy="${by + 12}" r="3" fill="#ffd23f" stroke="#8a6400"/><circle cx="${bx + 6}" cy="${by + 14}" r="3" fill="#ffd23f" stroke="#8a6400"/>` : ''}</g>` : emo(360, 40, '🐝', 26)}
          ${i === 2 ? '<g>' + [[-8, 92], [6, 98], [2, 88]].map(([dx, dy]) => `<circle cx="${300 + dx}" cy="${dy}" r="3" fill="#ffd23f" stroke="#8a6400"/>`).join('') + '</g>' : ''}
        </svg>
        <p class="msg"><b>${P[i][0]}</b>: ${P[i][1]}</p>
        <div class="row"><button class="btn sm ghost" id="pa" ${i ? '' : 'disabled'}>←</button><button class="btn sm" id="pp">${i < P.length - 1 ? 'Próximo passo →' : '🔁 De novo'}</button></div></div>`;
      $('#pa', el).onclick = () => { i--; draw(); }; $('#pp', el).onclick = () => { i = i < P.length - 1 ? i + 1 : 0; draw(); };
    };
    draw();
  },

  decomp(el) {
    const N = [['🌳', 'Planta', 'cresce usando os nutrientes do solo', 200, 40], ['🍂', 'Restos', 'folhas, frutos e animais mortos caem no chão', 340, 130], ['🍄🦠', 'Decompositores', '<b>fungos e bactérias</b> "comem" os restos', 200, 220], ['🟫', 'Nutrientes no solo', 'os nutrientes voltam para o solo…', 60, 130]];
    let sel = 2;
    const draw = () => {
      el.innerHTML = `<div class="jogo"><span class="tag">♻️ Ciclo dos nutrientes (toque nas etapas)</span>
        <svg viewBox="0 0 400 260" class="ilus" role="img" aria-label="Ciclo da decomposição"><rect width="400" height="260" rx="14" fill="#f6f1e6"/>
          <ellipse cx="200" cy="130" rx="140" ry="90" fill="none" stroke="#c9b48a" stroke-width="4" stroke-dasharray="8 6"/>
          <g><animateMotion dur="6s" repeatCount="indefinite" path="M200,40 A140,90 0 0,1 340,130 A140,90 0 0,1 200,220 A140,90 0 0,1 60,130 A140,90 0 0,1 200,40"/><circle r="7" fill="#2bb673" stroke="#fff" stroke-width="2"/></g>
          ${N.map((n, k) => `<g data-k="${k}" class="clicavel"><circle cx="${n[3]}" cy="${n[4]}" r="32" fill="${k === sel ? '#ffd23f' : '#fff'}" stroke="${INK}" stroke-width="2.5"/>${emo(n[3], n[4] - 2, n[0], 26)}<text x="${n[3]}" y="${n[4] + 48}" class="sv-b" text-anchor="middle">${n[1]}</text></g>`).join('')}
        </svg>
        <p class="msg"><b>${N[sel][1]}</b>: ${N[sel][2]}${sel === 2 ? '. Sem eles, os nutrientes ficariam "presos" nos restos!' : sel === 3 ? ' e são absorvidos de novo pelas raízes. É a <b>reciclagem de nutrientes</b>.' : '.'}</p></div>`;
      $$('[data-k]', el).forEach(g => g.onclick = () => { sel = +g.dataset.k; draw(); });
    };
    draw();
  },

  biomasBR(el) {
    const B = {
      ama: ['Amazônia', '#2f8f46', 'Maior floresta tropical do mundo. Também está em <b>outros países</b> da América do Sul.', '0,0 300,0 285,115 235,165 170,200 95,238 0,240'],
      caa: ['Caatinga', '#d9b45a', '⭐ <b>Exclusivamente brasileira</b> (Nordeste)! Clima <b>semiárido</b>, com espécies adaptadas à seca.', '285,90 400,95 400,205 330,232 272,180 285,115'],
      cer: ['Cerrado', '#c8a24a', 'A "savana" brasileira, no centro do país. Berço de grandes rios.', '170,200 235,165 285,115 272,180 330,232 300,282 232,302 180,282 158,238'],
      mat: ['Mata Atlântica', '#1f7a5a', 'Floresta do litoral. É um dos biomas <b>mais desmatados</b>.', '330,232 400,205 400,400 205,400 196,340 232,302 300,282'],
      pam: ['Pampa', '#9bc46a', 'Campos do extremo Sul. Também existe no <b>Uruguai e na Argentina</b>.', '140,400 245,400 222,348 168,338'],
      pan: ['Pantanal', '#5fb3c9', 'Maior planície alagável do mundo. Também está na <b>Bolívia e no Paraguai</b>.', '']
    };
    const BR = '62,120 110,72 170,60 222,40 262,70 300,88 350,118 382,150 372,182 342,222 322,272 292,302 262,332 232,362 202,388 180,372 194,342 170,322 150,292 130,252 100,232 70,212 40,182 50,150';
    let sel = 'caa';
    const draw = () => {
      el.innerHTML = `<div class="jogo"><span class="tag">🇧🇷 Biomas brasileiros (mapa esquemático)</span>
        <div class="mapa-bio"><svg viewBox="0 0 400 400" class="ilus" role="img" aria-label="Mapa esquemático dos biomas do Brasil"><defs><clipPath id="cBR"><polygon points="${BR}"/></clipPath></defs>
          <rect width="400" height="400" rx="16" fill="#e8f1f8"/>
          <g clip-path="url(#cBR)">${Object.keys(B).filter(k => k !== 'pan').map(k => `<polygon points="${B[k][3]}" fill="${B[k][1]}" data-b="${k}" class="clicavel" ${k === sel ? 'stroke="#fff" stroke-width="5"' : ''}/>`).join('')}
            <ellipse cx="150" cy="262" rx="26" ry="32" fill="${B.pan[1]}" data-b="pan" class="clicavel" ${sel === 'pan' ? 'stroke="#fff" stroke-width="5"' : ''}/></g>
          <polygon points="${BR}" fill="none" stroke="${INK}" stroke-width="3"/>
          ${sel === 'caa' ? emo(340, 160, '⭐', 30) : ''}
        </svg>
        <div class="leg">${Object.keys(B).map(k => `<button class="chip ${k === sel ? 'on' : ''}" data-b="${k}"><i style="background:${B[k][1]}"></i>${B[k][0]}</button>`).join('')}</div></div>
        <p class="msg"><b>${B[sel][0]}</b>: ${B[sel][2]}</p></div>`;
      $$('[data-b]', el).forEach(g => g.onclick = () => { sel = g.dataset.b; draw(); });
    };
    draw();
  },

  caatinga(el) {
    let chuva = false;
    const draw = () => {
      const arv = x => `<rect x="${x - 4}" y="110" width="8" height="60" fill="#6b4a2a"/><path d="M${x},120 l-22,-22 M${x},124 l20,-24 M${x},110 l-6,-26 M${x - 12},106 l-10,-6 M${x + 10},104 l10,-10" stroke="#6b4a2a" stroke-width="4" stroke-linecap="round"/>${chuva ? `<g fill="#4caf50">${[[-24, -26], [20, -28], [-6, -32], [-14, -10], [12, -14], [0, -20]].map(([dx, dy]) => `<circle cx="${x + dx}" cy="${120 + dy}" r="13"/>`).join('')}</g>` : ''}`;
      el.innerHTML = `<div class="jogo"><span class="tag">🌵 Caatinga: escolha a estação</span>
        <div class="row"><button class="btn sm ${!chuva ? 'on' : 'ghost'}" id="cs">☀️ Seca (estiagem)</button><button class="btn sm ${chuva ? 'on' : 'ghost'}" id="cc">🌧️ Chuva</button></div>
        <svg viewBox="0 0 400 210" class="ilus" role="img" aria-label="Caatinga na ${chuva ? 'chuva' : 'seca'}"><rect width="400" height="210" rx="14" fill="${chuva ? '#bcd4e6' : '#fbe6b8'}"/>
          ${chuva ? Array.from({ length: 18 }, (_, k) => `<line x1="${10 + k * 22}" y1="${8 + (k % 3) * 8}" x2="${4 + k * 22}" y2="${22 + (k % 3) * 8}" stroke="#1d6fb8" stroke-width="2" class="gota" style="animation-delay:${k * 60}ms"/>`).join('') : '<circle cx="352" cy="40" r="22" fill="#ffb000"/>'}
          <rect y="170" width="400" height="40" fill="${chuva ? '#8cb35a' : '#c99a5a'}"/>
          ${arv(70)}${arv(300)}
          <g><rect x="176" y="96" width="18" height="76" rx="9" fill="#3d8b3a" stroke="#265c25" stroke-width="2"/><path d="M176,130 h-14 v-24 a7,7 0 0,1 14,0 M194,124 h14 v-30 a7,7 0 0,0 -14,0" fill="#3d8b3a" stroke="#265c25" stroke-width="2"/>${[104, 118, 132, 146, 160].map(y => `<path d="M176,${y} l-5,-2 M194,${y} l5,-2" stroke="#fff" stroke-width="1.5"/>`).join('')}${emo(185, 140, '💧', 12)}</g>
          ${emo(250, 180, '🦎', 22)}${chuva ? emo(130, 50, '🐦', 22) : ''}${emo(360, 186, '🦔', 16, 'opacity=".9"')}
          <text x="70" y="200" class="sv-t" text-anchor="middle">${chuva ? 'folhas de volta!' : 'perdeu as folhas'}</text>
          <text x="185" y="88" class="sv-t" text-anchor="middle">mandacaru: guarda água</text><text x="185" y="200" class="sv-t" text-anchor="middle">espinhos</text>
        </svg>
        <p class="msg">${chuva ? '🌧️ Com a chuva, a Caatinga fica <b>verde</b> em poucos dias: as plantas brotam, florescem e os animais se reproduzem.' : '☀️ Na seca, muitas árvores <b>perdem as folhas</b> para perder menos água; o <b>mandacaru</b> guarda água no caule e tem <b>espinhos</b> no lugar de folhas; muitos animais têm <b>hábitos noturnos</b> para fugir do calor.'}</p></div>`;
      $('#cs', el).onclick = () => { chuva = false; draw(); }; $('#cc', el).onclick = () => { chuva = true; draw(); };
    };
    draw();
  },

  fragmentacao(el) {
    el.innerHTML = `<div class="jogo"><span class="tag">🛣️ Arraste para aumentar a ocupação humana</span><input type="range" min="0" max="3" value="0" step="1" id="fg"><div id="fgo"></div></div>`;
    const COLS = 14, ROWS = 6;
    const tipo = (c, r, n) => {
      if (n >= 1 && c === 6) return 'rua';
      if (n >= 2 && r === 3) return 'rua';
      if (n >= 2 && c >= 9 && c <= 11 && r <= 2) return 'roca';
      if (n >= 3 && ((c <= 3 && r >= 4) || (c >= 11 && r >= 4) || (c >= 1 && c <= 4 && r <= 1))) return 'roca';
      if (n >= 3 && c >= 7 && c <= 8 && r >= 4) return 'casa';
      return 'mata';
    };
    const upd = () => {
      const n = +$('#fg', el).value;
      let s = `<svg viewBox="0 0 420 200" class="ilus" role="img" aria-label="Fragmentação de habitat"><rect width="420" height="200" rx="14" fill="#f3f7ee"/>`, matas = 0;
      for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
        const t = tipo(c, r, n), x = 14 + c * 28, y = 14 + r * 29;
        if (t === 'mata') { matas++; s += emo(x + 14, y + 14, '🌳', 22); }
        else if (t === 'rua') s += `<rect x="${x}" y="${y}" width="28" height="29" fill="#7d7d7d"/><line x1="${x + (c === 6 ? 14 : 0)}" y1="${y + (c === 6 ? 0 : 14)}" x2="${x + (c === 6 ? 14 : 28)}" y2="${y + (c === 6 ? 29 : 14)}" stroke="#fff" stroke-dasharray="4 4" stroke-width="2"/>`;
        else if (t === 'roca') s += `<rect x="${x}" y="${y}" width="28" height="29" fill="#f2d16b"/><path d="M${x + 4},${y + 8} h20 M${x + 4},${y + 16} h20 M${x + 4},${y + 24} h20" stroke="#c9a23a" stroke-width="2"/>`;
        else s += emo(x + 14, y + 14, '🏠', 20);
      }
      const bichos = [[3, 2], [10, 4], [2, 4], [12, 1]];
      bichos.forEach(([c, r]) => { if (tipo(c, r, n) === 'mata') s += emo(14 + c * 28 + 14, 14 + r * 29 + 14, '🐒', 16); });
      s += '</svg>';
      const frag = [1, 2, 4, 6][n];
      $('#fgo', el).innerHTML = s + `<div class="painel"><span>🌳 Mata restante: <b>${Math.round(matas / (COLS * ROWS) * 100)}%</b></span><span>🧩 Pedaços de mata: <b>${frag}</b></span></div>
        <p class="msg">${n === 0 ? 'Mata contínua: os animais andam livremente, encontram alimento e parceiros.' : n === 1 ? 'Uma estrada <b>corta</b> a mata em 2 pedaços. Atravessar fica perigoso (atropelamentos).' : n === 2 ? 'Mais estradas e plantações: a mata vira <b>"ilhas"</b> isoladas.' : 'Fragmentação forte: os grupos de animais ficam <b>isolados</b>, cruzam só entre parentes (menos <b>variabilidade genética</b>) e o risco de <b>extinção local</b> aumenta.'}</p>`;
    };
    $('#fg', el).oninput = upd; upd();
  },

  acoes(el) {
    miniQuiz(el, '🌍 Ajuda ou ameaça a biodiversidade?', [
      ['🌱 Plantar espécies nativas na escola', 0], ['🦜 Comprar um papagaio vendido na feira, sem documento', 1, 'Isso alimenta o tráfico de animais.'], ['♻️ Fazer coleta seletiva', 0],
      ['🔥 Queimar o mato para "limpar" o terreno', 1], ['🚿 Economizar água', 0], ['🗑️ Jogar lixo no riacho', 1], ['🏞️ Criar uma unidade de conservação', 0],
      ['🐟 Pescar na época da reprodução dos peixes', 1, 'É pesca predatória.'], ['🔭 Projeto de observação de aves', 0], ['🐸 Soltar na natureza um animal exótico de estimação', 1, 'Ele pode virar uma espécie invasora.']
    ], ['✅ Ajuda', '⚠️ Ameaça']);
  }
});
