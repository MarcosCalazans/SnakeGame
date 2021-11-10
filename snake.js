//variável cvs guarda a referência ao comando CANVAS do HTML que possui id snake
var cvs = document.getElementById("snake");

//variável ctx armazena o contexto 2D do canvas
var ctx = cvs.getContext("2d");

//variável com tamanho de cada parte da snake e tamanho da comida, 20 pixels
var box = 20;

//vetor para guardar cada parte do corpo da snake
var snake = [];

//configuramos a primeira posição do vetor como sendo a cabeça da snake
//x e y guardam a posição que a snake irá aparecer
snake[0] = {
    x : 10 * box,
    y : 10 * box
};

//cria o elemento food com x e y configurados de forma aleatória
//o sorteio é feito entre 1 e o tamanho total de box-1 que podem ser colocados no espaço do canvas 600px
var food = {
    x : Math.floor(Math.random()*29+1) * box,
    y : Math.floor(Math.random()*29+1) * box
}

//variável que armazena a direção da snake a partir das teclas pressionadas
var d;

//comando para adicionar um evento de pressionar uma tecla
//quando a tecla é pressionada, é chamada a função direcao
document.addEventListener("keydown",direcao);

//função responsável em verificar a tecla pressionada e a direção da snake
function direcao(event){
    var key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
    }
}

//função que checa a colisão da cobra com seu corpo
function collision(head,array){
    for(var i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

//função responsável em desenhar os artefatos no canvas
//também verifica a colisão com as laterais e a comida
function draw(){    
    //código que desenha um quadrado para "limpar" o canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,cvs.width,cvs.height);        
    //-----------------------------------------------------
    
    //comando de repetição que percorre todo o vetor (corpo) da snake 
    //pinta um quadrado preenchido na cor verde para a cabeça, posição 0 do vetor
    //pinta um quadrado preenchido na cor azul para o corpo
    for( i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "green" : "blue";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        //comando para pintar um contorno em cada parte do corpo da snake
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }    
    
    //comandos para pintar a comida na cor preta
    ctx.fillStyle = "black";
    ctx.fillRect(food.x, food.y, box, box);    
    
    
    //variáveis que armazenam a posição antiga da cabeça da snake
    var snakeX = snake[0].x;
    var snakeY = snake[0].y;    
    
    //comandos de decisão para determinar a direção da snake
    if( d == "LEFT")  snakeX -= box;
    if( d == "UP")    snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN")  snakeY += box;    
    
    //comando de decisão que verifica se a snake comeu a comida
    //para comer a comida, os valores X e Y da snake devem ser iguais os da food
    //após comer, é sorteada uma nova posição para a comida
    if(snakeX == food.x && snakeY == food.y){        
        food = {
            x : Math.floor(Math.random()*29+1) * box,
            y : Math.floor(Math.random()*29+1) * box
        }
    }else{
        //remove o último elemento do vetor (rabo da snake)
        snake.pop();
    }    
    //adiciona a nova posição da cabeça da snake
    var newHead = {
        x : snakeX,
        y : snakeY
    }    
    //game over, verifica se a snake toca nos quatro cantos da tela e também chama a função collision
    //a função collision retorna verdadeiro se a snake tocar ela mesma ou falso caso contrário
    if(snakeX < 0 || snakeX > cvs.width-box || snakeY < 0 || snakeY > cvs.height-box || collision(newHead,snake)){
        //interrompe a execução do jogo limpando o intervalo infinito criado
        clearInterval(game);
    }    
    //adiciona um ou mais elementos no início de um array(vetor) 
    snake.unshift(newHead);
}
//chama a função draw a cada 100 milessegundos
var game = setInterval(draw,100);