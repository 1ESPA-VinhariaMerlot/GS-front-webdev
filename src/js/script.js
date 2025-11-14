// script.js
document.addEventListener("DOMContentLoaded", () => {
  const slides = Array.from(document.querySelectorAll(".slide"));
  if (!slides.length) return; // caso não existam slides, encerra o script

  let index = 0;
  const nextBtn = document.querySelector(".proximo");
  const prevBtn = document.querySelector(".anterior");

  // Função que exibe o slide atual e oculta os outros
  function mostrarSlide(i) {
    index = (i + slides.length) % slides.length; // garante loop circular
    slides.forEach(s => s.classList.remove("active", "ativo"));
    slides[index].classList.add("active"); // classe do slide visível
  }

  // Botões de navegação (se existirem)
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      mostrarSlide(index + 1);
      reiniciarAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      mostrarSlide(index - 1);
      reiniciarAutoPlay();
    });
  }

  // Troca automática de slides a cada 6 segundos
  let autoPlay = setInterval(() => {
    mostrarSlide(index + 1);
  }, 6000);

  // Reinicia o autoplay quando o usuário interage
  function reiniciarAutoPlay() {
    clearInterval(autoPlay);
    autoPlay = setInterval(() => {
      mostrarSlide(index + 1);
    }, 6000);
  }

  // Inicia no primeiro slide
  mostrarSlide(0);
});
