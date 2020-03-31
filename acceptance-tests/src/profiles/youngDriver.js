const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const policyStartDate = tomorrow.toISOString().slice(0, 10);

const birthday = new Date();
birthday.setFullYear(birthday.getFullYear() - 17);
birthday.setDate(birthday.getDate() + 1);
const dobDay = birthday.toISOString().slice(8, 10);
const dobMonth = birthday.toISOString().slice(5, 7);
const dobYear = birthday.toISOString().slice(0, 4);
birthday.setDate(birthday.getDate() + 1);
const adDobDay = birthday.toISOString().slice(8, 10);
const adDobMonth = birthday.toISOString().slice(5, 7);
const adDobYear = birthday.toISOString().slice(0, 4);


import dynamicAnswers from '../profiles/dynamicAnswers';

module.exports = {
  yourCar: {
    registrationNumber: 'A2',
    selectedVehicle: 'BENTLEY MULSANNE (A2)',
    vehicle: 'BENTLEY MULSANNE (A2)',
    numberOfSeats: '9',
    detailsAssumption: true,
    isVehicleModified: false,
    vehicleValue: 15000,
    carBought: true,
    monthCarBought: '10',
    yearCarBought: '2017',
    registeredOwnerAndKeeper: true,
    usageType: '1', // Social only (SD&P)
    personalMilesPerYearEstimated: true,
    daytimeStorageLocation: '8', // Drive
    overnightStorageLocation: '2', // Garage
    anyOtherCars: false
  },
  yourDetails: {
    firstName: 'Peter',
    lastName: 'Jones',
    dateOfBirth: { day: dobDay, month: dobMonth, year: dobYear },
    gender: 1, // Male
    postcode: 'EH92HE',
    address: '1, Oswald Road, Edinburgh, Midlothian, EH9 2HE, GB',
    isHomeOwner: false,
    isUkResidentFromBirth: true,
    maritalStatusId: 2, // Married
    numberOfChildrenUnder16: 4, // Other
    numberOfChildrenUnder16Other: 8,
    employmentStatus: 3, // Employed
    occupation: 'Teacher',
    businessSector: 'Education',
    hasAdditionalOccupation: false,
    numberOfCarsInHousehold: 1,
    licenceType: 'Full',
    licenceIssueCountry: 'UK',
    licenceCover: 'Manual and automatic',
    licenceWithAdditionalQualification: false,
    hasMedicalCondition: false,
    hasLicenceNumber: false,
    numberOfYearsLicenceHeld: '0',
    numberOfMonthsLicenceHeld: '0',
    hasClaims: false,
    hasDrivingOffences: false,
    hasNonMotoringConvictions: true
  },
  yourPolicy: {
    hasAdditionalDriver: false,
    policyTypeId: 1,
    legalCover: true,
    personalInjury: true,
    breakdownCover: true,
    courtesyCar: true,
    voluntaryExcess: 250,
    insuranceDeclined: false,
    numberOfYearsNoClaims: '2',
    paymentPreference: 1, // Annually
    policyStartDate,
    additionalDrivers: [{
      additionalDriverFirstName: 'Steve',
      additionalDriverLastName: 'Jobs',
      dateOfBirth: { day: adDobDay, month: adDobMonth, year: adDobYear },
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
      hasMedicalCondition: true,
      additionalDriverMedicalConditionId: '4',
      additionalDriverHasClaims: false,
      hasDrivingOffences: false,
      hasNonMotoringConvictions: false,
      anyOtherCars: true,
      anyOtherCarsId: 2, // Own another car
      additionalDriverNumberOfYearsLicenceHeld: '0',
      additionalDriverNumberOfMonthsLicenceHeld: '0',
      isUkResidentFromBirth: true
    }]
  },
  aggResponse: {
    activityTypeId: 1,
    channelId: null,
    organisationId: null,
    clientId: 22,
    accountId: 'de0a2783-aca0-4a7f-bde4-8a4b310fed41',
    visitorId: 'wxqQhTv4UxokBV1c3dwY',
    sourceCode: 'TIV',
    visitorIPAddress: '127.0.0.1',
    sessionId: 'f8ee713e-86eb-4aef-98cb-86db8401e672',
    brandFilter: null,
    payload: {
      policy: {
        policyStartDate,
        policyTypeId: 1,
        paymentTypeId: 1,
        paymentTypeIdForPrices: 1,
        protectedNoClaims: false,
        voluntaryExcess: 250,
        legalCover: true,
        personalInjury: true,
        breakdownCover: true,
        courtesyCar: true
      },
      receiptId: null,
      policyHolder: {
        name: 'Peter',
        anyOtherCarsId: 1,
        surname: 'Jones',
        ukResidencyStartMonth: null,
        ukResidencyStartYear: null,
        licenceTypeId: 4,
        licenceNumber: null,
        maritalStatusId: 2,
        relationshipId: null,
        hasNonMotoringConvictions: true,
        genderId: 1,
        medicalConditionId: 1,
        numberOfMonthsLicenceHeld: 2,
        numberOfYearsLicenceHeld: 2,
        dateOfBirth: { day: dobDay, month: dobMonth, year: dobYear },
        drivingOffences: [],
        claims: [],
        mainOccupation: {
          businessSectorId: 229,
          occupationId: 1731,
          employmentStatusId: 3
        },
        additionalOccupation: null,
        telephone: '01000000000',
        contactByEmail: false,
        contactByTel: false,
        contactByText: false,
        numberOfYearsNoClaims: 2,
        hasInsuranceEverBeenDeclined: false,
        numberOfChildrenUnder16: 8,
        address: {
          buildingName: null,
          county: 'Midlothian',
          department: null,
          dependantLocality: null,
          dependantThoroughfare: null,
          doubleDependantLocality: null,
          organisation: null,
          poBox: null,
          subBuildingName: null,
          thoroughfare: 'Oswald Road',
          postTown: 'Edinburgh',
          additionalBuildingNumber: null,
          additionalSubBuildingNumber: null,
          country: 'GB',
          postcode: 'EH92HE',
          primaryBuildingNumber: '1',
          primarySubBuildingNumber: null
        },
        tescoClubcardNumber: null,
        eligibleForIncentive: null,
        isUkResidentFromBirth: true,
        isMainDriver: true,
        isHomeOwner: false,
        numberOfYearsNamedDriverExperience: null,
        namedDriverExperienceType: null
      },
      additionalDrivers: [
        {
          name: 'Steve',
          anyOtherCarsId: 2,
          surname: 'Jobs',
          ukResidencyStartMonth: null,
          ukResidencyStartYear: null,
          licenceTypeId: 4,
          licenceNumber: 'JOBS9912129AA1AA',
          maritalStatusId: 2,
          relationshipId: 14,
          hasNonMotoringConvictions: false,
          genderId: 1,
          medicalConditionId: 4,
          numberOfMonthsLicenceHeld: 3,
          numberOfYearsLicenceHeld: 2,
          dateOfBirth: '1999-12-12',
          drivingOffences: [],
          claims: [],
          mainOccupation: {
            businessSectorId: 229,
            occupationId: 1731,
            employmentStatusId: 3
          },
          additionalOccupation: {
            businessSectorId: 229,
            occupationId: 1307,
            employmentStatusId: 3
          },
          isUkResidentFromBirth: true,
          isMainDriver: true
        }
      ],
      vehicle: {
        businessMilesPerYear: 0,
        monthCarBought: 10,
        yearCarBought: 2017,
        daytimeStorageLocationId: 8,
        numberOfCarsInHousehold: 1,
        overnightStorageLocationId: 2,
        ownerId: 10,
        personalMilesPerYear: dynamicAnswers.personalMilesPerYearA2,
        registeredKeeperId: 10,
        registration: 'A2',
        usageTypeId: 1,
        vehicleType: {
          bodyTypeId: 1,
          engineTypeId: 1,
          description: 'BENTLEY MULSANNE',
          importTypeId: 1,
          makeDescription: 'Bentley',
          variantCode: '01',
          variantDescription: 'S',
          makeCode: '060',
          modelCode: '058',
          modelDescription: 'Mulsanne',
          securityDeviceId: 1,
          doors: 4,
          manufacturedFrom: 1987,
          manufacturedTo: 1992,
          manufacturedYear: 1990,
          engineCc: 6750,
          numberOfSeats: 9,
          engineLitres: 6.8,
          rightHandDrive: true,
          trackerFitted: false,
          transmissionTypeId: 2,
          vehicleTypeId: '06005801',
          vehicleValue: 15000
        },
        modifications: [],
        insuranceGroup50: null,
        isCarPurchased: true,
        isVehicleModified: false
      },
      quickEstimate: null
    },
    isAuthenticated: true
  }
};
