const colaboradores = [
  {
    nome: "Ana Beatriz Silva",
    cargo: "Analista de RH",
    desempenho: 9.1,
    foto: "../assets/foto1.png",
    pessoal: "Formada em Psicologia pela USP. Atua com foco em desenvolvimento humano e clima organizacional.",
    tecnico: "Gestão de talentos, entrevistas comportamentais e políticas de diversidade.",
    soft: "Empatia, escuta ativa",
    hobbies: "Yoga"
  },
  {
    nome: "Lucas Reis",
    cargo: "Desenvolvedor Full Stack",
    desempenho: 9.4,
    foto: "../assets/foto2.png",
    pessoal: "Graduado em Engenharia da Computação. Apaixonado por tecnologia e automação.",
    tecnico: "React, Node.js, APIs REST e integração de sistemas.",
    soft: "Comunicação clara, resolução de problemas",
    hobbies: "Tocar violão"
  },
  {
    nome: "Marta Félix",
    cargo: "UX Designer",
    desempenho: 8.8,
    foto: "../assets/foto3.png",
    pessoal: "Designer formada pela UNESP, especializada em experiência do usuário e acessibilidade.",
    tecnico: "Figma, UX Writing, testes de usabilidade.",
    soft: "Criatividade, empatia",
    hobbies: "Fotografia urbana"
  },
  {
    nome: "Rafael Santos",
    cargo: "Analista de Dados",
    desempenho: 9.0,
    foto: "../assets/foto5.png",
    pessoal: "Formado em Sistemas de Informação com foco em dados.",
    tecnico: "Python, Power BI, SQL",
    soft: "Pensamento analítico",
    hobbies: "Corrida"
  },
  {
    nome: "Carla Souza",
    cargo: "Gestora de Projetos",
    desempenho: 9.2,
    foto: "../assets/foto1.png",
    pessoal: "PMP certificada com 4 anos de experiência.",
    tecnico: "Scrum, Kanban, Jira",
    soft: "Liderança, organização",
    hobbies: "Café especial"
  },
  {
    nome: "Pedro Alves",
    cargo: "Desenvolvedor Mobile",
    desempenho: 8.7,
    foto: "../assets/foto2.png",
    pessoal: "Desenvolvedor Android e Flutter.",
    tecnico: "Kotlin, Flutter, UI Mobile",
    soft: "Autonomia",
    hobbies: "Games"
  },
  {
    nome: "Juliana Costa",
    cargo: "Marketing Digital",
    desempenho: 8.9,
    foto: "../assets/foto6.png",
    pessoal: "Especialista em tráfego pago.",
    tecnico: "Meta Ads, Google Ads",
    soft: "Criatividade",
    hobbies: "Moda"
  },
  {
    nome: "Thiago Ramos",
    cargo: "Suporte Técnico",
    desempenho: 8.5,
    foto: "../assets/foto5.png",
    pessoal: "Atende suporte nível 1 e 2.",
    tecnico: "Sistemas operacionais, redes",
    soft: "Paciência, empatia",
    hobbies: "Séries"
  },
  {
    nome: "Fernanda Nunes",
    cargo: "Administrativo",
    desempenho: 9.0,
    foto: "../assets/foto3.png",
    pessoal: "Administradora com foco em processos internos.",
    tecnico: "Excel, ERP",
    soft: "Organização",
    hobbies: "Leitura"
  },
  {
    nome: "Camila Mendes",
    cargo: "Administrativo",
    desempenho: 8.7,
    foto: "../assets/foto6.png",
    pessoal: "Auxiliar administrativo com 2 anos de experiência.",
    tecnico: "Atendimento, planilhas",
    soft: "Detalhista",
    hobbies: "Caminhadas"
  }
];

function gerarSlides() {
  const container = document.querySelector(".slideshow_container");

  colaboradores.forEach((p, index) => {
    const slide = document.createElement("div");
    slide.classList.add(index === 0 ? "slide_ativo" : "slide");

    slide.innerHTML = `
      <img src="${p.foto}" alt="Foto de ${p.nome}" class="avatar_grande">
      <h3>${p.nome}</h3>
      <p class="cargo">${p.cargo}</p>

      <div class="info_slide">
        <h4>Informações pessoais e acadêmicas</h4>
        <p>${p.pessoal}</p>

        <h4>Experiências e habilidades técnicas</h4>
        <p>${p.tecnico}</p>

        <h4>Soft skills e hobbies</h4>
        <p>${p.soft} — Hobbies: ${p.hobbies}</p>
      </div>

      <div class="acoes_slide">
        <button class="botao_slide">Recomendar profissional</button>
        <button class="botao_slide">Enviar mensagem</button>
      </div>
    `;

    container.appendChild(slide);
  });
}

gerarSlides();

let slideIndex = 0;
mostrarSlides(slideIndex);

// Botão próximo
document.querySelector(".proximo").addEventListener("click", () => {
  mudarSlide(1);
});

// Botão anterior
document.querySelector(".anterior").addEventListener("click", () => {
  mudarSlide(-1);
});

function mudarSlide(n) {
  slideIndex += n;
  mostrarSlides(slideIndex);
}

function mostrarSlides(n) {
  const slides = document.querySelectorAll(".slideshow_container .slide, .slideshow_container .slide_ativo");

  if (n >= slides.length) slideIndex = 0;
  if (n < 0) slideIndex = slides.length - 1;

  slides.forEach(slide => slide.style.display = "none");

  slides[slideIndex].style.display = "block";
}
