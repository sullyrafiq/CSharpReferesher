using System;
using System.Collections.Generic;

namespace GradeBook.Tests.EqualityExamples
{
    public struct FoodItem : IEquatable<FoodItem>
    {
        private readonly string _name;
        private readonly FoodGroup _group;

        public string Name
        {
            get { return _name; }
        }

        public FoodGroup Group
        {
            get { return _group; }
        }

        public FoodItem(string name, FoodGroup @group)
        {
            _name = name;
            _group = @group;
        }

        public override string ToString()
        {
            return _name;
        }

        public bool Equals(FoodItem other)
        {
            return _name == other._name && _group == other._group;
        }

        public override bool Equals(object obj)
        {
            return obj is FoodItem other && Equals(other);
        }

        public static bool operator ==(FoodItem lhs, FoodItem rhs)
        {
            return lhs.Equals(rhs);
        }

        public static bool operator !=(FoodItem lhs, FoodItem rhs)
        {
            return !lhs.Equals(rhs);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(_name, (int) _group);
        }
    }
}