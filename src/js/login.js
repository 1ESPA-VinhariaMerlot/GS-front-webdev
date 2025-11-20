const usuarios = [
    {
        email: "admin@workwell.com",
        senha: "123456",
        nome: "Administrador"
    },
    {
        email: "rh@empresa.com",
        senha: "senha123",
        nome: "Equipe RH"
    }
];

document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    
    const usuarioValido = usuarios.find(
        user => user.email === email && user.senha === senha
    );

    if (usuarioValido) {
        
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioValido));

        
        window.location.href = "/index.html";
    } else {
        alert("E-mail ou senha incorretos!");
    }
});
