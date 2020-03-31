module.exports = [
  {
    additionalDriverFirstName: 'Steve',
    additionalDriverLastName: 'Jobs',
    dateOfBirth: {day: '12', month: '12', year: '1999'},
    gender: 1, // Male
    additionalDriverRelationshipId: 14, // Spouse
    maritalStatusId: 2, // Married
    employmentStatus: 3, // Employed
    occupation: 'Teacher',
    businessSector: 'Education',
    hasAdditionalOccupation: true,
    additionalOccupation: 'Piano Teacher',
    additionalOccupationBusinessSector: 'Education',
    licenceType: 'Full',
    licenceIssueCountry: 'UK',
    licenceCover: 'Manual and automatic',
    licenceWithAdditionalQualification: false,
    additionalDriverHasLicenceNumber: true,
    licenceNumber: ['JOBS9', '912129', 'AA1', 'AA'],
    hasMedicalCondition: true,
    additionalDriverMedicalConditionId: '4',
    additionalDriverHasClaims: false,
    hasDrivingOffences: false,
    hasNonMotoringConvictions: false,
    anyOtherCars: true,
    anyOtherCarsId: 2, // Own another car
    additionalDriverNumberOfYearsLicenceHeld: '2',
    additionalDriverNumberOfMonthsLicenceHeld: '3',
    isUkResidentFromBirth: true
  },
  {
    additionalDriverFirstName: 'Bill',
    additionalDriverLastName: 'Gates',
    dateOfBirth: {day: '12', month: '12', year: '1990'},
    gender: 1, // Male
    additionalDriverRelationshipId: 10, // Parent
    maritalStatusId: 2, // Married
    employmentStatus: 6, // Student
    studentType: 1067,
    hasAdditionalOccupation: true,
    additionalOccupation: 'Piano Teacher',
    additionalOccupationBusinessSector: 'Education',
    licenceType: 'Full',
    licenceIssueCountry: 'UK',
    licenceCover: 'Manual and automatic',
    licenceWithAdditionalQualification: false,
    additionalDriverHasLicenceNumber: false,
    hasMedicalCondition: false,
    additionalDriverHasClaims: false,
    hasDrivingOffences: false,
    hasNonMotoringConvictions: false,
    anyOtherCars: false,
    additionalDriverNumberOfYearsLicenceHeld: '7',
    isUkResidentFromBirth: true
  },
  {
    additionalDriverFirstName: 'Sarah',
    additionalDriverLastName: 'Marshall',
    dateOfBirth: {day: '12', month: '12', year: '1965'},
    gender: 2, // Female
    additionalDriverRelationshipId: 16, // Unrelated
    maritalStatusId: 1, // Divorced
    employmentStatus: 9, // Retired
    licenceType: 'Medically Restricted',
    licenceMedicalRestrictionDuration: '3 years or more',
    additionalDriverHasLicenceNumber: true,
    hasMedicalCondition: false,
    additionalDriverHasClaims: false,
    hasDrivingOffences: false,
    hasNonMotoringConvictions: false,
    anyOtherCars: true,
    additionalDriverNumberOfYearsLicenceHeld: '7',
    anyOtherCarsId: 3, // Company car (excluding social use),
    isUkResidentFromBirth: false,
    ukResidencyStartMonth: '11',
    ukResidencyStartYear: '2015'
  }
];