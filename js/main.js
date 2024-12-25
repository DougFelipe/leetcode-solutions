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
            <h2>Bem-vindo ao LeetCode Respostas</h2>
            <p>Selecione uma solução abaixo para visualizar os detalhes.</p>
        `;
        renderMenu(data.respostas);
    }

    // Função para renderizar uma solução específica
    function renderResposta(resposta) {
        app.innerHTML = `
            <h2>${resposta.titulo}</h2>
            <p>${resposta.descricao}</p>
            <div>
                <button id="btnPython">Solução em Python</button>
                <button id="btnJava">Solução em Java</button>
            </div>
            <div id="solutionContent">
                <p>Selecione uma solução para visualizar.</p>
            </div>
        `;

        // Configurar eventos de clique nos botões
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
                    app.innerHTML = "<p>Página não encontrada.</p>";
                }
            });

            // Renderizar a rota inicial
            if (!window.location.hash || window.location.hash === "#index") {
                renderHome(data);
            }
        })
        .catch((error) => {
            app.innerHTML = "<p>Erro ao carregar as soluções.</p>";
            console.error(error);
        });
});
