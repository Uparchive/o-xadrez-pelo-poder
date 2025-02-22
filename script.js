document.addEventListener("DOMContentLoaded", function() {
    const pages = document.querySelectorAll('.page');
    let currentPage = 0;

    // Identifique o livro atual (exemplo: usando um atributo data no body)
    const currentBook = document.body.dataset.bookId || "o-xadrez-pelo-poder"; // Exemplo: 'NomeDoSeuLivro'

    // Função para obter o nome do armazenamento local com base no livro
    function getStorageKey() {
        return `${currentBook}_lastReadChapter`;
    }

    // Recupera o último capítulo lido do localStorage
    const lastReadChapter = localStorage.getItem(getStorageKey());
    if (lastReadChapter && !isNaN(parseInt(lastReadChapter))) {
        currentPage = parseInt(lastReadChapter);
        // Aplica a classe 'flip' nas páginas anteriores ao último capítulo lido
        pages.forEach((page, index) => {
            if (index < currentPage) {
                page.classList.add('flip');
            }
        });
    }

    // Atualiza a página atual
    updateCurrentPage();

    // Eventos para os botões de próxima e anterior
    document.querySelectorAll('.next-page').forEach(button => {
        button.addEventListener('click', () => {
            if (currentPage < pages.length - 1) {
                pages[currentPage].classList.add('flip');
                currentPage++;
                setLastReadChapter(currentPage);
                updateCurrentPage();
            }
        });
    });

    document.querySelectorAll('.prev-page').forEach(button => {
        button.addEventListener('click', () => {
            if (currentPage > 0) {
                currentPage--;
                pages[currentPage].classList.remove('flip');
                setLastReadChapter(currentPage);
                updateCurrentPage();
            }
        });
    });

    // Função para atualizar o último capítulo lido no localStorage
    function setLastReadChapter(chapterIndex) {
        localStorage.setItem(getStorageKey(), chapterIndex);
    }

    function checkPassword() {
    const savedPassword = localStorage.getItem("bookAccess");
    const lastAccess = localStorage.getItem("lastAccess");
    const currentTime = new Date().getTime();
    const hoursPassed = (currentTime - lastAccess) / (1000 * 60 * 60); // Tempo decorrido em horas

    // Se a senha já foi digitada e ainda está dentro das 24h, libera o acesso automaticamente
    if (savedPassword === "XADREZ2024" && lastAccess && hoursPassed < 24) {
        return; // O usuário já tem acesso válido
    }

    // Se a senha não foi salva ou já passou das 24h, pede novamente
    const password = prompt("Digite a senha de acesso:");

    if (password === "XADREZ2024") {
        localStorage.setItem("bookAccess", password); // Salva a senha no navegador
        localStorage.setItem("lastAccess", currentTime); // Salva a hora do acesso
    } else {
        alert("Senha incorreta! Verifique no seu e-mail.");
        window.location.href = "https://hotmart.com"; // Redireciona para a Hotmart
    }
}

    // Função para atualizar o destaque no capítulo atual
    function updateCurrentPage() {
        // Remove o destaque de todas as páginas
        pages.forEach(page => {
            page.classList.remove('highlight');
        });

        // Adiciona o destaque na página atual
        if (pages[currentPage]) {
            pages[currentPage].classList.add('highlight');
        }

        // Atualiza o índice se houver
        const indexElement = document.getElementById(`chapter${currentPage + 1}`);
        if (indexElement) {
            document.querySelectorAll('.chapter-list li').forEach(chapter => {
                chapter.classList.remove('highlight');
            });
            indexElement.classList.add('highlight');
        }
    }
});
