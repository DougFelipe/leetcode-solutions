document.addEventListener("DOMContentLoaded", () => {
    // Configuração da rota inicial
    if (!window.location.hash || window.location.hash === "#") {
        window.location.hash = "index";
    }
});
