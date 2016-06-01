var stage;
var level = 1;
var scoreToNextLevel=20;
var lives = 3;
var score = 0;
var stones=[];
var enemies = [];
var hero;
var keys = {
    rkd: false,
    lkd: false,
    ukd: false,
    dkd: false


};
var scoreText;

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

    addEnemies();
    scoreText = new createjs.Text("Score: ", "30 Courier", "#FFF"+score);
    stage.addChild(scoreText);
    console.log("Score: " + score);

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




function addEnemies() {
    var rand = Math.floor(Math.random() * 100);
    var chance = level*scoreToNextLevel;
    if (rand < 2) {
        var gar = ['gar_1.png', 'gar_2.png', 'gar_3.png', 'gar_4.png', 'gar_5.png', 'gar_6.png', 'gar_7.png'];
        var p = new createjs.Bitmap('img/' + gar[Math.floor(Math.random() * gar.length)]);
        p.width=50;
        p.height=50;
        p.y = -100;
        p.x = Math.floor(Math.random() * stage.canvas.width);

        stage.addChild(p);
       // p.addEventListener(hitTest, removeEnemies);
        enemies.push(p);
    }
    if(level>1 && rand<1){
        var st= ["stone_1.png", 'stone_2.png', 'stone_3.png'];
        var p = new createjs.Bitmap('img/' + st[Math.floor(Math.random() * st.length)]);
        p.width=50;
        p.height=50;
        p.y = -100;
        p.x = Math.floor(Math.random() * stage.canvas.width);


        //different places
        var goAgain=true;
               while(goAgain){
                       goAgain=false;
                      for (var i = 0; i < enemies.length; i++) {
                               if (enemies[i].y < 0 && hitTest(p, enemies[i])) {
                    p.x = Math.floor(Math.random() * stage.canvas.width);
                                       goAgain=true;
                                       console.log("trying new position");
                                      break;
                }
            }
        }

        while(goAgain){
            goAgain=false;
            for (var i = 0; i < enemies.length; i++) {
                if (enemies[i].y < 0 && hitTest(p, enemies[i])) {
                    p.x = Math.floor(Math.random() * stage.canvas.width);
                    goAgain=true;
                    console.log("trying new position");
                    break;
                }
            }
        }

        stage.addChild(p);
        stones.push(p);
    }
}

function removeEnemies(e) {
    scoreUp();
    stage.removeChild(e.target);
    var index = enemies.indexOf(e.target);
    enemies.splice(index, 1);

}


function hitTest(rect1, rect2){
    if(rect1.x>=rect2.x+rect2.width
        || rect1.x+rect1.width<=rect2.x
        || rect1.y>=rect2.y+rect2.height
        || rect1.y+rect1.height<=rect2.y)

    {return false;}

    return true;
}

 function levelDown() {
    lives--;
    console.log("You just lost a life and have " + lives);
    if (lives === 0) {
        console.log("You are dead");
    }
}
 function checkCollisions() {
    var e;
    var eLength=enemies.length-1;
    for (e=eLength; e>=0; e--){
        if(hitTest(enemies[e], hero)){
            stage.removeChild(enemies[e]);
            enemies.splice(e, 1);
            scoreUp();
            if(enemies.length===0){
                level++;
                addEnemies();
            }
            break;
        }
    }
    eLength=stones.length-1;
    for (e=eLength; e>=0; e--){
        if(hitTest(stones[e], hero)){
            stage.removeChild(stones[e]);
            stones.splice(e, 1);
            levelDown();
            if(stones.length===0){
                addEnemies();
            }
            break;
        }
    }
}
 function moveEnemies() {
    var i;
    var numEnemies = enemies.length;
    for (i = numEnemies - 1; i >= 0; i--) {
        enemies[i].y++;
        if (enemies[i].y > stage.canvas.height + 30) {
            levelDown();
            stage.removeChild(enemies[i]);
            enemies.splice(i, 1);
        }
    }
    numEnemies = stones.length;
    for (i = numEnemies - 1; i >= 0; i--) {
        stones[i].y++;
        if (stones[i].y > stage.canvas.height + 30) {
            stage.removeChild(stones[i]);
            stones.splice(i, 1);
        }
    }
}


function scoreUp() {
    score++;
    if (score >= level*scoreToNextLevel) {
        level++;
        console.log("Level: " + score)
    }
    //scoreText="Score: "+score;
}






function tock(e) {
    if (lives > 0) {
        addEnemies();
        moveEnemies();
        moveHero();
        checkCollisions();
    };

    stage.update(e);
}
