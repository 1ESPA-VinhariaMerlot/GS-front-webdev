function logout() {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "./src/pages/login.html";
}
