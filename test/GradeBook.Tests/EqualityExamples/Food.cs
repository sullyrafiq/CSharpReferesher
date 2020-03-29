using System;
using System.Collections.Generic;

namespace GradeBook.Tests.EqualityExamples
{
    public class Food
    {
        private readonly string _name;
        private readonly FoodGroup _group;

        public string Name => _name;

        public FoodGroup Group => _group;

        public Food(string name, FoodGroup group)
        {
            _name = name;
            _group = group;
        }

        public override bool Equals(object? obj)
        {
            if (obj == null)
                return false;
            if (ReferenceEquals(obj, this))
                return true;
            if (obj.GetType() != this.GetType())
                return false;

            Food rhs = obj as Food;
            return this._name == rhs._name && this._group == rhs._group;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(_name, (int) _group);
        }

        public static bool operator ==(Food x, Food y)
        {
            return object.Equals(x, y);
        }

        public static bool operator !=(Food x, Food y)
        {
            return !object.Equals(x, y);
        }

        public override string ToString()
        {
            return _name;
        }
    }

    public class CookedFood : Food
    {
        private readonly string _cookingMethod;

        public CookedFood(string cookingMethod, string name, FoodGroup group)
            : base(name, group)
        {
            this._cookingMethod = cookingMethod;
        }

        public override bool Equals(object? obj)
        {
            if (!base.Equals(obj))
                return false;
            
            CookedFood rhs =  obj as CookedFood;
            return this._cookingMethod == rhs._cookingMethod;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(base.GetHashCode(), _cookingMethod);
        }

        public static bool operator ==(CookedFood x, CookedFood y)
        {
            return object.Equals(x, y);
        }

        public static bool operator !=(CookedFood x, CookedFood y)
        {
            return !object.Equals(x, y);
        }
        public override string ToString()
        {
            return $"{_cookingMethod} {Name}";
        }
    }
}