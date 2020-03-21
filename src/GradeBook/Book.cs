using System;
using System.Collections.Generic;

namespace GradeBook
{
    public class Book
    {
        private readonly List<double> grades;
        public string Name;

        public Book(string name)
        {
            this.grades = new List<Double>();
            this.Name = name;
        }

        public void ShowStatistics()
        {
            var stats = GetStatistics();

            Console.WriteLine($"The Hightest grade is  {(stats.High):N2}");
            Console.WriteLine($"The Lowest grade is  {(stats.Low):N2}");
            Console.WriteLine($"grade avereage is  {(stats.Average):N2}");
        }

        public Statistics GetStatistics()
        {
            var result = new Statistics();
            result.Average = 0.0;
            result.High = double.MinValue;
            result.Low = double.MaxValue;

            foreach (var grade in this.grades)
            {
                if (grade > result.High)
                {
                    result.High = grade;
                }

                if (grade < result.Low)
                {
                    result.Low = grade;
                }

                result.Average += grade;
            }

            result.Average /= grades.Count;

            return result;
        }

        public void AddGrade(double grade)
        {
            grades.Add(grade);
        }
    }
}
