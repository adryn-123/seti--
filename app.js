// script.js - Exemplo de como começar a funcionalidade do carrinho
document.addEventListener('DOMContentLoaded', () => {
    let contadorCarrinho = 0;
    const elementoCarrinho = document.querySelector('.carrinho');
    const botoesAdicionar = document.querySelectorAll('.btn-adicionar');

    botoesAdicionar.forEach(botao => {
        botao.addEventListener('click', () => {
            contadorCarrinho++;
            elementoCarrinho.textContent = `🛒 Carrinho (${contadorCarrinho})`;
            alert('Produto adicionado ao carrinho!');

            // Aqui você adicionaria a lógica para salvar o item em uma lista real
        });
    });
});
