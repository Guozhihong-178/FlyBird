(function () {
    var Bird = window.Bird = function () {
        this.image = game.imgArr["Bird"];
        this.x = game.canvas.width*(1-0.618);
        this.y = game.canvas.height*0.618*(1-0.618);
        //小鸟旋转的角度
        this.deg = 0;
        //小鸟是否在飞
        this.isFly = false;
        //帧数
        this.fno = 0;
        //鸟的颜色
        this.birdColor = 24*parseInt(Math.random()*3);
        //鸟扇动翅膀的图片的编号
        this.wingNo = 0;
        //下面的四个变量用于碰撞检测,代表鸟的上下左右的最小矩形框
        this.L = this.R = this.T = this.B = 0;
        //该变量用于保存鸟是否为死亡状态
        this.isDie = false;
    };
    Bird.prototype.render = function () {
        game.ctx.save();
        game.ctx.translate(this.x,this.y);
        game.ctx.rotate(this.deg);
        game.ctx.beginPath();
        game.ctx.drawImage(this.image,34*this.wingNo,this.birdColor,34,24,-17,-12,34,24);
        game.ctx.restore();
        // game.ctx.fillRect(this.L,this.T,34,24);
 
    };
    Bird.prototype.update = function () {
        this.L = this.x-17;
        this.R = this.x + 17;
        this.T = this.y-12;
        this.B = this.y + 12;
 
        //判断鸟是否飞出天空，真则不让飞出,
        if(this.T < 0){
            //这里不能使用this.T = 0;因为
            //game.ctx.drawImage(this.image,34*this.wingNo,this.birdColor,34,24,-17,-12,34,24);
            //game.ctx.translate(this.x,this.y);这里是根据x,y来绘制鸟的，固定T鸟还是飞出屏幕
            this.y = 12;
        }
        if(this.isFly){
            //这里为扇动翅膀动画
            if(this.fno%2 === 0){
                this.wingNo++;
            }
            if(this.wingNo > 2){
                this.wingNo = 0;
            }
            //当有点击事件时，鸟儿向上飞一段距离
            this.y -= 0.4 * (20-this.fno);
            if(this.fno === 20){
                this.fno = 0;
                this.isFly = false;
            }
            this.deg -= (Math.PI/180)*6;
            if(this.deg < -(Math.PI/180)*45){
                this.deg = -(Math.PI/180)*45;
            }
        }else{
            this.y += 0.4 * this.fno;
            this.deg += (Math.PI/180)*3;
            if(this.deg > (Math.PI/180)*90){
                this.deg = (Math.PI/180)*90;
            }
        }
        this.fno++;
    };
    Bird.prototype.fly = function () {
        this.fno = 0;
        this.isFly = true;
    }
})();