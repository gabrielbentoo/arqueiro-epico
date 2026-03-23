const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;
let engine;
let world;
let canvas;
let backgroundImg;
let playerBase;
let player;
let playerArcher;
let board1;
let board2;
let playerArrow = [];
let numberOfArrows = 10;
let score = 0;

function preload() {
    backgroundImg = loadImage("./assets/background.png");
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    engine = Engine.create();
    world = engine.world;

    playerBase = new PlayerBase(300, 500, 180, 150);
    player = new Player(285, playerBase.body.position.y -153, 50, 180);
    playerArcher = new PlayerArcher(340, playerBase.body.position.y -180, 120, 120);
    board1 = new Board(width -300, 330, 50, 200 );
    board2 = new Board(width -550, height -300, 50, 200);


}

function draw() {
    background(backgroundImg);

    Engine.update(engine);
    playerBase.display();
    player.display();
    playerArcher.display();
    board1.display();
    board2.display();
    
    for(let i = 0; i < playerArrow.length; i++ ) {
        if(playerArrow[i] !== undefined) {
            playerArrow[i].display();

            let board1Collision = Matter.SAT.collides(board1.body, playerArrow[i].body);
            let board2Collision = Matter.SAT.collides(board2.body, playerArrow[i].body);

            if(board1Collision.collided || board2Collision.collided) {
                score += 5;
            }

            let posX = playerArrow[i].body.position.x;
            let posY = playerArrow[i].body.position.y;

            if(posX > width || posY > height) {
                if(!playerArrow[i].isRemoved) {
                    playerArrow[i].remove(i);
                }
                else{
                    playerArrow[i].trajectory = [];
                }
            }
        }   
    }

    fill("#FFF");
    textAlign("center");
    textSize(40);
    text("Arqueiro epico", width /2 , 100);
    textSize(30);
    text("Flechas restantes: " + numberOfArrows, 200, 100);
    text("Pontuacao: " + score, width -200, 100);
    if(numberOfArrows == 0) {
        gameOver();
    }
    
}

function keyPressed() {
    if(keyCode === 32) {
        if(numberOfArrows > 0) {
            let posX = playerArcher.body.position.x;
            let posY = playerArcher.body.position.y;
            let angle = playerArcher.body.angle;
            let arrow = new PlayerArrow(posX, posY, 100, 10, angle);
            arrow.trajectory = [];
            Matter.Body.setAngle(arrow.body, angle);
            playerArrow.push(arrow);
            numberOfArrows -=1;
        }
    }
}

function keyReleased() {
    if(keyCode === 32) {
        if(playerArrow.length) {
            let angle = playerArcher.body.angle;
            playerArrow[playerArrow.length -1].shoot(angle);
        }
    }
}
function gameOver() {
    swal(
        {
            title: "Fim de jogo!", 
            text: "Obrigado por jogar.",
            imageUrl: "https://raw.githubusercontent.com/vishalgaddam873/PiratesInvision/main/assets/board.png",
            imageSize: "150x150",
            confirmButtonText: "Jogar novamente"
        },
        function (isConfirm) {
            if(isConfirm) {
                location.reload();
            }
        }
    )
}

