import complexProfile from '../../profiles/complex';
import standardProfile from '../../profiles/standard';
import JourneyRunner from '../../common/journeyRunner';

const updatedComplex = JSON.parse(JSON.stringify(complexProfile));
updatedComplex.yourPolicy.contactByEmail = false;
updatedComplex.aggResponse.payload.policyHolder.contactByEmail = false;

module.exports = {
  'tags': ['journey', 'forward-journey', 'complex-to-standard-journey'],

  'When I complete the journey': (client) => {
    JourneyRunner.runWith(client, updatedComplex);
  },

  'Then I see results': (client) => {
    JourneyRunner.assertComplete(client, updatedComplex);
  },

  'When I click the browser back button': (client) => {
    client.back();
  },

  'Then I am taken to the your car page with an enquiry ID': (client) => {
    client.url((result) => {
      const uuid = /[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}/;
      const pattern = `your-car?enquiryId=${result.value.match(uuid)[0]}`;

      client.page.yourCarPage().waitForUrlToContain(pattern);
    });
  },

  'When I complete the journey again with edited answers': (client) => {
    client.page.yourCarPage()
      .waitForElementVisible('@selectedVehiclePreview');

    client.pause(500);

    JourneyRunner.completeWith(client, {
      yourCar: {
        isVehicleModified: false,
        registeredOwnerAndKeeper: true,
        usageType: '1', //Social Only (SD&P),
        daytimeStorageLocation: '8', // Drive
        overnightStorageLocation: '2', // Garage
        anyOtherCars: false
      },
      yourDetails: {
        dateOfBirth: { day: '12', month: '12', year: '1999' },
        isUkResidentFromBirth: true,
        hasAdditionalOccupation: false,
        licenceWithAdditionalQualification: false,
        hasMedicalCondition: false,
        hasLicenceNumber: false,
        hasClaims: false,
        claimsRemoval: true,
        hasDrivingOffences: false,
        drivingOffencesRemoval: true
      },
      yourPolicy: {
        hasAdditionalDriver: false,
        numberOfYearsNoClaims: 2
      }
    });
  },

  'Then I see results again': (client) => {
    JourneyRunner.assertComplete(client, standardProfile);

    client.end();
  }
};
