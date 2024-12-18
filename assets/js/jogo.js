/*Para evitar o efeito de scroll, a lógica a seguir indentifica e armazena os valores da altura e da largura da janela
 utilizando a window do Browser Object Model(BOM)
*/
var altura = 0
var largura = 0
var vidas = 1
var tempo = 15
var criaMosquitoTempo = 1500

//Lógica que vai extrar o nível enviado para a página jogo.html
var nivel = window.location.search.replace('?','')//recuperando a url completa e com o search, selecionando somente o que está após '?' com o seach, e substituindo-o por um espaço vazio com o replace
if(nivel === 'normal'){
  criaMosquitoTempo = 1500
}else if(nivel === 'dificil'){
  criaMosquitoTempo = 1000
}else if(nivel === 'chucknorris'){
  criaMosquitoTempo= 750
}


function ajustaTamanhoTelaJogo() {
  altura = window.innerHeight;
  largura = window.innerWidth;
}

ajustaTamanhoTelaJogo();

//Criando a lógica do temporizador do jogo.
var cronometro = setInterval(function(){
    tempo -= 1

    if(tempo < 0){
        clearInterval(cronometro)
        clearInterval(criaMosquito)
        window.location.href = 'vitoria.html'
    }else{
        document.getElementById('cronometro').innerHTML = tempo
    }
},1000)
/**********************************************/
/*Com base nos valores de altura e largura identificados, produzir de forma aleatória valores correspondentes ao eixo X e Y 
e na sequência, criar um elemento HTML e posicioná-lo através dos recursos de estilo 
nessa posição encontrada com base nos limitadores de altura e largura da página*/

function posicaoAleatoria() {
  //<----Início da função posicaoAleatoria()---->

  //Remover o mosquito anterior criado com o setInterval (caso exista)
  if (document.getElementById("mosquito")) {
    document.getElementById("mosquito").remove();
    //Lógica para remover as vidas caso o mosquito não seja clicado a tempo
    if (vidas > 3) {
        window.location.href = 'fim_de_jogo.html'
    } else {
      document.getElementById("v" + vidas).src =
        "/assets/images/coracao_vazio.png";

      vidas++;
    }
  }

  //- 90 diminui em 90 pixels o campo para a exibição, evitando que a dimensão da imagem transborde a tela
  var posicaoX = Math.floor(Math.random() * (largura - 90));
  var posicaoY = Math.floor(Math.random() * (altura - 90));

  //Lógica para evitar que caso o sorteio de um dos eixos seja 0 (0 - 90 =)
  //A subtração do campo de divisão não faça a imagem a aparecer em uma posição negativa
  posicaoX = posicaoX < 0 ? 0 : posicaoX;
  posicaoY = posicaoX < 0 ? 0 : posicaoY;

  //criar elemento
  var mosquito = document.createElement("img");
  //Localiza a imagem no diretório
  mosquito.src = "assets/images/mosquito.png";
  //Atribui a classe para a aplicação do estilo (tamanho em px)
  mosquito.className = TamanhoAleatorio() + " " + ladoAleatorio(); //retorno será algo como 'mosquito1 ladoB
  //Define os eixos para o posicionamento do elemento na janela de forma absoluta.
  mosquito.style.left = posicaoX + "px";
  mosquito.style.top = posicaoY + "px";
  mosquito.style.position = "absolute";
  mosquito.id = "mosquito";
  
  //Criando lógica de click no mosquito ou perda de uma vida caso não seja clicado a tempo
  /*Essa lógica também impede que as vidas sejam alteradas caso o elemento 'mosquito' seja clicado
  Já que ela remove o elemento, então a condição do if da linha 23 se torna false e o bloco é pulado.
  */
  mosquito.onclick = function () {
    this.remove();
  };
  //Adiocnando o elemento dentro do body
  document.body.appendChild(mosquito);
  //Chamada da função lado aleatório
  console.log(ladoAleatorio());
} //<----Fim da função posicaoAleatoria()---->

//Fazer com que o mosquito tenha variações de tamanho aleatórias
function TamanhoAleatorio() {
  //<----Início da função tamanhoAleatorio()---->
  var classe = Math.floor(Math.random() * 3);

  switch (classe) {
    case 0:
      return "mosquito1";

    case 1:
      return "mosquito2";

    case 2:
      return "mosquito3";
  }
} //<----Fim da função tamanhoAleatorio()---->

//Inverter o posicionamento do masquito verticalmente(espelhamento)
function ladoAleatorio() {
  //<----Início da função ladoAleatorio()---->
  var classe = Math.floor(Math.random() * 2);

  switch (classe) {
    case 0:
      return "ladoA";

    case 1:
      return "ladoB";
  }
} //<----Fim da função ladoAleatorio()---->
