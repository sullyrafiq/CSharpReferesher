using System;
using System.Collections.Generic;
using Xunit;
using Xunit.Abstractions;

namespace GradeBook.Tests.EqualityExamples
{
    public class ComparerTests
    {
        private readonly ITestOutputHelper _testOutputHelper;

        public ComparerTests(ITestOutputHelper testOutputHelper)
        {
            _testOutputHelper = testOutputHelper;
        }

        [Fact]
        public void it_sorts_array_of_strings()
        {
            // Arrange
            string[] myStrings =
            {
                "zomato",
                "pineapple",
                "banana",
                "apple"
            };
            // Act
            Array.Sort(myStrings);

            // Assert
            Assert.Contains(myStrings[0], "apple");
            Assert.Contains(myStrings[1], "banana");
            Assert.Contains(myStrings[2], "pineapple");
            Assert.Contains(myStrings[3], "zomato");
        }

        [Fact]
        public void it_sorts_array_of_object_by_name_property()
        {
            // Arrange
            Food[] myStrings =
            {
                new Food("zomato", FoodGroup.Sweets),
                new Food("pineapple", FoodGroup.Fruit),
                new Food("banana", FoodGroup.Fruit),
                new Food("apple", FoodGroup.Fruit)
            };
            // Act
            Array.Sort(myStrings, new FoodNameComparer());

            // Assert
            Assert.Contains(myStrings[0].Name, "apple");
            Assert.Contains(myStrings[1].Name, "banana");
            Assert.Contains(myStrings[2].Name, "pineapple");
            Assert.Contains(myStrings[3].Name, "zomato");
        }
        
        [Fact]
        public void it_sorts_array_of_object_by_name_property_and_with_comparer_of_T()
        {
            // Arrange
            Food[] myStrings =
            {
                new Food("zomato", FoodGroup.Sweets),
                new Food("pineapple", FoodGroup.Fruit),
                new Food("banana", FoodGroup.Fruit),
                new Food("apple", FoodGroup.Fruit)
            };
            // Act
            Array.Sort(myStrings, FoodNameComparerUsingComparerInterface.Instance);

            // Assert
            Assert.Contains(myStrings[0].Name, "apple");
            Assert.Contains(myStrings[1].Name, "banana");
            Assert.Contains(myStrings[2].Name, "pineapple");
            Assert.Contains(myStrings[3].Name, "zomato");
        }
    }

    public class FoodNameComparerUsingComparerInterface : Comparer<Food>
    {
        private static FoodNameComparerUsingComparerInterface _instance = new FoodNameComparerUsingComparerInterface();

        public static FoodNameComparerUsingComparerInterface Instance => _instance;

        public override int Compare(Food lhs, Food rhs)
        {
            if (lhs == null && rhs == null)
                return 0;
            if (lhs == null)
                return -1;
            if (rhs == null)
                return 1;

            return string.Compare(lhs.Name, rhs.Name, StringComparison.CurrentCulture);
        }
    }

    public class FoodNameComparer : IComparer<Food>
    {
        public int Compare(Food lhs, Food rhs)
        {
            if (lhs == null && rhs == null)
                return 0;
            if (lhs == null)
                return -1;
            if (rhs == null)
                return 1;

            return string.Compare(lhs.Name, rhs.Name, StringComparison.CurrentCulture);
        }
    }
}