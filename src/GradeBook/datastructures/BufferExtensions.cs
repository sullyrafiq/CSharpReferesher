using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;

namespace GradeBook.datastructures
{
    public static class BufferExtensions
    {
        public delegate void Printer<T>(T data);

        public static void SmartDump<T>(this IBuffer<T> buffer, Printer<T> print)
        {
            foreach (var item in buffer)
            {
                print(item);
            }
        }

        public static void SmartDumpWithAction<T>(this IBuffer<T> buffer, Action<T> print)
        {
            foreach (var item in buffer)
            {
                print(item);
            }
        }

        public static void Dump<T>(this IBuffer<T> buffer)
        {
            foreach (var item in buffer)
            {
                System.Console.WriteLine(item);
            }
        }

        public static IEnumerable<TOutput> AsEnumerableOf<T, TOutput>(this IBuffer<T> buffer)
        {
            var converter = TypeDescriptor.GetConverter(typeof(T));
            foreach (var item in buffer)
            {
                TOutput result = (TOutput) converter.ConvertTo(item, typeof(TOutput));
                yield return result;
            }
        }

        public static IEnumerable<TOutput> Map<T, TOutput>(this IBuffer<T> buffer, Converter<T, TOutput> converter)
        {
            return buffer.Select(item => converter(item));
        }
    }
}