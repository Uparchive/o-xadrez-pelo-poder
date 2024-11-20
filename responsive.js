document.addEventListener("DOMContentLoaded", function () {
    function adaptForMobile() {
        // Ajustar o tamanho da fonte para telas menores
        if (window.innerWidth < 768) {
            document.body.style.fontSize = "16px"; // Ajuste o tamanho conforme necessário
        } else {
            document.body.style.fontSize = "18px"; // Tamanho para telas maiores
        }
  
        // Aplicar largura total para elementos principais
        let mainElements = document.querySelectorAll(".content, .container, .main-section");
        mainElements.forEach(element => {
            if (window.innerWidth < 768) {
                element.style.width = "100%";
                element.style.padding = "10px";
            } else {
                element.style.width = "80%";
                element.style.padding = "20px";
            }
        });
  
        // Ajustar imagens
        let images = document.querySelectorAll("img");
        images.forEach(image => {
            if (window.innerWidth < 768) {
                image.style.width = "100%";
                image.style.height = "auto";
            } else {
                image.style.width = "";
                image.style.height = "";
            }
        });
    }
  
    // Função para impedir a cópia de conteúdo e seleção de texto
    document.addEventListener('copy', (e) => e.preventDefault());
    document.addEventListener('cut', (e) => e.preventDefault());
    document.addEventListener('contextmenu', (e) => e.preventDefault());
  
    // Desabilitar a seleção de texto para todo o conteúdo
    document.body.style.userSelect = "none";
  
    // Habilitar a seleção apenas nos botões
    const buttons = document.querySelectorAll(".buttons button");
    buttons.forEach(button => {
        button.style.userSelect = "auto";
    });
  
    // Chamar a função de adaptação no início
    adaptForMobile();
  
    // Adicionar evento para atualizar a tela ao redimensionar
    window.addEventListener("resize", adaptForMobile);
  });
  