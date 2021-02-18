var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
var leftPressed= false;
var rightPressed = false;
var shoot = false;
var Monsters = [];
var frame = 0


function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
    else if(e.key === ' ' || e.key === 'Spacebar' || e.key == "Enter") {
        shoot = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
    else if(e.key === ' ' || e.key === 'Spacebar' || e.key == "Enter") {
        shoot = false;
    }
    
}

function UpdateMonsters(){
    Monsters = Monsters.filter(x => x.active == 0);
    if(Monsters.length< 5 && frame == 10) 
    {
        let x = Math.floor(Math.random() * 600) + 30;  
        let y = Math.floor(Math.random() * 20) + 1;  
        Monsters.push(new Monster(x, y, 35,20));
        frame = 0;
    }
    Monsters.forEach(x => x.update());
    frame += 1;
}
class Monster{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.dy = 1;
        this.dx = Math.floor(Math.random() * 8) + 1;
        this.counter = 0;
        this.max =  Math.floor(Math.random() * 20) + 8;;
        this.active = 0;
        this.fill = '#' + Math.random().toString(16).substr(-6);
    }
    update(){
        if(this.counter == this.max)
        {
            this.dx = -this.dx;
            this.counter =0;
        }
        if(this.y > canvas.height)
        {
            this.active = 1;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.counter+=1;
    }
    draw(){
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.fill;
        ctx.fill();
        ctx.closePath();
    }
}
//800 by 600
class Bullet {
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.dy = 5;
        this.active = 0;
    }
    update(){
        Monsters.filter(m => m.active == 0).map(monster => {
            if(this.x > monster.x  && this.x < monster.x+ monster.width && 
                this.y > monster.y  && this.y < monster.y+ monster.height )
                {
                    monster.active = 1;
                    this.active = 1;
                }
        });
        if(this.y+5 > 0)
        {
            this.y -= this.dy;
        }

    }
    draw(){
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.width, this.height, Math.PI , 0, 2 * Math.PI);
        ctx.fillStyle == 'black';
        ctx.fill();
        ctx.closePath();
    }
}
class Ship{
    constructor(point1, point2, point3) {
        this.p1 = point1;
        this.p2 = point2;
        this.p3 = point3;
        this.dx = 5;
        this.Bullets = [];
      }
    update(){
        if(rightPressed && this.p2.x <= canvas.width)
        {
            this.p1.x += this.dx;
            this.p2.x += this.dx;
            this.p3.x += this.dx;
        }
        if(leftPressed && this.p1.x >=0)
        {
            this.p1.x -= this.dx;
            this.p2.x -= this.dx;
            this.p3.x -= this.dx;
        }
        if(shoot)
        {
            this.Bullets = this.Bullets.filter(b => b.y >= 0);
            if( (this.Bullets.length == 0 ) ||
                (this.Bullets.length > 0 && this.Bullets[this.Bullets.length -1].y < this.p3.y - 20))
            {
                this.Bullets.push(new Bullet(this.p3.x, this.p3.y -8, 2, 5));
            }
        }

        this.Bullets.forEach(bullet => bullet.update());
    }
    draw(){
        ctx.beginPath();
        ctx.moveTo(this.p1.x, this.p1.y);
        ctx.lineTo(this.p2.x, this.p2.y);
        ctx.lineTo(this.p3.x, this.p3.y);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.closePath();

        this.Bullets.forEach(bullet => bullet.draw());
    } 
}

function UpdateGame(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    UpdateMonsters();
    player.update();
    
    player.draw();
    Monsters.forEach(x => x.draw());
}

var bullet = new Bullet(100, 100, 2, 5);
var player = new Ship({x:350,y:500}, {x:450,y:500}, {x:400,y:475});

Interval = setInterval(UpdateGame, 30);