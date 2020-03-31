import JourneyRunner from '../../common/journeyRunner';
import profile from '../../profiles/manualVehicle';
import AccountManager from '../../common/accountManager';

module.exports = {
  'tags': ['journey', 'forward-journey', 'vehicle-value-journey'],

  'Given I complete a journey with manual vehicle lookup': (client) => {
    JourneyRunner.runWith(client, profile);
  },

  'Then I see results': (client) => {
    JourneyRunner.assertComplete(client, profile);
  },

  'When I navigate to the first page': (client) => {
    client.execute(() => window.location.search.split('enquiryId=')[1], [], ({value: enquiryId}) => {
      AccountManager.postHistory(client, {enquiryId: enquiryId, accountId: client.globals.accountId});
    });
    client.pause(5000);

    client.page.yourCarPage().navigateAndWait();
  },

  'Then I should see the latest vehicle value displayed from history': (client) => {
    client.page.yourCarPage()
      .waitForElementVisible('@vehicleValue')
      .assert.elementPresent('@vehicleValue')
      .assert.value('@vehicleValue', String(profile.yourCar.vehicleValue));

    client.end();
  }
};


