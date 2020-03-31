import standardProfile from './standard';

const yourCar = Object.assign({}, standardProfile.yourCar);

['selectedVehicle', 'vehicle', 'numberOfSeats', 'vehicleValue']
  .forEach(question => delete yourCar[question]);

delete yourCar.personalMilesPerYearEstimated;

const profile = Object.assign({}, standardProfile, {
  yourCar: Object.assign({}, yourCar, {
    registrationNumber: 'A1',
    personalMilesPerYear: 5000
  }),
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
        policyStartDate: standardProfile.yourPolicy.policyStartDate,
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
        dateOfBirth: '1999-12-12',
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
        personalMilesPerYear: 5000,
        registeredKeeperId: 10,
        registration: 'A1',
        usageTypeId: 1,
        vehicleType: {
          bodyTypeId: 2,
          engineTypeId: 1,
          description: 'MINI COOPER',
          importTypeId: 1,
          makeDescription: 'Mini',
          variantCode: '02',
          variantDescription: 'S',
          makeCode: '338',
          modelCode: '017',
          modelDescription: 'Cooper',
          securityDeviceId: 6,
          doors: 3,
          manufacturedFrom: 2006,
          manufacturedTo: 2014,
          manufacturedYear: 2007,
          engineCc: 1598,
          numberOfSeats: 4,
          engineLitres: 1.6,
          rightHandDrive: true,
          trackerFitted: false,
          transmissionTypeId: 2,
          vehicleTypeId: '33801702',
          vehicleValue: 1445
        },
        modifications: [],
        insuranceGroup50: 30,
        isCarPurchased: true,
        isVehicleModified: false
      },
      quickEstimate: null
    },
    isAuthenticated: true
  }
});

module.exports = profile;
