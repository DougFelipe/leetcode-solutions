document.addEventListener("DOMContentLoaded", () => {
    const headerContainer = document.getElementById("header");

    // Carregar o componente do cabeçalho
    fetch("components/header.html")
        .then((response) => response.text())
        .then((html) => {
            headerContainer.innerHTML = html;

            // Carregar o menu dinamicamente
            const menu = document.getElementById("menu");
            fetch("data/leetcode.json")
                .then((response) => response.json())
                .then((data) => {
                    data.respostas.forEach((resposta) => {
                        const menuItem = document.createElement("li");
                        const link = document.createElement("a");
                        link.href = `#${resposta.id}`;
                        link.textContent = resposta.titulo;
                        menuItem.appendChild(link);
                        menu.appendChild(menuItem);
                    });
                });
        })
        .catch((err) => console.error("Erro ao carregar o componente:", err));
});
