/* =========================================================
   APP — navegação, questões (objetivas e discursivas) e relatório
   ========================================================= */
const WHATSAPP = '5585992621003';           // (85) 99262-1003
const LS_KEY = CONFIG.lsKey;
const LETRAS = ['A', 'B', 'C', 'D'];
const AVAL = ['❌ Errei', '🟡 Acertei em parte', '✅ Acertei'];
const MODS = Object.keys(MODULOS);

/* ---------- estado salvo no aparelho do aluno ---------- */
let S = (() => { try { return JSON.parse(localStorage.getItem(LS_KEY)) || {}; } catch (e) { return {}; } })();
S.aluno = S.aluno || { nome: '', turma: '' };
S.r = S.r || {}; S.pos = S.pos || {};
MODS.forEach(m => { S.r[m] = S.r[m] || {}; S.pos[m] = S.pos[m] || 0; });
const save = () => localStorage.setItem(LS_KEY, JSON.stringify(S));

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const strip = html => { const d = document.createElement('div'); d.innerHTML = html; return d.textContent; };
const corta = (s, n) => s.length > n ? s.slice(0, n).trim() + '…' : s;

/* quiz genérico dos mini-jogos */
function miniQuiz(el, titulo, itens, botoes) {
  let i = 0, ok = 0;
  const draw = (msg = '') => {
    if (i >= itens.length) {
      el.innerHTML = `<div class="jogo"><span class="tag">${titulo}</span><p class="placarj">🎉 Você acertou <b>${ok} de ${itens.length}</b>!</p><p class="msg">${msg}</p><div class="row"><button class="btn sm" id="jr">Jogar de novo</button></div></div>`;
      $('#jr', el).onclick = () => { i = 0; ok = 0; draw(); }; return;
    }
    el.innerHTML = `<div class="jogo"><span class="tag">${titulo} (${i + 1}/${itens.length})</span>
      <div class="var">${itens[i][0]}</div>
      <div class="row">${botoes.map((b, k) => `<button class="btn sm" data-v="${k}">${b}</button>`).join('')}</div><p class="msg">${msg}</p></div>`;
    $$('[data-v]', el).forEach(b => b.onclick = () => {
      const k = +b.dataset.v, it = itens[i], acertou = k === it[1];
      if (acertou) ok++;
      i++; draw((acertou ? '✅ Isso! ' : `❌ Era <b>${botoes[it[1]]}</b>. `) + (it[2] || ''));
    });
  };
  draw();
}

/* =========================================================
   ESTATÍSTICAS (objetivas contam acertos; discursivas, autoavaliação)
   ========================================================= */
function stats(m) {
  const qs = MODULOS[m].questoes, porTopico = MODULOS[m].topicos.map(() => ({ ok: 0, n: 0 }));
  let obj = 0, resp = 0, acertos = 0, ab = 0, abResp = 0; const erros = [], abertas = [];
  qs.forEach((q, i) => {
    const r = S.r[m][i];
    if (q.aberta) { ab++; abertas.push(i); if (r && r.av !== undefined) abResp++; return; }
    obj++;
    if (r && r.p !== undefined) {
      resp++; porTopico[q.t].n++;
      if (r.p === q.c) { acertos++; porTopico[q.t].ok++; } else erros.push(i);
    }
  });
  return { total: qs.length, obj, resp, acertos, erros, porTopico, ab, abResp, abertas, feitas: resp + abResp, pct: resp ? Math.round(acertos / resp * 100) : 0 };
}

/* =========================================================
   TELAS
   ========================================================= */
const app = () => $('#app');

function header(extra = '') {
  return `<header class="top"><a href="#" class="logo"><span class="selo">${CONFIG.serie}</span><span><b>Mentoria Educacional Promover</b><small>${CONFIG.area} · ${CONFIG.serieLonga}</small></span></a>${extra}</header>`;
}

