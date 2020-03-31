const YEAR = new Date().getFullYear();

module.exports = [
  {
    drivingOffenceType: 'Alcohol or drug related',
    drivingOffenceCode: 128, //DR10
    drivingOffenceAlcoholReading: 104,
    drivingOffenceDate: { day: '18', month: '02', year: YEAR - 2 },
    drivingOffencePenaltyPoints: 0,
    drivingOffencePaidFine: true,
    drivingOffenceFineAmount: '940',
    drivingOffenceBanned: true,
    drivingOffenceMonthsBanned: 24
  },
  {
    drivingOffenceType: 'Alcohol or drug related',
    drivingOffenceCode: '',
    drivingOffenceCodeOther: 'DR10 - Driving Or Attempting to Drive With Alcohol Level Above Limit',
    drivingOffenceAlcoholReading: 37,
    drivingOffenceDate: { day: '24', month: '03', year: YEAR - 3 },
    drivingOffencePenaltyPoints: 0,
    drivingOffencePaidFine: true,
    drivingOffenceFineAmount: '100',
    drivingOffenceBanned: false
  },
  {
    drivingOffenceType: 'Speeding',
    drivingOffenceCode: '',
    drivingOffenceCodeOther: 'SP40 - Exceeding Passenger Vehicle Speed Limit',
    drivingOffenceDate: { day: '18', month: '05', year: YEAR - 4 },
    drivingOffencePenaltyPoints: '',
    drivingOffencePointsOther: 7,
    drivingOffencePaidFine: false,
    drivingOffenceBanned: false
  }
];