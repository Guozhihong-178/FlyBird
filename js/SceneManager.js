(function () {
    var sm = window.SceneManager = function () {
        //sm的场景编号
        this.sceneNo = 1;
        //实例化背景
        game.bg = new Background();
        //实例化大地
        game.land = new Land();
        //实例化鸟
        game.bird = new Bird();
        //Flash和Logo图片的Y值
        this.FlashY = 0;
        this.LogoY = game.canvas.height;
        this.bindEvent();
        //这两个参数用于控制爆炸效果
        this.i = 0;
        this.j = 0;
        //这个参数用于控制鸟死亡下落的重力
        this.g = 1;
    };
    sm.prototype.update = function () {
        switch (this.sceneNo) {
            case 1:
                this.FlashY += 4;
                this.LogoY -= 4;
                if(this.FlashY > game.canvas.height * (1-0.618)){
                    this.FlashY = game.canvas.height * (1-0.618);
                }
                if(this.LogoY < game.canvas.height * (1-0.618)+100){
                    this.LogoY = game.canvas.height * (1-0.618)+100
                }
                break;
            case 2:
                //判断鸟是否死亡，真则切换到场景3
                if(game.bird.isDie){
                    this.enter(3)
                }
                break;
            case 3:
                this.g ++;
                if(game.bird.y < game.canvas.height*0.618+99){
                    game.bird.y += 0.4 * this.g;
                }else{
                    this.enter(4);
                }
                break;
            case 4:
                if(game.time_count%100 === 0){
                    this.i++;
                    if(this.i > 3 && this.j === 0){
                        this.i = 0;
                        this.j = 1;
                    }else if(this.i > 3 && this.j === 1){
                        this.i = 3;
                        this.j = 1;
                        this.enter(5);
                    }
                }
                break;
            case 5:
                this.FlashY += 4;
                if(this.FlashY > game.canvas.height * (1-0.618)){
                    this.FlashY = game.canvas.height * (1-0.618);
                }
                break;
        }
    };
    sm.prototype.render = function () {
        //清屏
        game.ctx.clearRect(0,0,game.canvas.width,game.canvas.height);
        switch (this.sceneNo) {
            case 1:
                //场景1：游戏开始界面
                game.bg.render();
                game.land.render();
                game.bg.update();
                game.land.update();
                game.ctx.drawImage(game.imgArr["Flash"],0,0,204,69,game.canvas.width / 2 - 102,this.FlashY,204,69);
                game.ctx.drawImage(game.imgArr["Logo"],game.canvas.width / 2 - 160,this.LogoY);
                break;
            case 2:
                //场景2：游戏开始
                //每隔两秒new一个管子
                if(game.time_count > 2000){
                    game.time_count = 0;
                    new Pipe();
                }
 
                game.bg.render();
                game.land.render();
                game.bg.update();
                game.land.update();
 
                //遍历管子数组，更新并渲染
                for (let i=0;i<game.pipeArr.length;i++){
                    game.pipeArr[i].update();
                    game.pipeArr[i].render();
                }
                game.bird.update();
                game.bird.render();
 
                //绘制游戏分数
                game.ctx.save();
                game.ctx.font = "26px 微软雅黑";
                game.ctx.textBaseline = "top";
                game.ctx.beginPath();
                game.ctx.fillText("分数：",0,15);
                game.ctx.restore();
                var number = game.score.toString();
                for(let i=0; i<number.length; i++){
                    game.ctx.drawImage(game.imgArr["Number"],28*parseInt(number[i]),0,28,36,28*i+75,10,28,36);
                }
                break;
            case 3:
                //场景3：小鸟撞地死亡
                //每隔两秒new一个管子
                if(game.time_count === 2000){
                    game.time_count = 0;
                    new Pipe();
                }
 
                game.bg.render();
                game.land.render();
 
                //遍历管子数组，更新并渲染
                for (let i=0;i<game.pipeArr.length;i++){
                    game.pipeArr[i].render();
                }
                game.bird.render();
 
                //绘制游戏分数
                game.ctx.save();
                game.ctx.font = "26px 微软雅黑";
                game.ctx.textBaseline = "top";
                game.ctx.beginPath();
                game.ctx.fillText("分数：",0,15);
                game.ctx.restore();
                var number = game.score.toString();
                for(let i=0; i<number.length; i++){
                    game.ctx.drawImage(game.imgArr["Number"],28*parseInt(number[i]),0,28,36,28*i+75,10,28,36);
                }
                break;
            case 4:
                //游戏结束：鸟撞管子死亡动画
                //每隔两秒new一个管子
                if(game.time_count === 2000){
                    game.time_count = 0;
                    new Pipe();
                }
 
                game.bg.render();
                game.land.render();
 
                //遍历管子数组，更新并渲染
                for (let i=0;i<game.pipeArr.length;i++){
                    game.pipeArr[i].render();
                }
 
                //绘制游戏分数
                game.ctx.save();
                game.ctx.font = "26px 微软雅黑";
                game.ctx.textBaseline = "top";
                game.ctx.beginPath();
                game.ctx.fillText("分数：",0,15);
                game.ctx.restore();
                var number = game.score.toString();
                for(let i=0; i<number.length; i++){
                    game.ctx.drawImage(game.imgArr["Number"],28*parseInt(number[i]),0,28,36,28*i+75,10,28,36);
                }
                //当鸟的y值大于地面的高度，则产生爆炸效果
                if(game.bird.y > game.canvas.height*0.618+99){
                    game.ctx.drawImage(game.imgArr["Bomb"],128*this.i,128*this.j,128,128,game.bird.x-34,game.bird.y-34,34*2,34*2);
                }
                break;
            case 5:
                //游戏结束：GameOver
                if(game.time_count === 2000){
                    game.time_count = 0;
                    new Pipe();
                }
 
                game.bg.render();
                game.land.render();
 
                //遍历管子数组，更新并渲染
                for (let i=0;i<game.pipeArr.length;i++){
                    game.pipeArr[i].render();
                }
 
                //绘制游戏分数
                game.ctx.save();
                game.ctx.font = "26px 微软雅黑";
                game.ctx.textBaseline = "top";
                game.ctx.beginPath();
                game.ctx.fillText("分数：",0,15);
                game.ctx.restore();
                var number = game.score.toString();
                for(let i=0; i<number.length; i++){
                    game.ctx.drawImage(game.imgArr["Number"],28*parseInt(number[i]),0,28,36,28*i+75,10,28,36);
                }
                //GameOver图标往下移动到屏幕中间
                game.ctx.drawImage(game.imgArr["Flash"],204,0,204,69,game.canvas.width / 2 - 102,this.FlashY,204,69);
 
        }
    };
    //进入某个场景时需要做的操作
    sm.prototype.enter = function (sceneNo) {
        switch (sceneNo) {
            case 1:
                this.sceneNo = 1;
                this.FlashY = 0;
                this.LogoY = game.canvas.height;
                game.bird = new Bird();
                //实例化背景
                game.bg = new Background();
                //实例化大地
                game.land = new Land();
                game.pipeArr = [];
                game.time_count = 0;
                game.score = 0;
                //这两个参数用于控制爆炸效果
                this.i = 0;
                this.j = 0;
                //这个参数用于控制鸟死亡下落的重力
                this.g = 1;
                break;
            case 2:
                this.sceneNo = 2;
                //sm的场景编号
                break;
            case 3:
                this.sceneNo = 3;
                break;
            case 4:
                this.sceneNo = 4;
                break;
            case 5:
                this.sceneNo = 5;
                this.FlashY = 0;
                break;
        }
    };
    //
    sm.prototype.bindEvent = function () {
        //当点击canvas时，通过判断在哪个场景的哪个位置来做出相应的事件
        game.canvas.onclick =  () => {
            switch (this.sceneNo) {
                case 1:
                    game.bird.isDie = false;
                    game.bird.x = game.canvas.width*(1-0.618);
                    game.bird.y = game.canvas.height*0.618*(1-0.618);
                    this.enter(2);
                    break;
                case 2:
                    game.bird.fly();
                    break;
                case 3:
                    break;
                case 4:
                    break;
                case 5:
                    this.enter(1);
                    break;
            }
        }
    }
})();