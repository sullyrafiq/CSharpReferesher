import standardProfile from './standard';
import additionalDriver from './sections/your-details/standardAdditionalDriver';
import dynamicAnswers from '../profiles/dynamicAnswers';

const additionalDrivers = [
  Object.assign(additionalDriver, {
    employmentStatus: 9 // Retired
  })
];

const profile = Object.assign({}, standardProfile, {
  yourDetails: Object.assign({}, standardProfile.yourDetails, {
    employmentStatus: 9 // Retired
  }),
  yourPolicy: Object.assign({}, standardProfile.yourPolicy, {
    hasAdditionalDriver: true,
    additionalDrivers,
    mainDriver: 'Peter Jones'
  }),
  aggResponse: {
    activityTypeId: 1,
    channelId: null,
    organisationId: null,
    clientId: 22,
    sourceCode: 'TIV',
    visitorIPAddress: '127.0.0.1',
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
          occupationId: 1515,
          employmentStatusId: 9,
          businessSectorId: 522
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
      additionalDrivers: [{
        name: 'Bill',
        anyOtherCarsId: 1,
        surname: 'Gates',
        ukResidencyStartMonth: null,
        ukResidencyStartYear: null,
        licenceTypeId: 12,
        licenceNumber: null,
        maritalStatusId: 2,
        relationshipId: 10,
        hasNonMotoringConvictions: false,
        genderId: 1,
        medicalConditionId: 1,
        numberOfMonthsLicenceHeld: 0,
        numberOfYearsLicenceHeld: 7,
        dateOfBirth: '1990-12-12',
        drivingOffences: [],
        claims: [],
        mainOccupation: {
          occupationId: 1515,
          employmentStatusId: 9,
          businessSectorId: 522
        },
        additionalOccupation: null,
        isUkResidentFromBirth: true,
        isMainDriver: false
      }],
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
});

delete profile.yourDetails.occupation;
delete profile.yourDetails.businessSector;
delete profile.yourDetails.hasAdditionalOccupation;

module.exports = profile;
