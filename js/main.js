document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("menu");
    const app = document.getElementById("app");

    // Carregar dados do JSON
    fetch("data/leetcode.json")
        .then((response) => response.json())
        .then((data) => {
            // Renderizar o menu
            data.respostas.forEach((resposta) => {
                const menuItem = document.createElement("li");
                const link = document.createElement("a");
                link.href = `#${resposta.id}`;
                link.textContent = resposta.titulo;
                menuItem.appendChild(link);
                menu.appendChild(menuItem);
            });

            // Adicionar listener para mudanças de rota
            window.addEventListener("hashchange", () => {
                const route = window.location.hash.substring(1);
                const resposta = data.respostas.find((r) => r.id === route);
                if (resposta) {
                    renderResposta(resposta);
                } else {
                    app.innerHTML = "<p>Página não encontrada.</p>";
                }
            });
        });

    function renderResposta(resposta) {
        app.innerHTML = `
            <h2>${resposta.titulo}</h2>
            <p>${resposta.descricao}</p>
            <h3>Código:</h3>
            <pre><code>${resposta.codigo}</code></pre>
            <h3>Diagramas:</h3>
            <div>
                <img src="${resposta.diagramaPseudocodigo}" alt="Diagrama de Pseudocódigo">
                <img src="${resposta.diagramaAtividades}" alt="Diagrama de Atividades">
            </div>
        `;
    }
});
