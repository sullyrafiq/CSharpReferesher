import standardProfile from './standard';
import claims from './sections/your-details/claims';
import drivingOffences from './sections/your-details/drivingOffences';
import additionalDrivers from './sections/your-details/additionalDrivers';
import { dateObjToString } from '../common/date';
import dynamicAnswers from '../profiles/dynamicAnswers';

const YEAR = new Date().getFullYear();

const maxClaims = claims.concat([
  {
    claimType: 'Accident',
    claimFault: 1, // Not at fault
    claimDate: { day: '02', month: '02', year: YEAR - 2 },
    claimNoClaimsAffected: true
  },
  {
    claimType: 10, // Windscreen/Glass claim
    claimDate: { day: '03', month: '03', year: YEAR - 3 },
    claimNoClaimsAffected: false
  },
  {
    claimType: '',
    claimTypeOther: 6, // Storm/Flood damage
    claimDate: { day: '04', month: '04', year: YEAR - 4 },
    claimNoClaimsAffected: true
  }
]);

const maxDrivingOffences = drivingOffences.concat([
  {
    drivingOffenceType: 'Careless driving',
    drivingOffenceCode: 28, // CD10
    drivingOffenceDate: { day: '18', month: '05', year: YEAR - 2 },
    drivingOffencePenaltyPoints: 3,
    drivingOffencePaidFine: true,
    drivingOffenceFineAmount: '100',
    drivingOffenceBanned: false
  },
  {
    drivingOffenceType: -1,
    drivingOffenceTypeCodeOther: 'DD20 - Dangerous Speed',
    drivingOffenceDate: { day: '18', month: '05', year: YEAR - 2 },
    drivingOffencePenaltyPoints: 3,
    drivingOffencePaidFine: true,
    drivingOffenceFineAmount: '100',
    drivingOffenceBanned: false
  }
]);

const additionalDriversWithMaxClaimsAndDrivingOffences = JSON.parse(JSON.stringify(additionalDrivers));

additionalDriversWithMaxClaimsAndDrivingOffences[0].hasDrivingOffences = true;
additionalDriversWithMaxClaimsAndDrivingOffences[0].drivingOffences = maxDrivingOffences;
additionalDriversWithMaxClaimsAndDrivingOffences[0].additionalDriverHasClaims = true;
additionalDriversWithMaxClaimsAndDrivingOffences[0].claims = maxClaims;

const yourCar = Object.assign({}, standardProfile.yourCar);
delete yourCar.personalMilesPerYearEstimated;

