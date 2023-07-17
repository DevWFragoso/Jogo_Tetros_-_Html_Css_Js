/* Querido programador:
Quando escrevi este código, apenas Deus e eu sabíamos
como ele fucionava.
Agora, apenas Deus Sabe!

Portanto, se você estiver tentando melhorar esta rotina
porque ela falhando e "com certeza está", por favor, 
alimente este contador como um aviso para a próxima pessoa
que venha a analizar este código.

total_horas_perdidas_aqui: 10

*/
const LARGURA_QUADRO = 10;
const ALTURA_QUADRO = 20;

const quadro = [];
const pontosElement = document.getElementById("pontos");
const nivelElement = document.getElementById("nivel");
const nivelSelect = document.getElementById("nivelSelect");
const nivel = [1000, 500, 200];
let pontos = 0;
let novaDirecao;
let gameOver = false;


document.getElementById("pontos").textContent = "Pontos: " + pontos;



//Matriz do Tabuleiro
for(let linha = 0; linha < ALTURA_QUADRO; linha++){
    quadro[linha] = [];
    for(let coluna = 0; coluna < LARGURA_QUADRO; coluna++){
        quadro[linha][coluna] = 0;
    }
}
//Constante das Peças do Jogo
const blocosTetros = [
    //OBJETOS
    {
        forma: [
          //MATRIZ DO BOLCO
            [1,1],
            [1,1]
        ],
        cor : "#ffd800",
    },
    {
        forma: [
            [0,2,0],
            [2,2,2]
        ],
        cor : "#7925dd", 
    },
    {
        forma: [
            [0,3,3],
            [3,3,0]
        ],
        cor : "orange", 
    },
    {
        forma: [
            [4,4,0],
            [0,4,4]
        ],
        cor : "red", 
    },
    {
        forma: [
            [5,0,0],
            [5,5,5]
        ],
        cor : "green", 
    },
    {
        forma: [
            [0,0,6],
            [6,6,6]
        ],
        cor : "#ff6400", 
    },
    {
        forma: [
            [7,7,7,7],
            
        ],
        cor : "#00b5ff",
    },
];

//Função de blocos Aleatórios
function aleatorieBlocos(){
    const index = Math.floor(Math.random()* blocosTetros.length)
    const blocoTetro = blocosTetros[index];
    return{
        forma : blocoTetro.forma,
        cor : blocoTetro.cor,
        linha : 0,
        coluna : Math.floor(Math.random() * (LARGURA_QUADRO - blocoTetro.forma[0].length +1)),
    };
}

let atualBlocoTetros = aleatorieBlocos();

//Função de Pintar os Blocos
function pintarBlocosTetros(){
    const forma = atualBlocoTetros.forma;
    const cor = atualBlocoTetros.cor;
    const linha = atualBlocoTetros.linha;
    const coluna = atualBlocoTetros.coluna;

    for(let lin = 0; lin < forma.length; lin++){
        for(let colu = 0; colu < forma[lin].length; colu++){
            if(forma[lin][colu]){
                const bloco = document.createElement('div');
                bloco.classList.add('bloco');
                bloco.style.backgroundColor = cor;
                bloco.style.top = (linha + lin) * 24 + 'px';
                bloco.style.left = (coluna + colu) * 24 + 'px';
                bloco.setAttribute('id',`bloco-${linha + lin}-${coluna + colu}`);
                document.getElementById('tabuleiro').appendChild(bloco);
            }
        }
    }
}

//Função Atualiza a Pontuação do Jogo
function atualizaPontos(){
    document.getElementById("pontos").textContent = "Pontos: " + pontos;
}

//Função de Game-Over
function verificaGameOver(){
    //Verifica de a primeira linha do quadro tem algum bloco preenchido
    for(let c = 0; c < LARGURA_QUADRO; c++){
        if(quadro[0][c] !== 0){
            alert("Game Over! Sua pontuação final foi: "+pontos+" Pontos - F5 p/ Reiniciar");
            gameOver = true;
            return true; //Game-Over
        }
    }
    return false; //Segue o Jogo
}

