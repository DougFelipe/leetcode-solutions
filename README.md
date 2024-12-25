# LeetCode Solutions by PesquisaDoug

Welcome to **LeetCode Solutions**, a project designed to organize and present solutions to programming challenges on LeetCode, with implementations in Python and Java, as well as explanatory diagrams.

## Table of Contents

- [LeetCode Solutions by PesquisaDoug](#leetcode-solutions-by-pesquisadoug)
  - [Table of Contents](#table-of-contents)
  - [Project Description](#project-description)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Project Structure](#project-structure)

## Project Description

This project aims to present detailed solutions for programming problems on LeetCode. Each solution includes:
- Implementations in Python and Java.
- Activity diagrams to explain the logic.
- A web interface for interactive exploration of solutions.

## Features

- **Solution Navigation:** Allows users to select a solution and view its details.
- **Multi-language Implementations:** Displays code for Python and Java.
- **Explanatory Diagrams:** Activity diagrams illustrate the solution logic.
- **Intuitive Interface:** Easy navigation to access different solutions.

## Technologies Used

- **HTML, CSS, and JavaScript** for the web interface.
- **Prism.js** for syntax highlighting.
- **JSON** for storing and loading solution data.
- **Fetch API** for dynamic content loading.
- **SVG Diagrams** for visual explanations.

## Project Structure

```
root
├── components/        # Reusable HTML components
│   └── header.html
├── css/               # Stylesheets
│   └── styles.css
├── data/              # Solution data organized by language
│   ├── java/
│   │   ├── resposta2.json
│   │   ├── resposta3.json
│   │   └── two-sum.json
│   ├── python/
│   │   ├── resposta2.json
│   │   ├── resposta3.json
│   │   └── two-sum.json
│   └── leetcode.json  # Index of available solutions
├── imagens/           # Solution diagrams
│   ├── .png
│   └── two-sum_diagrama_atividades.svg
├── js/                # Scripts for page functionality
│   ├── loadComponents.js
│   ├── main.js
│   ├── renderSolution.js
│   └── router.js
├── index.html         # Project homepage
├── README.md          # Project documentation
```
