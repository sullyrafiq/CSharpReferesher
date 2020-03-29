using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using Xunit;
using Xunit.Abstractions;

namespace GradeBook.Tests.LinqExamples
{
    public class FileSorter
    {
        private readonly ITestOutputHelper _testOutputHelper;

        public FileSorter(ITestOutputHelper testOutputHelper)
        {
            _testOutputHelper = testOutputHelper;
        }

        [Fact]
        public void it_get_top_5_files_by_size_without_linq()
        {
            // Arrange
            var myDocumentsFolder = System.Environment.SpecialFolder.MyDocuments;
            var downloadsFolderPath = System.Environment.GetFolderPath(myDocumentsFolder) + "/Downloads";
            DirectoryInfo directory = new DirectoryInfo(downloadsFolderPath);
            var fileInfos = directory.GetFiles();

            // Act
            Array.Sort(fileInfos, new FileInfoComparer());

            // Assert
            for (int i = 0; i < 5; i++)
            {
                var file = fileInfos[i];
                _testOutputHelper.WriteLine($"{file.Name,-20} : {file.Length,10:N0}");
            }
        }

        [Fact]
        public void it_get_top_5_files_by_size_linq()
        {
            // Arrange
            var myDocumentsFolder = System.Environment.SpecialFolder.MyDocuments;
            var downloadsFolderPath = System.Environment.GetFolderPath(myDocumentsFolder) + "/Downloads";

            var query = from file in new DirectoryInfo(downloadsFolderPath).GetFiles()
                orderby file.Length descending
                select file;

            var queryWithStatement = new DirectoryInfo(downloadsFolderPath).GetFiles()
                .OrderByDescending(f => f.Length)
                .Take(5);

            foreach (var file in queryWithStatement)
            {
                _testOutputHelper.WriteLine($"{file.Name,-20} : {file.Length,10:N0}");
            }
        }

        [Fact]
        public void it_gets_movie_after_year_2000()
        {
            // Arrange
            List<Movie> movies = GetMovies();

            var query = movies.Where(movie => movie.Year > 2000);

            foreach (var movie in query)
            {
                _testOutputHelper.WriteLine(movie.Title);
            }
        }

        [Fact]
        public void it_gets_movie_after_year_2000_using_custom_extension_filter()
        {
            // Arrange
            List<Movie> movies = GetMovies();

            var query = movies.Filter(movie => movie.Year > 2000);

            foreach (var movie in query)
            {
                _testOutputHelper.WriteLine(movie.Title);
            }
        }

        private List<Movie> GetMovies()
        {
            return new List<Movie>()
            {
                new Movie() {Title = "The Dark Knight", Rating = 8.9f, Year = 2008},
                new Movie() {Title = "The King's Speech", Rating = 8.0f, Year = 2010},
                new Movie() {Title = "Casablanca", Rating = 8.5f, Year = 1942},
                new Movie() {Title = "Star Wars V", Rating = 8.7f, Year = 1980},
            };
        }
    }

    public class FileInfoComparer : IComparer<FileInfo>
    {
        public int Compare(FileInfo x, FileInfo y)
        {
            return y.Length.CompareTo(x.Length);
        }
    }
}