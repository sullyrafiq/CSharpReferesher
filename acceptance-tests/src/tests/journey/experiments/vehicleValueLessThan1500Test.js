import profile from '../../../profiles/live';

const VARIATION_1 = '17498931078';

const updatedProfile = JSON.parse(JSON.stringify(profile));

const vehicleValueUpdated = 1501;
const registrationNumber = 'HV54XKN';

updatedProfile.yourCar = Object.assign(updatedProfile.yourCar, { registrationNumber });
updatedProfile.aggResponse.payload.vehicle.vehicleType = Object.assign(updatedProfile.aggResponse.payload.vehicle.vehicleType, { vehicleValueUpdated });

module.exports = {
  '@disabled': true,
  'tags': ['journey', 'experiment', 'vehicle-value-experiment'],

  'When I enter the experiment': (client) => {
    const experimentUrl = `${client.page.yourCarPage().url()}?optimizely_x=${VARIATION_1}&optimizely_token=PUBLIC`;

    // eslint-disable-next-line no-console
    console.log('Experiment URL: ', experimentUrl);

    client
      .url(experimentUrl)
      .page.yourCarPage().waitForElementVisible('@main', 60000)
      .fetchSpy();
  },

  'And I enter a registration number': (client) => {
    client.page.yourCarPage()
      .clearAndSetValue('input[name="registrationNumber"]', registrationNumber)
      .click('@findVehicle');
  },

  'Then I proceed to update the vehicle value to a value higher than 1500': (client) => {
    client.page.yourCarPage()
      .waitForElementVisible('@vehicleValue')
      .clearAndSetValue('input[name="vehicleValue"]', vehicleValueUpdated)
      .assert.value('@vehicleValue', String(vehicleValueUpdated));
  },

  'And then I proceed to complete filling in Your Car page': (client) => {
    client.page.yourCarPage()
      .triggerClick(`input[name="detailsAssumption"][value='${updatedProfile.yourCar.detailsAssumption}']`)
      .triggerClick(`input[name="isVehicleModified"][value='${updatedProfile.yourCar.isVehicleModified}']`)
      .triggerClick(`input[name="carBought"][value='${updatedProfile.yourCar.carBought}']`)
      .waitForElementVisible('@dateCarBoughtConfirm')
      .click('@dateCarBoughtConfirm')
      .triggerClick(`input[name="registeredOwnerAndKeeper"][value='${updatedProfile.yourCar.registeredOwnerAndKeeper}']`)
      .triggerClick(`input[name="usageType"][value='${updatedProfile.yourCar.usageType}']`)
      .waitForElementVisible('@personalMilesPerYearEstimatedConfirm')
      .click('@personalMilesPerYearEstimatedConfirm')
      .triggerClick(`input[name="daytimeStorageLocation"][value='${updatedProfile.yourCar.daytimeStorageLocation}']`)
      .triggerClick(`input[name="overnightStorageLocation"][value='${updatedProfile.yourCar.overnightStorageLocation}']`)
      .triggerClick(`input[name="anyOtherCars"][value='${updatedProfile.yourCar.anyOtherCars}']`)
      .navigateTo('your-details');
  },

  'And then when I navigate to the results page': (client) => {
    client.page.yourDetailsPage()
      .completePageWithAndNavigateTo(updatedProfile.yourDetails, 'your-policy');

    client.page.yourPolicyPage()
      .completePageWith(updatedProfile.yourPolicy);

    client.page.yourPolicyPage()
      .proceed();
  },

  'And then I should get on the results page': (client) => {
    client.page.resultsPage().waitForResultsComplete();

    client.end();
  }
};
