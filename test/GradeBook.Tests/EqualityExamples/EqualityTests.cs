using System;
using Xunit;
using Xunit.Abstractions;

namespace GradeBook.Tests.EqualityExamples
{
    public class EqualityTests
    {
        private readonly ITestOutputHelper _testOutputHelper;

        public EqualityTests(ITestOutputHelper testOutputHelper)
        {
            _testOutputHelper = testOutputHelper;
        }

        [Fact]
        public void it_checks_equality_for_value_type_of_struct()
        {
            // Arrange
            FoodItem banana = new FoodItem("banana", FoodGroup.Fruit);
            FoodItem banana2 = new FoodItem("banana", FoodGroup.Fruit);
            FoodItem chocolate = new FoodItem("chocolate", FoodGroup.Sweets);
            
            // Act
            bool areTowBananaEqual = (banana == banana2);
            bool areBananaAndChocolateEqual = (banana2 == chocolate);
            bool areChocolateAndBananaEqual = (chocolate == banana);
            
            // Assert
            Assert.True(areTowBananaEqual);
            Assert.False(areBananaAndChocolateEqual);
            Assert.False(areChocolateAndBananaEqual);
        }
        
        [Fact]
        public void it_checks_equality_for_inherited_reference_types()
        {
            // Arrange
            Food apple = new Food("apple", FoodGroup.Fruit);
            Food apple1 = new Food("apple", FoodGroup.Fruit);
            CookedFood stewedApple = new CookedFood("stewed", "apple", FoodGroup.Fruit);
            CookedFood bakedApple = new CookedFood("baked", "apple", FoodGroup.Fruit);
            CookedFood stewedApple1 = new CookedFood("stewed", "apple", FoodGroup.Fruit);
            
            // Act
            bool areTwoApplesEqual = (apple == apple1);
            bool areTwoApplesEqualWithEqualsMethod = (apple.Equals(apple1));
            bool areAppleEqualStewedApple = (apple.Equals(stewedApple));

            // Assert
            Assert.True(areTwoApplesEqual);
            Assert.True(areTwoApplesEqualWithEqualsMethod);
            
            Assert.False(areAppleEqualStewedApple);
        }
    }
}