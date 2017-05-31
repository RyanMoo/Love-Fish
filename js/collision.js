// 判断大鱼和果实的距离
function momFruitsCollision() {
    if(!data.gameOver) {
        for(var i = 0; i < fruit.num; i++) {
            if(fruit.alive[i]) {
                var l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);
                if(l < 900) {
                    //fruit eaten
                    fruit.dead(i);
                    data.fruitNum++;
                    mom.momBodyCount++;
                    if(mom.momBodyCount >= 7) {
                        mom.momBodyCount = 7;
                    }
                    if(fruit.fruitType[i] == 'blue') {
                        data.double = 2;
                    }
                    wave.born(fruit.x[i], fruit.y[i]);
                }
            }
        }
    }
}

// 判断大鱼和小鱼的距离
function momBabyCollision() {
    if(data.fruitNum > 0 && !data.gameOver) {
        var l = calLength2(baby.x, baby.y, mom.x, mom.y);
        if(l < 900) {
            baby.babyBodyCount = 0;

            mom.momBodyCount = 0;
            //score updata
            data.addScore();
            halo.born(baby.x, baby.y);
        }
    }
}