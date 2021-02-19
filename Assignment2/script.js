var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var home ="Assignment2\\sprites\\PinkHome.png";
const Wall = {
    N: 0,
    S: 1,
    E: 2,
    W: 3,
}

class Cell {
    constructor(x, y, size){
        this.x = x;
        this.y = y;
        this.size = size;
        this.inMaze = false;
        this.inFrontier = false;
        this.Walls = [Wall.N, Wall.S, Wall.E, Wall.W];
        
    }

    getNeighbors(){
        var neighbors = [];
        if (this.x > 0){
            neighbors.push({x:this.x-1, y: this.y});
        }
        if(this.x + 1 < this.size ){
            neighbors.push({x: this.x+1, y: this.y});
        }
        if(this.y > 0){
            neighbors.push({x:this.x, y: this.y-1});
        }
        if(this.y +1 < this.size ){
            neighbors.push({x:this.x, y: this.y+1});
        }
        return neighbors;
    }
}
class Player{
    constructor(x, y, imgSrc) {
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.isReady = false;
        this.image.onload = function() {
            this.image.isReady = true;
        };
        this.image.src = imgSrc;
    }
    
    render(){
        if (this.image.isReady) {
            context.drawImage(this.image,
            this.x * (COORD_SIZE / 3), this.y * (COORD_SIZE / 3));
        }
    }
}

function moveCharacter(key, character) {
    if (key === 'ArrowDown') {
        if (character.location.edges.s) {
            character.location = character.location.edges.s;
        }
    }
    if (key == 'ArrowUp') {
        if (character.location.edges.n) {
            character.location = character.location.edges.n;
        }
    }
    if (key == 'ArrowRight') {
        if (character.location.edges.e) {
            character.location = character.location.edges.e;
        }
    }
    if (key == 'ArrowLeft') {
        if (character.location.edges.w) {
            character.location = character.location.edges.w;
        }
    }
}
class Maze{
    constructor() {
        console.log("init maze");
        this.size = size;
        this.gridlength = Math.floor(800/size)-5;
        this.map = [this.size];
        this.startPoint = {x:0, y:0};
        this.endPoint = {x:size-1, y:size-1};
        this.visited = [];
        for(var x = 0; x<=size; x++)
        {
            this.map[x] = [];
            for(var y = 0; y <=this.size; y++ )
            {
                this.map[x][y] = new Cell(x,y,this.size);
            }
        }
       
    }

    createMaze(){
        console.log("create maze")
        var frontier = [];
        var x = Math.floor(Math.random() * this.size);
        var y = Math.floor(Math.random() * this.size);
        let fx = 0;
        let fy = 0;
        this.map[x][y].inMaze = true;
        this.map[x][y].inFrontier = true;
        frontier.push({x:x, y:y});

        while(frontier.length > 0)
        {
            console.log(this.map[x][y])
            this.map[x][y].getNeighbors().forEach( n => {
                if(!this.map[n.x][n.y].inFrontier && !this.map[n.x][n.y].inMaze)
                {
                    this.map[n.x][n.y].inFrontier = true;
                    frontier.push(n);
                }
            });
            frontier = frontier.filter(c =>!this.map[c.x][c.y].inMaze );
            if(frontier.length == 0)
            {
                continue;
            }

            // Get random cell from frontier
            console.log(frontier);
            let i = Math.floor(Math.random() * frontier.length);
            
            let cellCoord = frontier[i];
            x = cellCoord.x;
            y = cellCoord.y;
            if(Math.floor(Math.random() * 100) < 10)
            {   
                this.visited.push(cellCoord);
            }
            
            this.map[x][y].inMaze = true;

            let AvailableNeighbors = [];
            this.map[x][y].getNeighbors().forEach(coord => {
                if (this.map[coord.x][coord.y].inMaze)
                    AvailableNeighbors.push(coord);
            });
            
            let ix = Math.floor(Math.random() * AvailableNeighbors.length);
           
            fx = AvailableNeighbors[ix].x;
            fy = AvailableNeighbors[ix].y;
           
            if (fx < x)
            {
                this.map[x][y].Walls =this.map[x][y].Walls.filter(w => w != Wall.N);
                this.map[fx][fy].Walls =this.map[fx][fy].Walls.filter(w => w != Wall.S);
            }
            else if (fx > x)
            {
                this.map[x][y].Walls =this.map[x][y].Walls.filter(w => w != Wall.S);
                this.map[fx][fy].Walls =this.map[fx][fy].Walls.filter(w => w != Wall.W);
            }
            else if (fy < y)
            {
                this.map[x][y].Walls = this.map[x][y].Walls.filter(w => w != Wall.W);
                this.map[fx][fy].Walls =this.map[fx][fy].Walls.filter(w => w != Wall.E);
            }
            else if (fy > y)
            {
                this.map[x][y].Walls =this.map[x][y].Walls.filter(w => w != Wall.E);
                this.map[fx][fy].Walls = this.map[fx][fy].Walls.filter(w => w != Wall.W);
            }
            // this.drawMaze();
        
        }
       
    }
    // drawMaze(){
    //     console.log("draw maze");
    //     // let shortestPath = this.BFS();
    //     let hor =  "+---";
    //     let vert = "|";
    //     let emptVert = " ";
    //     let emptHor = "+   ";
    //     let output = "";
    //     for(var x = 0; x< this.size;  x++)
    //     {
    //         output += hor;
    //     }
    //     output +="+\n";

    //     for (var x = 0; x < this.size; x++)
    //     {
    //         var ERow = "|";
    //         var SRow = "";
    //         for (var y = 0; y < this.size; y++)
    //         {
    //            // ERow += shortestPath.has({ x:x, y:y}) ? " X " : "   ";
    //             ERow += this.map[x][y].Walls.includes(Wall.E) ? vert : emptVert;
    //             SRow += this.map[x][y].Walls.includes(Wall.S) ? hor : emptHor;
    //         }
    //         output += ERow + "\n";
    //         output += SRow += "+\n";
    //     }
    //     console.log(output);   
    // }
    drawCanvasMaze(){
        console.log("draw maze");
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 5;
        var start_i =50;
        var start_j = 50;
        var spriteStart = {x:0, y:0};
        var spriteEnd = {x:0, y:0};
        var i =50;
        var j =50;
        ctx.beginPath();
        ctx.moveTo(start_i, start_j);
        ctx.lineTo(start_i + (this.gridlength * this.size) , start_j);
        ctx.moveTo(start_i, start_j);
      

        for (var x = 0; x < this.size; x++)
        {
            j = start_i + (this.gridlength *(x+1));
            ctx.lineTo(start_i , j);
            for (var y = 0; y < this.size; y++)
            {
                i = (start_i + (this.gridlength *(y+1)));
                if(this.map[x][y].Walls.includes(Wall.S))
                {
                    ctx.lineTo(i , j);
                }
                else
                {
                    ctx.moveTo(i, j);
                }
                if(this.map[x][y].Walls.includes(Wall.E))
                {
                    ctx.lineTo(start_i + (this.gridlength *(y+1)), j-this.gridlength);
                    ctx.moveTo(start_i + (this.gridlength *(y+1)), j);
                }
            }
            ctx.moveTo(start_i , j);
        }
        
        ctx.stroke();
    }
}

var size = 0;
var MazeGame = null;
function gameLoop(time) {
  //  ...compute elapsed time...
    elapsedTime = time;
    processInput(elapsedTime);
    update(elapsedTime);
    render(elapsedTime);

    requestAnimationFrame(gameLoop);
}
function processInput(elapsedTime){
    

}
function update(elapsedTime){

}

function render(elapsedTime){

}


