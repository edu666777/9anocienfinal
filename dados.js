/* =========================================================
   CONTEÚDO DO SITE — Mentoria Educacional Promover (9º Ano)
   Biologia (Diversidade biológica) · Química (Funções químicas) · Física (Ondas)
   Objetivas: c = índice da correta (0=A,1=B,2=C,3=D)
   Discursivas: aberta:true + modelo (resposta esperada)
   ========================================================= */
const CONFIG = {
  serie: '9º', serieLonga: '9º Ano', lsKey: 'promover_9ano_bqf_v1', area: 'Biologia, Química e Física',
  kicker: '9º Ano · Material de revisão',
  titulo: 'Biologia, Química e Física: <mark>revisão</mark> completa',
  texto: 'Três matérias num site só: <b>Diversidade biológica</b>, <b>Funções químicas</b> (ácidos, bases, sais e óxidos) e <b>Ondas</b> (som e luz). Estude com desenhos que se mexem, responda às questões objetivas e discursivas e <b>envie seu relatório</b> pelo WhatsApp.'
};

const MODULOS = {
  m1: {
    id: 'm1', titulo: 'Biologia', sub: 'Diversidade biológica', emoji: '🌿',
    topicos: ['O que é biodiversidade', 'Por que ela é importante', 'Brasil e a Caatinga', 'Ameaças à biodiversidade', 'Conservação'],
    resumo: [
      '<b>Biodiversidade</b> = variedade de vida, em 3 níveis: <b>genética</b> (diferenças dentro da mesma espécie), <b>de espécies</b> e <b>de ecossistemas</b>.',
      '<b>Polinizadores</b> (abelhas, borboletas, aves, morcegos) ajudam as plantas a se reproduzir. <b>Decompositores</b> (fungos e bactérias) reciclam nutrientes.',
      'A <b>Caatinga</b> é o único bioma <b>exclusivamente brasileiro</b>. Não é pobre em vida: as espécies têm <b>adaptações</b> à seca (perder folhas, guardar água, espinhos, hábitos noturnos).',
      '<b>Ameaças</b>: desmatamento, queimadas, poluição, caça, tráfico de animais, <b>espécies exóticas invasoras</b>, mudanças climáticas e <b>fragmentação de habitats</b>.',
      '<b>Conservação</b>: unidades de conservação, recuperação de áreas, fiscalização, educação ambiental e <b>desenvolvimento sustentável</b> (usar hoje sem faltar amanhã).'
    ],
    questoes: [
      { t: 0, txt: 'Uma turma observou diferentes <b>variedades de feijão</b> cultivadas em uma mesma comunidade. Apesar de pertencerem à <b>mesma espécie</b>, as plantas apresentavam diferenças no tamanho, na cor e na resistência à falta de água. Essa situação representa principalmente:',
        ops: ['diversidade de ecossistemas.', 'diversidade genética.', 'extinção de espécies.', 'fragmentação de habitats.'], c: 1,
        dica: 'Mesma espécie, mas com diferenças entre os indivíduos. Qual nível é esse?',
        exp: 'Diferenças hereditárias <b>dentro da mesma espécie</b> (todos são feijão) são <b>diversidade genética</b>.' },
      { t: 0, txt: 'Em uma área de <b>manguezal</b> foram identificadas várias espécies de peixes, crustáceos, aves e plantas. A <b>variedade de espécies</b> que vivem nesse local corresponde a:',
        ops: ['diversidade genética.', 'sucessão ecológica.', 'diversidade de espécies.', 'seleção artificial.'], c: 2,
        dica: 'Peixes, caranguejos, aves e plantas são espécies diferentes.',
        exp: 'Muitas <b>espécies diferentes</b> vivendo no mesmo lugar formam a <b>diversidade de espécies</b>.' },
      { t: 0, txt: 'Uma região apresenta <b>florestas, rios, lagoas, campos e áreas alagadas</b>. A variedade desses ambientes naturais é um exemplo de:',
        ops: ['diversidade de ecossistemas.', 'diversidade de indivíduos de uma única espécie.', 'reprodução assexuada.', 'cadeia alimentar simplificada.'], c: 0,
        dica: 'Floresta, rio e lagoa são ambientes diferentes.',
        exp: 'A variedade de <b>ambientes</b> (floresta, rio, lagoa, campo) é a <b>diversidade de ecossistemas</b>.' },
      { t: 1, txt: '<b>Abelhas</b> visitam flores em busca de néctar e, durante esse processo, transportam grãos de pólen entre flores. Essa relação é importante porque:',
        ops: ['impede a reprodução das plantas.', 'elimina a necessidade de água no ambiente.', 'transforma todas as plantas em uma única espécie.', 'contribui para a polinização e a reprodução de muitas plantas.'], c: 3,
        dica: 'Veja a animação da abelha no tópico 2.',
        exp: 'Ao levar o <b>pólen</b> de uma flor para outra, a abelha faz a <b>polinização</b>, e a planta pode formar frutos e sementes (<b>reprodução</b>).' },
      { t: 1, txt: '<b>Fungos e bactérias</b> atuam na decomposição de restos de seres vivos. Uma consequência importante desse processo para o ecossistema é:',
        ops: ['o bloqueio permanente dos ciclos naturais.', 'a reciclagem de nutrientes no ambiente.', 'a produção de plástico natural.', 'a interrupção da formação do solo.'], c: 1,
        dica: 'Para onde vão os nutrientes da folha que caiu e apodreceu?',
        exp: 'Os <b>decompositores</b> transformam restos de seres vivos em nutrientes que voltam ao solo e são usados pelas plantas: é a <b>reciclagem de nutrientes</b>.' },
      { t: 2, txt: 'O Brasil possui diferentes biomas, cada um com características próprias. Assinale a alternativa que apresenta um bioma <b>exclusivamente brasileiro</b>:',
        ops: ['Amazônia.', 'Pantanal.', 'Caatinga.', 'Pampa.'], c: 2,
        dica: 'A Amazônia, o Pantanal e o Pampa passam por outros países.',
        exp: 'A <b>Caatinga</b> só existe no Brasil (Nordeste). A Amazônia, o Pantanal e o Pampa também ocupam áreas de países vizinhos.' },
      { t: 2, txt: 'Durante o período de estiagem, algumas plantas da <b>Caatinga perdem suas folhas</b>, reduzindo a perda de água. Essa característica é considerada:',
        ops: ['uma adaptação às condições ambientais.', 'uma prova de que o bioma não possui biodiversidade.', 'um exemplo de poluição atmosférica.', 'uma forma de extinguir outras espécies.'], c: 0,
        dica: 'Use o botão "seca / chuva" no tópico 3.',
        exp: 'Perder as folhas na seca diminui a perda de água: é uma <b>adaptação</b> ao clima semiárido. Quando chove, a planta brota de novo.' },
      { t: 3, txt: 'A retirada da vegetação nativa para ampliar áreas de cultivo, <b>sem planejamento</b> e recuperação ambiental, pode provocar:',
        ops: ['aumento garantido da diversidade genética.', 'recuperação imediata de todos os habitats.', 'desaparecimento de todas as espécies invasoras.', 'perda e fragmentação de habitats.'], c: 3,
        dica: 'Faça a simulação da fragmentação no tópico 4.',
        exp: 'O desmatamento destrói o lugar onde os seres vivem (<b>perda de habitat</b>) e divide a mata em "ilhas" isoladas (<b>fragmentação</b>).' },
      { t: 3, txt: 'Uma espécie de animal silvestre é capturada e comercializada ilegalmente. Essa prática ameaça a biodiversidade porque:',
        ops: ['aumenta a reprodução natural em todos os ambientes.', 'pode reduzir populações e comprometer o equilíbrio ecológico.', 'melhora a qualidade da água dos rios.', 'impede a ocorrência de mudanças climáticas.'], c: 1,
        dica: 'O que acontece com a população se muitos animais são retirados da natureza?',
        exp: 'O <b>tráfico</b> retira animais da natureza: as <b>populações diminuem</b> e o <b>equilíbrio</b> das cadeias alimentares é afetado.' },
      { t: 3, txt: 'Quando uma espécie exótica é introduzida em um ambiente e passa a se espalhar, <b>prejudicando espécies nativas</b>, ela pode ser classificada como:',
        ops: ['espécie polinizadora obrigatória.', 'espécie endêmica protegida.', 'espécie exótica invasora.', 'decompositora nativa.'], c: 2,
        dica: 'Exótica = veio de fora. Se espalha e prejudica = ?',
        exp: 'Uma espécie de <b>fora</b> (exótica) que se <b>espalha e prejudica</b> as nativas é uma <b>espécie exótica invasora</b>.' },
      { t: 4, txt: 'A criação de unidades de conservação, a recuperação de áreas degradadas e a fiscalização ambiental são medidas que têm como objetivo principal:',
        ops: ['proteger espécies, habitats e processos ecológicos.', 'estimular a retirada de toda a vegetação nativa.', 'substituir os ambientes naturais por áreas urbanas.', 'eliminar a pesquisa científica.'], c: 0,
        dica: 'Conservar = proteger.',
        exp: 'Essas medidas servem para <b>proteger</b> as espécies, os lugares onde elas vivem (habitats) e os processos da natureza.' },
      { t: 3, txt: 'Em uma comunidade, moradores passaram a <b>descartar lixo em um riacho</b>. Com o tempo, houve diminuição de peixes e outros organismos aquáticos. A situação demonstra que:',
        ops: ['a poluição não interfere nos seres vivos.', 'somente os animais terrestres são afetados pelo lixo.', 'a biodiversidade aumenta sempre que há resíduos na água.', 'a poluição pode alterar as condições do habitat e reduzir a biodiversidade.'], c: 3,
        dica: 'Os peixes diminuíram depois do lixo…',
        exp: 'O lixo muda as condições da água (menos oxigênio, substâncias tóxicas), o <b>habitat</b> piora e a <b>biodiversidade diminui</b>.' },
      { t: 3, txt: 'A <b>variabilidade genética</b> é importante para as populações porque:',
        ops: ['impede qualquer mudança evolutiva.', 'garante que todos os indivíduos sejam idênticos.', 'pode favorecer a adaptação das populações diante de mudanças ambientais.', 'elimina a competição entre todos os seres vivos.'], c: 2,
        dica: 'Se o ambiente muda, é melhor todos serem iguais ou diferentes?',
        exp: 'Com indivíduos <b>diferentes</b>, é mais provável que alguns resistam a uma mudança (seca, doença) e a população <b>se adapte</b>. Pouca variedade aumenta o risco de extinção.' },
      { t: 4, txt: 'Uma escola organiza o plantio de espécies nativas, a coleta seletiva e campanhas para evitar a captura de animais silvestres. Essas ações são exemplos de:',
        ops: ['exploração predatória dos recursos naturais.', 'participação comunitária na conservação da biodiversidade.', 'fragmentação de ecossistemas.', 'introdução de espécies invasoras.'], c: 1,
        dica: 'São ações boas ou ruins para a natureza?',
        exp: 'São ações da <b>comunidade escolar</b> para <b>proteger</b> a biodiversidade: participação comunitária na conservação.' },
      { t: 4, txt: 'O <b>desenvolvimento sustentável</b> busca:',
        ops: ['atender às necessidades atuais considerando a conservação dos recursos para o futuro.', 'utilizar todos os recursos naturais no menor tempo possível.', 'priorizar somente o crescimento econômico, sem considerar impactos.', 'impedir qualquer atividade humana em todos os ambientes.'], c: 0,
        dica: 'Sustentável = que se sustenta, que dura.',
        exp: 'É usar os recursos <b>hoje</b> de forma planejada, para que eles <b>continuem existindo no futuro</b>. Une ambiente, sociedade e economia.' },
      { t: 0, aberta: true, txt: 'Explique, com suas palavras, a diferença entre <b>diversidade genética</b>, <b>diversidade de espécies</b> e <b>diversidade de ecossistemas</b>.',
        dica: 'Pense no exemplo do feijão, do manguezal e da região com floresta, rio e lagoa.',
        modelo: '<b>Genética</b>: diferenças entre indivíduos da <b>mesma espécie</b> (feijões de cores e tamanhos diferentes). <b>De espécies</b>: a variedade de <b>espécies diferentes</b> num lugar (peixes, caranguejos e aves no mangue). <b>De ecossistemas</b>: a variedade de <b>ambientes</b> (florestas, rios, manguezais, Caatinga).' },
      { t: 1, aberta: true, txt: 'Cite <b>duas formas</b> pelas quais a biodiversidade contribui para a vida humana e explique uma delas.',
        dica: 'Alimentos, remédios, matéria-prima, água, clima, polinização…',
        modelo: 'Exemplos: <b>alimentos</b>, <b>medicamentos</b>, <b>matérias-primas</b> (madeira, fibras), <b>regulação do clima</b>, <b>proteção das nascentes</b>, <b>polinização</b>. Explicação (exemplo): muitas plantas que comemos só produzem frutos porque abelhas e outros <b>polinizadores</b> levam o pólen de uma flor para outra.' },
      { t: 3, aberta: true, txt: 'Escolha uma <b>ameaça à biodiversidade</b> presente nos textos. Explique como ela pode afetar os seres vivos e seus habitats.',
        dica: 'Desmatamento, queimadas, poluição, tráfico, espécies invasoras, fragmentação…',
        modelo: 'Exemplo: o <b>desmatamento</b> destrói o habitat. Os animais perdem abrigo e alimento, as populações diminuem, e a mata que sobra fica dividida em fragmentos isolados (<b>fragmentação</b>). Assim os animais não conseguem se deslocar e se reproduzir com outros grupos, e o risco de <b>extinção local</b> aumenta.' },
      { t: 2, aberta: true, txt: 'Por que é <b>incorreto</b> afirmar que a Caatinga é um bioma pobre em vida? Apresente pelo menos duas características que justificam sua importância.',
        dica: 'Exclusiva do Brasil + adaptações das plantas e dos animais.',
        modelo: 'Porque a Caatinga tem <b>muitas espécies</b>, várias delas <b>só existem lá</b>, e é um bioma <b>exclusivamente brasileiro</b>. Suas espécies têm <b>adaptações à seca</b>: plantas que perdem as folhas, guardam água (como o mandacaru) ou têm espinhos, e animais com hábitos noturnos. A paisagem seca engana: na chuva tudo fica verde.' },
      { t: 4, aberta: true, txt: 'Indique <b>três ações</b> que a escola ou a comunidade pode realizar para contribuir com a conservação da biodiversidade.',
        dica: 'Veja o jogo "Ajuda ou ameaça?" no tópico 5.',
        modelo: 'Exemplos: <b>plantio de espécies nativas</b>; <b>coleta seletiva</b> e descarte correto do lixo; <b>economizar água</b>; campanhas contra a <b>captura e o tráfico de animais</b>; recuperação de espaços verdes; projetos de observação da fauna e da flora; reduzir o desperdício.' }
    ]
  },

  m2: {
    id: 'm2', titulo: 'Química', sub: 'Funções químicas: ácidos, bases, sais e óxidos', emoji: '⚗️',
    topicos: ['Química no cotidiano e o pH', 'Ácidos', 'Bases e neutralização', 'Sais', 'Óxidos e segurança'],
    resumo: [
      '<b>Ácidos</b> liberam <b>H⁺</b> em água (Arrhenius), pH <b>&lt; 7</b>, sabor azedo. Ex.: HCl (suco gástrico), ácido cítrico (limão), acético (vinagre).',
      '<b>Bases</b> liberam <b>OH⁻</b> em água, pH <b>&gt; 7</b>. Ex.: NaOH (soda cáustica, sabão), Ca(OH)₂ (corrige solo ácido), Mg(OH)₂ (antiácido).',
      '<b>Neutralização</b>: ácido + base → <b>sal + água</b>. Ex.: HCl + NaOH → NaCl + H₂O.',
      '<b>Sais</b> são compostos <b>iônicos</b> (íons + e −): NaCl, NaHCO₃ (bicarbonato), CaCO₃.',
      '<b>Óxidos</b>: compostos <b>binários</b> com <b>oxigênio</b> (CO₂, H₂O, CaO, SO₂). SO₂ e NOₓ + água → <b>chuva ácida</b>. <b>Nunca misture produtos de limpeza!</b>'
    ],
    questoes: [
      { t: 1, txt: 'Durante o preparo de uma salada, Júlia colocou algumas gotas de <b>limão</b> sobre as folhas. O sabor azedo está relacionado à presença de ácido cítrico. Considerando as propriedades dos ácidos, é correto afirmar que:',
        ops: ['todo ácido apresenta pH maior que 7.', 'ácidos, em solução aquosa, liberam íons H⁺, segundo Arrhenius.', 'ácidos são formados obrigatoriamente por metal e oxigênio.', 'toda substância azeda pode ser manipulada sem cuidado.'], c: 1,
        dica: 'Veja a animação "o que acontece na água" no tópico 2.',
        exp: 'Segundo <b>Arrhenius</b>, ácido é a substância que, na água, <b>libera íons H⁺</b>. Os ácidos têm pH <b>menor</b> que 7, e muitos são perigosos.' },
      { t: 0, txt: 'Em uma aula prática, a turma analisou três amostras com papel indicador universal. A amostra <b>X</b> apresentou <b>pH 3</b>, a amostra <b>Y</b> apresentou <b>pH 7</b> e a amostra <b>Z</b> apresentou <b>pH 10</b>. A classificação correta é:',
        ops: ['X básica, Y ácida e Z neutra.', 'X neutra, Y básica e Z ácida.', 'X ácida, Y neutra e Z básica.', 'as três amostras são neutras.'], c: 2,
        dica: 'Use a régua de pH: abaixo de 7, igual a 7, acima de 7.',
        exp: 'pH <b>&lt; 7 = ácido</b> (X, pH 3); pH <b>= 7 = neutro</b> (Y); pH <b>&gt; 7 = básico</b> (Z, pH 10).' },
      { t: 2, txt: 'Um agricultor recebeu orientação técnica para utilizar uma substância <b>básica</b> na correção da acidez de determinado solo. Uma substância que pertence à função <b>base</b> é:',
        ops: ['hidróxido de cálcio [Ca(OH)₂].', 'dióxido de carbono (CO₂).', 'ácido clorídrico (HCl).', 'cloreto de sódio (NaCl).'], c: 0,
        dica: 'Base tem OH na fórmula (hidróxido).',
        exp: '<b>Hidróxido</b> de cálcio, Ca(OH)₂, tem <b>OH</b> e libera OH⁻ na água: é uma <b>base</b>. CO₂ é óxido, HCl é ácido e NaCl é sal.' },
      { t: 2, txt: 'Em uma indústria, o <b>hidróxido de sódio</b> é utilizado na fabricação de sabões. Apesar de sua aplicação, essa substância requer cuidados porque:',
        ops: ['é sempre própria para consumo humano.', 'não apresenta reatividade química.', 'é um sal utilizado para temperar alimentos.', 'é uma base forte e pode causar queimaduras químicas.'], c: 3,
        dica: 'NaOH é a "soda cáustica".',
        exp: 'O NaOH (<b>soda cáustica</b>) é uma <b>base forte</b>, muito corrosiva: pode causar <b>queimaduras químicas</b> na pele e nos olhos.' },
      { t: 2, txt: 'Após uma atividade sobre <b>neutralização</b>, os estudantes observaram a reação entre um ácido e uma base. Em uma neutralização típica, os produtos formados são:',
        ops: ['apenas gás oxigênio.', 'água e sal.', 'somente um ácido mais forte.', 'metal e gás hidrogênio em todos os casos.'], c: 1,
        dica: 'Monte a neutralização no tópico 3: H⁺ + OH⁻ = ?',
        exp: 'Ácido + base → <b>sal + água</b>. O H⁺ do ácido se junta ao OH⁻ da base formando <b>H₂O</b>, e os íons que sobram formam o <b>sal</b>.' },
      { t: 3, txt: 'O <b>cloreto de sódio</b> é utilizado diariamente na alimentação e também em processos de conservação. Sua classificação como sal está relacionada ao fato de ser:',
        ops: ['um ácido que libera H⁺ em água.', 'uma base que libera OH⁻ em água.', 'um composto iônico formado por íons positivos e negativos.', 'um óxido constituído por oxigênio e sódio.'], c: 2,
        dica: 'NaCl = Na⁺ + Cl⁻.',
        exp: 'O NaCl é formado pelo íon <b>positivo</b> Na⁺ e pelo íon <b>negativo</b> Cl⁻: é um <b>composto iônico</b>, ou seja, um <b>sal</b>.' },
      { t: 3, txt: 'O <b>bicarbonato de sódio</b> é utilizado em algumas receitas para ajudar a massa a crescer. Quimicamente, o NaHCO₃ é classificado como:',
        ops: ['sal.', 'ácido.', 'base.', 'óxido.'], c: 0,
        dica: 'Está na lista de exemplos de sais do material.',
        exp: 'O <b>NaHCO₃</b> (bicarbonato de sódio) é um <b>sal</b>, formado pelos íons Na⁺ e HCO₃⁻.' },
      { t: 4, txt: 'Em uma reportagem sobre mudanças climáticas, foi explicado que a queima de combustíveis fósseis libera dióxido de carbono. O <b>CO₂</b> pertence à função dos óxidos porque:',
        ops: ['libera íons OH⁻ em solução aquosa.', 'é formado por três elementos químicos diferentes.', 'é um ácido que contém hidrogênio na fórmula.', 'é um composto binário formado por carbono e oxigênio.'], c: 3,
        dica: 'Binário = 2 elementos. Quais são os elementos do CO₂?',
        exp: 'Óxido é um composto <b>binário</b> (2 elementos) em que um deles é o <b>oxigênio</b>. CO₂ = <b>carbono + oxigênio</b>.' },
      { t: 4, txt: 'Em regiões com grande circulação de veículos e atividade industrial, determinados gases podem contribuir para a <b>chuva ácida</b>. Entre eles estão óxidos de enxofre e de nitrogênio, que:',
        ops: ['impedem qualquer reação com a água da atmosfera.', 'podem reagir com a água e formar substâncias de caráter ácido.', 'transformam-se sempre em sais de cozinha.', 'são bases que neutralizam toda a acidez da chuva.'], c: 1,
        dica: 'Veja a animação da chuva ácida no tópico 5.',
        exp: 'O SO₂ e os óxidos de nitrogênio <b>reagem com a água</b> das nuvens e formam <b>ácidos</b>, que caem como <b>chuva ácida</b>.' },
      { t: 4, txt: 'Durante uma campanha de educação ambiental, os alunos discutiram o uso de produtos de limpeza. Um estudante sugeriu <b>misturar água sanitária</b> com outros produtos para aumentar sua eficiência. A orientação mais segura é:',
        ops: ['misturar livremente, pois produtos domésticos não reagem entre si.', 'acrescentar vinagre para tornar a mistura mais potente.', 'não misturar produtos de limpeza e seguir as instruções do rótulo.', 'utilizar qualquer mistura em ambiente fechado.'], c: 2,
        dica: 'Segurança em primeiro lugar!',
        exp: '<b>Nunca misture</b> produtos de limpeza: algumas misturas (como água sanitária + vinagre ou amônia) liberam <b>gases tóxicos</b>. Siga sempre o <b>rótulo</b>.' },
      { t: 2, txt: 'Uma pessoa utilizou um <b>antiácido</b> que contém hidróxido de magnésio para aliviar a acidez estomacal. A ação desse produto está associada à:',
        ops: ['neutralização de parte do excesso de ácido no estômago.', 'produção de mais ácido clorídrico.', 'transformação de toda a água do organismo em sal.', 'liberação de dióxido de carbono pela função óxido.'], c: 0,
        dica: 'Base + ácido do estômago (HCl) = ?',
        exp: 'O Mg(OH)₂ é uma <b>base</b> que reage com parte do HCl do estômago: é uma <b>neutralização</b>, que diminui a acidez.' },
      { t: 0, txt: 'Em uma atividade de classificação, os alunos receberam as fórmulas <b>HCl, NaOH, NaCl e CO₂</b>. A sequência correta das funções químicas, nessa ordem, é:',
        ops: ['base, ácido, óxido e sal.', 'sal, óxido, base e ácido.', 'óxido, sal, ácido e base.', 'ácido, base, sal e óxido.'], c: 3,
        dica: 'Jogue "Qual é a função?" no tópico 1.',
        exp: '<b>HCl</b> = ácido (libera H⁺); <b>NaOH</b> = base (OH); <b>NaCl</b> = sal (iônico); <b>CO₂</b> = óxido (binário com O).' },
      { t: 0, aberta: true, txt: 'Explique, com um exemplo do cotidiano, a diferença entre um <b>ácido</b> e uma <b>base</b>.',
        dica: 'Pense no H⁺, no OH⁻, no pH e em exemplos da cozinha e da limpeza.',
        modelo: '<b>Ácido</b> libera <b>H⁺</b> na água, tem pH <b>menor que 7</b> e sabor azedo. Ex.: o <b>limão</b> (ácido cítrico) e o <b>vinagre</b> (ácido acético). <b>Base</b> libera <b>OH⁻</b> na água e tem pH <b>maior que 7</b>. Ex.: a <b>soda cáustica</b> (NaOH), usada para fazer sabão, e o <b>antiácido</b> (Mg(OH)₂).' },
      { t: 2, aberta: true, txt: 'O que é uma <b>reação de neutralização</b>? Cite os produtos normalmente formados.',
        dica: 'Ácido + base → ?',
        modelo: 'É a reação entre um <b>ácido</b> e uma <b>base</b>, em que o H⁺ do ácido reage com o OH⁻ da base. Normalmente formam-se <b>sal e água</b>. Ex.: HCl + NaOH → NaCl + H₂O. (O antiácido no estômago é um exemplo.)' },
      { t: 4, aberta: true, txt: 'Escolha um <b>óxido</b> estudado no material e explique uma situação em que ele pode estar relacionado ao ambiente ou à vida cotidiana.',
        dica: 'CO₂, SO₂, CaO, H₂O…',
        modelo: 'Exemplo: o <b>CO₂</b> (dióxido de carbono) é liberado na <b>queima de combustíveis</b> e intensifica o <b>efeito estufa</b>, contribuindo para as mudanças climáticas. Outros: <b>SO₂</b> → chuva ácida; <b>CaO</b> (cal virgem) → construção e correção do solo; <b>H₂O</b> → a água.' },
      { t: 4, aberta: true, txt: 'Por que não devemos <b>misturar produtos de limpeza</b> sem conhecer sua composição e as orientações do fabricante?',
        dica: 'O que pode surgir de uma reação química inesperada?',
        modelo: 'Porque os produtos podem <b>reagir entre si</b> e formar <b>substâncias perigosas</b>, como <b>gases tóxicos</b> (ex.: água sanitária + vinagre ou amônia), que causam intoxicação, irritação nos olhos e na respiração, ou queimaduras. Por isso devemos seguir o <b>rótulo</b> e usar em local ventilado.' }
    ]
  },

  m3: {
    id: 'm3', titulo: 'Física', sub: 'Ondas: som e luz', emoji: '🌊',
    topicos: ['O que são ondas e classificação', 'Elementos e fórmulas', 'O som', 'Luz e ondas eletromagnéticas', 'Fenômenos ondulatórios'],
    resumo: [
      '<b>Onda</b> = perturbação que transporta <b>energia</b> <b>sem transportar matéria</b>.',
      '<b>Mecânicas</b> precisam de meio material e não passam no vácuo (som). <b>Eletromagnéticas</b> passam no vácuo (luz, rádio, micro-ondas, raio X).',
      '<b>Transversal</b>: vibra perpendicular à propagação (corda). <b>Longitudinal</b>: vibra na mesma direção (som no ar).',
      '<b>λ</b> = distância entre 2 cristas · <b>amplitude</b> = altura (intensidade) · <b>f</b> em <b>hertz</b> · <b>v = λ · f</b> · <b>T = 1/f</b> · <b>f = n/Δt</b>.',
      'Som: <b>altura</b> = frequência (grave/agudo), <b>intensidade</b> = amplitude (forte/fraco), <b>timbre</b> = diferencia instrumentos. Fenômenos: <b>reflexão</b> (eco), <b>refração</b> (lápis torto), <b>difração</b> (ouvir atrás da parede), <b>interferência</b>, <b>ressonância</b>.'
    ],
    questoes: [
      { t: 0, txt: 'Durante uma aula de Física, o professor explicou que as ondas estão presentes em diversas situações do cotidiano, como nas transmissões de rádio, nas ligações telefônicas e na propagação do som. Ele destacou que uma das principais características das ondas é transportar <b>energia</b> de um ponto a outro. Com base nessa informação, podemos afirmar que uma onda é:',
        ops: ['Um movimento que transporta matéria permanentemente de um lugar para outro.', 'Uma perturbação que se propaga transportando energia, sem transportar matéria de forma permanente.', 'Um fenômeno que acontece exclusivamente em ambientes aquáticos.', 'Um movimento que não apresenta relação com a transferência de energia.'], c: 1,
        dica: 'Veja a boia na animação do tópico 1: ela vai embora com a onda?',
        exp: 'A onda leva <b>energia</b>, mas a matéria só <b>oscila no lugar</b> (a boia sobe e desce, mas não vai embora). Onda = perturbação que transporta energia <b>sem transportar matéria</b>.' },
      { t: 0, txt: 'Durante uma atividade experimental, um estudante movimentou uma <b>corda para cima e para baixo</b>, produzindo ondas que se deslocavam ao longo dela. O professor explicou que esse tipo de onda apresenta vibração <b>perpendicular</b> à direção de propagação. Esse tipo de onda é classificado como:',
        ops: ['Longitudinal.', 'Eletromagnética.', 'Sonora.', 'Transversal.'], c: 3,
        dica: 'Compare corda × mola no tópico 1.',
        exp: 'Vibração <b>perpendicular</b> (sobe e desce) enquanto a onda anda para o lado = onda <b>transversal</b>.' },
      { t: 3, txt: 'Uma pessoa utiliza o celular diariamente para realizar ligações e acessar a internet. Para que essas informações sejam transmitidas, são utilizadas ondas eletromagnéticas, que conseguem se propagar mesmo na ausência de matéria. As <b>ondas eletromagnéticas</b> são aquelas que:',
        ops: ['Precisam obrigatoriamente do ar para se propagar.', 'Só conseguem se propagar em ambientes aquáticos.', 'Podem se propagar no vácuo, sem necessidade de um meio material.', 'Transportam matéria durante sua propagação.'], c: 2,
        dica: 'A luz do Sol chega à Terra atravessando o espaço vazio.',
        exp: 'Ondas <b>eletromagnéticas</b> não precisam de meio material: viajam até no <b>vácuo</b> (é assim que a luz do Sol e o sinal dos satélites chegam até nós).' },
      { t: 2, txt: 'Em uma apresentação musical, dois instrumentos podem produzir a <b>mesma nota musical</b>, com a mesma frequência, mas ainda assim apresentar sons diferentes. A característica responsável por permitir a diferenciação dos sons de diferentes instrumentos é:',
        ops: ['Timbre.', 'Frequência.', 'Velocidade.', 'Comprimento de onda.'], c: 0,
        dica: 'Toque os três "instrumentos" no tópico 3.',
        exp: 'O <b>timbre</b> é o "formato" da onda de cada instrumento. Por ele diferenciamos um <b>violão</b> de um <b>piano</b> tocando a mesma nota.' },
      { t: 1, txt: 'Em uma experiência, um estudante observou ondas produzidas na superfície da água. Ele percebeu que a <b>distância entre duas cristas consecutivas</b> correspondia a 4 metros. Essa distância recebe o nome de:',
        ops: ['Amplitude.', 'Frequência.', 'Período.', 'Comprimento de onda.'], c: 3,
        dica: 'Veja o desenho com os elementos da onda.',
        exp: 'A distância entre <b>duas cristas</b> (ou dois vales) consecutivas é o <b>comprimento de onda (λ)</b>.' },
      { t: 1, txt: 'Uma emissora de rádio transmite informações por meio de ondas eletromagnéticas. A <b>unidade</b> utilizada para medir a <b>frequência</b> de uma onda é:',
        ops: ['Metro.', 'Hertz.', 'Segundo.', 'Newton.'], c: 1,
        dica: 'A rádio FM 98,5 MHz… o "Hz" é de quê?',
        exp: 'Frequência se mede em <b>hertz (Hz)</b> = oscilações por segundo. (Metro é para λ, segundo é para o período.)' },
      { t: 1, txt: 'Durante uma atividade prática, uma onda apresentou <b>frequência de 5 Hz</b> e <b>comprimento de onda de 3 metros</b>. Utilizando a fórmula <b>v = λ · f</b>, qual é a velocidade dessa onda?',
        ops: ['8 m/s.', '10 m/s.', '15 m/s.', '20 m/s.'], c: 2,
        dica: 'Multiplique (não some!).',
        exp: 'v = λ · f = 3 × 5 = <b>15 m/s</b>. (Somar 3 + 5 = 8 é um erro comum.)' },
      { t: 4, txt: 'Ao gritar em frente a uma montanha, uma pessoa ouviu novamente sua própria voz alguns instantes depois. Esse fenômeno acontece porque as ondas sonoras encontram uma superfície e <b>retornam</b> ao ambiente de origem. O fenômeno descrito é chamado de:',
        ops: ['Reflexão.', 'Refração.', 'Difração.', 'Interferência.'], c: 0,
        dica: 'Eco = som que bate e volta.',
        exp: 'O <b>eco</b> é a <b>reflexão</b> do som: a onda bate na montanha e volta.' },
      { t: 4, txt: 'Uma pessoa coloca um <b>lápis dentro de um copo</b> transparente com água e observa que ele parece estar quebrado ou torto na região em que entra no líquido. Esse fenômeno acontece devido à mudança de velocidade e de direção da luz ao passar de um meio para outro. Ele recebe o nome de:',
        ops: ['Reflexão.', 'Difração.', 'Interferência.', 'Refração.'], c: 3,
        dica: 'Mudou de meio (ar → água) = ?',
        exp: 'Ao passar do ar para a água, a luz <b>muda de velocidade e de direção</b>: é a <b>refração</b>.' },
      { t: 4, txt: 'Em uma casa, uma pessoa consegue ouvir a conversa de familiares que estão em <b>outro cômodo</b>, mesmo sem enxergá-los. Isso acontece porque as ondas sonoras conseguem <b>contornar obstáculos</b> e atravessar determinadas aberturas. O fenômeno ondulatório responsável é:',
        ops: ['Refração.', 'Difração.', 'Reflexão.', 'Ressonância.'], c: 1,
        dica: 'Veja a onda passando pela porta no tópico 5.',
        exp: '<b>Difração</b>: a onda <b>contorna obstáculos</b> e se espalha depois de passar por aberturas (como uma porta).' },
      { t: 2, txt: 'Quando uma pessoa está <b>no espaço</b>, fora de uma nave espacial, não consegue ouvir diretamente os sons produzidos ao seu redor. Isso acontece porque:',
        ops: ['o som não possui energia suficiente para se propagar.', 'O som é uma onda eletromagnética.', 'O som precisa de um meio material para se propagar e o espaço apresenta condições próximas do vácuo.', 'O som só consegue se propagar em ambientes com água.'], c: 2,
        dica: 'O som é mecânico ou eletromagnético?',
        exp: 'O som é uma onda <b>mecânica</b>: precisa de <b>matéria</b> (ar, água, sólidos) para vibrar. No espaço há praticamente <b>vácuo</b>, então o som não se propaga.' },
      { t: 2, txt: 'Um aparelho de <b>ultrassom</b> utiliza ondas sonoras de alta frequência para produzir imagens do interior do corpo humano. O ultrassom é um exemplo de:',
        ops: ['Onda eletromagnética que se propaga no vácuo.', 'Onda mecânica que apresenta frequência acima da faixa audível pelos seres humanos.', 'Onda luminosa que não necessita de matéria para se propagar.', 'Onda que transporta matéria pelo interior do organismo.'], c: 1,
        dica: 'Ultra = além. Além do que conseguimos ouvir.',
        exp: 'O ultrassom é <b>som</b> (onda <b>mecânica</b>) com frequência <b>acima de 20 000 Hz</b>, que o ouvido humano não escuta.' },
      { t: 1, txt: 'Uma onda apresenta <b>frequência de 10 Hz</b>. Considerando a relação entre período e frequência, qual é o <b>período</b> dessa onda?<br><small>(Na folha, esta questão aparece com o número 11 repetido.)</small>',
        ops: ['0,1 segundo.', '1 segundo.', '10 segundos.', '100 segundos.'], c: 0,
        dica: 'T = 1 / f.',
        exp: 'T = 1 / f = 1 / 10 = <b>0,1 s</b>. Ela faz 10 oscilações por segundo, então cada uma dura um décimo de segundo.' },
      { t: 2, txt: 'A <b>intensidade sonora</b> está relacionada à amplitude da onda. Quando aumentamos o volume de um aparelho de som, percebemos que o som fica mais intenso. Em relação à <b>amplitude</b> de uma onda sonora, podemos afirmar que:',
        ops: ['Está relacionada exclusivamente ao timbre.', 'Determina se o som é grave ou agudo.', 'Não apresenta relação com a energia transportada.', 'Está relacionada à intensidade sonora, sendo maior em sons mais intensos.'], c: 3,
        dica: 'Aumente o volume no simulador de som e veja a onda.',
        exp: 'Mais <b>amplitude</b> = mais <b>energia</b> = som mais <b>forte (intenso)</b>. Quem define grave/agudo é a <b>frequência</b>.' },
      { t: 3, txt: 'As ondas eletromagnéticas são utilizadas em diferentes áreas. Na medicina, os <b>raios X</b> são empregados na obtenção de imagens dos ossos, enquanto as <b>micro-ondas</b> são utilizadas em comunicação e em aparelhos domésticos. Sobre essas ondas, é correto afirmar que:',
        ops: ['Todas precisam de água para se propagar.', 'São ondas mecânicas e não conseguem viajar no vácuo.', 'São ondas eletromagnéticas e podem se propagar no vácuo.', 'Transportam partículas de matéria durante sua propagação.'], c: 2,
        dica: 'Ache os raios X e as micro-ondas no espectro do tópico 4.',
        exp: 'Raios X e micro-ondas fazem parte do <b>espectro eletromagnético</b>: são ondas <b>eletromagnéticas</b> e se propagam no <b>vácuo</b>.' },
      { t: 1, calc: true, txt: 'Uma onda apresenta <b>comprimento de onda de 5 metros</b> e <b>frequência de 4 Hz</b>. Utilizando a fórmula <b>v = λ · f</b>, calcule sua velocidade de propagação.<br><small>(Na folha é para resolver por extenso; aqui, escolha o resultado.)</small>',
        ops: ['9 m/s.', '1,25 m/s.', '20 m/s.', '0,8 m/s.'], c: 2,
        dica: 'v = 5 × 4.',
        exp: 'v = λ · f = 5 × 4 = <b>20 m/s</b>.' },
      { t: 1, calc: true, txt: 'Uma onda realiza <b>20 oscilações em 4 segundos</b>. a) Qual é a <b>frequência</b>? b) Qual é o <b>período</b>?<br><small>(Escolha a alternativa com os dois resultados.)</small>',
        ops: ['f = 80 Hz e T = 0,0125 s.', 'f = 5 Hz e T = 0,2 s.', 'f = 0,2 Hz e T = 5 s.', 'f = 24 Hz e T = 16 s.'], c: 1,
        dica: 'f = n / Δt, depois T = 1 / f.',
        exp: 'a) f = n / Δt = 20 / 4 = <b>5 Hz</b>. b) T = 1 / f = 1 / 5 = <b>0,2 s</b>.' },
      { t: 0, aberta: true, txt: 'Explique, com suas palavras, a diferença entre <b>ondas mecânicas</b> e <b>ondas eletromagnéticas</b>. Apresente um exemplo de cada uma.',
        dica: 'Quem precisa de meio material? Quem passa no vácuo?',
        modelo: '<b>Mecânicas</b> precisam de um <b>meio material</b> (ar, água, sólido) e <b>não</b> se propagam no vácuo. Ex.: o <b>som</b>, as ondas na água, a onda na corda. <b>Eletromagnéticas</b> <b>não</b> precisam de meio material e se propagam <b>no vácuo</b>. Ex.: a <b>luz</b>, as ondas de rádio, as micro-ondas e o raio X.' },
      { t: 4, aberta: true, txt: 'Explique por que conseguimos <b>ouvir uma pessoa falando atrás de uma parede</b> ou em outro cômodo, mesmo sem conseguir enxergá-la.',
        dica: 'Nome do fenômeno + o que a onda faz.',
        modelo: 'Por causa da <b>difração</b>: as ondas sonoras conseguem <b>contornar obstáculos</b> e se espalhar ao passar por aberturas (portas, janelas). O som tem comprimento de onda grande, parecido com o tamanho de portas e paredes, por isso contorna bem. A luz tem λ muito pequeno e quase não contorna, então não vemos a pessoa.' },
      { t: 3, aberta: true, txt: 'As ondas estão presentes em diversas tecnologias (celulares, rádios, televisores, equipamentos médicos e sistemas de comunicação). Explique a <b>importância do conhecimento sobre as ondas</b> para o desenvolvimento científico e tecnológico.',
        dica: 'Comunicação, medicina, cotidiano…',
        modelo: 'Conhecer as ondas permitiu criar tecnologias de <b>comunicação</b> (rádio, TV, celular, internet, satélites), de <b>medicina</b> (raio X, ultrassom, ressonância) e do <b>cotidiano</b> (micro-ondas, controle remoto). Entendendo frequência, comprimento de onda e propagação, os cientistas conseguem <b>transmitir informações</b> mais rápido e longe, <b>diagnosticar doenças</b> e melhorar a qualidade de vida.' }
    ]
  }
};

