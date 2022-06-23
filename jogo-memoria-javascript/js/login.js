const input = document.querySelector('.login-input');
const button = document.querySelector('.login-button');
const form = document.querySelector('.login-form');

/* Pega o target através da desestruturação de objeto, que veio do event*/
const validateInput = ({target}) => {
    if (target.value.length > 2) {
        /* Remove o atributo disabled para habilitar o botão*/
        button.removeAttribute('disabled');
        return;
    }
    button.setAttribute('disabled', '')
}


const handleSubmit = (event) => {
    /* Evita o funcionamento default, que no caso seria o de recarregamento da tela */
    event.preventDefault();

    /* O browser possui uma ferramenta chamada Local Storage, que armazena dados da sessão, através dessa ferramenta será possivel armazenar os dados informados pelo usuário*/

    /* Pega o que o usuario digitou e salva no Local Storage pelo método localStorage.setItem(), que precisa de dois parâmetros, o primeiro é a chave do valor que será salvo e o segundo é o proprio valor*/
    localStorage.setItem('player', input.value);
    /* Redireciona o usuario para a pagina principal do jogo */
    window.location = 'pages/game.html'
}

/* Executa a função abaixo toda vez que algo for digitado no input através da função 'input'
Esse eventListener chama a função declarada na constante validateInput */
input.addEventListener('input', validateInput);

/* Executa a função abaixo toda vez que o form receber dados pelo 'submit*/
form.addEventListener('submit', handleSubmit);