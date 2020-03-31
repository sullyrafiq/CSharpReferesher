import dynamicAnswers from '../profiles/dynamicAnswers';

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const policyStartDate = tomorrow.toISOString().slice(0, 10);

module.exports = {
  yourCar: {
    registrationNumber: 'A4',
    detailsAssumption: true,
    isVehicleModified: false,
    carBought: true,
    dateCarBoughtConfirm: true,
    registeredOwnerAndKeeper: true,
    usageType: '1', // Social only (SD&P)
    personalMilesPerYearEstimated: true,
    daytimeStorageLocation: '8', // Drive
    overnightStorageLocation: '2', // Garage
    anyOtherCars: false
  },
  yourDetails: {
    firstName: 'Test',
    lastName: 'Tester',
    dateOfBirth: {day: '12', month: '12', year: '1960'},
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
    numberOfYearsLicenceHeld: '2',
    numberOfMonthsLicenceHeld: '2',
    hasClaims: false,
    hasDrivingOffences: false,
    hasNonMotoringConvictions: false
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
    policyStartDate
  },
  aggResponse: {
    activityTypeId: 1,
    channelId: null,
    organisationId: null,
    clientId: 22,
    accountId: '2d8ff1bc-4153-4d51-9ecc-3ed80933ce9e',
    visitorId: 'e69628dfc21044aca0a5',
    sourceCode: 'TIV',
    visitorIPAddress: '127.0.0.1',
    sessionId: 'cce8fa5a-c1e8-4f01-ba17-42cae1c1580a',
    brandFilter: null,
    payload: {
      policy: {
        policyStartDate,
        policyTypeId: 1,
        paymentTypeId: 1,
        protectedNoClaims: false,
        voluntaryExcess: 250,
        legalCover: true,
        personalInjury: true,
        courtesyCar: true,
        breakdownCover: true,
        paymentTypeIdForPrices: 1
      },
      receiptId: null,
      policyHolder: {
        name: 'Test',
        anyOtherCarsId: 1,
        surname: 'Tester',
        ukResidencyStartMonth: null,
        ukResidencyStartYear: null,
        licenceTypeId: 4,
        licenceNumber: null,
        maritalStatusId: 2,
        relationshipId: null,
        hasNonMotoringConvictions: false,
        genderId: 1,
        medicalConditionId: 1,
        numberOfMonthsLicenceHeld: 2,
        numberOfYearsLicenceHeld: 2,
        dateOfBirth: '1960-12-12',
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
      additionalDrivers: [],
      vehicle: {
        businessMilesPerYear: 0,
        monthCarBought: 10,
        yearCarBought: 2017,
        daytimeStorageLocationId: 8,
        numberOfCarsInHousehold: 1,
        overnightStorageLocationId: 2,
        ownerId: 10,
        personalMilesPerYear: dynamicAnswers.personalMilesPerYearA4,
        registeredKeeperId: 10,
        registration: 'A4',
        usageTypeId: 1,
        vehicleType: {
          bodyTypeId: 2,
          engineTypeId: 2,
          description: 'VOLVO V40',
          importTypeId: 1,
          makeDescription: 'Volvo',
          variantCode: '95',
          variantDescription: 'Cross Country LUX D2',
          makeCode: '546',
          modelCode: '826',
          modelDescription: 'V40',
          securityDeviceId: 6,
          doors: 5,
          manufacturedFrom: 2015,
          manufacturedTo: 2016,
          manufacturedYear: 2016,
          engineCc: 1969,
          numberOfSeats: 5,
          engineLitres: 2.0,
          rightHandDrive: true,
          trackerFitted: false,
          transmissionTypeId: 2,
          vehicleTypeId: '54682695',
          vehicleValue: 8545.0
        },
        modifications: [],
        insuranceGroup50: 18,
        isCarPurchased: true,
        isVehicleModified: false
      },
      quickEstimate: null
    },
    isAuthenticated: true
  }
};