module.exports = Object.assign({}, standardProfile, {
  yourCar: Object.assign({}, yourCar, {
    isVehicleModified: true,
    modifications: [
      { category: 'Spoilers / Bodykits', type: '1' },
      { category: 'Body modifications', type: '7' },
      { category: 'Paintwork', type: '13' },
      { category: 'Suspension / Steering', type: '20' },
      { category: 'Wheels / Tyres', type: '22' },
      { category: 'Engine / Transmission', type: '27' },
      { category: 'Brakes', type: '43' },
      { category: 'Accessories', type: '46' }
    ],
    registeredOwnerAndKeeper: false,
    registeredOwner: 7, // Parent
    registeredKeeper: 10, // You
    usageType: -1, // Social, commuting and for business,
    businessUsageType: 5, // Business use by the policyholder and their spouse
    businessMilesPerYear: 5000,
    personalMilesPerYear: dynamicAnswers.personalMilesPerYearA2,
    daytimeStorageLocation: '',
    daytimeStorageLocationOther: 9, // Secure public car park
    overnightStorageLocation: '',
    overnightStorageLocationOther: 5, // Locked compound
    anyOtherCars: true,
    anyOtherCarsId: 2 // Own another car
  }),
  yourDetails: Object.assign({}, standardProfile.yourDetails, {
    dateOfBirth: { day: '12', month: '12', year: '1990' },
    isUkResidentFromBirth: false,
    ukResidencyStartMonth: '10',
    ukResidencyStartYear: '2017',
    hasAdditionalOccupation: true,
    additionalOccupation: 'Piano Teacher',
    additionalOccupationBusinessSector: 'Education',
    licenceWithAdditionalQualification: true,
    licenceAdditionalQualification: 'PassPlus',
    hasMedicalCondition: true,
    medicalConditionId: '4',
    hasLicenceNumber: true,
    licenceNumber: ['JONES', '912120', 'AA1', 'AA'],
    hasClaims: true,
    claims: maxClaims,
    hasDrivingOffences: true,
    drivingOffences: maxDrivingOffences
  }),
  yourPolicy: Object.assign({}, standardProfile.yourPolicy, {
    hasAdditionalDriver: true,
    additionalDrivers: additionalDriversWithMaxClaimsAndDrivingOffences,
    mainDriver: 'Steve-Jobs-1999-12-12',
    numberOfYearsNoClaims: 5,
    protectedNoClaims: false,
    contactByEmail: true
  }),
  aggResponse: {
    activityTypeId: 1,
    channelId: null,
    organisationId: null,
    clientId: 22,
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
        anyOtherCarsId: 2,
        surname: 'Jones',
        ukResidencyStartMonth: 10,
        ukResidencyStartYear: 2017,
        licenceTypeId: 5,
        licenceNumber: 'JONES912120AA1AA',
        maritalStatusId: 2,
        relationshipId: null,
        hasNonMotoringConvictions: true,
        genderId: 1,
        medicalConditionId: 4,
        numberOfMonthsLicenceHeld: 2,
        numberOfYearsLicenceHeld: 2,
        dateOfBirth: '1990-12-12',
        drivingOffences: [
          {
            alcoholReading: 104,
            monthsBanned: 24,
            penaltyPoints: 0,
            dateOfOffence: dateObjToString(maxDrivingOffences[0].drivingOffenceDate),
            dvlaOffenceCode: 128,
            fineAmount: 940
          },
          {
            alcoholReading: 37,
            monthsBanned: 0,
            penaltyPoints: 0,
            dateOfOffence: dateObjToString(maxDrivingOffences[1].drivingOffenceDate),
            dvlaOffenceCode: 128,
            fineAmount: 100
          },
          {
            alcoholReading: 0,
            monthsBanned: 0,
            penaltyPoints: 7,
            dateOfOffence: dateObjToString(maxDrivingOffences[2].drivingOffenceDate),
            dvlaOffenceCode: 302,
            fineAmount: 0
          },
          {
            alcoholReading: 0,
            monthsBanned: 0,
            penaltyPoints: 3,
            dateOfOffence: dateObjToString(maxDrivingOffences[3].drivingOffenceDate),
            dvlaOffenceCode: 28,
            fineAmount: 100
          },
          {
            alcoholReading: 0,
            monthsBanned: 0,
            penaltyPoints: 3,
            dateOfOffence: dateObjToString(maxDrivingOffences[4].drivingOffenceDate),
            dvlaOffenceCode: 94,
            fineAmount: 100
          }
        ],
        claims: [
          {
            claimTypeId: 2,
            dateOfClaim: dateObjToString(maxClaims[0].claimDate),
            noClaimsAffected: true,
            costOfClaim: 0
          },
          {
            claimTypeId: 8,
            dateOfClaim: dateObjToString(maxClaims[1].claimDate),
            noClaimsAffected: false,
            costOfClaim: 0
          },
          {
            claimTypeId: 1,
            dateOfClaim: dateObjToString(maxClaims[2].claimDate),
            noClaimsAffected: true,
            costOfClaim: 0
          },
          {
            claimTypeId: 10,
            dateOfClaim: dateObjToString(maxClaims[3].claimDate),
            noClaimsAffected: false,
            costOfClaim: 0
          },
          {
            claimTypeId: 6,
            dateOfClaim: dateObjToString(maxClaims[4].claimDate),
            noClaimsAffected: true,
            costOfClaim: 0
          }
        ],
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
        telephone: '01000000000',
        contactByEmail: true,
        contactByTel: false,
        contactByText: false,
        numberOfYearsNoClaims: 5,
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
        isUkResidentFromBirth: false,
        isMainDriver: false,
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
          drivingOffences: [
            {
              alcoholReading: 104,
              monthsBanned: 24,
              penaltyPoints: 0,
              dateOfOffence: dateObjToString(maxDrivingOffences[0].drivingOffenceDate),
              dvlaOffenceCode: 128,
              fineAmount: 940
            },
            {
              alcoholReading: 37,
              monthsBanned: 0,
              penaltyPoints: 0,
              dateOfOffence: dateObjToString(maxDrivingOffences[1].drivingOffenceDate),
              dvlaOffenceCode: 128,
              fineAmount: 100
            },
            {
              alcoholReading: 0,
              monthsBanned: 0,
              penaltyPoints: 7,
              dateOfOffence: dateObjToString(maxDrivingOffences[2].drivingOffenceDate),
              dvlaOffenceCode: 302,
              fineAmount: 0
            },
            {
              alcoholReading: 0,
              monthsBanned: 0,
              penaltyPoints: 3,
              dateOfOffence: dateObjToString(maxDrivingOffences[3].drivingOffenceDate),
              dvlaOffenceCode: 28,
              fineAmount: 100
            },
            {
              alcoholReading: 0,
              monthsBanned: 0,
              penaltyPoints: 3,
              dateOfOffence: dateObjToString(maxDrivingOffences[4].drivingOffenceDate),
              dvlaOffenceCode: 94,
              fineAmount: 100
            }
          ],
          claims: [
            {
              claimTypeId: 2,
              dateOfClaim: dateObjToString(maxClaims[0].claimDate),
              noClaimsAffected: true,
              costOfClaim: 0
            },
            {
              claimTypeId: 8,
              dateOfClaim: dateObjToString(maxClaims[1].claimDate),
              noClaimsAffected: false,
              costOfClaim: 0
            },
            {
              claimTypeId: 1,
              dateOfClaim: dateObjToString(maxClaims[2].claimDate),
              noClaimsAffected: true,
              costOfClaim: 0
            },
            {
              claimTypeId: 10,
              dateOfClaim: dateObjToString(maxClaims[3].claimDate),
              noClaimsAffected: false,
              costOfClaim: 0
            },
            {
              claimTypeId: 6,
              dateOfClaim: dateObjToString(maxClaims[4].claimDate),
              noClaimsAffected: true,
              costOfClaim: 0
            }
          ],
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
        },
        {
          name: 'Bill',
          anyOtherCarsId: 1,
          surname: 'Gates',
          ukResidencyStartMonth: null,
          ukResidencyStartYear: null,
          licenceTypeId: 4,
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
            occupationId: 1067,
            employmentStatusId: 6,
            businessSectorId: 523
          },
          additionalOccupation: {
            businessSectorId: 229,
            occupationId: 1307,
            employmentStatusId: 3
          },
          isUkResidentFromBirth: true,
          isMainDriver: false
        },
        {
          name: 'Sarah',
          anyOtherCarsId: 3,
          surname: 'Marshall',
          ukResidencyStartMonth: 11,
          ukResidencyStartYear: 2015,
          licenceTypeId: 8,
          licenceNumber: null,
          maritalStatusId: 1,
          relationshipId: 16,
          hasNonMotoringConvictions: false,
          genderId: 2,
          medicalConditionId: 1,
          numberOfMonthsLicenceHeld: 0,
          numberOfYearsLicenceHeld: 7,
          dateOfBirth: '1965-12-12',
          drivingOffences: [],
          claims: [],
          mainOccupation: {
            businessSectorId: 522,
            occupationId: 1515,
            employmentStatusId: 9
          },
          additionalOccupation: null,
          isUkResidentFromBirth: false,
          isMainDriver: false
        }
      ],
      vehicle: {
        businessMilesPerYear: 5000,
        monthCarBought: 10,
        yearCarBought: 2017,
        daytimeStorageLocationId: 9,
        numberOfCarsInHousehold: 1,
        overnightStorageLocationId: 5,
        ownerId: 7,
        personalMilesPerYear: dynamicAnswers.personalMilesPerYearA2,
        registeredKeeperId: 10,
        registration: 'A2',
        usageTypeId: 5,
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
        modifications: [
          {
            typeId: 1
          },
          {
            typeId: 7
          },
          {
            typeId: 13
          },
          {
            typeId: 20
          },
          {
            typeId: 22
          },
          {
            typeId: 27
          },
          {
            typeId: 43
          },
          {
            typeId: 46
          }
        ],
        insuranceGroup50: null,
        isCarPurchased: true,
        isVehicleModified: true
      },
      quickEstimate: null
    },
    isAuthenticated: true
  }
});
