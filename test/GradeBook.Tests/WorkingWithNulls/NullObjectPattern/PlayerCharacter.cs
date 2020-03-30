using System;
using Xunit.Abstractions;

namespace GradeBook.Tests.WorkingWithNulls.NullObjectPattern
{
    public class PlayerCharacter
    {
        private readonly ISpecialDefence _specialDefence;
        private readonly ITestOutputHelper _testOutputHelper;

        public PlayerCharacter(ISpecialDefence specialDefence, ITestOutputHelper testOutputHelper)
        {
            _specialDefence = specialDefence;
            _testOutputHelper = testOutputHelper;
        }

        public string Name { get; set; }
        public int Health { get; set; } = 100;

        public void Hit(int damage)
        {
            int totalDamageTake = damage - _specialDefence.CalculateDamageReduction(damage);
            Health -= totalDamageTake;

            _testOutputHelper.WriteLine($"{Name}'s health has reduced by {totalDamageTake} to {Health}");
        }
    }
}