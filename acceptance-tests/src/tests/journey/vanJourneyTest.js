import VALIDATION_MESSAGES from '../../common/validationMessages';

module.exports = {
  'tags': ['journey', 'forward-journey', 'van-journey'],

  'Given I am on your car page': (client) => {
    client.page.yourCarPage().navigateAndWait();
  },

  'When I enter a registration number belonging to a van and click find vehicle': (client) => {
    client.page.yourCarPage()
      .completePageWith({ registrationNumber: 'PK11WLJ' })
      .click('@findVehicle');
  },

  'Then I should see the notice box becoming visible and the not a car validation errors': (client) => {
    client.page.yourCarPage()
      .assertValidation('@vehicleValidationMessage', VALIDATION_MESSAGES.notACar)
      .expect.element('.vehicle-question .notice__heading').text.to.contain('Is this a van?');
  },

  'Then I should see the "Get a Van insurance quote" link with the correct url': (client) => {
    const vanInsuranceURL = 'https://www.moneysupermarket.com/van-insurance/vehicle.launch?PolicyType=GV&CompanyName=vanquote&brandName=default&from=car-registration-error';

    client.page.yourCarPage()
      .assert.attributeContains('.vehicle-question .btn--link', 'href', vanInsuranceURL);

    client.end();
  }
};
