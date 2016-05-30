var stage;
var lives=3;
var score=0;
var fruits=[];
var hero;

function getStarted(){
    stage = new createjs.Stage(flower);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener('tick', tock);
    
    //hero
    
    hero =  new createjs.Bitmap("img/hero.png");
    hero.width=106;
    hero.height=89;
    stage.addChild(hero);

    hero.x=stage.canvas.width/2;
    hero.y=stage.canvas.height-hero.height;

    addFruit();
    
    
}

function addFruit(){
    var rand = Math.floor(Math.random()*100);
    var chance = 20+score;
    if(rand<2){
    var pokemons = ['gar_1.png', 'gar_2.png', 'gar_3.png', 'gar_4.png', 'gar_5.png', 'gar_6.png', 'gar_7.png'];
    /*var index = Math.floor(Math.random()*pokemons.length);
    var myP=pokemons[index];   
    var p = new createjs.Bitmap('img/'+myP);*/
    var p = new createjs.Bitmap('img/'+pokemons[Math.floor(Math.random()*pokemons.length)]);
        p.y=-100;
        p.x=Math.floor(Math.random()*stage.canvas.width);
        stage.addChild(p);
        p.addEventListener('click', removeFruit);
        fruits.push(p);
    /*var shape = new createjs.Shape();
    shape.graphics.beginFill('green'). drawCircle(0,0, 50);
    shape.y=-100;
    shape. x = Math.floor(Math.random()*stage.canvas.width);
    stage.addChild(shape);
    shape.addEventListener('click', removeFruit);
    fruits.push(shape);*/
}
}

function removeFruit(e){
    score++;
    console.log("Score: "+score);
    stage.removeChild(e.target);
    var index = fruits.indexOf(e.target);
    fruits.splice(index, 1);
   
}
function moveFruits(){
    var i;
    var numFruits = fruits.length;
    for (i=numFruits-1; i>=0; i--){
    fruits[i].y++;
    if(fruits[i].y > stage.canvas.height+50){
    lives--;
    console.log("You just lost a life and have"+lives);
        if(lives===0){
    console.log("You are dead");
    }
    stage.removeChild(fruits[i]);
    fruits.splice(i, 1);
    }
    }
}
function tock(e){
if(lives>0){
    addFruit();
    moveFruits();
    }
    stage.update(e);
}