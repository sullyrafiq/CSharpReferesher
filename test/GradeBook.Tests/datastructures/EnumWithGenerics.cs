using System;
using Xunit;

namespace GradeBook.Tests.datastructures
{
    public static class StringExtensions
    {
        public static TEnum parseEnum<TEnum>(this string value)
        {
            return (TEnum) Enum.Parse(typeof(TEnum), value);
        }
    }
    
    public class EnumWithGenerics
    {
        public enum Steps
        {
            Step1,
            Step2,
            Step3
        }

        [Fact]
        public void it_uses_enum_with_generics()
        {
            var input = "Step1";

            Steps value = (Steps) Enum.Parse(typeof(Steps), input);

            Assert.Equal(Steps.Step1, value);
        }
        
        [Fact]
        public void it_uses_enum_with_generics_and_string_extension()
        {
            var input = "Step1";

            Steps value = input.parseEnum<Steps>();

            Assert.Equal(Steps.Step1, value);
        }
        
        [Fact]
        public void it_parse_enum()
        {
            var input = "Step1";

            var value = Enum.Parse<Steps>(input);
            
            Assert.Equal(Steps.Step1, value);
        }
    }
}