function renderSolution(language, solutionId) {
    const solutionContainer = document.getElementById("solutionContent");

    fetch(`data/${language}/${solutionId}.json`)
        .then((response) => response.json())
        .then((data) => {
            solutionContainer.innerHTML = `
                <h3>${data.titulo} - Solução em ${language.charAt(0).toUpperCase() + language.slice(1)}</h3>
                <p>${data.descricao}</p>
                <div style="display: flex; justify-content: center; gap: 20px; margin-top: 20px;">
                    <img src="${data.diagramaPseudocodigo}" alt="Diagrama de Pseudocódigo" style="max-width: 45%;">
                    <img src="${data.diagramaAtividades}" alt="Diagrama de Atividades" style="max-width: 45%;">
                </div>
                <h3>Código:</h3>
                <pre><code>${data.codigo}</code></pre>
            `;
        })
        .catch((err) => {
            solutionContainer.innerHTML = "<p>Erro ao carregar a solução.</p>";
            console.error(err);
        });
}
