const grid = document.querySelector('.grid');

// Array com o nome das imagens das cartas
const characters = [
    'beth',
    'jerry',
    'jessica',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'summer',
    'meeseeks',
    'scroopy',
];

// Função para criar um elemento e criar menos código
const createElement = (tag, className) => {
    // Cria o elemento
    const element = document.createElement(tag);
    // Adiciona a classe ao elemento criado
    element.className = className;
    // Retorna o elemento para ser usado em uma variavel
    return element;
}

// Variaveis para armaxenar as cartas clicadas
let firstCard = '';
let secondCard = '';

// Função que verifica se o jogo acabou
const checkEndGame = () => {
    // Pega todos os elementos com a classe disabled-card e salva em um array
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === 20) {
        alert('Parabéns, você conseguiu')
    }
}

// Função que verifica se as cartas clicadas são iguais
const checkCards = () => {
    // Pega os atributos das cartas clicadas
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    // Testa se os atributos possuem o mesmo valor (ACERTAR)
    if (firstCharacter === secondCharacter) {
        
        /* Adiciona a classe disabled-card para as cartas que foram iguais (firstChild pega o primeiro filho que encontra deo elemento, no caso a face front) */
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        // Zera as cartas para escolher novas
        firstCard = '';
        secondCard = '';

        // Verifica se o jogo acabou
        checkEndGame();

    // Se for diferente (ERRAR)
    } else {

        // Coloca dentro de um timeOut para que fique visivel o segundo clique, ou seja, da um tempo para que vejamos o segundo clique acontecer
        setTimeout(() => {
        // Remove a classe que revela a carta das duas cartas clicadas
        firstCard.classList.remove('reveal-card');
        secondCard.classList.remove('reveal-card');

        // Zera as cartas para escolher novas
        firstCard = '';
        secondCard = '';
        }, 500);

    }
}

// Cria a função para revelar a carta ao clicar, passando o parametro target que vem da desconstrução do event do clique do mouse
const  revealCard = ( { target }) => {
    
    // Verifica se a carta já possui a classe reveal-card (carta virada)
    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    // Se a primeira carta não estiver aberta, coloca a carta na vaiavel firstCard
    if (firstCard === '') {
        // Atraves do target do elemento clicado, pega o pai com o parentNode e adiciona a classe reveal-card que revela a carta
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;

    // Se a segunda carta não estiver aberta, coloca a carta na vaiavel secondCard e verifica se as cartas são iguais
    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        // Função para verificar se as cartas clicadas são iguais
        checkCards();
    }

}

/* Função que vai criar as cartas */
const createCard = (character) => {

    // Cria as classes das divs e adiciona as suas respectivas classes atraves do método createElement criado

    // Cria a div Card (Escopo da carta)
    const card = createElement('div', 'card');
    // Cria a div Front (Frente da carta)
    const front = createElement('div', 'face front');
    // Cria a div Back (Verso da carta)
    const back = createElement('div', 'face back');

    // Coloca a imagem passada como parametro como backgroud da face da carta (Dica iniciante: dentro das `` é possível passar um $ e dentro das {} pose ser passado qualquer código javascript, no caso será passada a variavel com o nome da imagem)
    front.style.backgroundImage = `url('../images/${character}.png')`;

    // Monta a estrutura das divs (card, front e back)
    // Usando o appendChild para colocar o filho
    card.appendChild(front);
    card.appendChild(back);

    // Adiciona um eventListener para cada carta quando for clicada
    card.addEventListener('click', revealCard);

    // Cria um atributo para o elemento (carta) e adiciona o nome do personagem ao valor desse atributo
    card.setAttribute('data-character', character);

    return card;
} 

/* Função para criar/carregar o jogo */
const loadGame = () => {

    // Duplica o array dos personagens
    const duplicaCharacters = [ ...characters, ...characters ];

    // Reorganiza o array duplicado de forma aleatoria
    // Usando como semente a função Math.random() - 0.5, que retorna um número entre 0 e 1 e subtrai 0.5
    // Observe que a função sort recebe obrigatoriamente uma função e que nesse caso foi passada uma função anônima
    const shuffledArray = duplicaCharacters.sort(() => Math.random() - 0.5);

    // Para cada elemento do array embaralhado ele vai executar esse forEach
    shuffledArray.forEach((character) => {

        // Cria a carta com cada personagem do array
        const card = createCard(character);
        grid.appendChild(card);

    }

    );

}

loadGame();