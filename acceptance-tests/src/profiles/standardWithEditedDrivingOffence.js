import standardProfile from '../profiles/standard';
import standardAdditionalDriver from '../profiles/sections/your-details/standardAdditionalDriver';
import {dateObjToString} from '../common/date';
import dynamicAnswers from '../profiles/dynamicAnswers';

const YEAR = new Date().getFullYear();

const drivingOffence = {
  drivingOffenceType: 'Speeding',
  drivingOffenceCode: '',
  drivingOffenceCodeOther: 'SP40 - Exceeding Passenger Vehicle Speed Limit',
  drivingOffenceDate: {day: '18', month: '05', year: YEAR - 4},
  drivingOffencePenaltyPoints: '',
  drivingOffencePointsOther: 7,
  drivingOffencePaidFine: false,
  drivingOffenceBanned: false
};

const additionalDriver = Object.assign({}, standardAdditionalDriver, {
  hasDrivingOffences: true,
  drivingOffences: [drivingOffence]
});

export default Object.assign({}, standardProfile, {
  yourDetails: Object.assign({}, standardProfile.yourDetails, {
    hasDrivingOffences: true,
    drivingOffences: [drivingOffence]
  }),
  yourPolicy: Object.assign({}, standardProfile.yourPolicy, {
    hasAdditionalDriver: true,
    additionalDrivers: [additionalDriver],
    mainDriver: 'Peter Jones'
  }),
  aggResponse: {
    activityTypeId: 1,
    channelId: null,
    organisationId: null,
    clientId: 22,
    accountId: '11b87c5d-4d77-4d14-985c-ab6b0913430c',
    visitorId: 'e69628dfc21044aca0a5',
    sourceCode: 'TIV',
    visitorIPAddress: '127.0.0.1',
    sessionId: '6fee3902-74b0-4c8f-89df-f2ebb0a0d887',
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
        drivingOffences: [
          {
            alcoholReading: 0,
            monthsBanned: 0,
            penaltyPoints: 7,
            dateOfOffence: dateObjToString(drivingOffence.drivingOffenceDate),
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
        email: '84b7cc90-ba53-11e8-9f9e-f7ac98d67777@moneysupermarket.com',
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
          drivingOffences: [
            {
              alcoholReading: 0,
              monthsBanned: 0,
              penaltyPoints: 7,
              dateOfOffence: dateObjToString(drivingOffence.drivingOffenceDate),
              dvlaOffenceCode: 302,
              fineAmount: 0
            }
          ],
          claims: [],
          mainOccupation: {
            businessSectorId: 522,
            occupationId: 1515,
            employmentStatusId: 9
          },
          additionalOccupation: null,
          isUkResidentFromBirth: true,
          isMainDriver: false
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
});