/* ---------------- TEORIA ---------------- */
const TEORIA = {
  m1: [
    () => `
      <p class="lead"><b>Biodiversidade</b> (diversidade biológica) é a <b>variedade de vida</b> na Terra: microrganismos, plantas e animais, as diferenças dentro da mesma espécie e a variedade de ambientes.</p>
      <h4>🔍 Os 3 níveis: dê zoom!</h4>
      <div data-w="niveis"></div>`,
    () => `
      <p class="lead">A biodiversidade faz os ecossistemas <b>funcionarem</b>, e a vida humana depende dela para <b>alimentos, matérias-primas e medicamentos</b>.</p>
      <h4>🐝 Polinização</h4>
      <div data-w="polinizacao"></div>
      <h4>🍄 Decomposição: a reciclagem da natureza</h4>
      <div data-w="decomp"></div>
      <div class="servicos"><span>🌱 <b>Plantas</b>: fotossíntese e oxigênio</span><span>🌡️ regulam o <b>clima</b></span><span>💧 protegem as <b>nascentes</b></span><span>🟫 reduzem a <b>erosão</b></span><span>💊 <b>remédios</b></span><span>🍎 <b>alimentos</b></span></div>`,
    () => `
      <p class="lead">O Brasil é um dos países com <b>maior biodiversidade</b> do mundo. Toque nos biomas:</p>
      <div data-w="biomasBR"></div>
      <h4>🌵 Caatinga: seca × chuva</h4>
      <div data-w="caatinga"></div>
      <div class="alerta">❌ É <b>errado</b> dizer que a Caatinga é pobre em vida! Ela tem muitas espécies, várias que <b>só existem lá</b>, todas <b>adaptadas</b> ao clima semiárido.</div>`,
    () => `
      <div class="ameacas">${[['🪓', 'Desmatamento'], ['🔥', 'Queimadas'], ['🏭', 'Poluição da água e do solo'], ['🎯', 'Caça e pesca predatória'], ['🦜', 'Tráfico de animais'], ['🐸', 'Espécies exóticas invasoras'], ['🌡️', 'Mudanças climáticas'], ['🛣️', 'Fragmentação de habitats']].map(([e, t]) => `<span><i>${e}</i>${t}</span>`).join('')}</div>
      <h4>🛣️ Fragmentação: arraste para "construir" estradas e plantações</h4>
      <div data-w="fragmentacao"></div>
      <div class="duo">
        <div class="box"><b>🐸 Espécie exótica invasora</b><p>Espécie que <b>veio de outro lugar</b>, se espalha e <b>prejudica as nativas</b> (compete por alimento, transmite doenças, é predadora).</p></div>
        <div class="box"><b>🧬 Por que a variedade genética importa?</b><p>Populações isoladas e com pouca variedade ficam <b>vulneráveis</b>: se o ambiente muda, poucos se adaptam e aumenta o <b>risco de extinção local</b>.</p></div>
      </div>`,
    () => `
      <div class="duo">
        <div class="box"><b>🏛️ Governos e instituições</b><p><b>Unidades de conservação</b>, recuperação de áreas degradadas, combate ao tráfico, <b>fiscalização</b>, pesquisa científica e educação ambiental.</p></div>
        <div class="box"><b>🙋 Cada um de nós</b><p>Descartar o lixo corretamente, <b>economizar água</b>, respeitar a fauna e consumir produtos de origem responsável.</p></div>
      </div>
      <div class="formula verde"><b>♻️ Desenvolvimento sustentável</b><p>Usar os recursos <b>hoje</b> de forma planejada para que <b>continuem existindo no futuro</b>, conciliando <b>ambiente + sociedade + economia</b>. Proteger não é proibir tudo: é <b>planejar</b>.</p></div>
      <div data-w="acoes"></div>`
  ],
  m2: [
    () => `
      <p class="lead">Na cozinha, no banheiro e no jardim há substâncias com comportamentos diferentes. <b>Funções químicas</b> são grupos de substâncias com <b>propriedades parecidas</b>: <b>ácidos, bases, sais e óxidos</b>.</p>
      <table class="mini wide"><tr><th>Função</th><th>Característica</th><th>Exemplo</th><th>No cotidiano</th></tr>
        <tr><td><b class="tA">Ácidos</b></td><td>Liberam <b>H⁺</b> em água; pH &lt; 7</td><td>HCl</td><td>Suco gástrico</td></tr>
        <tr><td><b class="tB">Bases</b></td><td>Liberam <b>OH⁻</b> em água; pH &gt; 7</td><td>NaOH</td><td>Fabricação de sabão</td></tr>
        <tr><td><b class="tS">Sais</b></td><td>Compostos <b>iônicos</b>; podem resultar de neutralização</td><td>NaCl</td><td>Sal de cozinha</td></tr>
        <tr><td><b class="tO">Óxidos</b></td><td><b>Binários</b>, um dos elementos é o <b>oxigênio</b></td><td>CO₂</td><td>Atmosfera</td></tr></table>
      <h4>🧪 A régua do pH: arraste ou toque nos produtos</h4>
      <div data-w="ph"></div>
      <div data-w="funcQuiz"></div>`,
    () => `
      <p class="lead">Segundo <b>Arrhenius</b>, <b>ácido</b> é a substância que, em água, <b>libera íons H⁺</b>. Têm sabor azedo (<b>nunca prove substâncias no laboratório!</b>) e pH <b>menor que 7</b>.</p>
      <h4>💧 O que acontece na água?</h4>
      <div data-w="ioniza"></div>
      <div class="cards4"><div><i>🍋</i><b>Ácido cítrico</b><small>limão, laranja</small></div><div><i>🍶</i><b>Ácido acético</b><small>CH₃COOH · vinagre</small></div><div><i>🫃</i><b>Ácido clorídrico</b><small>HCl · suco gástrico</small></div><div><i>🔋</i><b>Ácido sulfúrico</b><small>H₂SO₄ · baterias, indústria</small></div></div>`,
    () => `
      <p class="lead"><b>Bases</b> liberam íons <b>OH⁻</b> (hidroxila) em água e têm pH <b>maior que 7</b>. Muitas são <b>corrosivas</b>.</p>
      <div class="cards4"><div><i>🧼</i><b>Hidróxido de sódio</b><small>NaOH · soda cáustica, sabão (base forte!)</small></div><div><i>🌾</i><b>Hidróxido de cálcio</b><small>Ca(OH)₂ · corrige solo ácido</small></div><div><i>💊</i><b>Hidróxido de magnésio</b><small>Mg(OH)₂ · antiácido (leite de magnésia)</small></div></div>
      <h4>⚖️ Monte a neutralização</h4>
      <div data-w="neutraliza"></div>`,
    () => `
      <p class="lead"><b>Sais</b> são compostos <b>iônicos</b>, formados por <b>íons positivos (cátions)</b> e <b>negativos (ânions)</b>. Podem surgir da reação entre um ácido e uma base.</p>
      <div data-w="cristal"></div>
      <div class="cards4"><div><i>🧂</i><b>NaCl</b><small>cloreto de sódio · sal de cozinha, conserva alimentos</small></div><div><i>🧁</i><b>NaHCO₃</b><small>bicarbonato de sódio · faz a massa crescer</small></div><div><i>🐚</i><b>CaCO₃</b><small>carbonato de cálcio · calcário, mármore, construção</small></div><div><i>🌱</i><b>Fertilizantes</b><small>em excesso, poluem rios e solo ⚠️</small></div></div>`,
    () => `
      <p class="lead"><b>Óxidos</b> são compostos <b>binários</b> (2 elementos) em que <b>um deles é o oxigênio</b>.</p>
      <div class="cards4"><div><i>💧</i><b>H₂O</b><small>água</small></div><div><i>🚗</i><b>CO₂</b><small>dióxido de carbono · respiração, queimas, <b>efeito estufa</b></small></div><div><i>🏗️</i><b>CaO</b><small>óxido de cálcio (cal virgem) · construção, solo</small></div><div><i>🏭</i><b>SO₂</b><small>dióxido de enxofre · <b>chuva ácida</b></small></div></div>
      <h4>🌧️ Como se forma a chuva ácida</h4>
      <div data-w="chuvaAcida"></div>
      <h4>⚠️ Segurança com produtos de limpeza</h4>
      <div data-w="limpeza"></div>`
  ],
  m3: [
    () => `
      <p class="lead">Uma <b>onda</b> é uma <b>perturbação que se propaga</b>, transportando <b>energia</b> de um ponto a outro <b>sem transportar matéria</b> de forma permanente.</p>
      <div data-w="boia"></div>
      <div class="duo">
        <div class="box"><b>🔊 Mecânicas</b><p>Precisam de um <b>meio material</b> (ar, água, sólidos). <b>Não</b> se propagam no vácuo.<br>Ex.: <b>som</b>, ondas na água, onda na corda.</p></div>
        <div class="box"><b>📡 Eletromagnéticas</b><p><b>Não</b> precisam de meio material: viajam <b>no vácuo</b>.<br>Ex.: <b>luz</b>, rádio, micro-ondas, raio X, ultravioleta.</p></div>
      </div>
      <h4>〰️ Transversal × Longitudinal</h4>
      <div data-w="transLong"></div>`,
    () => `
      <h4 class="no-top">📐 Os elementos da onda: mexa nos controles</h4>
      <div data-w="elementos"></div>
      <div class="formulas"><div><b>v = λ · f</b><small>velocidade (m/s) = comprimento de onda (m) × frequência (Hz)</small></div><div><b>T = 1 / f</b><small>período (s)</small></div><div><b>f = 1 / T</b><small>frequência (Hz)</small></div><div><b>f = n / Δt</b><small>nº de oscilações ÷ tempo</small></div></div>
      <div class="exemplo"><b>📝 Exemplos resolvidos</b><br>• λ = 2 m e f = 5 Hz → v = 2 × 5 = <b>10 m/s</b><br>• f = 4 Hz → T = 1/4 = <b>0,25 s</b><br>• 20 oscilações em 4 s → f = 20/4 = <b>5 Hz</b> → T = 1/5 = <b>0,2 s</b></div>
      <div data-w="calc"></div>`,
    () => `
      <p class="lead">O <b>som</b> é uma onda <b>mecânica</b>, geralmente <b>longitudinal</b>, produzida por <b>vibrações</b>. Propaga-se em gases, líquidos e sólidos. No ar, a cerca de 20 °C, tem velocidade de aproximadamente <b>340 m/s</b>.</p>
      <h4>🎵 Ouça e veja: altura, intensidade e timbre</h4>
      <div data-w="som"></div>
      <div class="duo">
        <div class="box"><b>🚀 Som no espaço?</b><p><b>Não!</b> No espaço há quase <b>vácuo</b>, e o som precisa de matéria para vibrar.</p></div>
        <div class="box"><b>🤰 Ultrassom</b><p>Som com frequência <b>acima de 20 000 Hz</b>: não ouvimos, mas é usado em <b>exames</b> (bebês, órgãos). Abaixo de 20 Hz é <b>infrassom</b>.</p></div>
      </div>`,
    () => `
      <p class="lead">A <b>luz</b> é uma onda <b>eletromagnética</b>: não precisa de meio material. No vácuo viaja a cerca de <b>300 000 km/s</b>! O conjunto de todas essas ondas é o <b>espectro eletromagnético</b>. Toque nas faixas:</p>
      <div data-w="espectro"></div>
      <div class="caract"><span>📻 rádio e TV</span><span>📱 celular</span><span>🍲 micro-ondas</span><span>🩻 raio X</span><span>📺 controle remoto</span><span>🛰️ satélites</span></div>`,
    () => `<div data-w="fenomenos"></div>`
  ]
};
