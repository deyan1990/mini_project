var stage;
var lives = 3;
var score = 0;
var enemies = [];
var hero;
var keys = {
    rkd: false,
    lkd: false,
    ukd: false,
    dkd: false


};


function getStarted() {
    stage = new createjs.Stage(flower);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener('tick', tock);

    //hero
    hero = new createjs.Bitmap("img/hero.png");
    hero.width = 86;
    hero.height = 89;
    hero.speed = 5;
    stage.addChild(hero);

    hero.x = stage.canvas.width / 2;
    hero.y = stage.canvas.height - hero.height;

    window.addEventListener('keydown', fingerDown);
    window.addEventListener('keyup', fingerUp);

    addFruit();


}

function moveHero() {
    if (keys.rkd) {
        hero.x += hero.speed;
    }
    if (keys.lkd) {
        hero.x -= hero.speed;
    }
    if (keys.ukd) {
        hero.y -= hero.speed;
    }
    if (keys.dkd) {
        hero.y += hero.speed;
    }

    if (hero.x > stage.canvas.width - hero.width) {
        hero.x = stage.canvas.width - hero.width;
    }
    if (hero.x < 0) {
        hero.x = 0;
    }
    if (hero.y > stage.canvas.height - hero.height) {
        hero.y = stage.canvas.height - hero.height;
    }
    if (hero.y < 0) {
        hero.y = 0;
    }
}
function fingerUp(e) {
    if (e.keyCode === 32) {
        fire();
    }
    if (e.keyCode === 37) {
        keys.lkd = false;
    }
    if (e.keyCode === 38) {
        keys.ukd = false;
    }
    if (e.keyCode === 39) {
        keys.rkd = false;
    }
    if (e.keyCode === 40) {
        keys.dkd = false;
    }

}

function fingerDown(e) {

    if (e.keyCode === 37) {
        keys.lkd = true;
    }
    if (e.keyCode === 38) {
        keys.ukd = true;
    }
    if (e.keyCode === 39) {
        keys.rkd = true;
    }
    if (e.keyCode === 40) {
        keys.dkd = true;
    }
}




function addFruit() {
    var rand = Math.floor(Math.random() * 100);
    var chance = 20 + score;
    if (rand < 2) {
        var gar = ['gar_1.png', 'gar_2.png', 'gar_3.png', 'gar_4.png', 'gar_5.png', 'gar_6.png', 'gar_7.png'];
        var p = new createjs.Bitmap('img/' + gar[Math.floor(Math.random() * gar.length)]);
        p.y = -100;
        p.x = Math.floor(Math.random() * stage.canvas.width);
        stage.addChild(p);
        p.addEventListener(hitTest, removeFruit);
        enemies.push(p);
    }
}

function removeFruit(e) {
    score++;
    console.log("Score: " + score);
    stage.removeChild(e.target);
    var index = enemies.indexOf(e.target);
    enemies.splice(index, 1);

}

function moveFruits() {
    var i;
    var numEnemies = enemies.length;
    for (i = numEnemies - 1; i >= 0; i--) {
        enemies[i].y++;
        if (enemies[i].y > stage.canvas.height + 30) {
            lives--;
            console.log("You just lost a life and have " + lives);
            if (lives === 0) {
                console.log("You are dead");
            }
            stage.removeChild(enemies[i]);
            enemies.splice(i, 1);
        }
    }
}

function hitTest(rect1, rect2){
    if(rect1.x>=rect2.x+rect2.width
        || rect1.x+rect1.width<=rect2.x
        || rect1.y>=rect2.y+rect2.height
        || rect1.y+rect1.height<=rect2.y)

    {return false;}

    return true;
}

function checkCollisions() {
    var e;
    var eLength=enemies.length-1;
    for (e=eLength; e>=0; e--){
            if(hitTest(enemies[e], hero)){
                stage.removeFruit(enemies[e]);
                enemies.splice(e, 1);
                if(enemies.length===0){
                    level++;
                    addEnemies();

                }
                break;

            }

    }
}




function tock(e) {
    if (lives > 0) {
        addFruit();
        moveFruits();
        moveHero();
        checkCollisions();
    };

    stage.update(e);
}
