var can1;
var can2;

var canWidth;
var canHeight;

var ctx1;
var ctx2;

var lastTime;
var deltaTime;

var ane;
var fruit;

var mom;
var baby;
//鼠标位置
var mx;
var my;

var babyTail = [];
var babyEye = [];
var babyBody = [];

var momTail = [];
var momEye = [];
var momBodyOra = [];
var momBodyBlue = [];

var wave;
var halo;

var bgPic = new Image();

var dust;
var dustPic = [];

document.body.onload = game;
function game() {
    init();

    lastTime = Date.now();
    deltaTime = 0;

    gameloop();

}

function init() {
    // 获得canvas context
    can1 = document.getElementById('canvas1');//fishes, dust, UI, circle
    ctx1 = can1.getContext("2d");
    can2 = document.getElementById('canvas2');//background, ane, fruits
    ctx2 = can2.getContext("2d");

    canWidth = can1.width;
    canHeight = can1.height;

    can1.addEventListener('mousemove', onMouseMove, false);

    bgPic.src = "./img/background.jpg"

    ane = new aneObj();
    // console.log(ane)
    ane.init();

    fruit = new fruitObj();
    fruit.init();

    mom = new momObj();
    mom.init();

    baby = new babyObj();
    baby.init();

    mx = canWidth * .5;
    my = canHeight * .5;

    for(var i = 0; i < 8; i++) {
        babyTail[i] = new Image();
        babyTail[i].src = './img/babyTail' + i + '.png';
    }
    for(var i = 0; i < 2; i++) {
        babyEye[i]  = new Image();
        babyEye[i].src = './img/babyEye' + i + '.png';
    }
    for(var i = 0; i < 20; i++) {
        babyBody[i] = new Image();
        babyBody[i].src = './img/babyFade' + i + '.png';
    }

    for(var i = 0; i < 8; i++) {
        momTail[i] = new Image();
        momTail[i].src = './img/bigTail' + i + '.png';
    }

    for(var i = 0; i < 2; i++) {
        momEye[i] = new Image();
        momEye[i].src = './img/bigEye' + i + '.png';
    }

    data = new dataObj();

    for(var i = 0; i < 8; i++) {
        momBodyOra[i] = new Image();
        momBodyBlue[i] = new Image();
        momBodyOra[i].src = './img/bigSwim' + i + '.png';
        momBodyBlue[i].src = './img/bigSwimBlue' + i + '.png';
    }

    ctx1.font = '30px Verdana';
    ctx1.textAlign = 'center';

    wave = new waveObj();
    wave.init();

    halo = new haloObj();
    halo.init();

    for(var i = 0; i < 7; i++) {
        dustPic[i] = new Image();
        dustPic[i].src = './img/dust' + i + '.png';
    }
    dust = new dustObj();
    dust.init();

}

function gameloop() {
    requestAnimFrame(gameloop);
    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    if(deltaTime > 40) {
        deltaTime = 40;
    }
    console.log(deltaTime);

    drawBackground();
    ane.draw();
    fruitCount();
    fruit.draw();

    ctx1.clearRect(0, 0, canWidth, canHeight);
    mom.draw();
    baby.draw();
    momFruitsCollision();
    momBabyCollision();

    data.draw();
    wave.draw();
    halo.draw();
    dust.draw();
}

function onMouseMove(e) {
    if(!data.gameOver) {
        if(e.offSetX || e.layerX) {
            mx = e.offSetX == undefined ? e.layerX : e.offSetX;
            my = e.offSetY == undefined ? e.layerY : e.offSetY;
        }
    }
}

