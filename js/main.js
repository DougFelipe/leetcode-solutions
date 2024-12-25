document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");

    // Função para carregar e renderizar o menu
    function renderMenu(respostas) {
        const menu = document.createElement("ul");
        menu.id = "menu"; // Adiciona o ID ao menu
        respostas.forEach((resposta) => {
            const menuItem = document.createElement("li");
            const link = document.createElement("a");
            link.href = `#${resposta.id}`;
            link.textContent = resposta.titulo;
            menuItem.appendChild(link);
            menu.appendChild(menuItem);
        });
        app.appendChild(menu);
    }

    // Função para renderizar a página inicial
    function renderHome(data) {
        app.innerHTML = `
            <h2>Welcome to LeetCode Solutions</h2>
            <p>Select a solution below to view its details.</p>
        `;
        renderMenu(data.respostas);
    }

    // Função para renderizar uma solução específica
    function renderResposta(resposta) {
        const app = document.getElementById("app");
        app.innerHTML = `
            <h2>${resposta.titulo}</h2>
            <p>${resposta.descricao}</p>
            <div style="margin: 20px 0;">
                <img src="imagens/${resposta.id}_diagrama_atividades.svg" alt="Activity Diagram" style="max-width: 100%; height: auto;">
            </div>
            <div style="text-align: center; margin: 20px 0;">
                <p>Explore a solution by selecting the language</p>
            </div>
            <div style="display: flex; justify-content: center; gap: 10px;">
                <button id="btnPython" class="btn-icon">
                    <i class="fa-brands fa-python"></i> Solution in Python
                </button>
                <button id="btnJava" class="btn-icon">
                    <i class="fa-brands fa-java"></i> Solution in Java
                </button>
            </div>
            <div id="solutionContent"></div>
        `;

        // Configurar eventos dos botões
        document.getElementById("btnPython").addEventListener("click", () => {
            renderSolution("python", resposta.id);
        });

        document.getElementById("btnJava").addEventListener("click", () => {
            renderSolution("java", resposta.id);
        });
    }

    // Carregar dados do JSON
    fetch("data/leetcode.json")
        .then((response) => response.json())
        .then((data) => {
            // Configuração de rotas
            window.addEventListener("hashchange", () => {
                const route = window.location.hash.substring(1);
                const resposta = data.respostas.find((r) => r.id === route);
                if (resposta) {
                    renderResposta(resposta);
                } else if (!route || route === "index") {
                    renderHome(data);
                } else {
                    app.innerHTML = "<p>Page not found.</p>";
                }
            });

            // Renderizar a rota inicial
            if (!window.location.hash || window.location.hash === "#index") {
                renderHome(data);
            }
        })
        .catch((error) => {
            app.innerHTML = "<p>Error loading solutions.</p>";
            console.error(error);
        });
});
