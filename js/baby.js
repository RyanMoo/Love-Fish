var babyObj = function () {
    this.x;
    this.y;
    this.angle;
    // this.babyEye = new Image();
    // this.babyBody = new Image();
    // this.babyTail = new Image();

    this.babyTailTimer = 0;
    this.babyTailCount = 0;

    this.babyEyeTimer = 0;
    this.babyEyeCount = 0;
    this.babyInterval = 1000;

    this.babyBodyTimer = 0;
    this.babyBodyCount = 0;

}

babyObj.prototype.init = function () {
    this.x = canWidth * 0.5 - 50;
    this.y = canHeight * 0.5 + 50;
    this.angle = 0;
    // this.babyEye.src = './img/babyEye0.png';
    // this.babyBody.src = './img/babyFade0.png';
    // this.babyTail.src = './img/babyTail0.png';
}

babyObj.prototype.draw = function () {
    this.x = lerpDistance(mom.x, this.x, 0.99);
    this.y = lerpDistance(mom.y, this.y, 0.99);

    var deltaY = mom.y - this.y;
    var deltaX = mom.x - this.x;
    var beta = Math.atan2(deltaY, deltaX) + Math.PI;
    // lerp angle
    this.angle = lerpAngle(beta, this.angle, 0.6);

    // baby tail count
    this.babyTailTimer += deltaTime;
    if(this.babyTailTimer > 50) {
        this.babyTailCount = (this.babyTailCount + 1) % 8;
        this.babyTailTimer %= 50;
    }

    //baby eye
    this.babyEyeTimer += deltaTime;
    if(this.babyEyeTimer > this.babyInterval) {
        this.babyEyeCount = (this.babyEyeCount + 1) % 2;
        this.babyEyeTimer %= this.babyInterval;

        if(this.babyEyeCount == 0) {
            this.babyInterval = Math.random() * 1500 + 2000;
        }else {
            this.babyInterval = 200;
        }
    }

    // baby body
    this.babyBodyTimer += deltaTime;
    if(this.babyBodyTimer > 300) {
        this.babyBodyCount += 1;
        this.babyBodyTimer %= 300;
        if(this.babyBodyCount > 19) {
            this.babyBodyCount = 19;
            // game over
            data.gameOver = true;
        }
    }

    ctx1.save();
    ctx1.translate(this.x, this.y);
    ctx1.rotate(this.angle);
    // var babyTailCount = this.babyTailCount;
    ctx1.drawImage(babyTail[this.babyTailCount], -babyTail[this.babyTailCount].width * .5 + 25, -babyTail[this.babyTailCount].height * .5);
    ctx1.drawImage(babyBody[this.babyBodyCount], -babyBody[this.babyBodyCount].width * .5, -babyBody[this.babyBodyCount].height * .5);
    ctx1.drawImage(babyEye[this.babyEyeCount], -babyEye[this.babyEyeCount].width * .5, -babyEye[this.babyEyeCount].height * .5);
    ctx1.restore();
}



