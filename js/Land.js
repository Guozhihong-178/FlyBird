//大地类
(function () {
    var Land = window.Land = function () {
        this.image = game.imgArr["Land2"];
        this.speed = 0;
    };
 
    Land.prototype.render =  function () {
        game.ctx.drawImage(this.image, this.speed, game.canvas.height*0.618+99);
        game.ctx.drawImage(this.image, this.image.width+this.speed, game.canvas.height*0.618+99);
    };
 
    Land.prototype.update =  function () {
        //每次更新判断鸟是否着地，着地则结束游戏
        if( game.bird.B > game.canvas.height*0.618 + 80 ){
            game.bird.isDie = true;
        }
        //近处的物体速度快，故大地的速度比远处的树林和白云快
        this.speed -= 2;
 
        if( -this.speed > 640 ){
            this.speed = 0;
        }
    }
})();