var canvas, context, barraWidth, barraHeight, jogadorPosX, jogadorPosY, teclaCimaPressionada = false, teclaBaixoPressionada = false, oponentePosX, 
oponentePosY, oponenteParaCima, bolaRaio, bolaPosX, bolaPosY, bolaParaDireita, bolaAngulo, bolaTempo,
velocidadeJogador, velocidadeOponente, velocidadeBola, pontosJogador = 0, pontosOponente = 0;

//Controle das teclas

function keyDown(e){
    //console.log('bota dedo');
    if (e.keyCode == 38) { // up
        teclaCimaPressionada = true;
        //console.log('cima pressionado');
    }else if (e.keyCode == 40) { // down
        teclaBaixoPressionada = true;
        //console.log('baixo pressionado');
    }
}

function keyUp(e){
    //console.log('tira dedo');
    if (e.keyCode == 38) { // up
        teclaCimaPressionada = false; // jogador soltou tecla cima
    }
    else if (e.keyCode == 40) { // down
        teclaBaixoPressionada = false; // jogador soltou tecla baixo
    }
}



function gameLoop(){
   // console.log('o jogo tá rodando');

   //mover Jogador
    if (teclaCimaPressionada!=teclaBaixoPressionada) { // se o jogador estiver pressionando a tecla baixo ou cima
        if (teclaCimaPressionada) { // se for para cima...
                if (jogadorPosY > 0) { // se não sair da tela...
                        //jogadorPosY -= velocidadeJogador;// muda a posição
                }
        }
        else { // se for para baixo...
                if (jogadorPosY < (canvas.height - barraHeight)) {// se não sair da tela...
                        //jogadorPosY += velocidadeJogador;// muda a posição
                }
        }
    }

   //mover Oponente
    if (teclaCimaPressionada!=teclaBaixoPressionada) { // se o jogador estiver pressionando a tecla baixo ou cima
        if (teclaCimaPressionada) { // se for para cima...
                if (oponentePosY > 0) { // se não sair da tela...
                    oponentePosY -= velocidadeOponente;// muda a posição
                }
        }
        else { // se for para baixo...
                if (oponentePosY < (canvas.height - barraHeight)) {// se não sair da tela...
                    oponentePosY += velocidadeOponente;// muda a posição
                }
        }
    }    

    // Desenha tudo na tela
    context.clearRect(0, 0, canvas.width, canvas.height);// limpa a tela antes de desenhar

    // Jogador
    context.fillRect(jogadorPosX, jogadorPosY, barraWidth, barraHeight);//desenha jogador
    context.fillRect(oponentePosX, oponentePosY, barraWidth, barraHeight);//desenha oponente

    // Bola
    context.beginPath();// inicia o modo de desenho
    context.arc(bolaPosX, bolaPosY, bolaRaio, 0, Math.PI * 2, true); // desenha o círculo desejado com as coordenadas no centro.
    context.closePath();// finaliza o caminho (opcional)
    context.fill();

    // Linha divisória
    context.beginPath();// inicia o modo de desenho
    context.moveTo(canvas.width / 2, 0);// posiciona o "lapiz" para desenhar
    context.lineTo(canvas.width / 2, canvas.height);// faz o "risco" na tela
    context.strokeStyle = "#000000";// cor preta (opcional)
    context.stroke();// aplica o risco na tela
    context.closePath();// finaliza o caminho (opcional)




    // Bola
    if (bolaTempo <= 0) {// se a bola estiver em jogo, o tempo é zero (após marcar ponto, a bola fica invisível por um tempo)
        if ((bolaPosX - bolaRaio) <= (jogadorPosX + barraWidth)) {// se o jogador enconstar na bola (eixo X)...
            if ((bolaPosY + bolaRaio > jogadorPosY) && (bolaPosY - bolaRaio < jogadorPosY + barraHeight)) {// se o jogador enconstar na bola (eixo Y)...
                bolaParaDireita = true;// a bola muda de lado e é rebatida para o oponente
                if (teclaCimaPressionada) {// se o jogador estiver indo para cima quando tocar na bola...
                    bolaAngulo = Math.floor(Math.random() * 10) - 9;// mandamos a bola na diagonal pra cima
                }
                else {// se o jogador estiver indo para baixo quando tocar na bola..
                    bolaAngulo = Math.floor((Math.random() * 10));// mandamos a bola na diagonal pra baixo
                }                        
            }                    
        }
        else if ((bolaPosX + bolaRaio) >= oponentePosX) {// se o oponente enconstar na bola (eixo X)...
            if ((bolaPosY + bolaRaio > oponentePosY) && (bolaPosY - bolaRaio < oponentePosY + barraHeight)) {// se o oponente enconstar na bola (eixo Y)...
                bolaParaDireita = false;// a bola muda de lado e é rebatida para o jogador
                if (oponenteParaCima) {// se o oponente estiver indo para cima quando tocar na bola...
                    bolaAngulo = Math.floor(Math.random() * 10) - 9;// mandamos a bola na diagonal pra cima
                }
                else {// se o oponente estiver indo para baixo quando tocar na bola...
                    bolaAngulo = Math.floor((Math.random() * 10));// mandamos a bola na diagonal pra baixo
                }  
            }
        } 
        
        if ((bolaPosY - bolaRaio <= 0) || (bolaPosY + bolaRaio > canvas.height)) {// se a bola bater em cima ou em baixo da tela...
            bolaAngulo = bolaAngulo * -1;// multiplicamos por -1 para inverter o sinal e a direção da bola no eixo Y
        }
        bolaPosY += bolaAngulo;// movemos a bola para cima ou para baixo, de acordo com o cáculo acima
        
        if (bolaParaDireita) {// se a bola estiver indo para a direita...
            bolaPosX += velocidadeBola;// movemos a bola para a direita
        }
        else {// se estiver indo para a esquerda...
            bolaPosX -= velocidadeBola;// movemos a bola para a esquerda
        }                    
    }

    if ((bolaPosX <= -bolaRaio) || (bolaPosX > canvas.width)) {// se a bola saiu da tela...
        if (bolaTempo >= 50) {// se so tempo de deixar a bola invisível passou...
            if (bolaPosX <= -bolaRaio)  {// se a bola saiu na esquerda...
                pontosOponente++;// ponto do oponente!
            }
            else {// se a bola saiu na direita...
                pontosJogador++;// ponto do jogador!
            }
        
            bolaPosX = canvas.width / 2;// posiciona a bola no meio da tela
            bolaPosY = canvas.height / 2;// posiciona a bola no meio da tela
            bolaParaDireita = false;// faz ela ir em direção ao jogador
            bolaAngulo = Math.floor(Math.random() * 21) - 10;// faz a bola ir para uma direção aleatória
            bolaTempo = 0;// zera o tempo de deixar a bola invisível e a coloca em jogo novamente
        }
        else {// se o tempo de deixar a bola invisível ainda não passou...
            bolaTempo++;// continuamos contando até 50
        }
    }
    
    
    

//console.log("Velocidade do jogador: "+velocidadeJogador);
//console.log("Velocidade do oponente: "+velocidadeOponente);
console.log("Teclas cima: "+teclaCimaPressionada+" baixo: "+teclaBaixoPressionada+"\n pontuação player1: "+pontosJogador+"\n pontuação player2: "+pontosOponente);
}



function jogo(){

    document.addEventListener('keyup', keyUp, false);// adiciona evento para keyup
    document.addEventListener('keydown', keyDown, false);// adiciona evento para keydown
    

    canvas = document.getElementById("canvas");// procura o canvas
    context = canvas.getContext("2d");// recupera o contexto 2d

    barraWidth = 30;
    barraHeight = 90;

    //dados jogadores
    jogadorPosX = 0;
    jogadorPosY = (canvas.height - barraHeight) / 2;
    velocidadeJogador = 15;

    oponentePosY = (canvas.height - barraHeight) / 2;
    oponentePosX = canvas.width - barraWidth;
    velocidadeOponente = 15;


    //dados bola
    bolaRaio = 10;
    bolaPosX = canvas.width / 2;
    bolaPosY = canvas.height / 2;
    bolaParaDireita = false; // decide por onde a bola deve começar
    bolaAngulo = Math.floor(Math.random() * 21) - 10;
    bolaTempo = 0;
    velocidadeBola = 7;

    setInterval(gameLoop, 30);// chama a function gameLoop a cada 30 frames 
}

function init() {
    //alert("Entrei");
    jogo();
}
onload = init;