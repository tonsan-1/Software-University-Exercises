using P01_StudentSystem.Data;
using System;

namespace StudentSystem
{
    public class Program
    {
        static void Main()
        {
            var db = new StudentSystemContext();

            db.Database.EnsureDeleted();
            db.Database.EnsureCreated();
        }
    }
}
