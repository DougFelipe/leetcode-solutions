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
    
    // Renderizar o conteúdo principal da solução
    app.innerHTML = `
        <h2>${resposta.titulo}</h2>
        <p>${resposta.descricao}</p>
        <div style="margin: 20px 0;">
            <h3>Approach</h3>
            <p>${resposta.abordagem || "No approach provided for this solution."}</p>
        </div>
        <div style="margin: 20px 0;">
            <img src="${resposta.diagramaAtividades}" alt="Activity Diagram" style="max-width: 100%; height: auto;">
        </div>
        <div id="languageButtons" style="display: flex; justify-content: center; gap: 10px;"></div>
        <div id="solutionContent"></div>
    `;

    // Lista de linguagens suportadas para a solução
    const supportedLanguages = ["python", "java", "javascript"];

    // Renderizar botões dinamicamente para cada linguagem suportada
    const languageButtonsContainer = document.getElementById("languageButtons");

    supportedLanguages.forEach(language => {
        const button = document.createElement("button");
        button.className = "btn-icon";
        button.id = `btn${language.charAt(0).toUpperCase() + language.slice(1)}`;
        button.title = `Solution in ${language.charAt(0).toUpperCase() + language.slice(1)}`;
        button.innerHTML = `<i class="fab fa-${language === "javascript" ? "js-square" : language}" style="font-size: 24px;"></i>`;
        button.addEventListener("click", () => renderSolution(language, resposta.id));
        languageButtonsContainer.appendChild(button);
    });
}


// Função para carregar o conteúdo da solução
    function renderSolution(language, solutionId) {
        const solutionContainer = document.getElementById("solutionContent");

        fetch(`data/${language}/${solutionId}.json`)
            .then((response) => response.json())
            .then((data) => {
                solutionContainer.innerHTML = `
                    <h3>${data.titulo} - Solution in ${language.charAt(0).toUpperCase() + language.slice(1)}</h3>
                    <pre><code class="language-${language}">${data.codigo}</code></pre>
                `;

                // Ativar o Prism.js para destacar a sintaxe
                Prism.highlightAll();
            })
            .catch((err) => {
                solutionContainer.innerHTML = "<p>Error loading the solution.</p>";
                console.error(err);
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
