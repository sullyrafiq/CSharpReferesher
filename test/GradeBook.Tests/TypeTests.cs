using System;
using Xunit;

namespace GradeBook.Tests
{
    public class TypeTests
    {

        private int count = 0;
        public delegate string WriteLogDelegate(string logMessage);

        [Fact]
        public void writeLogDelegateCanPointToMethod()
        {
            WriteLogDelegate log = returnMessage;
            log += incrementCount;

            var result = log("Hello!");


            foreach (WriteLogDelegate d in log.GetInvocationList())
            {
                System.Console.WriteLine(d("Hello"));
            }

            Assert.Equal(4, count);
            // Assert.Equal("Hello!", result);
        }

        private string returnMessage(string message)
        {
            count++;
            return message.ToLower();
        }

        private string incrementCount(string message)
        {
            count++;
            return message;
        }


        [Fact]
        public void StringBehavesLikeValueTypes()
        {
            string name = "Scott";

            var upper = makeUppperCase(name);

            Assert.Equal("Scott", name);
            Assert.Equal("SCOTT", upper);
        }

        private string makeUppperCase(string parameter)
        {
            return parameter.ToUpper();
        }

        [Fact]
        public void CsharpCanPassByRef()
        {
            // Arrange
            var book1 = GetBook("Book 1");
            GetBookSetNameByRef(ref book1, "New Name");

            // Assert
            Assert.Equal("New Name", book1.Name);
        }

        private void GetBookSetNameByRef(ref Book book, string name)
        {
            book = new Book(name);
        }

        [Fact]
        public void CsharpIsPassedByValue()
        {
            // Arrange
            var book1 = GetBook("Book 1");
            GetBookSetName(book1, "New Name");

            // Assert
            Assert.Equal("Book 1", book1.Name);
        }

        private void GetBookSetName(Book book, string name)
        {
            book = new Book(name);
        }

        [Fact]
        public void CanSetNameFromReference()
        {
            // Arrange
            var book1 = GetBook("Book 1");
            SetName(book1, "New Name");

            // Assert
            Assert.Equal("New Name", book1.Name);
        }

        private void SetName(Book book, string name)
        {
            book.Name = name;
        }

        [Fact]
        public void GetBookReturnsDifferentObjects()
        {
            // Arrange
            var book1 = GetBook("Book 1");
            var book2 = GetBook("Book 2");

            // Assert
            Assert.Equal("Book 1", book1.Name);
            Assert.Equal("Book 2", book2.Name);
        }

        [Fact]
        public void TwoVarsCanReferenceSameObject()
        {
            // Arrange
            var book1 = GetBook("Book 1");
            var book2 = book1;

            // Assert
            Assert.Same(book1, book2);
            Assert.True(Object.ReferenceEquals(book1, book2));
        }
        private Book GetBook(string bookName)
        {
            return new Book(bookName);
        }
    }
}
