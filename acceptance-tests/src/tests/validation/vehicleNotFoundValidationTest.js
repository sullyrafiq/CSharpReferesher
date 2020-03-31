import VALIDATION_MESSAGES from '../../common/validationMessages';

module.exports = {
  'tags': ['your-car', 'validation'],

  'Given I am on your car page': (client) => {
    client.page.yourCarPage().navigateAndWait();
  },

  'When I enter an invalid registration number and click find vehicle': (client) => {
    client.page.yourCarPage()
      .completePageWith({registrationNumber: 'SKSKSKSKDK'})
      .click('@findVehicle');
  },

  'Then I see an invalid registration: validation message': (client) => {
    client.page.yourCarPage()
      .assertValidation('@vehicleValidationMessage', VALIDATION_MESSAGES.invalidVehicleError);

    client.end();
  }
};
