import VALIDATION_MESSAGES from '../../common/validationMessages';

module.exports = {
  'tags': ['journey', 'forward-journey', 'motorbike-journey'],

  'Given I am on your car page': (client) => {
    client.page.yourCarPage().navigateAndWait();
  },

  'When I enter a registration number belonging to a motorbike and click find vehicle': (client) => {
    client.page.yourCarPage()
      .completePageWith({ registrationNumber: 'AF66ZVX' })
      .click('@findVehicle');
  },

  'Then I should see the notice box becoming visible and the not a car validation errors': (client) => {
    client.page.yourCarPage()
      .assertValidation('@vehicleValidationMessage', VALIDATION_MESSAGES.notACar)
      .expect.element('.vehicle-question .notice__heading').text.to.contain('Is this a motorbike?');
  },

  'Then I should see the "Get a Van insurance quote" link with the correct url': (client) => {
    const motorbikeInsuranceURL = 'https://www.moneysupermarket.com/motorbike-insurance/quote/PersonalInformation1.aspx?refid=msmcar&from=car-registration-error';

    client.page.yourCarPage()
      .assert.attributeEquals('.vehicle-question .btn--link', 'href', motorbikeInsuranceURL);

    client.end();
  }
};