//Função que Apaga o Bloco anterior
function apagaBlocoTetros(){
    for(let i = 0; i < atualBlocoTetros.forma.length; i++){
        for(let j = 0; j < atualBlocoTetros.forma[i].length; j++){
            if(atualBlocoTetros.forma[i][j] !== 0){
                let linha = atualBlocoTetros.linha + i;
                let coluna = atualBlocoTetros.coluna + j;
                let bloco = document.getElementById(`bloco-${linha}-${coluna}`);

                if(bloco){
                    document.getElementById("tabuleiro").removeChild(bloco);
                }
            }
        }
    }
}

//Função de travar o moviento e rotação do Bloco
//Movimento
function podeMoverBloco(linhaOffset, colunaOffset){
    for(let i = 0 ; i < atualBlocoTetros.forma.length; i++){
        for(let j = 0 ; j < atualBlocoTetros.forma[i].length ; j++){
            if(atualBlocoTetros.forma[i][j] !== 0 ){
                let linha = atualBlocoTetros.linha + i + linhaOffset;
                let coluna = atualBlocoTetros.coluna + j + colunaOffset;
                
                if(linha >= ALTURA_QUADRO || coluna >= LARGURA_QUADRO || (linha >= 0 && quadro[linha][coluna] !== 0 )){
                    return false;
                }
            }
        }
    }
    return true;
}

//Rotação
function podeRodarBloco (){
    for(let i = 0 ; i < novaDirecao.length; i++){
        for(let j = 0 ; j < novaDirecao[i].length; j++){
            if(novaDirecao[i][j] !== 0){
                let linha = atualBlocoTetros.linha +i;
                let coluna = atualBlocoTetros.coluna +j;

                if(linha >= ALTURA_QUADRO || coluna < 0 || coluna >= LARGURA_QUADRO || (linha >= 0 && quadro[linha][coluna] !== 0 )){
                    return false;
                }
            }
        }
    }
    return true;
}

//Travamento do Bloco
function travaBlocoTetros(){
    for(let i = 0 ; i < atualBlocoTetros.forma.length ; i++){
        for(let j = 0 ; j < atualBlocoTetros.forma[i].length ; j ++){
            if(atualBlocoTetros.forma[i][j] !== 0 ){
                let linha = atualBlocoTetros.linha + i;
                let coluna = atualBlocoTetros.coluna + j;
                quadro[linha][coluna] = atualBlocoTetros.cor; 
            }
        }
    }
    limpaLinha()
    verificaGameOver()
      
    atualBlocoTetros = aleatorieBlocos();
}

//Funcao de apagar linha completada
function limpaLinha() {
    let linhaLimpa = 0;
  
    for (let y = ALTURA_QUADRO - 1; y >= 0; y--) {
      let linhaCompleta = true;
  
      for (let x = 0; x < LARGURA_QUADRO; x++) {
        if (quadro[y][x] === 0) {
          linhaCompleta = false;
          break;
        }
      }
  
      if (linhaCompleta) {
        linhaLimpa++;
  
        for (let yy = y; yy > 0; yy--) {
          quadro[yy] = [...quadro[yy - 1]];
        }
        quadro[0] = new Array(LARGURA_QUADRO).fill(0);
  
        atualizaTabuleiro();
      }
    }
}

//Função para Atulaizar o Tabuleiro
function atualizaTabuleiro() {
    const tabuleiroElement = document.getElementById("tabuleiro");
    tabuleiroElement.innerHTML = "";
  
    for (let linha = 0; linha < ALTURA_QUADRO; linha++) {
      for (let coluna = 0; coluna < LARGURA_QUADRO; coluna++) {
        if (quadro[linha][coluna]) {
          const bloco = document.createElement("div");
          bloco.classList.add("bloco");
          bloco.style.backgroundColor = quadro[linha][coluna];
          bloco.style.top = linha * 24 + "px";
          bloco.style.left = coluna * 24 + "px";
          bloco.setAttribute("id", `bloco-${linha}-${coluna}`);
          tabuleiroElement.appendChild(bloco);
        }
      }
    }
    pontos += 10;
    atualizaPontos();
}
//Função de Rotação do Bloco
function rotacionaBloco(){
    novaDirecao = [];
    for(let i = 0; i < atualBlocoTetros.forma[0].length; i++){
        let linha = [];
        for(let j = atualBlocoTetros.forma.length -1; j >= 0; j--){
            linha.push(atualBlocoTetros.forma[j][i]);
        }
        novaDirecao.push(linha);
    }
    if(podeRodarBloco()){
        apagaBlocoTetros()
        atualBlocoTetros.forma = novaDirecao;
        pintarBlocosTetros();
    }  
}

