using System;
using System.Linq;
using Xunit;

namespace GradeBook.Tests.datastructures
{
    public class ArrayListAndCollectionTests
    {
        public class EqualityTests
        {
            [Fact]
            public void it_returns_false_when_comparing_two_reference_types()
            {
                DateTime[] bankHols1 = new[]
                {
                    new DateTime(2021, 1, 1),
                    new DateTime(2021, 4, 2),
                    new DateTime(2021, 4, 5),
                    new DateTime(2021, 5, 3),
                    new DateTime(2021, 5, 31),
                    new DateTime(2021, 8, 30),
                    new DateTime(2021, 12, 27),
                    new DateTime(2021, 12, 28),
                };

                DateTime[] bankHols2 = new[]
                {
                    new DateTime(2021, 1, 1),
                    new DateTime(2021, 4, 2),
                    new DateTime(2021, 4, 5),
                    new DateTime(2021, 5, 3),
                    new DateTime(2021, 5, 31),
                    new DateTime(2021, 8, 30),
                    new DateTime(2021, 12, 27),
                    new DateTime(2021, 12, 28),
                };

                Assert.False(bankHols1 == bankHols2);
                Assert.Equal(bankHols1, bankHols2);
            }

            [Fact]
            public void it_returns_true_when_comparing_two_reference_types_of_string()
            {
                string bankHoliday1Name = "New Year's Day";
                string bankHoliday2Name = "New Year's Day";

                Assert.True(bankHoliday1Name == bankHoliday2Name);
                Assert.Equal(bankHoliday1Name, bankHoliday2Name);
            }

            [Fact]
            public void it_returns_true_when_comparing_two_reference_types_with_SequenceEqual()
            {
                DateTime[] bankHols1 = new[]
                {
                    new DateTime(2021, 1, 1),
                    new DateTime(2021, 4, 2),
                    new DateTime(2021, 4, 5),
                    new DateTime(2021, 5, 3),
                    new DateTime(2021, 5, 31),
                    new DateTime(2021, 8, 30),
                    new DateTime(2021, 12, 27),
                    new DateTime(2021, 12, 28),
                };

                DateTime[] bankHols2 = new[]
                {
                    new DateTime(2021, 1, 1),
                    new DateTime(2021, 4, 2),
                    new DateTime(2021, 4, 5),
                    new DateTime(2021, 5, 3),
                    new DateTime(2021, 5, 31),
                    new DateTime(2021, 8, 30),
                    new DateTime(2021, 12, 27),
                    new DateTime(2021, 12, 28),
                };

                // SequenceEquals is a very expensive operation when the array is large
                Assert.True(bankHols1.SequenceEqual(bankHols2));
            }
        }
    }
}