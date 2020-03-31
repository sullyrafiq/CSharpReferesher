using System;

namespace GradeBook.Tests.CSharpInterfaces
{
    public class ConcreteRegularPolygon
    {
        public int NumberOfSides { get; set; }

        public int SideLength { get; set; }
      
        public ConcreteRegularPolygon(int sides, int length)
        {
            this.NumberOfSides = sides;
            this.SideLength = length;
        }

        public double GetPerimeter()
        {
            return NumberOfSides * SideLength;
        }

        public virtual double GetArea()
        {
            throw new NotImplementedException();
        }
      
    }
}