using System;
using System.Collections.Generic;
using System.Text;

namespace Assignment2
{
    public class Cell
    {
        public List<MazeWall> Walls { get; set; }
        public bool inMaze { get; set; }
        public bool inFrontier { get; set; }
        public int x { get; set; }
        public int y { get; set; }

        public Cell(int i, int j)
        {
            Walls = new List<MazeWall>() { MazeWall.N, MazeWall.S, MazeWall.E, MazeWall.W };
            inMaze = false;
            inFrontier = false;
            x = i;
            y = j;
        }
        public List<int[]> GetNeighbors( int size)
        {
            List<int[]> neighbors = new List<int[]>();
            if (x > 0 )
            {
                neighbors.Add(new int[] { x - 1, y });
            }
            if (x < size - 1 )
            {
                neighbors.Add(new int[] { x + 1, y });
            }
            if (y > 0 )
            {
                neighbors.Add(new int[] { x, y - 1 });
            }
            if (y < size - 1 )
            {
                neighbors.Add(new int[] { x, y + 1 });
            }

            return neighbors;
        }
    }
}
