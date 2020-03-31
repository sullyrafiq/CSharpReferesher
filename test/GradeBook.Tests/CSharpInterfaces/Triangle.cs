using System;

namespace GradeBook.Tests.CSharpInterfaces
{
    public class Triangle : AbstractRegularPolygon
    {
        public Triangle(int length) : base(3, length)
        {
        }

        public override double GetArea()
        {
            return SideLength * SideLength * Math.Sqrt(3) / 4;
        }
    }
}