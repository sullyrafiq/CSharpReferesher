using System;
using System.Linq;
using GradeBook.datastructures;
using Xunit;
using Xunit.Abstractions;

namespace GradeBook.Tests.datastructures
{
    public class CircularBufferTests
    {
        private readonly ITestOutputHelper _testOutputHelper;

        public CircularBufferTests(ITestOutputHelper testOutputHelper)
        {
            _testOutputHelper = testOutputHelper;
        }

        [Fact]
        public void it_gives_empty_buffer()
        {
            // Arrange
            var buffer = new CircularBuffer<int>();

            // Assert
            Assert.True(buffer.IsEmpty);
        }

        [Fact]
        public void it_returns_isFull_for_buffer_when_three_elements_are_added()
        {
            // Arrange
            var buffer = new CircularBuffer<int>(capacity: 3);
            buffer.Write(1);
            buffer.Write(1);
            buffer.Write(1);

            // Assert
            Assert.True(buffer.IsFull);
        }

        [Fact]
        public void first_in_first_out_when_not_full()
        {
            // Arrange
            var buffer = new CircularBuffer<double>(capacity: 3);
            var value1 = 1.1;
            var value2 = 2.0;

            buffer.Write(value1);
            buffer.Write(value2);

            // Assert
            Assert.Equal(value1, buffer.Read());
            Assert.Equal(value2, buffer.Read());
            Assert.True(buffer.IsEmpty);
        }

        [Fact]
        public void Overwrites_When_More_Than_Capacity()
        {
            var buffer = new CircularBuffer<double>(capacity: 3);
            var values = new[] {1.0, 2.0, 3.0, 4.0, 5.0};

            foreach (var value in values)
            {
                buffer.Write(value);
            }

            Assert.True(buffer.IsFull);
            Assert.Equal(values[2], buffer.Read());
            Assert.Equal(values[3], buffer.Read());
            Assert.Equal(values[4], buffer.Read());
            Assert.True(buffer.IsEmpty);
        }

        [Fact]
        public void it_uses_extension_method_to_convert_doubles_to_ints()
        {
            var buffer = new Buffer<double>();
            buffer.Write(1.2);
            buffer.Write(7.2);
            buffer.Write(8.2);

            var asInts = buffer.AsEnumerableOf<double, int>();

            foreach (var intValue in asInts)
            {
                _testOutputHelper.WriteLine(intValue.ToString());
            }
        }

        [Fact]
        public void it_uses_extension_method_to_print_buffer_contents()
        {
            var buffer = new Buffer<double>();
            buffer.Write(1.2);
            buffer.Write(7.2);
            buffer.Write(8.2);

            buffer.Dump();
        }

        private void ConsoleOut(double data)
        {
            _testOutputHelper.WriteLine(data.ToString());
        }

        [Fact]
        public void it_uses_generic_delegate_to_print()
        {
            var buffer = new Buffer<double>();
            buffer.Write(1.2);
            buffer.Write(7.2);
            buffer.Write(8.2);

            buffer.SmartDump(ConsoleOut);
        }

        [Fact]
        public void it_uses_action_delegate_to_print()
        {
            var buffer = new Buffer<double>();
            buffer.Write(1.2);
            buffer.Write(7.2);
            buffer.Write(8.2);

            buffer.SmartDumpWithAction(ConsoleOut);
        }

        [Fact]
        public void it_uses_anonymous_function_to_print()
        {
            var buffer = new Buffer<double>();
            buffer.Write(1.2);
            buffer.Write(7.2);
            buffer.Write(8.2);

            Action<double> print = d => _testOutputHelper.WriteLine(d.ToString());

            buffer.SmartDumpWithAction(print);
        }

        [Fact]
        public void it_uses_built_in_delegate()
        {
            Action<bool> print = d => _testOutputHelper.WriteLine(d.ToString());
            Func<double, double> square = d => d * d;
            Func<double, double, double> add = (x, y) => x + y;
            Predicate<double> isLessThanTen = d => d < 10;

            print(isLessThanTen(square(add(3, 5))));
        }

        [Fact]
        public void it_uses_converter_to_delegate()
        {
            var buffer = new Buffer<double>();
            buffer.Write(1.2);
            buffer.Write(7.2);
            buffer.Write(8.2);

            Converter<double, DateTime> converter = d => new DateTime(2020, 01, 05).AddDays(d);
            var dateTimes = buffer.Map(converter);

            foreach (var date in dateTimes)
            {
                _testOutputHelper.WriteLine(date.ToString());
            }
        }
    }
}