function renderHome() {
  const totalQ = MODS.reduce((a, m) => a + MODULOS[m].questoes.length, 0);
  const cards = MODS.map(m => {
    const mod = MODULOS[m], s = stats(m), prog = Math.round(s.feitas / s.total * 100);
    return `<article class="mod ${m}">
      <div class="mod-top"><span class="emoji">${mod.emoji}</span><div class="anel" style="--p:${prog}"><span>${s.feitas}/${s.total}</span></div></div>
      <h2>${mod.titulo}</h2><p class="sub">${mod.sub}</p>
      <ul class="tops">${mod.topicos.map((t, i) => `<li><a href="#${m}/t/${i}">${i + 1}. ${t}</a></li>`).join('')}</ul>
      <details class="rr"><summary>⚡ Revisão relâmpago</summary><ul>${mod.resumo.map(x => `<li>${x}</li>`).join('')}</ul></details>
      <div class="row"><a class="btn" href="#${m}/t">📖 Teoria</a><a class="btn alt" href="#${m}/q">✍️ ${s.total} questões</a></div>
      <p class="mini-score">${s.obj} objetivas + ${s.ab} discursivas${s.resp ? ` · acertos de 1ª: <b>${s.acertos}/${s.resp}</b>` : ''}</p>
    </article>`;
  }).join('');
  const prep = MODS.map(m => { const s = stats(m), p = Math.round(s.feitas / s.total * 100); return `<div class="prep ${m}"><span>${MODULOS[m].emoji} ${MODULOS[m].titulo}</span><div class="trilho"><div style="width:${p}%"></div></div><em>${p}%</em></div>`; }).join('');
  app().innerHTML = header() + `
    <section class="hero">
      <div class="hero-txt"><p class="kicker">${CONFIG.kicker}</p>
      <h1>${CONFIG.titulo}</h1>
      <p>${CONFIG.texto}</p>
      <form class="aluno" onsubmit="return false">
        <span class="fita"></span><b>Quem está estudando?</b>
        <label>Seu nome<input id="nome" value="${esc(S.aluno.nome)}" placeholder="Digite seu nome completo" autocomplete="name"></label>
        <label>Turma<input id="turma" value="${esc(S.aluno.turma)}" placeholder="Ex.: ${CONFIG.serie} A"></label>
        <small>Fica salvo só neste aparelho.</small>
      </form></div>
      <div class="hero-ilus"><p class="kicker">📋 Minha preparação</p>${prep}<p class="dica-p">Sem tempo? Abra a <b>⚡ Revisão relâmpago</b> de cada matéria e depois faça as questões.</p></div>
    </section>
    <section class="passos"><span>1 ⚡ Revisão relâmpago</span><span>2 📖 Teoria ilustrada</span><span>3 ✍️ ${totalQ} questões</span><span>4 💬 Envie no WhatsApp</span></section>
    <section class="mods">${cards}</section>
    <a class="btn relat" href="#relatorio">📋 Ver meu relatório de erros</a>`;
  $('#nome').oninput = e => { S.aluno.nome = e.target.value; save(); };
  $('#turma').oninput = e => { S.aluno.turma = e.target.value; save(); };
}

function renderModulo(m, tab, arg) {
  const mod = MODULOS[m];
  app().innerHTML = header(`<a href="#relatorio" class="btn sm ghost">📋 Relatório</a>`) + `
    <div class="mhead ${m}"><a href="#" class="voltar">← Início</a><h1>${mod.emoji} ${mod.titulo}<small>${mod.sub}</small></h1>
      <nav class="tabs"><a href="#${m}/t" class="${tab === 't' ? 'on' : ''}">📖 Teoria</a><a href="#${m}/q" class="${tab === 'q' ? 'on' : ''}">✍️ Questões</a>
      ${MODS.filter(x => x !== m).map(x => `<a href="#${x}/t" class="outra">${MODULOS[x].emoji} ${MODULOS[x].titulo}</a>`).join('')}</nav></div>
    <main id="main" class="${m}"></main>`;
  if (tab === 'q') { if (arg !== undefined && !isNaN(+arg)) { S.pos[m] = +arg; save(); } renderQuestao(m); }
  else renderTeoria(m, arg);
}

