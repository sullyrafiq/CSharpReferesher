using System;
using System.Globalization;
using Xunit;
using Xunit.Abstractions;

namespace GradeBook.Tests.dateTimeExamples
{
    public class DateTimeTests
    {
        private readonly ITestOutputHelper _testOutputHelper;

        public DateTimeTests(ITestOutputHelper testOutputHelper)
        {
            _testOutputHelper = testOutputHelper;
        }

        [Fact]
        public void it_converts_locale_date_time_to_adelaide_date_time()
        {
            // Arrange
            var now = DateTime.Now;
            TimeZoneInfo adelaideTimeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("Australia/Adelaide");

            // Act
            var adelaideTime = TimeZoneInfo.ConvertTime(now, adelaideTimeZoneInfo);

            // Assert
            _testOutputHelper.WriteLine(now.ToString());
            _testOutputHelper.WriteLine(adelaideTime.ToString());
        }

        [Fact]
        public void
            it_shows_difference_between_datetimeNow_and_datetimeUTCNow_and_dateTimeOffsetNow_and_datetimeOffsetUTCNow()
        {
            // Arrange
            var now = DateTime.Now;
            var utcNow = DateTime.UtcNow;
            var dateTimeOffsetNow = DateTimeOffset.Now;
            var dateTimeOffsetUTCNow = DateTimeOffset.UtcNow;

            // Act

            // Assert
            _testOutputHelper.WriteLine("Now : " + now);
            _testOutputHelper.WriteLine("utcNow : " + utcNow);
            _testOutputHelper.WriteLine("dateTimeOffsetNow : " + dateTimeOffsetNow);
            _testOutputHelper.WriteLine("dateTimeOffsetUTCNow : " + dateTimeOffsetUTCNow);
        }

        [Fact]
        public void it_prints_all_system_timezones_that_has_same_utc_offset_as_current_systems_one()
        {
            // Arrange
            var time = DateTimeOffset.Now;

            // Act
            foreach (var timeZone in TimeZoneInfo.GetSystemTimeZones())
            {
                if (timeZone.GetUtcOffset(time) == time.Offset)
                {
                    _testOutputHelper.WriteLine(timeZone.Id + " - " + timeZone.DisplayName);
                }
            }

            // Assert
        }

        [Fact]
        public void it_prints_all_system_timezones_that_has_same_utc_offset_as_current_systems_one_plus_10()
        {
            // Arrange
            var time = DateTimeOffset.Now.ToOffset(TimeSpan.FromHours(10));

            // Act
            foreach (var timeZone in TimeZoneInfo.GetSystemTimeZones())
            {
                if (timeZone.GetUtcOffset(time) == time.Offset)
                {
                    _testOutputHelper.WriteLine(timeZone.Id + " - " + timeZone.DisplayName);
                }
            }

            // Assert
        }

        [Fact]
        public void it_converts_datetimeoffset_utc_now_to_localTime()
        {
            // Arrange
            var now = DateTimeOffset.UtcNow;

            // Act

            _testOutputHelper.WriteLine(now.ToString());
            _testOutputHelper.WriteLine(now.ToLocalTime().ToString());
        }

        [Fact]
        public void it_uses_timespan_to_Get_days_hours_minutes_and_seconds()
        {
            // Arrange
            var timeSpan = new TimeSpan(60, 100, 200);

            // Act
            _testOutputHelper.WriteLine(timeSpan.Days.ToString());
            _testOutputHelper.WriteLine(timeSpan.Hours.ToString());
            _testOutputHelper.WriteLine(timeSpan.Minutes.ToString());
            _testOutputHelper.WriteLine(timeSpan.Seconds.ToString());
        }

        [Fact]
        public void it_uses_timespan_to_calculate_difference()
        {
            // Arrange
            var start = DateTimeOffset.UtcNow;
            var end = start.AddSeconds(45);

            // Act
            TimeSpan difference = end - start;

            // Assert
            _testOutputHelper.WriteLine(difference.Days.ToString());
            _testOutputHelper.WriteLine(difference.Hours.ToString());
            _testOutputHelper.WriteLine(difference.Minutes.ToString());
            _testOutputHelper.WriteLine(difference.Seconds.ToString());
        }

        [Fact]
        public void it_gets_isoweek_from_date()
        {
            // Arrange
            var start = new DateTimeOffset(2007, 12, 31, 0, 0, 0, TimeSpan.Zero);

            // Act
            var weekOfYear = ISOWeek.GetWeekOfYear(start.DateTime);

            // Assert
            _testOutputHelper.WriteLine(weekOfYear.ToString());
        }
    }
}