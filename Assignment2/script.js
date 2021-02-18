var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

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

class Maze{
    constructor(size) {
        console.log("init maze");
        this.size = size;
        this.gridlength = 20;
        this.map = [this.size];
        this.start = Math.floor(Math.random() * this.size);
        for(var x = 0; x<=size; x++)
        {
            this.map[x] = [];
            for(var y = 0; y <=this.size; y++ )
            {
                this.map[x][y] = new Cell(x,y,this.size);
            }
        }
        this.createMaze();
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
            console.log("UPDATED x:"+x + " y:"+y)
            
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
            this.drawMaze();
        
        }
       
    }
    drawMaze(){
        console.log("draw maze");
        let hor =  "+---";
        let vert = "   |";
        let emptVert = "    ";
        let emptHor = "+   ";
        let output = "";
        for(var x = 0; x< this.size;  x++)
        {
            output += hor;
        }
        output +="+\n";

        for (var x = 0; x < this.size; x++)
        {
            var ERow = "|";
            var SRow = "";
            for (var y = 0; y < this.size; y++)
            {
                ERow += this.map[x][y].Walls.includes(Wall.E) ? vert : emptVert;
                SRow += this.map[x][y].Walls.includes(Wall.S) ? hor : emptHor;
            }
            output += ERow + "\n";
            output += SRow += "+\n";
        }
        console.log(output);   
    }
}

function gameLoop(time) {
  //  ...compute elapsed time...

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

new Maze(5);
