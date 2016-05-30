var stage;
var lives=3;
var score=0;
var fruits=[];
var hero;
var keys={
    rkd:false,
    lkd:false,
    ukd:false,
    dkd:false


};

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

    window.addEventListener('keydown', fingerDown);
    window.addEventListener('keyup', fingerUp);

    addFruit();
    
    
}
function fingerUp(e) {
    if(e.keyCode===32){
        fire();
    }
    if(e.keyCode===37){
        keys.lkd=false;
    }
    if(e.keyCode===38){
        keys.ukd=false;
    }
    if(e.keyCode===39){
        keys.rkd=false;
    }
    if(e.keyCode===40){
        keys.dkd=false;
    }

}

function fingerDown(e) {

    if(e.keyCode===37){
        keys.lkd=true;
    }
    if(e.keyCode===38){
        keys.ukd=true;
    }
    if(e.keyCode===39){
        keys.rkd=true;
    }
    if(e.keyCode===40){
        keys.dkd=true;
    }
}

function moveHero() {
    if(keys.rkd){
        hero.x+=hero.speed;
    }
    if(keys.lkd){
        hero.x-=hero.speed;
    }
    if(keys.ukd){
        hero.y-=hero.speed;
    }
    if (keys.dkd){
        hero.y+=hero.speed;
    }
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
    };
    moveHero();
    stage.update(e);
}