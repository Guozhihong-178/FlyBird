//背景类
(function () {
    var Background = window.Background = function () {
        this.image = game.imgArr["Back1"];
        this.speed = 0;
    };
    //创建render方法
    Background.prototype.render = function () {
        game.ctx.clearRect(0,0,game.canvas.width,game.canvas.height);
        game.ctx.drawImage(this.image, this.speed, game.canvas.height*0.618-this.image.height*0.618);
        game.ctx.drawImage(this.image, this.image.width+this.speed, game.canvas.height*0.618-this.image.height*0.618);
        game.ctx.drawImage(this.image, this.image.width*2+this.speed, game.canvas.height*0.618-this.image.height*0.618);
        game.ctx.save();
        game.ctx.fillStyle = "#4EC0CA";
        game.ctx.beginPath();
        game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height*0.618-this.image.height*0.618+10);
        game.ctx.restore();
        game.ctx.save();
        game.ctx.fillStyle = "#DED895";
        game.ctx.beginPath();
        game.ctx.fillRect(0, game.canvas.height*0.618+this.image.height*(1-0.618)-10, game.canvas.width, game.canvas.height*(1-0.618)-this.image.height*(1-0.618)+10);
        game.ctx.restore();
    };
    Background.prototype.update = function () {
        this.speed--;
        if(-this.speed === this.image.width){
            this.speed = 0;
        }
    }
})();