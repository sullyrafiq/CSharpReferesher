using System;
using Xunit;
using Xunit.Abstractions;

namespace GradeBook.Tests.CSharpInterfaces
{
    public class CSharpInterfacesTests
    {
        private readonly ITestOutputHelper _testOutputHelper;

        public CSharpInterfacesTests(ITestOutputHelper testOutputHelper)
        {
            _testOutputHelper = testOutputHelper;
        }

        [Fact]
        public void it_uses_concrete_base_class()
        {
            // Arrange
            var square = new Square(5);

            _testOutputHelper.WriteLine($"Square Number of Sides {square.NumberOfSides}");
            _testOutputHelper.WriteLine($"Square Side Length {square.SideLength}");
            _testOutputHelper.WriteLine($"Square Perimeter {square.GetPerimeter()}");
            _testOutputHelper.WriteLine($"Square Area {square.GetArea()}");
            
        }
 
        [Fact]
        public void it_uses_abstract_base_class()
        {
            // Arrange
            var triangle = new Triangle(5);

            _testOutputHelper.WriteLine($"Square Number of Sides {triangle.NumberOfSides}");
            _testOutputHelper.WriteLine($"Square Side Length {triangle.SideLength}");
            _testOutputHelper.WriteLine($"Square Perimeter {triangle.GetPerimeter()}");
            _testOutputHelper.WriteLine($"Square Area {triangle.GetArea()}");
        }
        
        [Fact]
        public void it_uses_interface()
        {
            // Arrange
            var octagon = new Octagon(5);

            _testOutputHelper.WriteLine($"Square Number of Sides {octagon.NumberOfSides}");
            _testOutputHelper.WriteLine($"Square Side Length {octagon.SideLength}");
            _testOutputHelper.WriteLine($"Square Perimeter {octagon.GetPerimeter()}");
            _testOutputHelper.WriteLine($"Square Area {octagon.GetArea()}");
        }
    }
}