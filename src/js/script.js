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

// Função para mudar de slide
function mudarSlide(n) {
    slideIndex += n;
    mostrarSlides(slideIndex);
}

// Função principal
function mostrarSlides(n) {
    const slides = document.querySelectorAll(".slideshow_container .slide, .slideshow_container .slide_ativo");

    if (n >= slides.length) {
        slideIndex = 0;
    }
    if (n < 0) {
        slideIndex = slides.length - 1;
    }

    slides.forEach(slide => slide.style.display = "none");

    slides[slideIndex].style.display = "block";
}
