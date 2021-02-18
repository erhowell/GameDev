using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;

namespace Assignment2
{
    public class Game1 : Game
    {
        private GraphicsDeviceManager _graphics;
        private SpriteBatch _spriteBatch;
        private Cell[,] map;
        Random gen = new Random();
        public Game1()
        {
            _graphics = new GraphicsDeviceManager(this);
            Content.RootDirectory = "Content";
            IsMouseVisible = true;
        }

        protected override void Initialize()
        {
            // TODO: Add your initialization logic here
            int size = 10;
            map = new Cell[size, size];
            List<MazeWall> allWalls = new List<MazeWall>() { MazeWall.N, MazeWall.S, MazeWall.E, MazeWall.W };
            for (int x = 0; x < size; x++)
            {
                for (int y = 0; y < size; y++)
                {
                    map[x, y] = new Cell(x,y);
                }
            }
            base.Initialize();
            prims_algo(size);
            //drawPrims(size);
            //divide(0,0,size, size, isVertical());
            //OutputMaze(size);
        }

        protected override void LoadContent()
        {
            _spriteBatch = new SpriteBatch(GraphicsDevice);

            // TODO: use this.Content to load your game content here
        }

        protected override void Update(GameTime gameTime)
        {
            if (GamePad.GetState(PlayerIndex.One).Buttons.Back == ButtonState.Pressed || Keyboard.GetState().IsKeyDown(Keys.Escape))
                Exit();

            // TODO: Add your update logic here

            base.Update(gameTime);
        }

        protected override void Draw(GameTime gameTime)
        {
            GraphicsDevice.Clear(Color.CornflowerBlue);


            // TODO: Add your drawing code here

            base.Draw(gameTime);
            
        }

        private void prims_algo(int size)
        {
            List<int[]> frontier = new List<int[]>();
            int x = gen.Next(size);
            int y = gen.Next(size);
            
            map[x, y].inMaze = true;
            map[x, y].inFrontier = true;
            frontier.Add(new int[] { x, y });
            

            while (frontier.Count > 0)
            {
                
                map[x, y].GetNeighbors(size).ForEach(coord => {
                    if (!map[coord[0], coord[1]].inFrontier)
                    {
                        map[coord[0], coord[1]].inFrontier = true;
                        frontier.Add(coord);
                    }
                });
                frontier.RemoveAll(coord => map[coord[0], coord[1]].inMaze);
                if (frontier.Count == 0)
                    continue;
                List<int[]> AvailableNeighbors = new List<int[]>();
                int i = gen.Next(frontier.Count);
                int[] cellCoord = frontier[i];
                x = cellCoord[0];
                y = cellCoord[1];
                map[x, y].inMaze = true; // Add random cell to map
                
                map[x, y].GetNeighbors(size).ForEach(coord => {
                    if (map[coord[0], coord[1]].inMaze)
                        AvailableNeighbors.Add(coord);
                });
                int ix = gen.Next(AvailableNeighbors.Count);
                int fx = AvailableNeighbors[ix][0];
                int fy = AvailableNeighbors[ix][1];

                if (fx < x)
                {
                    map[x, y].Walls.Remove(MazeWall.N);
                    map[fx, fy].Walls.Remove(MazeWall.S);
                }
                else if (fx > x)
                {
                    map[x, y].Walls.Remove(MazeWall.S);
                    map[fx, fy].Walls.Remove(MazeWall.N);
                }
                else if (fy < y)
                {
                    map[x, y].Walls.Remove(MazeWall.W);
                    map[fx, fy].Walls.Remove(MazeWall.E);
                }
                else if (fy > y)
                {
                    map[x, y].Walls.Remove(MazeWall.E);
                    map[fx, fy].Walls.Remove(MazeWall.W);
                }
                drawPrims(size, x, y, fx, fy);
                Debug.WriteLine(String.Format("x:{0}  y{1}", x, y));
                Debug.WriteLine(String.Format("fx:{0}  fy{1}", fx, fy));
                
     
                
            }
        }

        private void drawPrims(int size, int i, int j,int fi,int fj)
        {
            string hor =  "+---";
            string vert = "   |";
            string emptVert = "    ";
            string emptHor = "+   ";
            string output = String.Empty;
            for(int x = 0; x< size;  x++)
            {
                output += hor;
            }
            output += "+\n";
            for (int x = 0; x < size; x++)
            {
                string ERow = "|";
                string SRow = String.Empty;
                for (int y = 0; y < size; y++)
                {
                    //ERow += ((x == i && y == j) ? " X " : (x == fi && y == fj) ? " F " : "   ");
                    ERow += map[x, y].Walls.Contains(MazeWall.E) ? vert : emptVert;
                    SRow += map[x, y].Walls.Contains(MazeWall.S) ? hor : emptHor;
                }
                output += ERow + "\n";
                output += SRow += "+\n";
            }


            Debug.WriteLine(output);
        }
        //private bool isVertical()
        //{
        //    int prob = gen.Next(100);
        //    return prob <= 50;
        //}
        //private bool isHorizontal(int width, int height)
        //{
        //    if (width < height)
        //        return true;
        //    else if (height < width)
        //        return false;
        //    else
        //        return gen.Next(100) <= 50;
        //}
        //private void divide(int x, int y, int width, int height, bool isHor)
        //{
        //    if (width < 2 || height < 2)
        //        return;

        //    int wx = x + (isHor ? 0 : gen.Next(width - 2));
        //    int wy = y + (isHor ? gen.Next(height - 2) : 0);


        //    int px = wx + (isHor ? gen.Next(1,width-1) : 0);
        //    int py = wy + (isHor ? 0 : gen.Next(1,height-1));

        //    int dx = isHor ? 1 : 0;
        //    int dy = isHor ? 0 : 1;

        //    int length = isHor ? width : height;


        //    MazeWall dir = isHor ? MazeWall.S : MazeWall.E;

        //    for(int i =0; i< length; i++)
        //    {
        //        if (map[wx, wy] == MazeWall.C && (wx != px || wy != py))
        //            map[wx, wy] = dir;
        //        wx += dx;
        //        wy += dy;
        //    }
        //    int nx = x;
        //    int ny = y;
        //    int w = isHor ? width : wx - x;
        //    int h = isHor? wy - y + 1 : height;

        //    divide(nx, ny, w, h, isHorizontal(w, h));

        //    nx = isHor? x : wx + 1;
        //    ny = isHor? wy + 1 : y;
        //    w = isHor? width : x + width - wx - 1;
        //    h = isHor? y + height - wy - 1 : height;
        //    divide( nx, ny, w, h, isHorizontal(w,h));
        //        }

        //private void OutputMaze(int size)
        //{
           
        //    string output = String.Empty;
        //    for (int x = 0; x < size*2 + 1; x++)
        //    {
        //        output += "_";
        //    }
        //    output += "\n";
        //    for (int x = 0; x < size; x++)
        //    {
        //        output += "|";
        //        for (int y = 0; y < size; y++)
        //        {
        //            bool bottom = x + 1 >= size;
        //            bool south = map[x, y] == MazeWall.S || bottom;
        //            bool south2 = (y + 1 < size && map[x, y + 1] == MazeWall.S) || bottom;
        //            bool east = (map[x, y] == MazeWall.E || y + 1 >= size);
        //            output += south ? "_" : " ";
        //            output += east ? "|" : ((south && south2) ? "_" : " ");
        //        }
        //        output += "\n";
        //    }
        //    Console.WriteLine(output);
        //}
    }
}
