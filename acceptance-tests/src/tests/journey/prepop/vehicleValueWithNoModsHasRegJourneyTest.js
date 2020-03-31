import profile from '../../../profiles/standardWithA1';
import JourneyRunner from '../../../common/journeyRunner';
import AccountManager from '../../../common/accountManager';

const modifiedVehicleValue = 10000;

module.exports = {
  'tags': ['journey', 'forward-journey', 'vehicle-value-journey'],

  'Given I complete a journey and load enquiry': (client) => {
    JourneyRunner
      .runWith(client, profile)
      .assertComplete(client, profile);

    client.execute(() => window.location.search.split('enquiryId=')[1], [], ({value: enquiryId}) => {
      AccountManager.postHistory(client, {enquiryId: enquiryId, accountId: client.globals.accountId});
    });
    client.pause(5000);

    client.back().refresh();
  },

  'Then I should see the vehicle value displayed': (client) => {
    const expectedVehicleValue = profile.aggResponse.payload.vehicle.vehicleType.vehicleValue;

    client.page.yourCarPage()
      .waitForElementVisible('@vehicleValue')
      .assert.elementPresent('@vehicleValue')
      .assert.value('@vehicleValue', String(expectedVehicleValue));
  },

  'And I modify the vehicle value and proceed to result page': (client) => {
    client.page.yourCarPage()
      .completePageWith({vehicleValue: modifiedVehicleValue});

    JourneyRunner.assertRepop(client, profile);
  },

  'Then I see results with modified vehicle value': (client) => {
    const modifiedProfile = JSON.parse(JSON.stringify(profile));
    modifiedProfile.aggResponse.payload.vehicle.vehicleType.vehicleValue = modifiedVehicleValue;
    JourneyRunner.assertComplete(client, modifiedProfile);
  },

  'When I navigate to the first page': (client) => {
    client.pause(30000);
    client.page.yourCarPage().navigateAndWait();
  },

  'Then I should see the latest vehicle value displayed': (client) => {
    const expectedVehicleValue = profile.aggResponse.payload.vehicle.vehicleType.vehicleValue;

    client.page.yourCarPage()
      .waitForElementVisible('@vehicleValue')
      .assert.elementPresent('@vehicleValue')
      .assert.value('@vehicleValue', String(expectedVehicleValue));

    client.end();
  }
};


