var haloObj = function () {
    this.x = [];
    this.y = [];

    this.alive = [];
    this.r = [];
}

haloObj.prototype.num = 5;
haloObj.prototype.init = function () {
    for(var i = 0; i < this.num; i++) {
        this.alive[i] = false;
        this.r[i] = 0;
    }
}

haloObj.prototype.draw = function() {
    ctx1.save();
    ctx1.lineWidth = 2;
    ctx1.shadowBlur = 10;
    ctx1.shadowColor = 'rgba(255, 60, 25, 1)';
    for(var i = 0; i < this.num; i++) {
        if(this.alive[i]) {
            //draw
            this.r[i] += deltaTime * 0.04;
            if(this.r[i] > 80) {
                this.alive[i] = false;
                break;
                // this.r[i] = 100;
            }
            var alpha = 1 - this.r[i] /80;
            ctx1.beginPath();
            ctx1.strokeStyle = 'rgba(255, 60, 25,' + alpha + ')';
            ctx1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
            ctx1.closePath();
            ctx1.stroke();
        }
    }
    ctx1.restore();
}

haloObj.prototype.born = function(x, y) {
    for(var i = 0; i < this.num; i++) {
        if(!this.alive[i]) {
            this.alive[i] = true;
            this.r[i] = 20;
            this.x[i] = x;
            this.y[i] = y;
            return;
        }
    }
}

