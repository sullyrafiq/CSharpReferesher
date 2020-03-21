using System;
using System.Collections.Generic;

namespace GradeBook
{
    class Program
    {
        static void Main(string[] args)
        {
            Book book = new Book("Scott's Grade Book");
            book.AddGrade(12.7);
            book.AddGrade(10.3);
            book.AddGrade(6.11);
            book.AddGrade(4.1);
            book.AddGrade(90.5);
            book.ShowStatistics();

            if (args.Length > 0)
            {
                Console.WriteLine($"Hello, {args[0]} !");
            }
            else
            {
                Console.WriteLine("Hello!");
            }
        }
    }
}
