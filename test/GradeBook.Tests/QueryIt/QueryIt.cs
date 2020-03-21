using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using GradeBook.QueryIt;
using Xunit;

namespace GradeBook.Tests.QueryIt
{
    public class QueryIt
    {
        [Fact]
        public void it_executes_operations_on_repository()
        {
            Database.SetInitializer(new DropCreateDatabaseAlways<EmployeeDb>());
            using IRepository<Employee> employeeRepository = new SqlRepository<Employee>(new EmployeeDb());
            AddEmployee(employeeRepository);
            CountEmployees(employeeRepository);
            QueryEmployees(employeeRepository);
            DumpPeople(employeeRepository);
            AddManagers(employeeRepository);

            IEnumerable<Person> temp = employeeRepository.FindAll();
        }

        private void AddManagers(IWriteOnlyRepository<Manager> employeeRepository)
        {
            employeeRepository.Add(new Manager() {Name = "Salim"});
        }

        private void DumpPeople(IReadOnlyRepository<Person> employeeRepository)
        {
            var employees = employeeRepository.FindAll();

            foreach (var employee in employees)
            {
                Console.WriteLine(employee.Name);
            }
        }

        private void QueryEmployees(IRepository<Employee> employeeRepository)
        {
            var employees = employeeRepository.FindById(1);
            Console.WriteLine(employees.Name);
        }

        private void CountEmployees(IRepository<Employee> employeeRepository)
        {
            Console.WriteLine(employeeRepository.FindAll().Count());
        }

        private void AddEmployee(IRepository<Employee> employeeRepository)
        {
            employeeRepository.Add(new Employee() {Name = "Scott"});
            employeeRepository.Add(new Employee() {Name = "Chris"});
        }
    }
}