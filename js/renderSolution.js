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
            solutionContainer.innerHTML = "<p>Erro ao carregar a solução.</p>";
            console.error(err);
        });
}
