var waveObj = function () {
    this.x = [];
    this.y = [];

    this.alive = [];
    this.r = [];
}

waveObj.prototype.num = 10;
waveObj.prototype.init = function () {
    for(var i = 0; i < this.num; i++) {
        this.alive[i] = false;
        this.r[i] = 0;
    }
}

waveObj.prototype.draw = function () {
    ctx1.save();
    ctx1.lineWidth = 2;
    ctx1.shadowBlur = 10;
    ctx1.shadowColor = 'rgba(0, 255, 255, 1)'
    for(var i = 0; i < this.num; i++) {
        if(this.alive[i]) {
            //draw
            this.r[i] += deltaTime * 0.04;
            if(this.r[i] > 50) {
                this.alive[i] = false;
                break;
                // this.r[i] = 100;
            }
            var alpha = 1 - this.r[i] / 50;
            ctx1.beginPath();
            ctx1.strokeStyle = 'rgba(0, 255, 255,' + alpha + ')';
            ctx1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
            ctx1.closePath();
            ctx1.stroke();
        }
    }
    ctx1.restore();
}

waveObj.prototype.born = function (x, y) {
    for(var i = 0; i < this.num; i++) {
        if(!this.alive[i]) {
            this.alive[i] = true;
            this.r[i] = 10;
            this.x[i] = x;
            this.y[i] = y;
            //找到一个就return出来，否则每个符合条件的都会出来
            return;
        }
    }
}