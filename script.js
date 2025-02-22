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
