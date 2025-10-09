
// 1. Dados dos Produtos (Simulação de um Banco de Dados)
const produtos = [
    { id: 1, nome: 'Smartphone X', preco: 1200.00, imagem: 'images/produto1.jpg' },
    { id: 2, nome: 'Fone Bluetooth', preco: 150.00, imagem: 'images/produto2.jpg' },
    { id: 3, nome: 'Smartwatch A', preco: 350.00, imagem: 'images/produto3.jpg' },
    { id: 4, nome: 'Câmera Digital', preco: 800.00, imagem: 'images/produto4.jpg' },
];

// Variável global para o carrinho
let carrinho = [];

// 2. Elementos DOM
const produtosContainer = document.getElementById('produtos-container');
const contadorCarrinho = document.getElementById('contador-carrinho');
const modalCarrinho = document.getElementById('modal-carrinho');
const listaCarrinho = document.getElementById('lista-carrinho');
const totalCarrinho = document.getElementById('total-carrinho');
const finalizarCompraBtn = document.getElementById('finalizar-compra');

// 3. Funções de Renderização e Lógica

/**
 * Cria o HTML para um único cartão de produto.
 */
function criarCardProduto(produto) {
    const card = document.createElement('div');
    card.classList.add('produto-card');
    card.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}" onerror="this.onerror=null;this.src='https://via.placeholder.com/280x200?text=Sem+Foto';">
        <h3>${produto.nome}</h3>
        <p class="preco">R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
        <button class="adicionar-carrinho" data-id="${produto.id}">Adicionar ao Carrinho</button>
    `;
    produtosContainer.appendChild(card);

    // Adiciona o evento de clique ao botão
    card.querySelector('.adicionar-carrinho').addEventListener('click', () => {
        adicionarAoCarrinho(produto.id);
    });
}

/**
 * Renderiza todos os produtos na vitrine.
 */
function renderizarProdutos() {
    produtosContainer.innerHTML = ''; // Limpa o container antes de renderizar
    produtos.forEach(produto => criarCardProduto(produto));
}

/**
 * Adiciona um produto ao carrinho ou aumenta sua quantidade.
 */
function adicionarAoCarrinho(idProduto) {
    const produto = produtos.find(p => p.id === idProduto);
    const itemExistente = carrinho.find(item => item.id === idProduto);

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
    }

    atualizarCarrinhoDOM();
}

/**
 * Remove um item do carrinho.
 */
function removerDoCarrinho(idProduto) {
    carrinho = carrinho.filter(item => item.id !== idProduto);
    atualizarCarrinhoDOM();
}

/**
 * Atualiza o DOM (Interface do Usuário) do carrinho.
 */
function atualizarCarrinhoDOM() {
    listaCarrinho.innerHTML = '';
    let total = 0;

    carrinho.forEach(item => {
        const li = document.createElement('li');
        const subtotal = item.preco * item.quantidade;
        total += subtotal;

        li.innerHTML = `
            ${item.nome} (${item.quantidade}x) - R$ ${subtotal.toFixed(2).replace('.', ',')}
            <button class="remover-item" data-id="${item.id}">Remover</button>
        `;
        listaCarrinho.appendChild(li);

        // Adiciona evento de clique para remover
        li.querySelector('.remover-item').addEventListener('click', (e) => {
            removerDoCarrinho(parseInt(e.target.dataset.id));
        });
    });

    // Atualiza o contador no cabeçalho
    const totalItens = carrinho.reduce((sum, item) => sum + item.quantidade, 0);
    contadorCarrinho.textContent = totalItens;

    // Atualiza o total e o botão de finalizar
    totalCarrinho.textContent = total.toFixed(2).replace('.', ',');
    finalizarCompraBtn.disabled = carrinho.length === 0;
}

// 4. Lógica do Modal (Abre e Fecha Carrinho)

// Abre o modal
document.getElementById('abrir-carrinho').addEventListener('click', () => {
    modalCarrinho.style.display = 'block';
});

// Fecha o modal pelo 'x'
document.querySelector('.fechar-modal').addEventListener('click', () => {
    modalCarrinho.style.display = 'none';
});

// Fecha o modal ao clicar fora dele
window.addEventListener('click', (event) => {
    if (event.target === modalCarrinho) {
        modalCarrinho.style.display = 'none';
    }
});

// 5. Lógica de Finalização (Apenas demonstração)
finalizarCompraBtn.addEventListener('click', () => {
    if (carrinho.length > 0) {
        alert(`Pedido finalizado! Total: R$ ${totalCarrinho.textContent}.
        Obrigado pela compra!`);
        
        // Limpa o carrinho
        carrinho = [];
        atualizarCarrinhoDOM();
        modalCarrinho.style.display = 'none';
    } else {
        alert('Seu carrinho está vazio.');
    }
});

// 6. Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderizarProdutos();
});
