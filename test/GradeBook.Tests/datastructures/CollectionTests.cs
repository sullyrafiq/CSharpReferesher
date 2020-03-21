using System;
using System.Collections.Generic;
using Xunit;
using Xunit.Abstractions;

namespace GradeBook.Tests.datastructures
{
    public class CollectionTests
    {
        private readonly ITestOutputHelper _testOutputHelper;

        public CollectionTests(ITestOutputHelper testOutputHelper)
        {
            _testOutputHelper = testOutputHelper;
        }

        [Fact]
        public void it_describes_collection()
        {
            var departments = new SortedDictionary<string, HashSet<Employee>>();
            departments.Add("Sales", new HashSet<Employee>());
            departments["Sales"].Add(new Employee() {Name = "Joy"});
            departments["Sales"].Add(new Employee() {Name = "Dani"});
            departments["Sales"].Add(new Employee() {Name = "Dani"});

            departments.Add("Engineering", new HashSet<Employee>());
            departments["Engineering"].Add(new Employee() {Name = "Scott"});
            departments["Engineering"].Add(new Employee() {Name = "Alex"});
            departments["Engineering"].Add(new Employee() {Name = "Dani"});

            foreach (var department in departments)
            {
                _testOutputHelper.WriteLine(department.Key);
                foreach (var employee in department.Value)
                {
                    _testOutputHelper.WriteLine("\t" + employee.Name);
                }
            }
        }

        private class EmployeeComparer : IEqualityComparer<Employee>,
            IComparer<Employee>
        {
            public bool Equals(Employee x, Employee y)
            {
                return string.Equals(x.Name, y.Name);
            }

            public int GetHashCode(Employee obj)
            {
                return obj.Name.GetHashCode();
            }

            public int Compare(Employee x, Employee y)
            {
                return string.CompareOrdinal(x.Name, y.Name);
            }
        }

        [Fact]
        public void it_uniquies_employee()
        {
            var departments = new SortedDictionary<string, HashSet<Employee>>();
            departments.Add("Sales", new HashSet<Employee>(new EmployeeComparer()));
            departments["Sales"].Add(new Employee() {Name = "Joy"});
            departments["Sales"].Add(new Employee() {Name = "Dani"});
            departments["Sales"].Add(new Employee() {Name = "Dani"});

            departments.Add("Engineering", new HashSet<Employee>(new EmployeeComparer()));
            departments["Engineering"].Add(new Employee() {Name = "Scott"});
            departments["Engineering"].Add(new Employee() {Name = "Alex"});
            departments["Engineering"].Add(new Employee() {Name = "Dani"});

            foreach (var department in departments)
            {
                _testOutputHelper.WriteLine(department.Key);
                foreach (var employee in department.Value)
                {
                    _testOutputHelper.WriteLine("\t" + employee.Name);
                }
            }
        }

        [Fact]
        public void it_uniquies_employee_and_sorts_employee()
        {
            var departments = new SortedDictionary<string, SortedSet<Employee>>();
            departments.Add("Sales", new SortedSet<Employee>(new EmployeeComparer()));
            departments["Sales"].Add(new Employee() {Name = "Joy"});
            departments["Sales"].Add(new Employee() {Name = "Dani"});
            departments["Sales"].Add(new Employee() {Name = "Dani"});

            departments.Add("Engineering", new SortedSet<Employee>(new EmployeeComparer()));
            departments["Engineering"].Add(new Employee() {Name = "Scott"});
            departments["Engineering"].Add(new Employee() {Name = "Alex"});
            departments["Engineering"].Add(new Employee() {Name = "Dani"});

            foreach (var department in departments)
            {
                _testOutputHelper.WriteLine(department.Key);
                foreach (var employee in department.Value)
                {
                    _testOutputHelper.WriteLine("\t" + employee.Name);
                }
            }
        }

        private class DepartmentCollection : SortedDictionary<string, SortedSet<Employee>>
        {
            public DepartmentCollection Add(string departmentName, Employee employee)
            {
                if (!ContainsKey(departmentName))
                {
                    Add(departmentName, new SortedSet<Employee>(new EmployeeComparer()));
                }

                this[departmentName].Add(employee);
                return this;
            }
        }

        [Fact]
        public void it_uniquies_employee_and_sorts_employee_in_simplified_manner()
        {
            var departments = new DepartmentCollection();
            departments.Add("Sales", new Employee() {Name = "Joy"})
                .Add("Sales", new Employee() {Name = "Dani"})
                .Add("Sales", new Employee() {Name = "Dani"})
                .Add("Engineering", new Employee() {Name = "Scott"})
                .Add("Engineering", new Employee() {Name = "Alex"})
                .Add("Engineering", new Employee() {Name = "Dani"});

            foreach (var department in departments)
            {
                _testOutputHelper.WriteLine(department.Key);
                foreach (var employee in department.Value)
                {
                    _testOutputHelper.WriteLine("\t" + employee.Name);
                }
            }
        }
    }
}