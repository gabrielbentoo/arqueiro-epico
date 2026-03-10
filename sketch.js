const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;
let engine;
let world;
let canvas;
let backgroundImg;

function preload() {
    backgroundImg = loadImage("./assets/background.png");
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    engine = Engine.create();
    world = engine.world;

}

function draw() {
    background(backgroundImg);

    Engine.update(engine);
}
