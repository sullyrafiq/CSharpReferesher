namespace GradeBook.Tests.WorkingWithNulls.NullObjectPattern
{
    public class NullDefence : ISpecialDefence
    {
        public int CalculateDamageReduction(int totalDamage)
        {
            return 0; //no operation
        }
    }
}