document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("menu"); // Lista onde as soluções serão renderizadas

    // Carregar dados do JSON
    fetch("data/leetcode.json")
        .then((response) => response.json())
        .then((data) => {
            // Renderizar a lista de soluções
            renderMenu(data.respostas);

            // Configuração do roteamento
            window.addEventListener("hashchange", () => {
                const route = window.location.hash.substring(1);
                const resposta = data.respostas.find((r) => r.id === route);
                if (resposta) {
                    renderResposta(resposta);
                } else {
                    renderHome(); // Voltar para a home se a rota não existir
                }
            });

            // Exibir a página inicial no carregamento
            if (!window.location.hash || window.location.hash === "#index") {
                renderHome();
            }
        });

    // Função para renderizar o menu
    function renderMenu(respostas) {
        menu.innerHTML = ""; // Limpa qualquer conteúdo existente no menu
        respostas.forEach((resposta) => {
            const menuItem = document.createElement("li");
            const link = document.createElement("a");
            link.href = `#${resposta.id}`;
            link.textContent = resposta.titulo;
            menuItem.appendChild(link);
            menu.appendChild(menuItem);
        });
    }

    // Função para renderizar a página inicial
    function renderHome() {
        const app = document.getElementById("app");
        app.innerHTML = `
            <h2>Bem-vindo ao LeetCode Respostas</h2>
            <p>Selecione uma solução abaixo para visualizar os detalhes.</p>
            <ul id="menu"></ul> <!-- Reinserir o menu -->
        `;
        // Recria o menu na página inicial
        fetch("data/leetcode.json")
            .then((response) => response.json())
            .then((data) => renderMenu(data.respostas));
    }

    // Função para renderizar uma solução específica
    function renderResposta(resposta) {
        const app = document.getElementById("app");
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
});
