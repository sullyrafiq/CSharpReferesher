import manual from './manualVehicle';

const updatedManualProfile = JSON.parse(JSON.stringify(manual));

module.exports = Object.assign({}, updatedManualProfile, {
  yourCar: Object.assign({}, updatedManualProfile.yourCar, {
    isVehicleModified: true,
    modifications: [
      { category: 'Spoilers / Bodykits', type: '1' },
      { category: 'Accessories', type: '46' }
    ]
  }),
  aggResponse: {
    activityTypeId: 1,
    channelId: null,
    organisationId: null,
    clientId: 22,
    accountId: 'de0a2783-aca0-4a7f-bde4-8a4b310fed41',
    visitorId: 'CVMJkDGhqNjF0ZCprVpa',
    sourceCode: 'TIV',
    visitorIPAddress: '127.0.0.1',
    sessionId: 'a76f14bd-d230-4962-aa7d-106a9529ed3d',
    brandFilter: null,
    payload: {
      policy: {
        policyStartDate: updatedManualProfile.yourPolicy.policyStartDate,
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
        registration: null,
        usageTypeId: 1,
        vehicleType: {
          bodyTypeId: 2,
          engineTypeId: 1,
          description: 'AUDI A3',
          importTypeId: 1,
          makeDescription: 'Audi',
          variantCode: '01',
          variantDescription: 'Sport',
          makeCode: '040',
          modelCode: '048',
          modelDescription: 'A3',
          securityDeviceId: 7,
          doors: 3,
          manufacturedFrom: 1996,
          manufacturedTo: 2003,
          manufacturedYear: 1996,
          engineCc: 1595,
          numberOfSeats: 5,
          engineLitres: 1.6,
          rightHandDrive: true,
          trackerFitted: false,
          transmissionTypeId: 1,
          vehicleTypeId: '04004801',
          vehicleValue: 15000
        },
        modifications: [
          {
            typeId: 1
          },
          {
            typeId: 46
          }
        ],
        insuranceGroup50: 21,
        isCarPurchased: true,
        isVehicleModified: true
      },
      quickEstimate: null
    },
    isAuthenticated: true
  }
});
