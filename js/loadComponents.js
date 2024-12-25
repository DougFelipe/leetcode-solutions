document.addEventListener("DOMContentLoaded", () => {
    const headerContainer = document.getElementById("header");

    // Carregar o componente do cabeçalho
    fetch("components/header.html")
        .then((response) => response.text())
        .then((html) => {
            headerContainer.innerHTML = html;
        })
        .catch((err) => console.error("Erro ao carregar o componente:", err));
});
