using System;
using System.Linq;
using GradeBook.Tests.Cars;
using Xunit;
using Xunit.Abstractions;

namespace GradeBook.Tests.WorkingWithNulls
{
    public class WorkingWithNulls
    {
        private readonly ITestOutputHelper _testOutputHelper;

        public WorkingWithNulls(ITestOutputHelper testOutputHelper)
        {
            _testOutputHelper = testOutputHelper;
        }

        [Fact]
        public void it_uses_conditional_operator()
        {
            // Arrange
            var player = new Player(10);
            int days = player.DaysSinceLastLogin.HasValue ? player.DaysSinceLastLogin.Value : -1;

            var nullPlayer = new Player(null);
            int daysWithNull = nullPlayer.DaysSinceLastLogin.HasValue ? nullPlayer.DaysSinceLastLogin.Value : -1;

            _testOutputHelper.WriteLine("days calculated with conditional operator {0}", days);
            _testOutputHelper.WriteLine("days calculated with conditional operator {0}", daysWithNull);
        }

        [Fact]
        public void it_uses_null_coalescing_operator()
        {
            // Arrange
            var player = new Player(10);
            int days = player.DaysSinceLastLogin ?? -1;

            var nullPlayer = new Player(null);
            int daysWithNull = nullPlayer.DaysSinceLastLogin ?? -1;

            _testOutputHelper.WriteLine("days calculated with coalescing operator {0}", days);
            _testOutputHelper.WriteLine("days calculated with coalescing operator {0}", daysWithNull);
        }

        [Fact]
        public void it_uses_null_conditional_operator()
        {
            // Arrange
            Player nullPlayer = null;
            int days = nullPlayer?.DaysSinceLastLogin ?? -1;

            _testOutputHelper.WriteLine("days calculated with coalescing operator {0}", days);
        }
        
        
        [Fact]
        public void it_uses_null_conditional_operator_with_arrays()
        {
            // Arrange
            Player[] players = new[]
            {
                new Player(null) {Name = "Sarah"},
                new Player(null),
                null
            };

            string player1 = players?[0]?.Name;
            string player2 = players?[1]?.Name;
            string player3 = players?[2]?.Name;
            
            _testOutputHelper.WriteLine("player 1 {0}", player1);
            _testOutputHelper.WriteLine("player 2 {0}", player2);
            _testOutputHelper.WriteLine("player 3 {0}", player3);
        }
    }

    public class Player
    {
        public int? DaysSinceLastLogin { get; set; }
        public string Name { get; set; }

        public Player(int? daysSinceLastLogin)
        {
            DaysSinceLastLogin = daysSinceLastLogin;
        }
    }
}