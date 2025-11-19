
(function () {

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const updateAnswer = (name, value) => {
    const span = document.querySelector(`[data-answer="${name}"]`);
    if (span) span.textContent = value && value.trim() !== "" ? value : "—";
  };

 
  document.addEventListener("change", (e) => {
    const t = e.target;
    if (t.matches('input[type="radio"]')) {
     
      let labelText =
        t.closest("label")?.textContent?.trim() || t.value || "—";

    
      if (t.name === "conforto") labelText = t.value;

      updateAnswer(t.name, labelText);
    }
  });

 
  $$("textarea").forEach((ta) => {
    ta.addEventListener("input", () => updateAnswer(ta.name, ta.value));
  });

  const btn = $("#btnEnviar");
  const res = $("#resultado");

  const rules = {
   
    pesos: {
      conforto: 0.25,
      recursos: 0.2,
      colaboracao: 0.2,
      valor: 0.15,
      clima: 0.2,
    },
    
    notas: {
      conforto: (v) => Number(v || 0), 
      recursos: (v) =>
        v === "completos" ? 5 : v === "quase" ? 3 : v === "faltando" ? 1 : 0,
      colaboracao: (v) =>
        v === "excelente" ? 5 : v === "boa" ? 3 : v === "dificil" ? 1 : 0,
      valor: (v) =>
        v === "totalmente" ? 5 : v === "as_vezes" ? 3 : v === "nao" ? 1 : 0,
      clima: (v) =>
        v === "positivo" ? 5 : v === "neutro" ? 3 : v === "negativo" ? 1 : 0,
    },
  };

  function calcularScore(respostas) {

    let total = 0;
    let somaPesos = 0;
    for (const chave of Object.keys(rules.pesos)) {
      const peso = rules.pesos[chave];
      const nota5 = rules.notaschave;
      total += (nota5 / 5) * peso * 100;
      somaPesos += peso;
    }
    return Math.round(total / somaPesos);
  }

  function construirMensagens(respostas) {
    const {
      conforto,
      recursos,
      colaboracao,
      valor,
      clima,
      necessidades,
      sugestoes,
    } = respostas;

    const confortNum = Number(conforto || 0);
    const msgs = [];
    let statusClass = "ok";

    if (confortNum >= 4) {
      msgs.push(
        "Conforto físico em bom nível. Ótimo! Vamos manter rotinas de alongamento e pausas para preservar esse resultado."
      );
    } else if (confortNum === 3) {
      msgs.push(
        "Conforto físico moderado. Pequenos ajustes ergonômicos podem elevar sua experiência (altura de cadeira/monitor, iluminação)."
      );
    } else if (confortNum > 0) {
      msgs.push(
        "Conforto físico baixo. Recomendamos avaliação ergonômica pelo WorkWell e acompanhamento de pausas ativas."
      );
      statusClass = "";
    }

    
    if (recursos === "completos") {
      msgs.push("Recursos e ferramentas estão adequados. Continue assim! ✅");
    } else if (recursos === "quase") {
      msgs.push(
        "Quase tudo disponível. Sugerimos registrar o que falta para priorização no backlog de Facilities/TI."
      );
    } else if (recursos === "faltando") {
      msgs.push(
        "Faltam recursos essenciais. Vamos abrir um chamado para provisionar acessos/equipamentos o quanto antes."
      );
      statusClass = "";
    }


    if (colaboracao === "excelente") {
      msgs.push(
        "Colaboração excelente! Mantenha rituais que funcionam (stand‑ups, alinhamentos rápidos) e compartilhe boas práticas."
      );
    } else if (colaboracao === "boa") {
      msgs.push(
        "Colaboração boa, com espaço para evoluir. Teste acordos de comunicação e retrospectivas curtas quinzenais."
      );
    } else if (colaboracao === "dificil") {
      msgs.push(
        "Sinais de dificuldade na colaboração. Indicamos mediação leve e workshop de feedback não‑violento."
      );
      statusClass = "";
    }

    if (valor === "totalmente") {
      msgs.push("Você se sente valorizado(a). Parabéns ao time pelo clima de respeito!");
    } else if (valor === "as_vezes") {
      msgs.push(
        "Valorização oscilante. Recomendamos rituais de reconhecimento (kudos, mural de conquistas) e 1:1s regulares."
      );
    } else if (valor === "nao") {
      msgs.push(
        "Percepção de pouca valorização. Sugerimos conversas 1:1 com a liderança e definição de metas claras de reconhecimento."
      );
      statusClass = "";
    }


    if (clima === "positivo") {
      msgs.push("Clima positivo e motivador. Continue nutrindo a cultura de confiança e autonomia. ✨");
    } else if (clima === "neutro") {
      msgs.push(
        "Clima neutro. Pequenos rituais de conexão (check‑ins de humor, cafés) podem elevar a energia do time."
      );
    } else if (clima === "negativo") {
      msgs.push(
        "Clima negativo identificado. Proponha uma escuta ativa com plano de ação participativo e acompanhamento quinzenal."
      );
      statusClass = "";
    }

 
    if ((necessidades || "").trim()) {
      msgs.push("Necessidades específicas registradas. Vamos encaminhar ao time responsável. 📝");
    }
    if ((sugestoes || "").trim()) {
      msgs.push("Obrigado pelas sugestões! Elas serão consideradas no plano de melhorias.");
    }

    return { msgs, statusClass };
  }

  function lerRespostasDoFormulario() {
    const respostas = {
      conforto: ($('input[name="conforto"]:checked') || {}).value || "",
      recursos: ($('input[name="recursos"]:checked') || {}).value || "",
      colaboracao: ($('input[name="colaboracao"]:checked') || {}).value || "",
      valor: ($('input[name="valor"]:checked') || {}).value || "",
      clima: ($('input[name="clima"]:checked') || {}).value || "",
      necessidades: ($('textarea[name="necessidades"]') || {}).value || "",
      sugestoes: ($('textarea[name="sugestoes"]') || {}).value || "",
    };
    return respostas;
  }

  function validarMinimo(respostas) {
   
    const obrigatorias = ["conforto", "recursos", "colaboracao", "valor", "clima"];
    const faltando = obrigatorias.filter((k) => !respostas[k]);
    return faltando;
  }

  btn?.addEventListener("click", (e) => {
    e.preventDefault();

    const respostas = lerRespostasDoFormulario();
    const faltando = validarMinimo(respostas);

    if (faltando.length) {
      res.className = "result"; 
      res.style.display = "block";
      res.innerHTML =
        "Por favor, responda às perguntas obrigatórias: " +
        faltando.map((k) => `<strong>${k}</strong>`).join(", ") +
        ".";
      res.focus?.();
      res.scrollIntoView({ behavior: "smooth", block: "nearest" });
      return;
    }

    const score = calcularScore(respostas); 
    const { msgs, statusClass } = construirMensagens(respostas);

    
    let faixa, emoji;
    if (score >= 80) {
      faixa = "Excelente nível de bem‑estar!";
      emoji = "🌟";
    } else if (score >= 60) {
      faixa = "Bom com oportunidades de melhoria.";
      emoji = "👍";
    } else if (score >= 40) {
      faixa = "Atenção: pontos de desconforto identificados.";
      emoji = "⚠️";
    } else {
      faixa = "Crítico: precisamos agir agora.";
      emoji = "🚑";
    }

   
    const header = `<div style="margin-bottom:6px;font-weight:900;">${emoji} ${faixa} (Score WorkWell: ${score}/100)</div>`;
    const corpo = msgs.map((m) => `<div>• ${m}</div>`).join("");
    const footer =
      '<div style="margin-top:8px;opacity:.9">Use o WorkWell para acompanhar suas métricas e registrar ações de melhoria.</div>';

    res.className = "result " + (statusClass || "");
    res.style.display = "block";
    res.setAttribute("role", "status");
    res.setAttribute("aria-live", "polite");
    res.innerHTML = header + corpo + footer;

   
    res.focus?.();
    res.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
})();