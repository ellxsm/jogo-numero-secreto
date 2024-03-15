//Declarar váriaveis

let listaDeNumerosSorteados = [];
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// Função para gerar um número aleatório

function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * 4 + 1);
  let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

  //Se a quantidade de elementos dentro da lista for igual a 4, limpar lista

  if (quantidadeDeElementosNaLista == 4) {
    listaDeNumerosSorteados = [];
  }

  /* Se o número escolhido estiver incluído na lista, retornar um novo número aleatório.
     Senão puxar número escolhido.*/

  if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    console.log(listaDeNumerosSorteados);
    return numeroEscolhido;
  }
}

function mostrarTexto(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, "Brazilian Portuguese Female", { rate: 1.2 });
}

function mensagemInicial() {
  mostrarTexto("h1", "Jogo do Número Secreto");
  mostrarTexto("p", "Escolha um número entre 1 e 10");
}

mensagemInicial();

function verificarChute() {
  let chute = document.querySelector("input").value;

  if (chute == numeroSecreto) {
    mostrarTexto("h1", "Acertou!");
    let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
    let mensagemTentativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
    mostrarTexto("p", mensagemTentativa);
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (chute < numeroSecreto) {
      mostrarTexto("p", "O número secreto é maior!");
    } else {
      mostrarTexto("p", "O número secreto é menor!");
    }
    tentativas++;
    limparCampo();
  }
}

function limparCampo() {
  chute = document.querySelector("input");
  chute.value = " ";
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  mensagemInicial();
  document.getElementById("reiniciar").setAttribute("disabled", true);
}