//Função que Move o Bloco
function moveBlocoTetros(direcao){
    let linha = atualBlocoTetros.linha;
    let coluna = atualBlocoTetros.coluna;

    if(direcao === "esquerda" ){
        if(podeMoverBloco(0,-1)){
            apagaBlocoTetros();
            coluna -= 1;
            atualBlocoTetros.coluna = coluna;
            atualBlocoTetros.linha = linha;
            pintarBlocosTetros();
        }
    }else if(direcao === "direita" ){
        if(podeMoverBloco(0,1)){
        apagaBlocoTetros();
        coluna += 1;
        atualBlocoTetros.coluna = coluna;
        atualBlocoTetros.linha = linha;
        pintarBlocosTetros();
        }
    }else {
        if(podeMoverBloco(1,0)){
            apagaBlocoTetros();
            linha++;
            atualBlocoTetros.coluna = coluna;
            atualBlocoTetros.linha = linha;
            pintarBlocosTetros();
        }else{
            travaBlocoTetros();
        }
    }
}

//Chamada do JOGO
pintarBlocosTetros();
let intervalId = setInterval(moveBlocoTetros, nivel[0]);

//Tratamento do Botão de Nível
nivelSelect.addEventListener("change", handleNivelChange);
nivelSelect.addEventListener('keydown', function(event) {
    if (event.keyCode === 37 || event.keyCode === 39 || event.keyCode === 38 || event.keyCode === 40 || event.keyCode === 32) {
      event.preventDefault();
    }
  });

//Função de Alternancia de Nível 
function handleNivelChange() {
  const selectedNivelIndex = nivelSelect.selectedIndex;
  const selectedNivelValue = nivel[selectedNivelIndex];

  // Limpa o intervalo anterior
  clearInterval(intervalId);
  
  // Define um novo intervalo com base no nível selecionado
  intervalId = setInterval(moveBlocoTetros, selectedNivelValue);
}


//Função p/ Drop do Bloco
function dropaBloco(){
    let linha = atualBlocoTetros.linha;
    let coluna = atualBlocoTetros.coluna;


    while(podeMoverBloco(1,0)){
        apagaBlocoTetros();
        linha++;
        atualBlocoTetros.coluna = coluna;
        atualBlocoTetros.linha = linha;
        pintarBlocosTetros();
    }
    travaBlocoTetros();
}

//Evento de Escuta do Teclado e Click
const btnLeft = document.getElementById("btnLeft");
const btnRight = document.getElementById("btnRight");
const btnRotate = document.getElementById("btnRotate");
const btnDrop = document.getElementById("btnDrop");

document.addEventListener('keydown', handleKeyPress);
btnLeft.addEventListener("click", handleBtnLeftClick);
btnRight.addEventListener("click", handleBtnRightClick);
btnRotate.addEventListener("click", handleBtnRotateClick);
btnDrop.addEventListener("click", handleBtnDropClick);

//Função de Comandos do Teclado
function handleKeyPress(event){
    switch(event.keyCode){
        case 37 : //Seta da esquerda
            moveBlocoTetros('esquerda');
        break;
        case 39 : //Seta da direita
            moveBlocoTetros('direita');
        break;
        case 40 : //Seta pra baixo
            moveBlocoTetros('down');
        break;
        case 38 : //Seta pra cima gira o bloco
           rotacionaBloco();
        break;
        case 32 : //Barra de espaço dropa o bloco
           dropaBloco();
        break;
    }
}

//Funções de manipulador de evento para os botões
function handleBtnLeftClick() {
    moveBlocoTetros('esquerda');
}

function handleBtnRightClick() {
    moveBlocoTetros('direita');
}

function handleBtnRotateClick() {
    rotacionaBloco();
}

function handleBtnDropClick() {
    dropaBloco();
}
