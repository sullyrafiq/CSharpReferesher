import drivingOffencesProfile from './drivingOffences';
import { dateObjToString } from '../common/date';
import dynamicAnswers from '../profiles/dynamicAnswers';

const drivingOffences = drivingOffencesProfile.yourDetails.drivingOffences;

module.exports = Object.assign({}, drivingOffencesProfile, {
  yourDetails: Object.assign({}, drivingOffencesProfile.yourDetails, {
    removeDrivingOffences: [0]
  }),
  aggResponse: {
    activityTypeId: 1,
    channelId: null,
    organisationId: null,
    clientId: 22,
    accountId: 'de0a2783-aca0-4a7f-bde4-8a4b310fed41',
    visitorId: '7Z1z133qnIUCotNPjWwu',
    sourceCode: 'TIV',
    visitorIPAddress: '127.0.0.1',
    sessionId: 'e033e9ee-fb20-47ee-89ee-9b85c150ee98',
    brandFilter: null,
    payload: {
      policy: {
        policyStartDate: drivingOffencesProfile.yourPolicy.policyStartDate,
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
        drivingOffences: [
          {
            alcoholReading: 37,
            monthsBanned: 0,
            penaltyPoints: 0,
            dateOfOffence: dateObjToString(drivingOffences[1].drivingOffenceDate),
            dvlaOffenceCode: 128,
            fineAmount: 100
          },
          {
            alcoholReading: 0,
            monthsBanned: 0,
            penaltyPoints: 7,
            dateOfOffence: dateObjToString(drivingOffences[2].drivingOffenceDate),
            dvlaOffenceCode: 302,
            fineAmount: 0
          }
        ],
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