function renderTeoria(m, foco) {
  const mod = MODULOS[m], main = $('#main');
  main.innerHTML = `<nav class="indice">${mod.topicos.map((t, i) => `<a href="#${m}/t/${i}">${i + 1}. ${t}</a>`).join('')}</nav>
    <section class="relampago"><b>⚡ Revisão de 1 minuto</b><ul>${mod.resumo.map(x => `<li>${x}</li>`).join('')}</ul></section>` +
    TEORIA[m].map((fn, i) => {
      const primeira = mod.questoes.findIndex(q => q.t === i), qtd = mod.questoes.filter(q => q.t === i).length;
      return `<section class="topico" id="top-${i}"><span class="num">${i + 1}</span><h2>${mod.topicos[i]}</h2>${fn()}
        ${qtd ? `<a class="btn alt pratica" href="#${m}/q/${primeira}">✍️ Praticar este tópico (${qtd} ${qtd > 1 ? 'questões' : 'questão'}) →</a>` : ''}</section>`;
    }).join('');
  initWidgets(main);
  if (foco !== undefined) setTimeout(() => { const t = $('#top-' + foco); t && t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 60);
}

function corDot(q, rr) {
  if (!rr) return '';
  if (q.aberta) return rr.av === undefined ? (rr.txt ? 'rasc' : '') : ['err', 'fix', 'ok'][rr.av];
  if (rr.u !== undefined) return rr.u === q.c ? (rr.p === q.c ? 'ok' : 'fix') : 'err';
  return rr.p !== undefined ? 'err' : '';
}

function renderQuestao(m) {
  const mod = MODULOS[m], i = Math.min(S.pos[m] || 0, mod.questoes.length - 1), q = mod.questoes[i];
  const r = S.r[m][i] || {}, s = stats(m);
  const dotsNav = mod.questoes.map((qq, k) => `<button class="qd ${corDot(qq, S.r[m][k])} ${qq.aberta ? 'ab' : ''} ${k === i ? 'cur' : ''}" data-k="${k}" aria-label="Questão ${k + 1}${qq.aberta ? ' (discursiva)' : ''}">${k + 1}</button>`).join('');
  let corpo;
  if (q.aberta) {
    const visto = !!r.visto;
    corpo = `<label class="resp"><span>✍️ Escreva sua resposta (como faria na prova):</span><textarea id="txt" rows="5" placeholder="Escreva aqui com suas palavras…">${esc(r.txt || '')}</textarea></label>
      ${!visto ? `<details class="dica"><summary>💡 Preciso de uma dica</summary><p>${q.dica}</p></details>
        <div class="row"><button class="btn" id="ver">👀 Comparar com a resposta-modelo</button></div><p class="msg" id="vm"></p>` :
      `<div class="fb modelo"><span class="tag">🧑‍🏫 Resposta-modelo</span><p>${q.modelo}</p>
        <p class="aut"><b>Compare com a sua. Como você foi?</b></p>
        <div class="row">${AVAL.map((a, k) => `<button class="btn sm ${r.av === k ? 'on' : 'ghost'}" data-av="${k}">${a}</button>`).join('')}</div>
        ${r.av !== undefined && r.av < 2 ? `<a class="link" href="#${m}/t/${q.t}">📖 Rever a teoria: ${mod.topicos[q.t]}</a>` : ''}</div>`}`;
  } else {
    const feito = r.u !== undefined;
    const ops = q.ops.map((o, k) => {
      let c = '';
      if (feito) { if (k === q.c) c = 'certa'; else if (k === r.u) c = 'errada'; else c = 'apagada'; }
      return `<button class="op ${c}" data-o="${k}" ${feito ? 'disabled' : ''}><span class="let">${LETRAS[k]}</span><span>${o}</span></button>`;
    }).join('');
    const acertou = feito && r.u === q.c;
    corpo = `${!feito ? `<details class="dica"><summary>💡 Preciso de uma dica</summary><p>${q.dica}</p></details>` : ''}
      <div class="ops">${ops}</div>
      ${!feito ? '' : `<div class="fb ${acertou ? 'sim' : 'nao'}">
        <b>${acertou ? (r.p === q.c ? '🎉 Acertou de primeira!' : '💪 Agora sim! (conta como erro no relatório, mas você aprendeu)') : `😕 Não foi dessa vez. A resposta certa é a <span class="let">${LETRAS[q.c]}</span>.`}</b>
        <div class="exp"><span class="tag">🧑‍🏫 Explicação</span><p>${q.exp}</p></div>
        ${acertou ? '' : `<a class="link" href="#${m}/t/${q.t}">📖 Rever a teoria: ${mod.topicos[q.t]}</a>`}</div>`}`;
  }
  const todas = s.feitas === s.total;
  const temErradas = mod.questoes.some((qq, k) => !qq.aberta && S.r[m][k] && S.r[m][k].u !== undefined && S.r[m][k].u !== qq.c);
  const prox = MODS[MODS.indexOf(m) + 1];
  $('#main').innerHTML = `
    <div class="qnav">${dotsNav}</div>
    <p class="legenda"><i class="ok"></i>acertou <i class="fix"></i>corrigiu / em parte <i class="err"></i>errou <i class="abd"></i>discursiva</p>
    <article class="qcard">
      <div class="qmeta"><span class="qn">Questão ${i + 1}<small>/${mod.questoes.length}</small></span><span><span class="pill ${q.aberta ? 'disc' : ''}">${q.aberta ? '✍️ Discursiva' : q.calc ? '🧮 Cálculo' : 'Objetiva'}</span><span class="pill">${mod.topicos[q.t]}</span></span></div>
      <div class="enun">${q.txt}</div>
      ${corpo}
      <div class="row nav">
        <button class="btn ghost" id="ant" ${i === 0 ? 'disabled' : ''}>← Anterior</button>
        ${i < mod.questoes.length - 1 ? `<button class="btn" id="prox">Próxima →</button>` : `<a class="btn" href="#relatorio">📋 Ver relatório</a>`}
      </div>
    </article>
    ${todas ? `<div class="fim"><b>🏁 Você terminou ${mod.titulo}!</b><p>Objetivas — acertos de 1ª: <b>${s.acertos}/${s.obj}</b> (${s.pct}%).</p>
      <div class="row">${temErradas ? `<button class="btn alt" id="refazer">🔁 Refazer só as objetivas que errei</button>` : ''}${prox ? `<a class="btn alt" href="#${prox}/q">${MODULOS[prox].emoji} Ir para ${MODULOS[prox].titulo}</a>` : ''}<a class="btn" href="#relatorio">📋 Ver e enviar relatório</a></div></div>` : ''}
    <p class="reset"><button class="linkbtn" id="zerar">Apagar respostas de ${mod.titulo} e recomeçar</button></p>`;

  const go = d => { S.pos[m] = i + d; save(); renderQuestao(m); scrollTo({ top: 0, behavior: 'smooth' }); };
  $$('.qd').forEach(b => b.onclick = () => { S.pos[m] = +b.dataset.k; save(); renderQuestao(m); scrollTo({ top: 0, behavior: 'smooth' }); });
  if (q.aberta) {
    const ta = $('#txt');
    ta.oninput = () => { const rr = S.r[m][i] || {}; rr.txt = ta.value; S.r[m][i] = rr; save(); };
    $('#ver') && ($('#ver').onclick = () => {
      if (ta.value.trim().length < 10) { $('#vm').innerHTML = '✍️ Escreva sua resposta primeiro (pelo menos uma frase). Assim você treina para a prova!'; ta.focus(); return; }
      const rr = S.r[m][i] || {}; rr.txt = ta.value; rr.visto = true; S.r[m][i] = rr; save(); renderQuestao(m);
      const f = $('.fb'); f && f.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    $$('[data-av]').forEach(b => b.onclick = () => { const rr = S.r[m][i]; rr.av = +b.dataset.av; save(); renderQuestao(m); if (rr.av === 2) estrelas(); });
  } else {
    $$('.op:not([disabled])').forEach(b => b.onclick = () => {
      const k = +b.dataset.o, rr = S.r[m][i] || {};
      if (rr.p === undefined) rr.p = k;
      rr.u = k; rr.n = (rr.n || 0) + 1; S.r[m][i] = rr; save();
      renderQuestao(m);
      const f = $('.fb'); f && f.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (k === q.c) estrelas();
    });
  }
  $('#ant') && ($('#ant').onclick = () => go(-1));
  $('#prox') && ($('#prox').onclick = () => go(1));
  $('#refazer') && ($('#refazer').onclick = () => {
    let primeira = null;
    mod.questoes.forEach((qq, k) => { const rr = S.r[m][k]; if (!qq.aberta && rr && rr.u !== qq.c) { delete rr.u; if (primeira === null) primeira = k; } });
    S.pos[m] = primeira || 0; save(); renderQuestao(m); scrollTo({ top: 0 });
  });
  $('#zerar').onclick = () => { if (confirm('Apagar todas as respostas de ' + mod.titulo + '?')) { S.r[m] = {}; S.pos[m] = 0; save(); renderQuestao(m); } };
}

function estrelas() {
  const box = document.createElement('div'); box.className = 'estrelas';
  box.innerHTML = Array.from({ length: 14 }, (_, k) => `<i style="--x:${Math.cos(k / 14 * 6.28) * 140}px;--y:${Math.sin(k / 14 * 6.28) * 140}px">${['⭐', '✨', '🌟'][k % 3]}</i>`).join('');
  document.body.appendChild(box); setTimeout(() => box.remove(), 1000);
}

/* ---------------- RELATÓRIO ---------------- */
function textoRelatorio() {
  const d = new Date().toLocaleDateString('pt-BR');
  let t = `*RELATÓRIO DE ESTUDO – ${CONFIG.serieLonga.toUpperCase()}*\nMentoria Educacional Promover · ${CONFIG.area}\n\n👤 Aluno(a): ${S.aluno.nome || '(sem nome)'}\n🏫 Turma: ${S.aluno.turma || '-'}\n📅 Data: ${d}\n`;
  const revisar = [];
  MODS.forEach(m => {
    const mod = MODULOS[m], s = stats(m);
    t += `\n*${mod.emoji} ${mod.titulo} – ${mod.sub}*\n`;
    if (!s.feitas && !s.abertas.some(i => S.r[m][i] && S.r[m][i].txt)) { t += 'Ainda não respondeu.\n'; return; }
    t += `Objetivas: ${s.resp}/${s.obj} respondidas · ✅ ${s.acertos} acertos de 1ª (${s.pct}%)\n`;
    if (s.erros.length) {
      t += `❌ Erros:\n`;
      s.erros.forEach(i => { const q = mod.questoes[i], r = S.r[m][i]; t += `• Q${i + 1} (${mod.topicos[q.t]}): marcou ${LETRAS[r.p]}, certa ${LETRAS[q.c]}${r.u === q.c ? ' – corrigiu depois' : ''}\n`; });
    } else if (s.resp) t += '🎉 Nenhum erro nas objetivas!\n';
    const disc = s.abertas.filter(i => S.r[m][i] && (S.r[m][i].txt || S.r[m][i].av !== undefined));
    if (disc.length) {
      t += `✍️ Discursivas (autoavaliação):\n`;
      disc.forEach(i => { const r = S.r[m][i]; t += `• Q${i + 1}: ${r.av !== undefined ? AVAL[r.av].replace(/^\S+\s/, '') : 'não conferiu'}${r.txt ? ` — "${corta(r.txt.replace(/\s+/g, ' '), 110)}"` : ''}\n`; });
    }
    s.porTopico.forEach((p, k) => { if (p.n && p.ok / p.n < 0.7) revisar.push(`${mod.titulo}: ${mod.topicos[k]}`); });
    s.abertas.forEach(i => { const r = S.r[m][i]; if (r && r.av === 0) { const nome = `${mod.titulo}: ${mod.topicos[mod.questoes[i].t]}`; if (!revisar.includes(nome)) revisar.push(nome); } });
  });
  if (revisar.length) t += `\n📌 *Preciso revisar:*\n${revisar.map(x => '• ' + x).join('\n')}\n`;
  return t;
}

function renderRelatorio() {
  const total = MODS.reduce((a, m) => { const s = stats(m); a.r += s.feitas; a.a += s.acertos; a.t += s.total; return a; }, { r: 0, a: 0, t: 0 });
  const bloco = m => {
    const mod = MODULOS[m], s = stats(m);
    const disc = s.abertas.filter(i => S.r[m][i] && (S.r[m][i].txt || S.r[m][i].av !== undefined));
    if (!s.resp && !disc.length) return `<section class="rbloco ${m}"><h2>${mod.emoji} ${mod.titulo}<small>${mod.sub}</small></h2><p class="vazio">Você ainda não respondeu nenhuma questão. <a href="#${m}/q">Começar agora →</a></p></section>`;
    return `<section class="rbloco ${m}">
      <h2>${mod.emoji} ${mod.titulo}<small>${mod.sub}</small></h2>
      <div class="placar"><div class="nota"><b>${s.acertos}/${s.resp}</b><span>objetivas certas de 1ª</span></div><div class="nota"><b>${s.pct}%</b><span>aproveitamento</span></div><div class="nota"><b>${s.abResp}/${s.ab}</b><span>discursivas conferidas</span></div></div>
      <div class="barras">${mod.topicos.map((t, k) => { const p = s.porTopico[k], pc = p.n ? Math.round(p.ok / p.n * 100) : 0; return `<div class="bt"><span>${t}</span><div class="trilho"><div style="width:${pc}%;background:${!p.n ? '#ccc' : pc >= 70 ? '#2bb673' : pc >= 40 ? '#ffb000' : '#e5484d'}"></div></div><em>${p.n ? `${p.ok}/${p.n}` : '–'}</em>${p.n && pc < 70 ? `<a href="#${m}/t/${k}" class="rev no-print">revisar</a>` : ''}</div>`; }).join('')}</div>
      ${s.erros.length ? `<h3>❌ Objetivas que errei</h3><ol class="erros">${s.erros.map(i => {
        const q = mod.questoes[i], r = S.r[m][i];
        return `<li><div class="eh"><b>Questão ${i + 1}</b><span class="pill">${mod.topicos[q.t]}</span>${r.u === q.c ? '<span class="pill verde">corrigi depois ✔</span>' : ''}</div>
          <p class="eq">${corta(strip(q.txt), 170)}</p>
          <p class="cmp"><span class="m">Marquei: <b>${LETRAS[r.p]}</b> ${q.ops[r.p]}</span><span class="c">Certa: <b>${LETRAS[q.c]}</b> ${q.ops[q.c]}</span></p>
          <details><summary>Ver explicação</summary><p>${q.exp}</p></details></li>`;
      }).join('')}</ol>` : s.resp ? '<p class="parabens">🎉 Nenhum erro nas objetivas respondidas!</p>' : ''}
      ${disc.length ? `<h3>✍️ Minhas discursivas</h3><ol class="erros disc">${disc.map(i => { const q = mod.questoes[i], r = S.r[m][i]; return `<li><div class="eh"><b>Questão ${i + 1}</b><span class="pill">${r.av !== undefined ? AVAL[r.av] : 'não conferiu'}</span></div><p class="eq">${corta(strip(q.txt), 140)}</p>${r.txt ? `<p class="minha">"${esc(r.txt)}"</p>` : ''}<details><summary>Ver resposta-modelo</summary><p>${q.modelo}</p></details></li>`; }).join('')}</ol>` : ''}
    </section>`;
  };
  const txt = textoRelatorio();
  app().innerHTML = header(`<a href="#" class="btn sm ghost">← Início</a>`) + `
    <section class="rel-capa">
      <p class="kicker">Relatório de erros · ${CONFIG.area} · ${CONFIG.serieLonga}</p>
      <h1>${S.aluno.nome ? esc(S.aluno.nome) : 'Aluno(a) sem nome'}</h1>
      <p>${S.aluno.turma ? 'Turma ' + esc(S.aluno.turma) + ' · ' : ''}${new Date().toLocaleDateString('pt-BR')} · ${total.r}/${total.t} questões feitas · ${total.a} acertos de 1ª nas objetivas</p>
      <div class="aluno inline no-print"><label>Nome<input id="nome" value="${esc(S.aluno.nome)}" placeholder="Seu nome"></label><label>Turma<input id="turma" value="${esc(S.aluno.turma)}" placeholder="${CONFIG.serie} A"></label></div>
    </section>
    ${MODS.map(bloco).join('')}
    <section class="enviar no-print">
      <h2>💬 Enviar para o professor</h2>
      <p>O WhatsApp vai abrir com a mensagem pronta para <b>(85) 99262-1003</b>. É só tocar em enviar.</p>
      <pre class="previa">${esc(txt)}</pre>
      <div class="row"><a class="btn whats" id="wpp" href="https://wa.me/${WHATSAPP}?text=${encodeURIComponent(txt)}" target="_blank" rel="noopener">📲 Enviar pelo WhatsApp</a>
      <button class="btn ghost" id="copiar">📋 Copiar texto</button><button class="btn ghost" onclick="print()">🖨️ Imprimir / PDF</button></div>
      <p class="msg" id="cmsg"></p>
    </section>`;
  const upd = () => {
    save();
    const t = textoRelatorio();
    $('.previa').textContent = t;
    $('#wpp').href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t)}`;
    $('.rel-capa h1').textContent = S.aluno.nome || 'Aluno(a) sem nome';
  };
  $('#nome').oninput = e => { S.aluno.nome = e.target.value; upd(); };
  $('#turma').oninput = e => { S.aluno.turma = e.target.value; upd(); };
  $('#wpp').onclick = e => { upd(); if (!S.aluno.nome.trim()) { e.preventDefault(); $('#cmsg').innerHTML = '⚠️ Escreva seu nome lá em cima antes de enviar.'; $('#nome').focus(); } };
  $('#copiar').onclick = () => { navigator.clipboard.writeText(textoRelatorio()).then(() => $('#cmsg').textContent = '✅ Copiado! Cole no WhatsApp.', () => $('#cmsg').textContent = 'Não consegui copiar — selecione o texto acima.'); };
}

/* ---------------- ROTAS ---------------- */
function route() {
  const [mod, tab, arg] = (location.hash.slice(1) || '').split('/');
  if (MODULOS[mod]) renderModulo(mod, tab || 't', arg);
  else if (mod === 'relatorio') renderRelatorio();
  else renderHome();
  if (!(tab === 't' && arg !== undefined)) scrollTo(0, 0);
}
addEventListener('hashchange', route);
route();
