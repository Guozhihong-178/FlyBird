(function () {
    var Pipe = window.Pipe = function () {
        this.Pipe1 = game.imgArr["Pipe1"];
        this.Pipe2 = game.imgArr["Pipe2"];
        this.height = game.canvas.height*0.618+99;
        //两个管子之间的空隙高度
        this.interspace = 150;
        //上面的管子随机高度
        this.randomHeight = 140 + parseInt(Math.random()*180);
        //下面的管子的高度等于this.height-this.randomHeight-this.interspace
        this.Pipe2_height = this.height-this.randomHeight-this.interspace;
        this.speed = 0;
        //该变量用于碰撞检测
        this.L = 0;
        //该变量用于判断鸟是否已经通过管子，防止重复加分
        this.alreadyPass = false;
        //将自己推入数组
        game.pipeArr.push(this);
    };
 
    Pipe.prototype.render = function () {
        this.L = game.canvas.width+10+this.speed;
        //当下面的管子高度小于40时，重新取值
        while (this.Pipe2_height < 40){
            this.randomHeight = 140 + parseInt(Math.random()*180);
            this.Pipe2_height = this.height-this.randomHeight-this.interspace;
        }
        game.ctx.drawImage(this.Pipe1, 0, this.Pipe1.height-this.randomHeight, 52, this.randomHeight, this.L, 0, 52, this.randomHeight);
        game.ctx.drawImage(this.Pipe2, 0, 0, 52, this.Pipe2_height, this.L,  this.randomHeight+this.interspace, 52, this.Pipe2_height);
    };
 
    Pipe.prototype.update = function () {
        //每次更新判断管子是否碰到鸟clearInterval(game.timer)
        if(this.L < game.bird.R && this.L+52 > game.bird.L){
            if(this.randomHeight > game.bird.T || this.randomHeight + this.interspace < game.bird.B){
                game.bird.isDie = true;
            }
        }
        this.speed -= 2;
        //判断鸟是否通过管子，真则加分
        if(game.bird.L > game.canvas.width+this.speed+52 && !this.alreadyPass){
            game.score++;
            this.alreadyPass = true;
        }
 
        //当管子移出画布时，将其从数组中移除
        if(-this.speed > game.canvas.width + 60){
            game.pipeArr.shift();
            this.speed = 0;
        }
    }
})();